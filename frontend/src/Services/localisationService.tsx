// frequencyService.tsx
import { Services } from "../Models/Services";
import { ApiService } from "./apiService";

export async function getLocalisation() {
  return ApiService.get("/getAll");
}

function childrenAsKeyword(child: Services, searchValue: string) {
  const searchNumber = parseFloat(searchValue);
  const Fr_min = parseFloat(child.Frequence.Fr_min.toString());
  const Fr_max = parseFloat(child.Frequence.Fr_max.toString());

  const tests = [
    child.Service.toLowerCase().includes(searchValue.toLowerCase()),
    !isNaN(searchNumber) && searchNumber >= Fr_min && searchNumber <= Fr_max,
    child.Frequence.Preset.toLowerCase().includes(searchValue.toLowerCase()),
    child.DateDebut?.toLowerCase().includes(searchValue.toLowerCase()),
    child.DateFin?.toLowerCase().includes(searchValue.toLowerCase()),
  ];

  return tests.some((test) => test);
}

export function filterLocalisation(
  localisation: any,
  names: string[],
  searchValue: string
) {
  let filteredLocalisation: any = {};
  names.forEach((name) => {
    const isNameMatch = name.toLowerCase().includes(searchValue.toLowerCase());
    const children = localisation[name];
    const matchingChildren = children.filter((child: Services) =>
      childrenAsKeyword(child, searchValue)
    );

    if (isNameMatch) {
      filteredLocalisation[name] = children;
    } else if (matchingChildren.length > 0) {
      filteredLocalisation[name] = matchingChildren;
    }
  });
  return filteredLocalisation;
}
