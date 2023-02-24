import { faker } from "@faker-js/faker";
import { Image } from "react-native";
import Speciality from "../models/speciality";

export const dumbbell = Image.resolveAssetSource(
  require("../assets/dumbbell.png")
);
export const liver = Image.resolveAssetSource(require("../assets/liver.png"));
export const kidney = Image.resolveAssetSource(require("../assets/kidney.png"));
export const heart = Image.resolveAssetSource(require("../assets/heart.png"));

const createSpecialty = (): Speciality => {
  const specialtyNames = [
    { name: "Diabetes", imageUri: dumbbell },
    { name: "Gestational", imageUri: dumbbell },
    { name: "Pediatric", imageUri: dumbbell },
    { name: "Obesity and Weight management", imageUri: dumbbell },
    { name: "Geriatric", imageUri: dumbbell },
    { name: "Sport", imageUri: dumbbell },
    { name: "Oncology", imageUri: dumbbell },
    { name: "Liver", imageUri: liver },
    { name: "Lifestyle", imageUri: dumbbell },
    { name: "Renal", imageUri: kidney },
    { name: "Cardiac", imageUri: heart },
  ];
  return {
    id: faker.datatype.uuid(),
    name: faker.helpers.arrayElement(specialtyNames).name,
    imageUri: faker.helpers.arrayElement(specialtyNames).imageUri,
  };
};

const createSpecialties = (numUsers) => {
  return Array.from({ length: numUsers }, createSpecialty);
};

export const data = createSpecialties(11);
