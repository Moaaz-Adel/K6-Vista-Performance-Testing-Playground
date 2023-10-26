import http from "k6/http";
import { check } from "k6";
export const options = {
  iterations: 1,
};

export default function () {
  const response = http.get("https://test-api.k6.io/public/crocodiles/");
  console.log(`Status Code is ${response.status}`);
  check(response, { "status code 200": (r) => r.status == 200 });
}
