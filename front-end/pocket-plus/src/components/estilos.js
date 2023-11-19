import { createGlobalStyle } from "styled-components";

export const TemaClaro = createGlobalStyle`
  body {
    background-color: #ffffff;
    color: #000000;
    transition: all 0.5s;

  }
`;

export const TemaEscuro = createGlobalStyle`
  body {
    background-color: #333333;
    color: #ffffff;
    transition: all 0.5s;
  }

  table td {
    color: #ffffff;
    border-bottom: 1px solid white;
    transition: all 0.5s;
  }

  table th {
    color: #ffffff;
    border: 1px solid white;
    transition: all 0.5s;
  }
`;