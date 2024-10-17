const prisma = require("../../prisma");

const UpdatePlayer = async (req, res, next) => {
  try {
    const { id, fullName, age, partner, coach_Academy, phoneNo, gender } = req.body;

    // Validate required fields
    if (!id || !fullName || !age || !partner || !coach_Academy || !phoneNo || !gender) {
      return res.status(400).json({
        error: "ID, fullName, age, partner, coach_Academy, phoneNo, and gender are required."
      });
    }

    // Ensure the ID is a valid integer
    const playerId = parseInt(id);
    if (isNaN(playerId)) {
      return res.status(400).json({ error: "Invalid Player ID" });
    }

    // Update player information
    const updatedPlayer = await prisma.juniors.update({
      where: { id: playerId },
      data: { fullName, age, partner, coach_Academy, phoneNo, gender }
    });

    return res.status(200).json({
      message: "Player updated successfully",
      player: updatedPlayer,
    });

  } catch (error) {
    if (error.code === 'P2025') { // Prisma-specific error for record not found
      return res.status(404).json({ error: "Player not found" });
    }
    next(error); // Pass to error-handling middleware
  }
};

module.exports = UpdatePlayer;
