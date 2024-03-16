import { useState, useEffect } from "react";
import React from "react";
import { Localisation } from "../../Models/Localisation";
import { Table, TableContainer, Tbody } from "@chakra-ui/react";
import { Services } from "../../Models/Services";

interface TableDisplayProps {
  localisation: Localisation | null;
  name: string[];
}

export const TableDisplay: React.FC<TableDisplayProps> = ({
  localisation,
  name,
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

  return (
    <TableContainer>
      <Table>
        <Tbody>
          {name.slice(0, itemsToShow).map((name) =>
            (localisation[name] as Services[]).map((item: Services) => (
              <tr>
                <td>{name}</td>
                <td>{item.Service}</td>
                <td>{item.Frequence.Fr_min}</td>
                <td>{item.Frequence.Fr_max}</td>
                <td>{item.Frequence.Preset}</td>
              </tr>
            ))
          )}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
