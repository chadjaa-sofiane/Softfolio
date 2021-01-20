import { gql } from "@apollo/client";

export const IS_ACTIVE = gql`
  query {
    isLoggedIn @client
  }
`;

export const THEME_TYPE = gql`
  query {
    themeType @client
  }
`;
