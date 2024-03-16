function encodeInUrl(object: any) {
  if (!object) {
    return "";
  }
  var formBody: string[] = [];
  for (var property in object) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(object[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  return "?" + formBody.join("&");
}

export class ApiService {
  static baseUrl = "http://localhost:8000"; //This is for local and should be changed to the server's address

  static async get(url: string, params: any = null) {
    return await fetch(this.baseUrl + url + encodeInUrl(params), {
      method: "GET",
    });
  }
}
