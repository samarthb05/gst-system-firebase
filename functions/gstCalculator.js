const GST_RATE = 18;

module.exports.calculateGST = (totalAmount) => {
  const gstAmount = (totalAmount * GST_RATE) / 100;
  const igst = gstAmount / 2;
  const sgst = gstAmount / 2;
  const cgst = gstAmount / 2;

  return { gstAmount, igst, sgst, cgst };
};
