const rechargeService = require("../services/rechargeService");

exports.rechargepayment = async (req, res) => {
  try {
    // Request body destructuring
    const {
      
      amt,
      cir,
      cn,
      op,
    } = req.body;

    // Check if all fields are provided
    if (
      
      !amt ||
      !cir ||
      !cn ||
      !op 
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Call service function
    const response = await rechargeService.validateRecharge({
      uid,
      password,
      amt,
      cir,
      cn,
      op,
      agentCode,
      initiatingChannel,
      terminalId,
      geocode,
      postalCode,
      agentMobile,
    });

    // Send response back to client
    res.status(200).json(response);
  } catch (error) {
    console.error("Error in rechargePayment controller:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
