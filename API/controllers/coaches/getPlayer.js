const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getCoach = async (req, res, next) => {
  try {
    const { id } = req.query;

    // Validate the ID
    if (!id) {
      return res.status(400).json({ message: "ID is required." });
    }

    const parsedId = parseInt(id, 10);
    if (isNaN(parsedId)) {
      return res.status(400).json({ message: "ID must be a valid number." });
    }

    // Fetch the coach by ID
    const coach = await prisma.coaches.findUnique({
      where: { id: parsedId },
    });

    if (!coach) {
      return res.status(404).json({ message: "Coach not found." });
    }

    // Return the found coach
    return res.status(200).json(coach);
  } catch (error) {
    // Pass unexpected errors to the error-handling middleware
    next(error);
  }
};

module.exports = getCoach;
