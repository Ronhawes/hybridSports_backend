const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllCoaches = async (req, res, next) => {
  try {
    const coaches = await prisma.coaches.findMany();

    // Handle case where no coaches are found
    if (coaches.length === 0) {
      return res.status(404).json({
        message: "No coaches found.",
      });
    }

    // Return the list of coaches
    return res.status(200).json(coaches);
  } catch (error) {
    // Handle unexpected errors
    return next(error);
  }
};

module.exports = getAllCoaches;
