const prisma = require("../../prisma");

const AddPlayer = async (req, res, next) => {
  try {
    const { fullName, age, partner, coach_Academy, phoneNo, gender } = req.body;

    // Check if all required fields are provided
    if (!fullName || !age || !partner || !coach_Academy || !phoneNo || !gender) {
      return res.status(400).json({
        error: "All fields are required: fullName, age, partner, coach_Academy, phoneNo, and gender",
      });
    }

    // Validate phone number (example: Kenyan phone numbers)
    if (!/^\d{10}$/.test(phoneNo)) {
      return res.status(400).json({ error: "Invalid phone number. It should have 10 digits." });
    }

    // Validate age (example: reasonable age range for juniors)
    const ageNumber = Number(age);
    if (isNaN(ageNumber) || ageNumber < 5 || ageNumber > 18) {
      return res.status(400).json({ error: "Invalid age. It should be a number between 5 and 18." });
    }

    // Create the new juniors player record
    const player = await prisma.juniors.create({
      data: {
        fullName,
        age: ageNumber,  // Ensure the age is stored as a number
        partner,
        coach_Academy,
        phoneNo,
        gender,
      },
    });

    // Send success response
    return res.status(201).json({
      message: "Player was added successfully to juniors",
      player,
    });

  } catch (error) {
    // Handle Prisma-specific errors
    if (error.code === 'P2002') {
      return res.status(409).json({
        error: "This player data conflicts with existing records.",
      });
    }

    if (error.code === 'P2003') {
      return res.status(400).json({
        error: "Invalid foreign key constraint.",
      });
    }

    // General error handling
    next(error);
  }
};

module.exports = AddPlayer;
