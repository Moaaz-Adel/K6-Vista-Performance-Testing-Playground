import encoding from "k6/encoding";
import http from "k6/http";
import { check } from "k6";

// Basic Username and Password
const username = "user";
const password = "passwd";

export default function () {
  const credentials = `${username}:${password}`;

  const url = `https://${credentials}@httpbin.test.k6.io/basic-auth/${username}/${password}`;

  let res = http.get(url);

  // Verify Response
  check(res, {
    "status code is 200": (r) => r.status === 200,
    "is authenticated": (r) => r.json().authenticated === true,
    "is correct user": (r) => r.json().user === username,
  });

  // Using Bearer token
  const encodedCredentials = encoding.b64encode(credentials);
  const options = {
    headers: {
      Authorization: `Basic ${encodedCredentials}`,
    },
  };

  res = http.get(
    `https://httpbin.test.k6.io/basic-auth/${username}/${password}`,
    options
  );

  check(res, {
    "status is 200": (r) => r.status === 200,
    "is authenticated": (r) => r.json().authenticated === true,
    "is correct user": (r) => r.json().user === username,
  });
}
