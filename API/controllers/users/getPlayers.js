const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllPlayers = async (req, res, next) => {
  try {
    const users = await prisma.user.findMany();
    if (users.length === 0) {
        throw{
            custom: true,
            message: "Players not found"
    }
}
    return res.status(200).json(users);
  } catch (error) {
    next()
  }
};

module.exports = getAllPlayers;
