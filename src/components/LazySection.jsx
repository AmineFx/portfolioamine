// src/components/LazySection.jsx
import { useRef } from "react";
import { useInView } from "motion/react";

const LazySection = ({ children, height = "100vh", offset = "-100px" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true, // une fois chargé, reste chargé (comportement classique du lazy-load)
    margin: `0px 0px ${offset} 0px`, // équivalent de l'offset de react-lazyload
  });

  return (
    <div ref={ref} style={{ minHeight: height }}>
      {isInView ? children : null}
    </div>
  );
};

export default LazySection;