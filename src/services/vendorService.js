function transformVendor(data) {
  const { company, vendorName, country, bank, registrationNumber, taxId } = data;

  // Validación de campos requeridos
  if (!company || !vendorName || !country || !bank) {
    throw new Error("Missing required fields: company, vendorName, country, or bank");
  }

  const transformed = {
    vendorName,
    country,
    bank
  };

  const isInternational = country !== "US";

  // Mensaje genérico para todos los internacionales
  if (isInternational) {
    transformed.message = "This is an international bank";
    transformed.internationalBank = "Please confirm international bank details";

  }

  // Lógica específica por compañía
  if (company === "A") {
    if (isInternational) {
      transformed.internationalBank = "Please confirm international bank details";
    } else {
      // Lógica local igual a B local
      if (!registrationNumber || !taxId) {
        transformed.vendorStatus = "Incomplete - missing registration/tax details";
      } else {
        transformed.vendorStatus = "Verified";
      }
    }

  } else if (company === "B") {
    if (!isInternational) {
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
