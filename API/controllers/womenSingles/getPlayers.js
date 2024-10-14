const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllPlayers = async (req, res, next) => {
  try {
    // Fetch all players from the menSingles table
    const players = await prisma.womenSingles.findMany();

    // Prepare the response payload with metadata
    const payload = {
      total: players.length, // Include total count of players
      data: players,
    };

    // Send the response with the players data
    return res.status(200).json(payload);
  } catch (error) {
    // Log the error (optional)
    console.error("Error fetching players:", error);
    // Pass the error to the next middleware
    next(error);
  }
};

module.exports = getAllPlayers;
