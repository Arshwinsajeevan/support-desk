const router = require("express").Router();
const Ticket = require("../models/Ticket");
const auth = require("../middlewares/auth");
const role = require("../middlewares/role");


// CREATE TICKET (USER)
router.post("/", auth, async (req, res) => {
  try {
    const { title, description, priority } = req.body;

    const ticket = await Ticket.create({
      title,
      description,
      priority,
      user: req.user.id
    });

    res.status(201).json(ticket);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});


// GET TICKETS (ROLE BASED + FILTER + PAGINATION)
router.get("/", auth, async (req, res) => {
  try {
    const { status, priority, assignedTo, page = 1, limit = 5 } = req.query;

    let filter = {};

    // USERS — only their tickets
    if (req.user.role === "user") {
      filter.user = req.user.id;
    }

    // AGENTS — only assigned tickets
    if (req.user.role === "agent") {
      filter.assignedTo = req.user.id;
    }

    // ADMIN — unrestricted unless filters applied
    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (assignedTo) filter.assignedTo = assignedTo;

    const tickets = await Ticket.find(filter)
      .populate("user", "name email")
      .populate("assignedTo", "name email")
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json(tickets);

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});


// UPDATE TICKET (ONLY ASSIGNED AGENT OR ADMIN)
router.put("/:id", auth, async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) return res.status(404).json({ msg: "Ticket not found" });

    // If agent — must be assigned
    if (req.user.role === "agent" && ticket.assignedTo != req.user.id) {
      return res.status(403).json({ msg: "Not your ticket" });
    }

    // USER cannot update
    if (req.user.role === "user") {
      return res.status(403).json({ msg: "Users cannot update tickets" });
    }

    Object.assign(ticket, req.body);

    await ticket.save();

    res.json(ticket);

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});


// DELETE TICKET (ADMIN ONLY)
router.delete("/:id", auth, role(["admin"]), async (req, res) => {
  try {
    await Ticket.findByIdAndDelete(req.params.id);
    res.json({ msg: "Ticket deleted" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});


// ASSIGN AGENT (ADMIN)
router.put("/:id/assign", auth, role(["admin"]), async (req, res) => {
  try {
    const { agentId } = req.body;

    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) return res.status(404).json({ msg: "Ticket not found" });

    ticket.assignedTo = agentId;

    await ticket.save();

    res.json(ticket);

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});


// 🚨 VERY IMPORTANT — EXPORT ROUTER
module.exports = router;
