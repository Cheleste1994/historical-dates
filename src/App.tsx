import Header from "./components/Header/Header";
import Years from "./components/Years/Years";
import CustomSwiper from "./components/CustomSwiper/CustomSwiper";

import "./App.scss";

import Pagintaions from "./components/Paginations/Pagintaions";
import { useLayoutEffect } from "react";
import { useAppDispatch } from "./store/hooks";
import { setDatePeriod } from "./store/slice/date.slice";


function App() {
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    dispatch(setDatePeriod())
  }, [dispatch]);

  return (
    <div className="App">
      <Header />
      <main className="main">
        <Years />
        <Pagintaions />
        <CustomSwiper />
      </main>
    </div>
  );
}

export default App;
