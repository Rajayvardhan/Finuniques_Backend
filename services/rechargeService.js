const axios = require("axios");
const crypto = require("crypto");

exports.validateRecharge = async (data) => {
  try {
    // Generate checksum
    const key = "abcd@123"; // HMAC key
    const checksum = crypto
      .createHmac("sha256", key)
      .update(JSON.stringify(data))
      .digest("base64");

    // Headers
    const headers = {
      "X-MClient": "14",
      "Content-Type": "application/json",
      checkSum: checksum,
    };

    // API URL
    const apiUrl = "https://alpha3.mobikwik.comz/recharge/v1/retailerValidation";

    // API call using Axios
    const response = await axios.post(apiUrl, data, { headers });

    // Return API response
    return response.data;
  } catch (error) {
    console.error("Error in validateRecharge service:", error);
    throw new Error("Validation API call failed");
  }
};
