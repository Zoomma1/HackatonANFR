import { useState, useEffect } from "react";
import React from "react";
import { Localisation } from "../../Models/Localisation";
import { Table, TableContainer, Tbody } from "@chakra-ui/react";
import { Services } from "../../Models/Services";
import "./TableDisplay.css";
interface TableDisplayProps {
  localisation: Localisation | null;
  name: string[];
  displayType: string;
}

export const TableDisplay: React.FC<TableDisplayProps> = ({
  localisation,
  name,
  displayType,
}) => {
  const [itemsToShow, setItemsToShow] = useState(20); // Start by showing 20 items

  const loadMoreItems = () => {
    setItemsToShow(itemsToShow + 20); // Load 20 more items each time
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    )
      return;
    loadMoreItems();
  };

  if (!localisation || name.length === 0) return <></>;

  if (displayType === "init") {
    return (
      <TableContainer className="table-container">
        <Table className="table">
          <Tbody>
            <tr>
              <th className="table th">Localisation</th>
              <th className="table th">Service</th>
              <th className="table th">Fréquence min</th>
              <th className="table th">Fréquence max</th>
              <th className="table th">Fréquence prédéfinie</th>
            </tr>
            {name.slice(0, itemsToShow).map(
              (name) =>
                Array.isArray(localisation[name]) &&
                (localisation[name] as Services[]).map(
                  (item: Services) =>
                    localisation[name] && (
                      <tr className="table tr">
                        <td className="table td">{name}</td>
                        <td className="table td">{item.Service}</td>
                        <td className="table td">{item.Frequence?.Fr_min}</td>
                        <td className="table td">{item.Frequence?.Fr_max}</td>
                        <td className="table td">{item.Frequence?.Preset}</td>
                        {(item.DateDebut && (
                          <td className="table td">{item.DateDebut}</td>
                        )) || <></>}
                        {(item.DateFin && (
                          <td className="table td">{item.DateFin}</td>
                        )) || <></>}
                      </tr>
                    )
                )
            )}
          </Tbody>
        </Table>
      </TableContainer>
    );
  }

  if (displayType === "available") {
    return (
      <TableContainer className="table-container">
        <Table className="table">
          <Tbody>
            <tr>
              <th className="table th">Localisation</th>
              <th className="table th">Spectrum service</th>
              <th className="table th">Service</th>
              <th className="table th">Fréquence min (Rx)</th>
              <th className="table th">Fréquence max (Rx)</th>
              <th className="table th">Fréquence min (Tx)</th>
              <th className="table th">Fréquence max (Tx)</th>
              <th className="table th">Date de début</th>
              <th className="table th">Date de fin</th>
              <th className="table th">Disponibilité</th>
            </tr>
            {name.slice(0, itemsToShow).map(
              (name) =>
                Array.isArray(localisation[name]) &&
                (localisation[name] as Services[]).map(
                  (item: Services) =>
                    localisation[name] && (
                      <tr className="table tr">
                        <td className="table td">{name}</td>
                        <td className="table td">{item.Usage}</td>
                        <td className="table td">{item.Service}</td>
                        <td className="table td">
                          {item.Frequence?.Recue?.Fr_min}
                        </td>
                        <td className="table td">
                          {item.Frequence?.Recue?.Fr_max}
                        </td>
                        <td className="table td">
                          {item.Frequence?.Envoyée?.Fr_min}
                        </td>
                        <td className="table td">
                          {item.Frequence?.Envoyée?.Fr_max}
                        </td>
                        {(item.DateDebut && (
                          <td className="table td">{item.DateDebut}</td>
                        )) || <></>}
                        {(item.DateFin && (
                          <td className="table td">{item.DateFin}</td>
                        )) || <></>}
                        <td className="table td">{item.Disponibilité}</td>
                      </tr>
                    )
                )
            )}
          </Tbody>
        </Table>
      </TableContainer>
    );
  }
  return <></>;
};
