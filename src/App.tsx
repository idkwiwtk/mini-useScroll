import { useRef } from "react";
import "./App.css";
import useScroll from "./hooks/useScroll";

function App() {
  const containerRef = useRef<HTMLElement | null>(null);
  const targetRef1 = useRef<HTMLDivElement | null>(null);
  const targetRef2 = useRef<HTMLDivElement | null>(null);

  const { scrollPosition, isVisibles } = useScroll({
    containerRef,
    targetRefs: [targetRef1, targetRef2],
  });

  console.log("target visible", isVisibles);

  return (
    <main className="relative">
      <section className="fixed top-0 right-0 p-5">
        <h1>position</h1>
        <p>
          <span>X: {scrollPosition.x}</span>
        </p>
        <p>
          <span>Y: {scrollPosition.y}</span>
        </p>
      </section>
      <section
        ref={containerRef}
        className="bg-red-100 flex justify-center items-center"
      >
        <div ref={targetRef1} className="text-center">
          <h1 className="text-4xl">fade up</h1>
          <p className="text-3xl">box 요소 페이드 업</p>
        </div>
        <div
          ref={targetRef2}
          className="w-1/2 h-1/2 flex justify-center items-center bg-blue-100"
        >
          box
        </div>
      </section>
      <section className="bg-red-200"></section>
      <section className="bg-red-300"></section>
      <section className="bg-red-400"></section>
      <section className="bg-red-500"></section>
    </main>
  );
}

export default App;
