function transformVendor(data) {
  const { company, vendorName, country, bank, registrationNumber, taxId } = data;

  if (!company || !vendorName || !country || !bank) {
    throw new Error("Missing required fields: company, vendorName, country, or bank");
  }

  const transformed = {
    vendorName,
    country,
    bank
  };

  if (company === "A") {
    if (country !== "US") {
      transformed.internationalBank = "Please confirm international bank details";
    }
  } else if (company === "B") {
    if (country === "US") {
      if (!registrationNumber || !taxId) {
        transformed.vendorStatus = "Incomplete - missing registration/tax details";
      } else {
        transformed.vendorStatus = "Verified";
      }
    }
  } else {
    throw new Error("Unsupported company identifier");
  }

  return transformed;
}

module.exports = { transformVendor };
