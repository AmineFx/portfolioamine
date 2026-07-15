import { useInView, animate } from "motion/react";
import { useEffect, useRef, useState } from "react";

const Counter = ({ from, to, text }) => {
  const [count, setCount] = useState(from);
  const ref = useRef(null);

  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    console.log(`[Counter "${text}"] effect ran, isInView =`, isInView);

    if (!isInView) return;

    console.log(`[Counter "${text}"] starting animation from ${from} to ${to}`);

    const controls = animate(from, to, {
      duration: 4,
      ease: "easeOut",
      onUpdate: (latest) => {
        setCount(Math.floor(latest));
      },
    });

    return () => {
      console.log(`[Counter "${text}"] cleanup — stopping animation`);
      controls.stop();
    };
  }, [isInView, from, to]);

  return (
    <div className="counter" ref={ref}>
      <h1>{count}+</h1>
      <p>{text}</p>
    </div>
  );
};

export default Counter;