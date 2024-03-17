import { Services } from "./Services";

export interface DynamicProperties {
  [key: string]: Array<any>;
}

export interface Localisation extends DynamicProperties {
  Services: Services[];
}