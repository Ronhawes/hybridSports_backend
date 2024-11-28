const prisma = require("../../prisma");

const UpdateCredentials = async (req, res, next) => {
  try {
    const { id, username, password } = req.body;

    // Validate input
    if (!id || !username || !password) {
      return res.status(400).json({
        message: "ID, username, and password are required.",
      });
    }

    // Update username and password for the coach
    const updatedCoach = await prisma.coaches.update({
      where: { id: parseInt(id) }, // Ensure `id` is parsed as an integer
      data: {
        username,
        password,
      },
    });

    // Send success response
    return res.status(200).json({
      message: "Credentials updated successfully.",
      coach: updatedCoach,
    });
  } catch (error) {
    if (error.code === "P2025") {
      // Handle "Record not found" error
      return res.status(404).json({ message: "Coach not found." });
    }

    // Pass other errors to the error handler
    next(error);
  }
};

module.exports = UpdateCredentials;
