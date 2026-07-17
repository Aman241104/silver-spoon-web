"use client";

import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ZoomOut } from "lucide-react";
import { clampZoomScale, clampPan } from "@/lib/zoomMath";

interface Props {
  src: string;
  alt: string;
  open: boolean;
  onClose: () => void;
}

const MIN_SCALE = 1;
const MAX_SCALE = 4;

export default function ImageZoomModal({ src, alt, open, onClose }: Props) {
  const [scale, setScale] = React.useState(1);
  const [pan, setPan] = React.useState({ x: 0, y: 0 });
  const frameRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    setScale(1);
    setPan({ x: 0, y: 0 });
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  function bounds() {
    const rect = frameRef.current?.getBoundingClientRect();
    return { width: rect?.width ?? 0, height: rect?.height ?? 0 };
  }

  function handleWheel(e: React.WheelEvent) {
    e.preventDefault();
    const next = clampZoomScale(scale - e.deltaY * 0.002, MIN_SCALE, MAX_SCALE);
    setScale(next);
    setPan((p) => clampPan(p, next, bounds()));
  }

  function zoomBy(delta: number) {
    const next = clampZoomScale(scale + delta, MIN_SCALE, MAX_SCALE);
    setScale(next);
    setPan((p) => clampPan(p, next, bounds()));
  }

  const dragActive = scale > 1;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-10"
            aria-label="Close zoom"
          >
            <X size={28} strokeWidth={1.5} />
          </button>

          <div className="absolute bottom-6 flex items-center gap-4 z-10" onClick={(e) => e.stopPropagation()}>
            <button type="button" onClick={() => zoomBy(-0.5)} className="text-white/70 hover:text-white transition-colors" aria-label="Zoom out">
              <ZoomOut size={22} strokeWidth={1.5} />
            </button>
            <span className="text-white/50 text-xs uppercase tracking-widest font-bold w-12 text-center">
              {Math.round(scale * 100)}%
            </span>
            <button type="button" onClick={() => zoomBy(0.5)} className="text-white/70 hover:text-white transition-colors" aria-label="Zoom in">
              <ZoomIn size={22} strokeWidth={1.5} />
            </button>
          </div>

          <div
            ref={frameRef}
            className="relative w-full h-full max-w-4xl max-h-[85vh] mx-6"
            onWheel={handleWheel}
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              className="w-full h-full"
              style={{ cursor: dragActive ? "grab" : "default" }}
              animate={{ x: pan.x, y: pan.y, scale }}
              drag={dragActive}
              dragElastic={0}
              dragMomentum={false}
              onDrag={(_, info) => {
                setPan((p) => clampPan({ x: p.x + info.delta.x, y: p.y + info.delta.y }, scale, bounds()));
              }}
              transition={{ type: "tween", duration: 0.15 }}
            >
              <Image src={src} alt={alt} fill className="object-contain" sizes="90vw" />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
