import { Services } from "./Services";

export interface Localisation {
  [key: string]: Array<any>;
  Services: Services[];
}
