import http from "k6/http";
import { check } from "k6";

export default function () {
  // Defining URL and Payloads
  const url = "https://test-api.k6.io/auth/basic/login/";

  const payload = JSON.stringify({
    username: "test_case",
    password: "1234",
  });

  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Send a post request and save response as a variable
  const res = http.post(url, payload, params);
  console.log(res.body);

  // Check that response is 200
  check(res, { "response should be 200": (res) => res.status === 200 });
}
