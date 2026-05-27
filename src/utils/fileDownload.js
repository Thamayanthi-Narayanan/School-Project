export const getFileNameFromContentDisposition = (header) => {
  if (!header || typeof header !== 'string') return null;

  const utf8Match = /filename\*=UTF-8''([^;]+)/i.exec(header);
  if (utf8Match?.[1]) {
    try {
      return decodeURIComponent(utf8Match[1].trim());
    } catch {
      return utf8Match[1].trim();
    }
  }

  const quotedMatch = /filename="([^"]+)"/i.exec(header);
  if (quotedMatch?.[1]) return quotedMatch[1].trim();

  const plainMatch = /filename=([^;\s]+)/i.exec(header);
  if (plainMatch?.[1]) return plainMatch[1].trim().replace(/"/g, '');

  return null;
};

export const downloadBlobAsFile = (blob, fileName) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  link.rel = 'noopener';
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
};

export const parseBlobErrorResponse = async (error) => {
  const data = error?.response?.data;
  if (!(data instanceof Blob)) return null;

  try {
    const text = await data.text();
    if (!text) return null;
    return JSON.parse(text);
  } catch {
    return null;
  }
};
