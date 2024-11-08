const prisma = require("../../prisma");

const UpdatePlayer = async (req, res, next) => {
  try {
    const { id, fullName, email, idNo, phoneNo, gender, country, physicalCondition, price } = req.body;

    // Validate required fields
    if (!id || !fullName || !email || !idNo || !phoneNo || !gender || !country || !physicalCondition || !price) {
      return res.status(400).json({ 
        message: "ID, fullName, email, idNo, phoneNo, gender, country, physicalCondition, and price are required" 
      });
    }

    // Convert ID to string, if necessary
    const playerId = id.toString();

    // Attempt to update the player
    const updatedPlayer = await prisma.tickets.update({
      where: { id: playerId },
      data: {
        fullName, email, idNo, phoneNo, gender, country, physicalCondition, price
      },
    });

    return res.status(200).json({ 
      message: "Player updated successfully", 
      player: updatedPlayer 
    });

  } catch (error) {
    // Handle record not found error (P2025 is a Prisma-specific code)
    if (error.code === 'P2025') {
      return res.status(404).json({ message: "Player not found" });
    }
    
    // Handle any other errors
    return next(error);
  }
};

module.exports = UpdatePlayer;
