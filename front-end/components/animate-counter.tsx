import { useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";

type CounterProps = {
  num: number;
};

function AnimatedCounter({ num }: CounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const motionValue = useMotionValue(num);
  const springValue = useSpring(motionValue, {
    damping: 100,
    stiffness: 200,
    restDelta: 1.5,
  });
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(num);
    }
  }, [motionValue, isInView, num]);

  useEffect(() => {
    if (ref.current) {
      ref.current.textContent = num.toLocaleString();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(
    () =>
      springValue.onChange((latest: number) => {
        if (ref.current) {
          ref.current.textContent = Math.round(latest).toLocaleString();
        }
      }),
    [springValue]
  );

  return <div ref={ref} />;
}

export default AnimatedCounter;
