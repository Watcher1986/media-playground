import { useState, useRef, useEffect, useCallback } from 'react';

import { getMediaType } from './utils/getMediaType';
import { isValidMediaUrl } from './utils/urlValidation';

import { MetricsTable } from './components/metrics-table';
import { ModalComponent } from './components/modal';
import { MediaComponent } from './components/media-component';

import './App.css';

function App() {
  const [media, setMedia] = useState<Media[]>([]);
  const [play, setPlay] = useState<string>('Play');
  const [modal, setModal] = useState<{ open: boolean; url: string }>({
    open: false,
    url: '',
  });

  const urlRef = useRef<HTMLInputElement>(null);
  const mediaContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      const { target, contentRect } = entries[0];

      setMedia((prev) => {
        const newMedia = [...prev];
        const mediaIdx = newMedia.findIndex((m) => m.url === target.id);
        newMedia[mediaIdx].meta.width = +contentRect.width.toFixed(2);
        newMedia[mediaIdx].meta.height = +contentRect.height.toFixed(2);
        return newMedia;
      });
    });

    const mediaNodesList = document.querySelectorAll('.media');
    mediaNodesList.forEach((m) => resizeObserver.observe(m));

    return () => {
      resizeObserver.disconnect();
    };
  }, [media.length]);

  const getMedia = useCallback(() => {
    const newUrl = urlRef.current?.value;
    const isValid = isValidMediaUrl(newUrl!);
    if (!newUrl || !isValid) return;

    const isMediaExist = media?.some(({ url }) => url === newUrl);
    if (isMediaExist) return;

    const mediaType = getMediaType(newUrl);
    const mediaCount = media.filter((m) => m.mediaType === mediaType);
    setMedia((prev) => [
      ...prev,
      {
        url: newUrl,
        mediaType,
        meta: {
          title: `${mediaType}-${
            !mediaCount?.length ? 1 : mediaCount.length + 1
          }`,
          xCoor: 0,
          yCoor: 0,
          width: 0,
          height: 0,
        },
      },
    ]);

    urlRef.current.value = '';
  }, [media]);

  const handleModal = useCallback((url: string) => {
    setModal((prev) => ({
      url: url ?? prev.url,
      open: !prev.open,
    }));
  }, []);

  const removeMedia = useCallback(() => {
    setMedia((prev) => prev.filter((m) => m.url !== modal.url));
    handleModal('');
  }, [modal, handleModal]);

  const playAllVideo = useCallback(() => {
    const videoNodes = document.querySelectorAll('video');
    if (play === 'Play') {
      setPlay('Pause');
      videoNodes.forEach((v) => v.play());
      return;
    }
    setPlay('Play');
    videoNodes.forEach((v) => v.pause());
  }, [play]);

  return (
    <div className='page-container'>
      {modal.open && (
        <ModalComponent
          title='Remove media content?'
          bodyText='Once you remove this media you will need to refetch it again'
          onCancel={() => handleModal('')}
          onConfirm={removeMedia}
        />
      )}
      <div className='controls-panel'>
        <input ref={urlRef} type='url' placeholder='paste your url here' />
        <button onClick={getMedia}>Get your media</button>
        <button onClick={playAllVideo}>{`${play} all`}</button>
      </div>
      <div className='views-metrics'>
        <MetricsTable media={media} />
      </div>
      <div
        ref={mediaContainerRef}
        className='media-container'
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDrop={(e) => {
          const dropContainer = mediaContainerRef.current!;
          const draggedElementId = e.dataTransfer.getData('text/plain');
          const draggedElement = document.getElementById(draggedElementId)!;

          const rect = dropContainer.getBoundingClientRect();
          const mouseX = e.clientX - rect.left;
          const mouseY = e.clientY - rect.top;

          setMedia((prev) => {
            const newMedia = [...prev];
            const mediaIdx = newMedia.findIndex(
              (m) => m.url === draggedElementId
            );

            newMedia[mediaIdx].meta.xCoor = +mouseX.toFixed(2);
            newMedia[mediaIdx].meta.yCoor = +mouseY.toFixed(2);
            return newMedia;
          });

          draggedElement.style.left = mouseX + 'px';
          draggedElement.style.top = mouseY + 'px';

          dropContainer.appendChild(draggedElement);
        }}
      >
        {!!media.length &&
          media?.map(({ url, mediaType, meta }) => (
            <MediaComponent
              setMedia={setMedia}
              key={url}
              mediaType={mediaType}
              url={url}
              meta={meta}
              handleModal={handleModal}
              mediaContainerRef={mediaContainerRef}
            />
          ))}
      </div>
    </div>
  );
}

export default App;
