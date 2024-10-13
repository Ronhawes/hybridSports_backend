const prisma = require("../../prisma");

const AddPlayer = async (req, res, next) => {
  try {
    const { name, age, points, rank } = req.body;

    // Check if all required fields are provided
    if (!name || !age || points === undefined || rank === undefined) {
      return res.status(400).json({
        error: "All fields are required: name, age, points, and rank",
      });
    }

    // Create the new menSingles player record
    const player = await prisma.womenSingles.create({
      data: {
        name,
        age,
        points,
        rank,
      },
    });

    // Send success response
    return res.status(201).json({
      message: "Player was added successfully to menSingles",
      player,
    });

  } catch (error) {
    // Handle Prisma-specific errors or other errors
    if (error.code === 'P2002') {
      return res.status(409).json({
        error: "This player data conflicts with existing records.",
      });
    }
    // General error handling
    next(error);
  }
};

module.exports = AddPlayer;
