export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email.trim());
};


export const isValidPhone = (phone: string): boolean => {
  const phoneRegex =
    /^\+?\d{1,4}[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
  return phoneRegex.test(phone);
};

export const isValidWebsite = (url: string): boolean => {
  const urlRegex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/;
  return urlRegex.test(url.trim());
};

export const isValidUrl = (url: string): boolean => {
  const urlPattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-zA-Z0-9\\-\\._]+)\\.?)+[a-zA-Z]{2,}|localhost|' + // domain name
      '\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}|' + // OR ipv4
      '\\[?[a-fA-F0-9]*:[a-fA-F0-9:]+\\]?)' + // OR ipv6
      '(\\:\\d+)?(\\/[-a-zA-Z0-9@:%_\\+.~#?&//=]*)?$',
  );
  return urlPattern.test(url);
};
export const isValidPrice = (price: string): boolean => {
  const pricePattern = /^[0-9]+(\.[0-9]{1,2})?$/; // Matches numbers with optional two decimal places
  return pricePattern.test(price);
};
