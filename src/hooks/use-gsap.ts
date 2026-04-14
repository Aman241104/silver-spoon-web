import { useLayoutEffect, useRef, DependencyList } from "react";
import gsap from "gsap";

export const useGSAP = (
  callback: (context: gsap.Context) => void,
  dependencies: DependencyList = []
) => {
  const containerRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(callback, containerRef);
    return () => ctx.revert();
  }, [callback, dependencies]);

  return containerRef;
};
