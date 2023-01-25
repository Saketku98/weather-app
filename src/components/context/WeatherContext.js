import { React, createContext, useState } from "react";

export const WeatherContext = createContext();

const WeatherContextProvider = ({ children }) => {
  const [tableData, setTableData] = useState([]);
  const [cities, setCities] = useState([
    {
      city: "London",
      clicked: false,
    },
    {
      city: "New York",
      clicked: false,
    },
    {
      city: "Los Angeles",
      clicked: false,
    },
    {
      city: "Las Vegas",
      clicked: false,
    },
  ]);

  return (
    <WeatherContext.Provider
      value={{
        tableData,
        setTableData,
        cities,
        setCities,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export default WeatherContextProvider;
