const videoExtensions = new Set([
  'mp4',
  'avi',
  'mov',
  'mkv',
  'flv',
  'wmv',
  'webm',
]);
const imageExtensions = new Set([
  'png',
  'jpg',
  'jpeg',
  'gif',
  'bmp',
  'tiff',
  'webp',
]);

export function getMediaType(url: string) {
  const fileExtension = url.split('.').pop()?.toLowerCase();

  if (videoExtensions.has(fileExtension!)) {
    return 'video';
  } else if (imageExtensions.has(fileExtension!)) {
    return 'image';
  } else {
    return 'unknown';
  }
}
