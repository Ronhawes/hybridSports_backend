const prisma = require("../../prisma");

const DeletePlayer = async (req, res, next) => {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({
        error: "Player ID is required",
      });
    }

    // Delete the player from the menSingles table
    const player = await prisma.menDoubles.delete({
      where: {
        id: parseInt(id), // Assuming `id` is an integer
      },
    });

    return res.status(200).json({
      message: "Player deleted successfully from menSingles",
    });

  } catch (error) {
    // Handle errors such as invalid ID or player not found
    if (error.code === 'P2025') {
      return res.status(404).json({
        error: "Player not found",
      });
    }
    next(error);
  }
};

module.exports = DeletePlayer;
