import { StackNavigationProp } from "@react-navigation/stack";

export type StackParamList = {
  Home: undefined;
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
};

export type StackNavigationProps = StackNavigationProp<StackParamList>;
