const prisma = require("../../prisma");

const GetUserDetails = async (req, res, next) => {
  try {
    const { email, password } = req.body; // Retrieve email and password from the request body

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required.",
      });
    }

    // Fetch the user details based on email and password
    const user = await prisma.coaches.findFirst({
      where: {
        email: email,
        password: password, // Match both email and password
      },
      select: {
        name: true,
        title: true,
        sport: true,
        academy: true,
        bio: true,
        email: true,
        phoneno: true,
        profile_picture: true,
        working_hours: true,
        levels: true,
        groups: true,
        schedule: true,
        username: true,
      },
    });

    // Handle user not found
    if (!user) {
      return res.status(404).json({
        message: "User not found or invalid credentials.",
      });
    }

    // Return the user details
    return res.status(200).json({
      message: "User details retrieved successfully.",
      data: user,
    });
  } catch (error) {
    // Handle errors
    console.error("Error retrieving user details:", error);
    next(error);
  }
};

module.exports = GetUserDetails;
