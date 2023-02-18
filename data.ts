import Dietican from "./models/dieticans";
import Speciality from "./models/speciality";

export const DIETICIANS = [
  new Dietican(
    "63e5055483f4b8367a7327c0",
    "Erika Brewer",
    "ErikaB",
    "+234 (877) 589-3819",
    "erikabrewer@combot.com",
    false,
    "RD",
    "63e50ea646d49e58974ef56d",
    "https://randomuser.me/api/portraits/thumb/women/75.jpg",
    "female",
    "2017-03-01T11:29:52",
    4.65
  ),
  new Dietican(
    "63e505544fd5ffbbc7e9284c",
    "Alisha Shaffer",
    "AlishaS",
    "+234 (890) 494-3319",
    "alishashaffer@combot.com",
    true,
    "RD",
    "63e50ea69cf8668b7d4646d7",
    "https://randomuser.me/api/portraits/thumb/women/70.jpg",
    "female",
    "2018-02-15T08:03:27",
    4.69
  ),
  new Dietican(
    "63e50554d5ad57b1b7277115",
    "Walter Mcdonald",
    "WalterM",
    "+234 (948) 484-2070",
    "waltermcdonald@combot.com",
    true,
    "RD",
    "63e50ea65ad608e8f75d0543",
    "http://placehold.it/32x32",
    "male",
    "2018-12-29T12:00:28",
    4.55
  ),
  new Dietican(
    "63e50554148edfaa3d28aaec",
    "Judith Thompson",
    "JudithT",
    "+234 (997) 568-2621",
    "judiththompson@combot.com",
    false,
    "RD",
    "63e50ea60388b1a01db49d08",
    "http://placehold.it/32x32",
    "female",
    "2021-06-09T03:25:13",
    3.75
  ),
  new Dietican(
    "63e50554f47e85d90f2dc585",
    "Kaitlin Shaw",
    "KatlinS",
    "+234 (991) 491-2546",
    "kaitlinshaw@combot.com",
    true,
    "RD",
    "63e50ea655e7699f2f455132",
    "http://placehold.it/32x32",
    "female",
    "2022-09-29T11:18:26",
    4.0
  ),
  new Dietican(
    "63e50554231f9332b7282ad9",
    "Lynette Richmond",
    "LynetteR",
    "+234 (819) 534-2731",
    "lynetterichmond@combot.com",
    true,
    "RD",
    "63e50ea6e229d2ffed9fcfaa",
    "http://placehold.it/32x32",
    "female",
    "2017-08-01T11:16:30",
    3.98
  ),
  new Dietican(
    "63e5055419c7c54ff5db56c8",
    "Teresa Jordan",
    "TeresaJ",
    "+234 (911) 533-3486",
    "teresajordan@combot.com",
    false,
    "RD",
    "63e516228d76dbd565c60de7",
    "http://placehold.it/32x32",
    "female",
    "2022-08-22T01:43:32",
    4.55
  ),
  new Dietican(
    "63e50554995e6976a27494d3",
    "Floyd Pitts",
    "Floydpitts",
    "+234 (806) 449-2004",
    "floydpitts@combot.com",
    true,
    "RD",
    "63e50ea6e229d3f1ed90cfsa",
    "http://placehold.it/32x32",
    "male",
    "2014-06-01T06:54:52",
    4.55
  ),
  new Dietican(
    "63e505544e3bfebc788c1f04",
    "Sellers Downs",
    "Sellerdowns",
    "+234 (856) 402-2664",
    "sellersdowns@combot.com",
    true,
    "RD",
    "63e5162297b8b6ac14be8371",
    "http://placehold.it/32x32",
    "male",
    "2021-10-16T08:42:23",
    3.95
  ),
  new Dietican(
    "63e50554028c75080d21e36e",
    "Shelton Little",
    "SheltonL",
    "+234 (852) 554-3127",
    "sheltonlittle@combot.com",
    false,
    "RD",
    "Diabetes",
    "http://placehold.it/32x32",
    "male",
    "2019-12-03T10:17:49",
    4.75
  ),
];

export const SPECIALTIES = [
  new Speciality(
    "63e50ea646d49e58974ef56d",
    "Lifestyle",
    require("./assets/dumbbell.png")
  ),
  new Speciality(
    "63e50ea69cf8668b7d4646d7",
    "Renal",
    require("./assets/kidney.png")
  ),
  new Speciality(
    "63e50ea65ad608e8f75d0543",
    "Cardiac",
    require("./assets/heart.png")
  ),
  new Speciality(
    "63e50ea60388b1a01db49d08",
    "Liver",
    require("./assets/liver.png")
  ),
  new Speciality(
    "63e50ea655e7699f2f455132",
    "Oncology",
    require("./assets/dumbbell.png")
  ),
  new Speciality(
    "63e50ea653174f416cbe8988",
    "Sport",
    require("./assets/dumbbell.png")
  ),
  new Speciality(
    "63e50ea6e229d2ffed9fcfaa",
    "geriatric ",
    require("./assets/dumbbell.png")
  ),
  new Speciality(
    "63e50ea6e229d3f1ed90cfsa",
    "obesity and weight management ",
    require("./assets/dumbbell.png")
  ),
  new Speciality(
    "63e516228d76dbd565c60de7",
    "pediatric",
    require("./assets/dumbbell.png")
  ),
  new Speciality(
    "63e5162297b8b6ac14be8371",
    "Gestational",
    require("./assets/dumbbell.png")
  ),
  new Speciality(
    "63e5162261d2ebab2255374e",
    "Diabetes",
    require("./assets/dumbbell.png")
  ),
];
