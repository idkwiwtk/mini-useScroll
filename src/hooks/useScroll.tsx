import { useEffect, useState, useMemo } from "react";
import type { RefObject } from "react";

interface useScrollProps {
  containerRef: RefObject<HTMLElement | null>;
  targetRefs: Array<RefObject<HTMLElement | null>>;
}

const useScroll = (props: useScrollProps) => {
  const { targetRefs } = props;

  const [scrollPosition, setScrollPosition] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });

  const isVisible = (_targetRef: RefObject<HTMLElement | null>) => {
    const rect = _targetRef.current?.getBoundingClientRect();

    if (!rect) {
      return false;
    }

    if (rect.bottom < 0) {
      return false;
    }

    return rect.top < window.innerHeight;
  };

  const isVisibles = useMemo(() => {
    if (!targetRefs) {
      return [];
    }

    return targetRefs.map((v) => isVisible(v));
  }, [targetRefs]);

  const handleScroll = () => {
    // current scroll position
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;

    setScrollPosition({ x: scrollX, y: scrollY });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return {
    scrollPosition,
    isVisibles,
  };
};

export default useScroll;
