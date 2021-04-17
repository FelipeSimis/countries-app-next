<h1 align="center">Responsive Countries App</h1>

![Demo](https://github.com/FelipeSimis/countries-app-next/blob/assets/demo.gif)

## Prerequisites

- **NodeJS**: If you don't have it, just download it [here](https://nodejs.org/en/download/)
- **Yarn**: If you don't have it, just download it [here](https://classic.yarnpkg.com/lang/en/)

## Techs

- [x] [NextJS](https://nextjs.org/)
- [x] [TypeScript](https://www.typescriptlang.org/)
- [x] [Styled-Components](https://styled-components.com/)
- [x] [Axios](https://github.com/axios/axios)
- [x] [Unform](https://unform.dev/)
- [x] [React-Leaflet](https://react-leaflet.js.org/docs/start-introduction)
- [x] [RestCountriesAPI](https://restcountries.eu/)
- [x] [SWR](https://swr.vercel.app)

## Getting Started

**Generate a API KEY**
Access [MapBox](https://account.mapbox.com/) and sign in, after that click in "Create a token"

**Clone the project and access the folder**

```bash
  $ git clone https://github.com/FelipeSimis/countries-app-next.git

  # After cloning the project, run the following command
  $ cd countries-app-next

  # Install the dependencies
  $ yarn

  # Open the project in Visual Studio Code
  $ code .

  # Rename the .env.example file to .env and add the API key you got from MapBox
  NEXT_PUBLIC_MAPBOX_TOKEN={YOUR API KEY GOES HERE, WITHOUT THE BRACKETS}

  # To finish, run the project
  $ yarn dev
```
