import { useLayoutEffect, useRef, useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { setPage } from "../../store/slice/date.slice";

import styles from "./CircleItem.module.scss";

type CircleItemProps = {
  title: string;
  index: number;
  setItemsRef: React.Dispatch<
    React.SetStateAction<React.RefObject<HTMLDivElement>[]>
  >;
};

export default function CircleItem({
  index,
  title,
  setItemsRef,
}: CircleItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [titleItem, setTitleItem] = useState("");

  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    setItemsRef((state) => {
      if (state.length < 6) {
        return [...state, ref];
      }
      return state;
    });
  }, [ref, setItemsRef]);

  return (
    <div
      className={`${styles.item} item ${index + 1}`}
      ref={ref}
      onMouseEnter={(e) => {
        e.currentTarget.classList.add(styles.hover);
        setTitleItem(() => title);
      }}
      onMouseLeave={(e) => {
        e.currentTarget.classList.remove(styles.hover);
        if (!e.currentTarget.classList.contains(styles.active)) {
          setTitleItem(() => "");
        }
      }}
      onClick={() => {
        dispatch(setPage(index + 1));
        setTitleItem(title);
      }}
    >
      {!!titleItem && index + 1}
      {!!titleItem && <span className={styles.title}>{titleItem}</span>}
      <span className={styles.noActive} />
    </div>
  );
}
