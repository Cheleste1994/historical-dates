import Header from "./components/Header/Header";
import Years from "./components/Years/Years";
import CustomSwiper from "./components/CustomSwiper/CustomSwiper";

import "./App.scss";
import { useMemo } from "react";
import MOCK_DATA from "./constants/mockData";
import { DataPeriod } from "./constants/interface";
import Pagintaions from "./components/Paginations/Pagintaions";

const MAX_TIME_PERIOD = 6;

function App() {
  const newData = useMemo<DataPeriod[]>(() => {
    const sort = MOCK_DATA.sort((a, b) => a.year - b.year);
    const newData = [];
    const count = Math.ceil(sort.length / MAX_TIME_PERIOD);

    for(let i = 0; i < sort.length; i += count) {
      newData.push({
        periodStart: sort[i].year,
        periodEnd: sort[i + count - 1]?.year || sort[sort.length - 1].year,
        data: sort.slice(i, i + count)
      })
    }
    return newData;
  }, []);

  return (
    <div className="App">
      <Header />
      <main className="main">
        <Years />
        <Pagintaions />
        <CustomSwiper data={newData[0]}/>
      </main>
    </div>
  );
}

export default App;
