
import { environment } from "../../environments/environment.development";
export function getServerFile(filename: string) {
  return environment.apiUrl + "/" + filename;
}
