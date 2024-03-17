import "./Validation.css";
import { useState } from "react";
import { Localisation } from "../../Models/Localisation";
import {
  filterLocalisation,
  getAvailable,
} from "../../Services/localisationService";
import { SearchBar } from "../../Components/SearchBar/SearchBar";
import { TableDisplay } from "../../Components/Table/TableDisplay";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export function Validation() {
  const [availableLocalisation, setavailableLocalisation] =
    useState<Localisation>();
  const [names, setNames] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState("");

  const navigate = useNavigate();
  const onClick = () => {
    navigate("/CheckValidity");
  };

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
        <SearchBar value={searchValue} onValueChange={setSearchValue} />
        <Button
          onClick={() => {
            onClick();
          }}
        >
          {" "}
          Check if frequency is available{" "}
        </Button>
      </div>
      <TableDisplay
        localisation={filteredAvailableLocalisation!}
        name={names}
        displayType={"available"}
      />
    </>
  );
}
