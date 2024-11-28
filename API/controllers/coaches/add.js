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

const AddCoach = async (req, res, next) => {
  try {
    const {
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

    // Check if all required fields are provided
    if (!name || !title || !sport || !email || !phoneno) {
      return res.status(400).json({
        error: "Required fields are missing: name, title, sport, email, phoneno.",
      });
    }

    // Validate phone number (example: Kenyan phone numbers)
    if (!/^\+?\d{10,13}$/.test(phoneno)) {
      return res.status(400).json({ error: "Invalid phone number. It should be 10-13 digits long." });
    }

    // Validate email format
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format." });
    }

    // Validate and parse schedule if provided
    let parsedSchedule = null;
    if (schedule) {
      try {
        parsedSchedule = typeof schedule === "string" ? JSON.parse(schedule) : schedule;
        validateSchedule(parsedSchedule);
      } catch (error) {
        return res.status(400).json({ error: "Invalid schedule format." });
      }
    }

    // Create the new coach record
    const coach = await prisma.coaches.create({
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

    // Send success response
    return res.status(201).json({
      message: "Coach was added successfully.",
      coach,
    });
  } catch (error) {
    // Handle Prisma-specific errors
    if (error.code === "P2002") {
      return res.status(409).json({
        error: "A coach with this email or phone number already exists.",
      });
    }

    if (error.code === "P2003") {
      return res.status(400).json({
        error: "Invalid foreign key constraint.",
      });
    }

    // General error handling
    next(error);
  }
};

module.exports = AddCoach;
