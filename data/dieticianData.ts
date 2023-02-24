import { faker } from "@faker-js/faker";
import { Dietician } from "../models/dieticans";
import { data } from "./specialtyData";

const createDietician = (): Dietician => {
  const sex = faker.name.sexType();
  const firstName = faker.name.firstName(sex);
  const lastName = faker.name.lastName();
  const email = faker.helpers.unique(faker.internet.email, [
    firstName,
    lastName,
  ]);
  const fullName = `${firstName} ${lastName}`;

  // for specialities
  const numSpecialties = faker.datatype.number({ min: 1, max: 3 }); // Generate a random number of specialties between 1 and 3
  const specialtyIds = [];
  for (let j = 0; j < numSpecialties; j++) {
    specialtyIds.push(faker.helpers.arrayElement(data).id);
  }

  console.log(specialtyIds, "ids");

  // for member organizations
  const organizations = [
    null,
    "Association of Nigerian Dieticians",
    "Health and Hygiene Promotion Council of Nigeria",
    "Association of Nigerian Dieticians",
    "National Health Council (NHC)",
    "Health & Care Professions Council(HCPC)",
    "Association on Dental Professionals",
  ];

  const memberOrganizations = [];
  const numOrganiztions = faker.datatype.number({ min: 1, max: 3 }); // Generate a random number of specialties between 1 and 3
  for (let j = 0; j < numOrganiztions; j++) {
    memberOrganizations.push(faker.helpers.arrayElement(organizations));
  }

  //for websites
  const numWebsites = faker.datatype.number({ min: 1, max: 3 }); // Generate a random number of websites between 1 and 3
  const websites = [];
  for (let j = 0; j < numWebsites; j++) {
    const website = {
      id: faker.datatype.uuid(),
      name: faker.internet.domainName(),
      url: faker.internet.url(),
    };
    websites.push(website);
  }

  // For articles
  const numArticles = faker.datatype.number({ min: 1, max: 5 }); // Generate a random number of articles between 1 and 5
  const articles = [];
  for (let j = 0; j < numArticles; j++) {
    const articleId = faker.datatype.uuid();
    const article = {
      id: articleId,
      title: faker.lorem.sentence(),
      link: faker.internet.url(),
    };
    articles.push(article);
  }

  //for location
  const location = `${faker.address.city()}, ${faker.address.state()}, ${faker.address.country()}, `;

  //for price
  const minPrice = 20;
  const maxPrice = 50;
  const price = faker.datatype.number({ min: minPrice, max: maxPrice });
  const formattedPrice = faker.commerce.price(minPrice, maxPrice, 2, "£");

  return {
    id: faker.datatype.uuid(),
    fullName,
    username: faker.name.firstName(),
    email,
    birthday: faker.date.birthdate(),
    sex,
    isActive: faker.datatype.boolean(),
    certification: "RD",
    specialty_id: faker.helpers.arrayElement(data).id,
    imageUri: faker.internet.avatar(),
    subscriptionTier: faker.helpers.arrayElement(["free", "basic", "business"]),
    registered: faker.date.between(
      "2018-01-01T00:00:00.000Z",
      "2022-01-01T00:00:00.000Z"
    ),
    rating: faker.datatype.float({ min: 1, max: 5 }),
    initialConsultation: formattedPrice,
    followUpConsultation: formattedPrice,
    about: faker.lorem.paragraphs(),
    memberOrganization: memberOrganizations,
    website: websites,
    articles: articles,
    location,
  };
};

const createDieticians = (numUsers) => {
  return Array.from({ length: numUsers }, createDietician);
};

export const dieticansData = createDieticians(16);
