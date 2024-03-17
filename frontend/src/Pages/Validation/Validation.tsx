import { useState } from "react";
import { Localisation } from "../../Models/Localisation";
import {
  filterLocalisation,
  getAvailable,
} from "../../Services/localisationService";
import { SearchBar } from "../../Components/SearchBar/SearchBar";
import { TableDisplay } from "../../Components/Table/TableDisplay";
import { useNavigate } from "react-router-dom";
import AddWeekNumber from "../../Calendar";
import NavScrollExample from "../../Navbar";

export function Validation() {
  const [availableLocalisation, setavailableLocalisation] =
    useState<Localisation>();
  const [names, setNames] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [isCalendarVisible, setIsCalendarVisible] = useState(false); // New state variable
  const navigate = useNavigate();

  if (!availableLocalisation) {
    getAvailable()
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setavailableLocalisation(data);
        setNames(Object.keys(data));
        return;
      });
  }
  console.log(availableLocalisation);

  let filteredAvailableLocalisation = filterLocalisation(
    availableLocalisation,
    names,
    searchValue
  );

  console.log(filteredAvailableLocalisation);
  return (
    <>
      <div>
        <NavScrollExample/>
        <SearchBar value={searchValue} onValueChange={setSearchValue} />
        {isCalendarVisible && <AddWeekNumber />}
        <button
            className="toggle-calendar-button"
            onClick={() => setIsCalendarVisible(!isCalendarVisible)}
        >
          Toggle Calendar
        </button>
      </div>
      <TableDisplay
        localisation={filteredAvailableLocalisation!}
        name={names}
        displayType={"available"}
      />
    </>
  );
}