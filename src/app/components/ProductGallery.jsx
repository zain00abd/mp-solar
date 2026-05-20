'use client';

import React, { useState, useCallback, useRef, useEffect, useLayoutEffect } from 'react';

const DEFAULT_FRAME_HEIGHT = 300;
const MAX_IMG_HEIGHT = 420;

function listKey(images) {
  return images.join('\u0000');
}

export default function ProductGallery({ images = [], alt = '' }) {
  const list = images.length > 0 ? images : ['/Solar Energy.jpg'];
  const [index, setIndex] = useState(0);
  const viewportRef = useRef(null);
  const imgRefs = useRef({});
  const [frameHeight, setFrameHeight] = useState(DEFAULT_FRAME_HEIGHT);
  const [loadedSrc, setLoadedSrc] = useState(() => new Set());

  const markLoaded = useCallback((src) => {
    setLoadedSrc((prev) => {
      if (prev.has(src)) return prev;
      const next = new Set(prev);
      next.add(src);
      return next;
    });
  }, []);

  const checkImgLoaded = useCallback(
    (el, src) => {
      if (el?.complete && el.naturalWidth > 0) {
        markLoaded(src);
      }
    },
    [markLoaded]
  );

  const measureSrc = useCallback((src) => {
    const containerWidth = viewportRef.current?.clientWidth || 320;
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const { naturalWidth: nw, naturalHeight: nh } = img;
        if (!nw || !nh) {
          resolve(DEFAULT_FRAME_HEIGHT);
          return;
        }
        let h = (containerWidth * nh) / nw;
        if (h > MAX_IMG_HEIGHT) h = MAX_IMG_HEIGHT;
        resolve(Math.ceil(h));
      };
      img.onerror = () => resolve(DEFAULT_FRAME_HEIGHT);
      img.src = src;
    });
  }, []);

  const updateFrameHeight = useCallback(async () => {
    const heights = await Promise.all(list.map(measureSrc));
    const max = Math.max(DEFAULT_FRAME_HEIGHT, ...heights);
    setFrameHeight(max);
  }, [list, measureSrc]);

  useEffect(() => {
    setIndex(0);
  }, [listKey(list)]);

  useEffect(() => {
    updateFrameHeight();
    const el = viewportRef.current;
    if (!el) return undefined;
    const ro = new ResizeObserver(() => updateFrameHeight());
    ro.observe(el);
    return () => ro.disconnect();
  }, [updateFrameHeight]);

  useEffect(() => {
    let cancelled = false;
    list.forEach((src) => {
      const img = new Image();
      img.onload = () => {
        if (!cancelled) markLoaded(src);
      };
      img.onerror = () => {
        if (!cancelled) markLoaded(src);
      };
      img.src = src;
    });
    return () => {
      cancelled = true;
    };
  }, [list, markLoaded]);

  useLayoutEffect(() => {
    list.forEach((src) => {
      checkImgLoaded(imgRefs.current[src], src);
    });
  }, [index, list, checkImgLoaded, loadedSrc]);

  const go = useCallback(
    (delta) => {
      setIndex((i) => (i + delta + list.length) % list.length);
    },
    [list.length]
  );

  const activeSrc = list[index];
  const activeLoaded = loadedSrc.has(activeSrc);

  return (
    <div className="pd-gallery">
      <div
        className="pd-gallery-viewport"
        ref={viewportRef}
        style={{ minHeight: frameHeight }}
      >
        {list.length > 1 && (
          <button
            type="button"
            className="pd-gallery-arrow pd-gallery-arrow--prev"
            onClick={() => go(-1)}
            aria-label="Previous image"
          >
            ‹
          </button>
        )}

        <div className="pd-gallery-stage" style={{ minHeight: frameHeight }}>
          {!activeLoaded && <div className="pd-gallery-placeholder" aria-hidden="true" />}
          {list.map((src, i) => (
            <a
              key={`${src}-${i}`}
              href={src}
              className={`pd-gallery-slide${i === index ? ' is-active' : ''}`}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={i === index ? 0 : -1}
              aria-hidden={i !== index}
            >
              <img
                ref={(el) => {
                  imgRefs.current[src] = el;
                  checkImgLoaded(el, src);
                }}
                src={src}
                alt={i === index ? alt : ''}
                className="pd-gallery-main-img"
                loading="eager"
                decoding="async"
                fetchPriority={i === 0 ? 'high' : 'auto'}
                onLoad={() => markLoaded(src)}
                onError={() => markLoaded(src)}
              />
            </a>
          ))}
        </div>

        {list.length > 1 && (
          <button
            type="button"
            className="pd-gallery-arrow pd-gallery-arrow--next"
            onClick={() => go(1)}
            aria-label="Next image"
          >
            ›
          </button>
        )}
      </div>
      {list.length > 1 && (
        <ul className="pd-gallery-dots" role="tablist" aria-label="Product images">
          {list.map((_, i) => (
            <li key={i} role="presentation">
              <button
                type="button"
                role="tab"
                className={i === index ? 'is-active' : ''}
                aria-selected={i === index}
                aria-label={`Image ${i + 1} of ${list.length}`}
                onClick={() => setIndex(i)}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
