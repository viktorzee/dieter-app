import { StackNavigationProp } from "@react-navigation/stack";

export type MainStackParamList = {
  SpecialtyDetail: {
    specialtyId: string;
  };
  DieticianDetail: {
    dietician_id: string;
  };
  Home: undefined;
};

export type MainDrawerParamsList = {
  Home: {
    userId: string;
  };
  DieticansList: undefined;
  SpecialtiesList: undefined;
  ResturantLocator: undefined;
  Account: undefined;
  Contact: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
};
