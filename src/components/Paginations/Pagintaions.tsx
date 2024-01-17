import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getDateState, setPage } from "../../store/slice/date.slice";
import styles from "./Paginations.module.scss";

type Route = "Next" | "Prev";

export default function Pagintaions() {
  const { currentPage, datePeriod } = useAppSelector(getDateState);

  const dispatch = useAppDispatch();

  const handleClick = (route: Route) => {
    if (route === "Prev") {
      return dispatch(setPage(currentPage - 1 || 1));
    }

    const nextPage =
      currentPage + 1 >= datePeriod.length
        ? datePeriod.length
        : currentPage + 1;
    dispatch(setPage(nextPage));
  };

  return (
    <div className={styles.paginations}>
      <button onClick={() => handleClick("Prev")} disabled={currentPage === 1}>
        <span />
      </button>
      <button onClick={() => handleClick("Next")} disabled={currentPage === datePeriod.length}>
        <span />
      </button>
    </div>
  );
}
