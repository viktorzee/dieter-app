import { Image } from "react-native";

export const dumbbell = Image.resolveAssetSource(
  require("../assets/dumbbell.png")
);
export const liver = Image.resolveAssetSource(require("../assets/liver.png"));
export const kidney = Image.resolveAssetSource(require("../assets/kidney.png"));
export const heart = Image.resolveAssetSource(require("../assets/heart.png"));

export const data = [
  {
    id: "63e50ea646d49e58974ef56d",
    name: "Lifestyle",
    imageUri: dumbbell,
  },
  {
    id: "63e50ea69cf8668b7d4646d7",
    name: "Renal",
    imageUri: kidney,
  },
  {
    id: "63e50ea65ad608e8f75d0543",
    name: "Cardiac",
    imageUri: heart,
  },
  {
    id: "63e50ea60388b1a01db49d08",
    name: "Liver",
    imageUri: liver,
  },
  {
    id: "63e50ea655e7699f2f455132",
    name: "Oncology",
    imageUri: dumbbell,
  },
  {
    id: "63e50ea653174f416cbe8988",
    name: "Sport",
    imageUri: dumbbell,
  },
  {
    id: "63e50ea6e229d2ffed9fcfaa",
    name: "Geriatric",
    imageUri: dumbbell,
  },
  {
    id: "63e50ea6e229d3f1ed90cfsa",
    name: "Obesity and Weight management",
    imageUri: dumbbell,
  },
  {
    id: "63e516228d76dbd565c60de7",
    name: "Pediatric",
    imageUri: dumbbell,
  },
  {
    id: "63e5162297b8b6ac14be8371",
    name: "Gestational",
    imageUri: dumbbell,
  },
  {
    id: "63e5162261d2ebab2255374e",
    name: "Diabetes",
    imageUri: dumbbell,
  },
];
