// enrollmentController.js
exports.enrollWithPayment = async (req, res) => {
  const { userId, courseId, timeSlot, transactionCode } = req.body;

  if (!transactionCode) {
    return res.status(400).json({ message: "Transaction code is required" });
  }

  // Save enrollment with payment code
  const enrollment = new Enrollment({
    userId,
    courseId,
    timeSlot,
    payment: {
      method: "M-PESA Pochi",
      transactionCode,
      amount: 500 // Example
    }
  });

  await enrollment.save();
  res.json({ message: "Enrollment pending verification", enrollment });
};
