import countryArr from "./CountryArr";
import { modelSpecialties } from "./professionalsList";

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
        name: "Specialty",
        options: modelSpecialties,
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
        name: "Specialty",
        options: modelSpecialties,
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

      // {
      //   name: "Age",
      //   options: [],
      // },
    ],
  },
];
