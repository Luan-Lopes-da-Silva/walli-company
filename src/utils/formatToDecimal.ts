export const formatToCustomDecimal = (value: string) => {
    const cleanValue = value.replace(/[^\d]/g, "");
    if (!cleanValue) return "";
    const numericValue = parseFloat(cleanValue) / 100;
    const formattedValue = numericValue
      .toFixed(2)
      .replace(".", ",")
      .replace(/\B(?=(\d{3})+(?!\d))/g, "."); 
  
    return formattedValue;
  };