import "./App.css";
import WeatherContextProvider from "./components/context/WeatherContext";
import Main from "./components/Main/Main";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <WeatherContextProvider>
        <Main />
      </WeatherContextProvider>
    </div>
  );
}

export default App;
