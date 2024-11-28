const prisma = require("../../prisma");

const validateSchedule = (schedule) => {
  if (!Array.isArray(schedule)) {
    throw new Error("Schedule must be an array of objects.");
  }
  schedule.forEach((entry) => {
    if (!entry.day || !Array.isArray(entry.times)) {
      throw new Error("Each schedule entry must have a day and a times array.");
    }
  });
};

const UpdateCoach = async (req, res, next) => {
  try {
    const {
      id,
      name,
      title,
      sport,
      academy,
      bio,
      email,
      phoneno,
      profile_picture,
      working_hours,
      levels,
      groups,
      schedule,
      username,
      password,
    } = req.body;

    // Validate required fields
    if (!id || !name || !title || !sport || !email || !phoneno) {
      return res.status(400).json({
        message: "ID, name, title, sport, email, and phone number are required.",
      });
    }

    // Validate and parse schedule if provided
    let parsedSchedule = null;
    if (schedule) {
      try {
        parsedSchedule = typeof schedule === "string" ? JSON.parse(schedule) : schedule;
        validateSchedule(parsedSchedule);
      } catch (error) {
        return res.status(400).json({ message: "Invalid schedule format." });
      }
    }

    // Attempt to update the coach
    const updatedCoach = await prisma.coaches.update({
      where: { id: parseInt(id) }, // Ensure ID is parsed as an integer
      data: {
        name,
        title,
        sport,
        academy,
        bio,
        email,
        phoneno,
        profile_picture,
        working_hours,
        levels,
        groups,
        schedule: parsedSchedule,
        username,
        password,
      },
    });

    return res.status(200).json({
      message: "Coach updated successfully.",
      coach: updatedCoach,
    });
  } catch (error) {
    if (error.code === "P2025") {
      // Handle record not found
      return res.status(404).json({ message: "Coach not found." });
    }
    next(error); // Pass unexpected errors to the error middleware
  }
};

module.exports = UpdateCoach;
