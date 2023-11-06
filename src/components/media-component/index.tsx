import { memo } from 'react';

import closeIcon from '../../assets/close_icon.png';

interface MediaProps {
  url: string;
  mediaType: string;
  setMedia: React.Dispatch<React.SetStateAction<Media[]>>;
  handleModal: (url: string) => void;
  mediaContainerRef: React.RefObject<HTMLDivElement>;
  meta: {
    title: string;
    width: number;
    height: number;
    xCoor: number;
    yCoor: number;
  };
}

const Media = ({
  url,
  mediaContainerRef,
  mediaType,
  setMedia,
  meta,
  handleModal,
}: MediaProps) => {
  return (
    <div
      id={url}
      key={url}
      className='media_item-wrapper'
      draggable='true'
      onDragStart={(e) => {
        e.dataTransfer.setData('text/plain', e.currentTarget.id);
      }}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        const draggable = e.currentTarget;
        const draggedElementId = e.dataTransfer.getData('text/plain');
        const draggedElement: HTMLElement | null =
          document.getElementById(draggedElementId);

        if (draggedElement !== draggable) {
          mediaContainerRef.current!.insertBefore(draggedElement!, draggable);
        }
      }}
    >
      {mediaType === 'video' && (
        <video
          id={url}
          className='media'
          src={url}
          controls
          onLoadedData={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            setMedia((prev) => {
              const newMedia = [...prev];
              const mediaIdx = newMedia.findIndex((m) => m.url === url);
              newMedia[mediaIdx].meta.width = +rect.width.toFixed(2);
              newMedia[mediaIdx].meta.height = +rect.height.toFixed(2);
              newMedia[mediaIdx].meta.xCoor = +rect.x.toFixed(2);
              newMedia[mediaIdx].meta.yCoor = +rect.y.toFixed(2);
              return newMedia;
            });
          }}
        />
      )}
      {mediaType === 'image' && (
        <img
          id={url}
          className='media'
          loading='lazy'
          src={url}
          alt='your image'
          onLoad={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            setMedia((prev) => {
              const newMedia = [...prev];
              const mediaIdx = newMedia.findIndex((m) => m.url === url);
              newMedia[mediaIdx].meta.width = +rect.width.toFixed(2);
              newMedia[mediaIdx].meta.height = +rect.height.toFixed(2);
              newMedia[mediaIdx].meta.xCoor = +rect.x.toFixed(2);
              newMedia[mediaIdx].meta.yCoor = +rect.y.toFixed(2);
              return newMedia;
            });
          }}
        />
      )}
      <img
        loading='lazy'
        className='close-icon'
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleModal(url);
        }}
        onClick={() => handleModal(url)}
        src={closeIcon}
        width={5}
        height={5}
        alt='close icon'
      />
      <span className='media-title'>{meta.title}</span>
    </div>
  );
};

export const MediaComponent = memo(Media);
