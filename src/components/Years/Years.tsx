import { useMemo } from "react";
import { useAppSelector } from "../../store/hooks";
import { getDateState } from "../../store/slice/date.slice";
import Circle from "../Circle/Circle";
import DatePeriod from "../DatePeriod/DatePeriod";
import styles from "./Years.module.scss";

export default function Years() {
  const { datePeriod } = useAppSelector(getDateState);

  const datePeriodMemo = useMemo(() => datePeriod, [datePeriod]);

  return (
    <div className={styles.years}>
      <div className={styles.title}>
        <DatePeriod />
      </div>
      <div className={styles.circle}>
        <span></span>
        <span></span>
        <Circle datePeriod={datePeriodMemo} />
      </div>
    </div>
  );
}
