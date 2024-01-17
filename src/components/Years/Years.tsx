import { useAppSelector } from "../../store/hooks";
import { getDateState } from "../../store/slice/date.slice";
import styles from "./Years.module.scss";

export default function Years() {
  const { currentPage, datePeriod } = useAppSelector(getDateState);

  return (
    <div className={styles.years}>
      <div className={styles.title}>
        <span>{`${datePeriod[currentPage]?.periodStart}`}</span>
        <span>{`${datePeriod[currentPage]?.periodEnd}`}</span>
      </div>
      <div className={styles.circle}>
        <span></span>
        <span></span>
        <div>
          <div className="item 1 active">1</div>
          <div className="item 2">2</div>
          <div className="item 3">3</div>
          <div className="item 4">4</div>
          <div className="item 5">5</div>
          <div className="item 6">6</div>
          <div className="item 7">7</div>
          <div className="item 8">8</div>
          <svg viewBox="0 0 300 300">
            <circle id="holder" className="st0" cx="151" cy="151" r="150" />
          </svg>
        </div>
      </div>
    </div>
  );
}
