const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getPlayer = async (req, res, next) => {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }

    const user = await prisma.user.findUnique({
      where: { id: id },  // Use id as a string
    });

    if (!user) {
      return res.status(404).json({ message: "Player not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    next(error);  // Pass the error to the next middleware
  }
};

module.exports = getPlayer;
