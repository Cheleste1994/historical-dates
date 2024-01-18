import { useAppSelector } from "../../store/hooks";
import { getDateState } from "../../store/slice/date.slice";

export default function DatePeriod() {
  const { datePeriod, currentPage } = useAppSelector(getDateState);

  return (
    <>
      <span>{`${datePeriod[currentPage - 1]?.periodStart || 1234}`}</span>
      <span>{`${datePeriod[currentPage - 1]?.periodEnd || 3421}`}</span>
    </>
  );
}
