import React, { useContext, useEffect, useState } from "react";
import { generate } from "short-uuid";
import { WeatherContext } from "./context/WeatherContext";

const Sidebar = () => {
  const [cityName, setCityName] = useState("");
  const { setTableData, cities, setCities } = useContext(WeatherContext);

  const getCityWeather = (e, item) => {
    setCityName(e.target.innerText);
    setCities((prevVal) => {
      let newVal = prevVal.map((city) => {
        if (city.city === item.city) {
          city.clicked = true;
        }
        return city;
      });
      return [...newVal];
    });
  };

  useEffect(() => {
    if (cityName === "") {
      setTableData([]);
    } else {
      (async () => {
        try {
          const response = await fetch(
            `https://python3-dot-parul-arena-2.appspot.com/test?cityname=${cityName}`
          );
          const json = await response.json();

          setTableData((prevVal) => {
            let found = prevVal.some(
              (element) => element.cityName === `${cityName}`
            );
            if (found) {
              return [...prevVal];
            } else {
              return [
                ...prevVal,
                {
                  cityName: cityName,
                  date_and_time: json.date_and_time,
                  description: json.description,
                  humidity_in_percent: json.humidity_in_percent,
                  pressure_in_hPa: json.pressure_in_hPa,
                  temp_in_celsius: json.temp_in_celsius,
                  id: generate(),
                  data_present: false,
                },
              ];
            }
          });
        } catch (e) {
          console.error(e);
        }
      })();
    }
  }, [cityName, setTableData]);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th scope="col">City</th>
          </tr>
        </thead>
        <tbody>
          {cities.map((item) => {
            return (
              <tr
                key={item.city}
                className={item?.clicked === true ? "city-clicked" : ""}
              >
                <td onClick={(e) => getCityWeather(e, item)}>{item?.city}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Sidebar;
