import { InMemoryCache, makeVar } from "@apollo/client";
import jwtDecode from "jwt-decode";

if (localStorage.getItem("token")) {
  const decodeToken = jwtDecode(localStorage.getItem("token"));
  if (decodeToken.exp * 1000 < Date.now()) localStorage.removeItem("token");
}

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isLoggedIn: {
          read() {
            return isLoggedVar();
          },
        },
        themeType: {
          read() {
            return themeType();
          },
        },
      },
    },
  },
});

export const isLoggedVar = makeVar(!!localStorage.getItem("token"));

export const themeType = makeVar(localStorage.getItem("themeType") || "light");
