const axios = require("axios");
require("dotenv").config();

module.exports.fileGST = async (invoiceDetails) => {
  const { name, totalBookingAmount, gstAmount, igst, sgst, cgst } =
    invoiceDetails;

  const payload = {
    customerName: name,
    totalAmount: totalBookingAmount,
    gstAmount,
    igst,
    sgst,
    cgst,
  };

  try {
    const response = await axios.post(process.env.GST_API_URL, payload, {
      headers: {
        Authorization: `Bearer ${process.env.GST_API_KEY}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};
