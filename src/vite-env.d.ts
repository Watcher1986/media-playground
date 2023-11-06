/// <reference types="vite/client" />

interface Media {
  url: string;
  mediaType: string;
  meta: {
    title: string;
    xCoor: number;
    yCoor: number;
    width: number;
    height: number;
  };
}
