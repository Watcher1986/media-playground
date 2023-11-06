export function isValidMediaUrl(url: string) {
  const regex =
    /\.(png|jpg|jpeg|gif|bmp|tiff|webp|mp4|avi|mov|mkv|flv|wmv|webm)$/i;

  return regex.test(url);
}
