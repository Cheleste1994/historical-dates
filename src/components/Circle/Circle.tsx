import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { DatePeriod } from "../../store/slice/date.slice";
import CircleItem from "../CircleItem/CircleItem";
import styles from "./Circle.module.scss";
import stylesCircle from "../CircleItem/CircleItem.module.scss";

gsap.registerPlugin(MotionPathPlugin);

type CircleProps = {
  datePeriod: DatePeriod[];
};

export default memo(function Circle({ datePeriod }: CircleProps) {
  const container = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [itemsRef, setItemsRef] = useState<React.RefObject<HTMLDivElement>[]>(
    []
  );

  let items = itemsRef.map((el) => el.current),
    numItems = items.length,
    itemStep = 1 / numItems,
    wrapProgress = gsap.utils.wrap(0, 1),
    snap = gsap.utils.snap(itemStep),
    wrapTracker = gsap.utils.wrap(0, numItems);

  const tracker = useMemo(() => ({ item: 0 }), []);

  const tl = gsap.timeline({ paused: true, reversed: true });

  const moveWheel = useCallback(
    (amount: number) => {
      let progress = tl.progress();
      tl.progress(wrapProgress(snap(progress + amount)));
      let next = tracker.item;
      tl.progress(progress);

      itemsRef.map((item) =>
        item.current?.classList.remove(stylesCircle.active)
      );
      (itemsRef[next].current as HTMLDivElement)?.classList.add(
        stylesCircle.active
      );

      gsap.to(tl, {
        progress: snap(progress + amount - 1 / datePeriod.length),
        modifiers: {
          progress: wrapProgress,
        },
      });
    },
    [datePeriod.length, itemsRef, snap, tl, tracker.item, wrapProgress]
  );

  useEffect(() => {
    if (itemsRef.length) {
      const circlePath = MotionPathPlugin.convertToPath("#holder", false)[0];
      circlePath.id = "circlePath";
      svgRef.current?.prepend(circlePath);

      gsap.set(items, {
        motionPath: {
          path: circlePath,
          align: circlePath,
          alignOrigin: [0.5, 0.5],
          end: ((i: number) => i / items.length) as unknown as number,
        },
      });

      let circle = circleRef.current;

      tl.to(circle, {
        rotation: 360,
        transformOrigin: "center",
        duration: 1,
        ease: "none",
      });

      tl.to(
        items,
        {
          rotation: "-=360",
          transformOrigin: "center center",
          duration: 1,
          ease: "none",
        },
        0
      );

      tl.to(
        tracker,
        {
          item: numItems,
          duration: 1,
          ease: "none",
          modifiers: {
            item: (value) => wrapTracker(numItems - Math.round(value)),
          },
        },
        0
      );

      itemsRef?.forEach(function (el, i) {
        (el.current as HTMLDivElement).addEventListener("click", function () {
          let current = tracker.item,
            activeItem = i;

          itemsRef.map((item) =>
            item.current?.classList.remove(stylesCircle.active)
          );
          (itemsRef[activeItem].current as HTMLDivElement)?.classList.add(
            stylesCircle.active
          );

          const diff = current - i;

          if (Math.abs(diff) < numItems / 2) {
            moveWheel(diff * itemStep);
          } else {
            const amt = numItems - Math.abs(diff);

            if (current > i) {
              moveWheel(amt * -itemStep);
            } else {
              moveWheel(amt * itemStep);
            }
          }
        });
      });
    }
  }, [
    itemStep,
    items,
    itemsRef,
    moveWheel,
    numItems,
    tl,
    tracker,
    wrapTracker,
  ]);

  return (
    <div className={styles.container} ref={container}>
      <div className={`${styles.wrapper} circle`} ref={circleRef}>
        {datePeriod.map(({ title, id }, index) => (
          <CircleItem
            key={id}
            title={title}
            index={index}
            setItemsRef={setItemsRef}
          />
        ))}
        <svg viewBox="0 0 300 300" ref={svgRef}>
          <circle
            id="holder"
            className={styles.st0}
            cx="151"
            cy="151"
            r="150"
          />
        </svg>
      </div>
    </div>
  );
});
