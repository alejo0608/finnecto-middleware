function transformInvoice(data) {
  const { company, invoiceId, invoiceDate, lines } = data;

  if (!company || !invoiceId || !invoiceDate || !lines || !Array.isArray(lines)) {
    throw new Error("Missing required fields: company, invoiceId, invoiceDate, or lines");
  }

  const lowercasedDescriptions = lines.map(line => line.description?.toLowerCase() || "");

  let account;

  if (company === "A") {
    const hasAlcohol = lowercasedDescriptions.some(desc => desc.includes("alcohol"));
    account = hasAlcohol ? "ALC-001" : "STD-001";
  } else if (company === "B") {
    const hasAlcohol = lowercasedDescriptions.some(desc => desc.includes("alcohol"));
    const hasTobacco = lowercasedDescriptions.some(desc => desc.includes("tobacco"));

    if (hasAlcohol && hasTobacco) {
      account = "MULTI-B";
    } else if (hasAlcohol) {
      account = "ALC-B";
    } else if (hasTobacco) {
      account = "TOB-B";
    } else {
      account = "STD-B";
    }
  } else {
    throw new Error("Unsupported company identifier");
  }

  return {
    invoiceId,
    invoiceDate,
    account,
    lines
  };
}

module.exports = { transformInvoice };
