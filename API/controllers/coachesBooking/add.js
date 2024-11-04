const prisma = require("../../prisma");

const AddPlayer = async (req, res, next) => {
  try {
    const { fullName, email, idNo, phoneNo, time,coach , day} = req.body;

    // Check if all required fields are provided
    if (!fullName|| !email || !idNo|| !phoneNo || !time || !coach|| !day) {
      return res.status(400).json({
        error: "All fields are required: fullnames, email, institution, phoneNo, and gender",
      });
    }

    // Validate phone number (example: Kenyan phone numbers)
    if (!/^\d{10}$/.test(phoneNo)) {
      return res.status(400).json({ error: "Invalid phone number. It should have 10 digits." });
    }

    // Validate email format
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format." });
    }

    // Create the new user player record
    const player = await prisma.coachesbooking.create({
      data: {
        fullName, email, idNo, phoneNo, time, coach, day
      },
    });

    // Send success response
    return res.status(201).json({
      message: "Player was added successfully to users",
      player,
    });

  } catch (error) {
    // Handle Prisma-specific errors
    if (error.code === 'P2002') {
      return res.status(409).json({
        error: "This player data conflicts with existing records.",
      });
    }

    if (error.code === 'P2003') {
      return res.status(400).json({
        error: "Invalid foreign key constraint.",
      });
    }

    // General error handling
    next(error);
  }
};

module.exports = AddPlayer;
