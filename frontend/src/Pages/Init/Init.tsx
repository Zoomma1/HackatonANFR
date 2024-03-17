import { useState, useEffect } from "react";
import { Localisation } from "../../Models/Localisation";
import {
  filterLocalisation,
  getLocalisation,
} from "../../Services/localisationService";
import { TableDisplay } from "../../Components/Table/TableDisplay";
import { SearchBar } from "../../Components/SearchBar/SearchBar";
import { BarChart as ChartBar } from "../../Components/Chart/ChartBar";

export function Init() {
  const [localisation, setLocalisation] = useState<Localisation>();
  const [names, setNames] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState("");

  if (!localisation) {
    getLocalisation()
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setLocalisation(data);
        setNames(Object.keys(data));
        return;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  let filteredLocalisation = filterLocalisation(
    localisation,
    names,
    searchValue
  );
  //  console.log(names);
  //  console.log(localisation);

  return (
    <>
      {/* <ChartBar localisation={localisation} name={names} /> */}
      <SearchBar value={searchValue} onValueChange={setSearchValue} />
      <TableDisplay localisation={filteredLocalisation!} name={names} />
    </>
  );
}
