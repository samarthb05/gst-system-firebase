const functions = require("firebase-functions/v1");
const admin = require("firebase-admin");
const { calculateGST } = require("./gstCalculator");
const { fileGST } = require("./gstApiClient");

admin.initializeApp();

exports.generateGSTInvoice = functions.firestore
  .document("bookings/{bookingId}")
  .onUpdate(async (change, context) => {
    const beforeData = change.before.data();
    const afterData = change.after.data();

    if (beforeData.status !== "finished" && afterData.status === "finished") {
      const { name, totalBookingAmount } = afterData;

      const gstDetails = calculateGST(totalBookingAmount);

      const gstResponse = await fileGST({
        name,
        totalBookingAmount,
        ...gstDetails,
      });

      await change.after.ref.update({
        gstDetails,
        gstApiResponse: gstResponse,
      });

      console.log("GST Invoice:", gstResponse);
    }
  });
