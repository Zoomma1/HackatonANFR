import { useState, useEffect } from "react";
import { Localisation } from "../../Models/Localisation";
import { getLocalisation } from "../../Services/localisationService";
import { TableDisplay } from "../../Components/Table/TableDisplay";
import { SearchBar } from "../../Components/SearchBar/SearchBar";

export function Dashboard() {
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
      });
  }

  console.log(names);
  console.log(localisation);

  return (
    <>
      <SearchBar value={searchValue} onValueChange={setSearchValue} />
      <TableDisplay localisation={localisation!} name={names} />
    </>
  );
}
