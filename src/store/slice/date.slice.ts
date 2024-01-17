import { createSlice } from "@reduxjs/toolkit";
import MOCK_DATA, { DataType } from "../../constants/mockData";
import { RootState } from "../store";

export interface DatePeriod {
  id: number;
  title: string;
  periodStart: number;
  periodEnd: number;
  data: DataType;
}

export interface DateSliceState {
  currentPage: number;
  datePeriod: DatePeriod[];
}

const MAX_TIME_PERIOD = 6;

const initialState: DateSliceState = { currentPage: 1, datePeriod: [] };

export const dateSlice = createSlice({
  name: "date",
  initialState,
  reducers: {
    setDatePeriod: (state) => {
      const sort = MOCK_DATA.sort((a, b) => a.year - b.year);
      const section = [...new Set(sort.map((el) => el.section))];
      const newDateState = section
        .slice(0, MAX_TIME_PERIOD)
        .map((el, index) => {
          const filter = sort.filter((e) => e.section === el);

          return {
            id: index,
            title: el,
            data: filter,
            periodStart: filter[0].year,
            periodEnd: filter[filter.length - 1].year,
          };
        });
      state.datePeriod = newDateState;
    },
    setPage: (state, { payload }) => {
      state.currentPage = payload;
    },
  },
});

export const getDateState = (state: RootState) => state.dateReducer;

export const { setDatePeriod, setPage } = dateSlice.actions;

export default dateSlice.reducer;
