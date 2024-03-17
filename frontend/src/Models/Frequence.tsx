export interface Frequence {
  Fr_min: number;
  Fr_max: number;
  Preset?: string;
  Envoyée?: Frequence;
  Recue?: Frequence;
}
