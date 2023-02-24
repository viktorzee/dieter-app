import type { SexType } from "@faker-js/faker";

type SubscriptionTier = "free" | "basic" | "business";
export class Dietician {
  id: string;
  fullName: string;
  username: string;
  email: string;
  birthday: Date;
  sex: SexType;
  isActive: boolean;
  certification: string;
  specialty_id: any | any[];
  imageUri: string;
  subscriptionTier: SubscriptionTier;
  registered: Date;
  rating: number;
  initialConsultation: string;
  followUpConsultation: string;
  about: string;
  memberOrganization: string | string[];
  website: any[];
  articles: any[];
  location: string;
}
