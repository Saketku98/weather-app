import React, { useState, useEffect, useContext } from "react";
import { WeatherContext } from "./context/WeatherContext";

const TableRow = ({ row }) => {
  const { setTableData, setCities } = useContext(WeatherContext);

  const [dataAge, setDataAge] = useState();
  const {
    cityName,
    date_and_time,
    description,
    pressure_in_hPa,
    temp_in_celsius,
    data_present,
  } = row;

  useEffect(() => {
    setDataAge(() => {
      let currentDate = new Date();
      let age = currentDate - new Date(date_and_time);
      age = Math.round(age / (1000 * 60 * 60));
      return age;
    });
  }, [date_and_time]);

  const onDelete = (row) => {
    setTableData((prevVal) => {
      let newArr = prevVal.filter((item) => {
        return item.id !== row.id;
      });
      return [...newArr];
    });
    setCities((prevVal) => {
      let newVal = prevVal.map((item) => {
        if (item.city === cityName) {
          item.clicked = false;
        }
        return item;
      });
      return [...newVal];
    });
  };

  return (
    <tr className={data_present ? "bg-yellow" : ""}>
      <td>{cityName}</td>
      <td>
        <input
          type="text"
          defaultValue={description}
          // value={description}
          // onChange={(e) => setInputDescription(e.target.value)}
        />
      </td>
      <td>{temp_in_celsius}</td>
      <td>{pressure_in_hPa}</td>

      <td>{dataAge}</td>
      <td className="btns">
        <button
          onClick={() => {
            onDelete(row);
          }}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default TableRow;
