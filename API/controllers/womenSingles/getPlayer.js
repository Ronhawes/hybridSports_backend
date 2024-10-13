const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getPlayer = async (req, res, next) => {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }

    // Fetch the player from the menSingles table
    const player = await prisma.womenSingles.findUnique({
      where: { id: parseInt(id) },  // Assuming id is an integer
    });

    if (!player) {
      return res.status(404).json({ message: "Player not found" });
    }

    return res.status(200).json(player);
  } catch (error) {
    next(error);  // Pass the error to the next middleware
  }
};

module.exports = getPlayer;
