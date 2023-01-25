import React, { useContext, useState } from "react";
import { WeatherContext } from "../context/WeatherContext";
import Sidebar from "../Sidebar";
import TableRow from "../TableRow";
import "./Main.css";

const Main = () => {
  const { tableData, setTableData } = useContext(WeatherContext);
  const [inputData, setInputData] = useState("");

  const find = () => {
    if (inputData === "") {
      return;
    } else {
      let lowerStrInput = inputData.toLowerCase();
      let newTable = tableData.map((item) => {
        if (item.cityName.toLowerCase() === lowerStrInput) {
          item.data_present = true;
        } else {
          item.data_present = false;
        }
        return item;
      });
      setTableData([...newTable]);
    }
  };
  return (
    <main>
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="info-table">
        <div className="search">
          <input type="text" onChange={(e) => setInputData(e.target.value)} />
          <button onClick={() => find()}>Search</button>
        </div>
        <table>
          <thead>
            <tr>
              <th scope="col">City</th>
              <th scope="col">Description</th>
              <th scope="col">Temperature (°C)</th>
              <th scope="col">Pressure (hPa) </th>
              <th scope="col">Data age (hrs)</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {tableData.length === 0 ? (
              <tr>
                <td colSpan="6" className="no-data">
                  <h2>No Data</h2>
                </td>
              </tr>
            ) : (
              tableData.map((row) => {
                return <TableRow key={row.id} row={row} />;
              })
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default Main;
