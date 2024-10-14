const prisma = require("../../prisma");

const AddPlayer = async (req, res, next) => {
  try {
    const { email, fullnames, gender, institution, phoneNo } = req.body;

    // Check for missing required fields
    if (!email || !institution || !fullnames || !phoneNo || !gender) {
      return res.status(400).json({
        message: "All fields are required: fullnames, email, phoneNo, institution, and gender",
      });
    }

    // Additional validation for email format or phone number could be added here
    // Example: Simple email format check
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format." });
    }

    // Create the player
    const user = await prisma.users.create({
      data: {
        email,
        fullnames,
        institution,
        gender,
        phoneNo,
      },
    });

    return res.status(201).json({ message: "Player was added successfully", user });

  } catch (error) {
    // Handle Prisma unique constraint violation
    if (error.code === "P2002" && error.meta && error.meta.target.includes("email")) {
      return res.status(409).json({ message: "Email already exists." });
    }

    // Pass other errors to the error handler middleware
    next(error);
  }
};

module.exports = AddPlayer;
