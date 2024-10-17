const prisma = require("../../prisma");

const DeletePlayer = async (req, res, next) => {
  try {
    const { id } = req.query;

    // Check if ID is provided
    if (!id) {
      return res.status(400).json({ error: "Player ID is required" });
    }

    // Ensure the ID is a valid integer
    const playerId = parseInt(id);
    if (isNaN(playerId)) {
      return res.status(400).json({ error: "Invalid Player ID" });
    }

    // Delete the player
    const player = await prisma.juniors.delete({
      where: {
        id: playerId,
      },
    });

    return res.status(200).json({ message: "Player deleted successfully", player });

  } catch (error) {
    if (error.code === 'P2025') { // Prisma-specific error for "Record to delete does not exist"
      return res.status(404).json({ error: "Player not found" });
    }
    next(error); // Pass to the error-handling middleware
  }
};

module.exports = DeletePlayer;
