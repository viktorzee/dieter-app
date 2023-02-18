type DietecianDetails = {
  id: string;
  dieticianId: string;
  fullName: string;
  username: string;
  phone: string;
  email: string;
  isActive: boolean;
  certification: string;
  speciality: string;
  imageUrl: string;
  gender: string;
};

export default class Dietican {
  id: string;
  fullName: string;
  username: string;
  phone: string;
  email: string;
  isActive: string;
  certification: string;
  speciality: string;
  imageUrl: string;
  gender: string;
  registered: string;
  rating: number;
  constructor(
    id,
    fullName,
    username,
    phone,
    email,
    isActive,
    certification,
    speciality,
    imageUrl,
    gender,
    registered,
    rating
  ) {
    this.id = id;
    this.fullName = fullName;
    this.username = username;
    this.phone = phone;
    this.email = email;
    this.isActive = isActive;
    this.certification = certification;
    this.speciality = speciality;
    this.imageUrl = imageUrl;
    this.gender = gender;
    this.registered = registered;
    this.rating = rating;
  }
}
