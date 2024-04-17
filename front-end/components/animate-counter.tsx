import { useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";
import { convertToInternationalCurrencySystem } from "../constants/utils";

type CounterProps = {
  num: number;
  isConvertToInternationalCurrencySystem?: boolean;
};

function AnimatedCounter({
  num,
  isConvertToInternationalCurrencySystem,
}: CounterProps) {
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
      ref.current.textContent = isConvertToInternationalCurrencySystem
        ? convertToInternationalCurrencySystem(num)
        : num.toLocaleString();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(
    () =>
      springValue.onChange((latest: number) => {
        if (ref.current) {
          ref.current.textContent = isConvertToInternationalCurrencySystem
            ? convertToInternationalCurrencySystem(latest)
            : Math.round(latest).toLocaleString();
        }
      }),
    [springValue, isConvertToInternationalCurrencySystem]
  );

  return <div ref={ref} />;
}

export default AnimatedCounter;
