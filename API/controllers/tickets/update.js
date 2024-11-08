const prisma = require("../../prisma");

const UpdatePlayer = async (req, res, next) => {
  try {
    const { id, fullName, email, idNo, phoneNo, time,coach , day} = req.body;

    // Validate required fields
    if (!id || !fullName|| !email || !idNo|| !phoneNo || !time|| !coach || !day) {
      return res.status(400).json({ 
        message: "ID, fullnames, email, institution, phoneNo, and gender are required" 
      });
    }

    // Convert ID to string
    const playerId = id.toString();

    // Attempt to update the player
    const updatedPlayer = await prisma.tickets.update({
      where: { id: playerId },
      data: {
        fullName, email, idNo, phoneNo, time, coach, day
      },
    });

    return res.status(200).json({ 
      message: "Player updated successfully", 
      users: updatedPlayer 
    });

  } catch (error) {
    if (error.code === 'P2025') { // Record not found
      return res.status(404).json({ message: "Player not found" });
    }
    next(error);
  }
};

module.exports = UpdatePlayer;
