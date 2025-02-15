export const dataURLToBlob = (dataURL: string): Blob => {
  // Split the data URL into header and base64 parts
  const [header, base64] = dataURL.split(',');

  // Debug logging to check header and base64 values
  console.log('Full Data URL:', dataURL);
  console.log('Header:', header);
  console.log('Base64 Data (first 50 chars):', base64?.substring(0, 50)); // Log a portion of the base64 data

  // Check if header and base64 parts are valid
  if (!header || !base64) {
    throw new Error('Invalid data URL format: Missing header or base64 data');
  }

  // Extract MIME type using regex
  const mimeMatch = header.match(/^data:(.*?)(;base64)?$/);

  // Debug logging to check MIME match
  console.log('MIME Match:', mimeMatch);

  // Ensure that the MIME type is correctly matched
  if (!mimeMatch || mimeMatch.length < 2) {
    throw new Error('Unable to extract MIME type from data URL');
  }

  const mime = mimeMatch[1];
  const byteString = atob(base64);
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const uint8Array = new Uint8Array(arrayBuffer);

  for (let i = 0; i < byteString.length; i++) {
    uint8Array[i] = byteString.charCodeAt(i);
  }

  return new Blob([arrayBuffer], {type: mime});
};

export const blobToFile = (blob: Blob, filename: string): File => {
  return new File([blob], filename, {type: blob.type});
};
