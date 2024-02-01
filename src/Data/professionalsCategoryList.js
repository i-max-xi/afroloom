import countryArr from "./CountryArr";

export const allProfessionalscategory = [
  {
    id: "1000",
    name: "Model",
    filters: [
      {
        name: "Gender",
        options: ["Male", "Female"],
      },

      {
        name: "Country",
        options: countryArr,
      },

      {
        name: "Age",
        options: [],
      },
    ],
  },
  {
    id: "2000",
    name: "Photographer",
    filters: [
      {
        name: "Gender",
        options: ["Male", "Female"],
      },

      {
        name: "Country",
        options: countryArr,
      },

      {
        name: "Age",
        options: [],
      },
    ],
  },
  {
    id: "3000",
    name: "Tour Guide",
    filters: [
      {
        name: "Gender",
        options: ["Male", "Female"],
      },

      {
        name: "Country",
        options: countryArr,
      },

      {
        name: "Age",
        options: [],
      },
    ],
  },
];
