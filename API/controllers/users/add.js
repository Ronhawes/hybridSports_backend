const prisma = require("../../prisma");

const AddPlayer = async (req, res, next) => {
  try {
    const { email,password_hash,fullnames, username, gender } = req.body;

    if (!email||!password_hash||!fullnames|| !username || !gender) {
      throw {
        custom: true,
        message: "All fields are required: fullnames, password, username, and gender",
      };
    }

    const user = await prisma.users.create({
      data: {
        email,
        password_hash,
        fullnames,
        username,
        gender,
   
      },
    });

    return res.status(201).json({ message: "Player was added successfully", user });
  } catch (error) {
    next(error);
  }
};

module.exports = AddPlayer;
