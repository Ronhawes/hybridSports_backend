const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllPlayers = async (req, res, next) => {
  try {
    // Fetch all players from the menSingles table
    const players = await prisma.menDoubles.findMany();

    // Check if no players are found
    if (players.length === 0) {
      return res.status(404).json({ message: "Players not found" });
    }

    // Prepare the response payload
    const payload = {
      data: players,
    };

    // Send the response with the players data
    return res.status(200).json(payload);
  } catch (error) {
    next(error);  // Pass the error to the next middleware
  }
};

module.exports = getAllPlayers;
