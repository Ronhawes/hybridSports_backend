const { PrismaClient } = require('@prisma/client');
const PDFDocument = require('pdfkit');  // Import PDFKit
const prisma = new PrismaClient();

const getPlayer = async (req, res, next) => {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }

    const user = await prisma.juniors.findUnique({
      where: { id: id },
    });

    if (!user) {
      return res.status(404).json({ message: "Player not found" });
    }

    // Generate a PDF document
    const doc = new PDFDocument();
    
    // Set headers for PDF response
    res.setHeader('Content-Disposition', `attachment; filename=player_${user.fullName}.pdf`);
    res.setHeader('Content-Type', 'application/pdf');

    // Pipe the PDF document to the response
    doc.pipe(res);

    // Add content to the PDF
    doc.fontSize(25).text('Player Details', { align: 'center' });
    
    doc.moveDown();  // Add some space
    doc.fontSize(16).text(`Full Name: ${user.fullName}`);
    doc.fontSize(16).text(`Age: ${user.age}`);
    doc.fontSize(16).text(`Partner: ${user.partner}`);
    doc.fontSize(16).text(`Coach/Academy: ${user.coach_Academy}`);
    doc.fontSize(16).text(`Phone Number: ${user.phoneNo}`);
    doc.fontSize(16).text(`Gender: ${user.gender}`);
    doc.fontSize(16).text(`ticketcard: ${user.id}`);

    // Finalize the PDF and end the response
    doc.end();
  } catch (error) {
    next(error);  // Pass the error to the next middleware
  }
};

module.exports = getPlayer;
