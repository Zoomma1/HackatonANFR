// frequencyService.tsx
import { ApiService } from "./apiService";

export async function getLocalisation() {
  return ApiService.get("/getAll");
}
