const prisma = require("../../prisma");

const UpdatePlayer = async (req, res, next) => {
  try {
    const { id, email,password_hash,fullnames, username, gender } = req.body;

    if (!email||!password_hash||!fullnames|| !username || !gender){
      throw {
        custom: true,
        message: "ID, fullnames, gender, and username are required",
      };
    }

    const updatedPlayer = await prisma.user.update({
      where: { id: parseInt(id) },
      data: {
        email,
        password_hash,
        fullnames,
        username,
        gender,
      },
    });

    return res.status(200).json({ message: "Player updated successfully", user: updatedPlayer });

  } catch (error) {
    next(error);
  }
};

module.exports = UpdatePlayer;
