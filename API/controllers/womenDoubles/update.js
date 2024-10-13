const prisma = require("../../prisma");

const UpdatePlayer = async (req, res, next) => {
  try {
    const { id, name, age, points, rank } = req.body;

    // Ensure all required fields are provided
    if (!id || !name || !age || points === undefined || rank === undefined) {
      return res.status(400).json({
        error: "ID, name, age, points, and rank are required",
      });
    }

    // Check if the player exists
    const existingPlayer = await prisma.womenDoubles.findUnique({
      where: { id: parseInt(id) },  // Assuming id is an integer
    });

    if (!existingPlayer) {
      return res.status(404).json({ error: "Player not found" });
    }

    // Update player details in the menSingles table
    const updatedPlayer = await prisma.menSingles.update({
      where: { id: parseInt(id) },  // Ensure id is parsed as an integer
      data: {
        name,
        age,
        points,
        rank,
      },
    });

    return res.status(200).json({
      message: "Player updated successfully",
      player: updatedPlayer,
    });
  } catch (error) {
    next(error);  // Pass the error to the next middleware
  }
};

module.exports = UpdatePlayer;
