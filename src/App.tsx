import Header from "./components/Header/Header";
import Years from "./components/Years/Years";
import CustomSwiper from "./components/CustomSwiper/CustomSwiper";

import "./App.scss";

function App() {
  return (
    <div className="App">
      <Header />
      <main className="main">
        <Years />
        <CustomSwiper />
      </main>
    </div>
  );
}

export default App;
