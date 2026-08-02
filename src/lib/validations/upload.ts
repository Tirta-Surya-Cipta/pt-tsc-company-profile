/**
 * Image Magic Bytes Validator
 * Verifies that the buffer header actually matches valid JPEG, PNG, or WEBP image signatures.
 */
export function isValidImageMagicBytes(buffer: Buffer): boolean {
  if (buffer.length < 12) return false;

  // JPEG: FF D8 FF
  const isJpeg = buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff;

  // PNG: 89 50 4E 47
  const isPng =
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47;

  // WEBP: Starts with RIFF (bytes 0-3) and contains WEBP (bytes 8-11)
  const isWebp =
    buffer[0] === 0x52 &&
    buffer[1] === 0x49 &&
    buffer[2] === 0x46 &&
    buffer[3] === 0x46 &&
    buffer[8] === 0x57 &&
    buffer[9] === 0x45 &&
    buffer[10] === 0x42 &&
    buffer[11] === 0x50;

  return isJpeg || isPng || isWebp;
}
