import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import Config from "react-native-config";
import { Alert } from "react-native";

// supabase authentication and related code goes here

const authClient = createClient(
  "https://svjfuiwkwjerdsalnebg.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2amZ1aXdrd2plcmRzYWxuZWJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzI3NTE5OTUsImV4cCI6MTk4ODMyNzk5NX0.rC1TDXUaDz4eJILn6ypwvZpOLCQJfuFC0rmiLynvwxI"
);

const setRememberMe = async (value: string) => {
  try {
    await AsyncStorage.setItem("rememberMe", value.toString());
  } catch (error) {
    console.error(error);
  }
};

const getRememberMe = async () => {
  try {
    const value = await AsyncStorage.getItem("rememberMe");
    return value === "true";
  } catch (error) {
    console.error(error);
    return false;
  }
};

export async function createUser(email: string, password: string) {
  const { data, error } = await authClient.auth.signUp({
    email,
    password,
  });
  if (error) throw new Error(error.message);

  return {
    accessToken: data.session?.access_token,
    userId: data.session?.user?.id,
  };
}

export async function authenticate(email: string, password: string) {
  const { data, error } = await authClient.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw Alert.alert(error.message);
  } else {
    return data.session?.access_token;
  }
  // return session?.access_token;
}

export async function currentUser() {
  try {
    const response = await authClient.auth.getUser();
    return response.data.user ? true : false;
  } catch (error) {
    return false;
  }
}

export async function signInWithFacebook() {
  const { data, error } = await authClient.auth.signInWithOAuth({
    provider: "facebook",
  });
  console.log(data, "data");
  console.log(error, "error ");
}

export async function resetEmail(email: string) {
  const { data, error } = await authClient.auth.resetPasswordForEmail(email);
  if (error) throw new Error(error.message);

  return data;
}

// export async function resetLink(password: string) {
//   const { error, data } = await authClient.auth.updateUser("access_token", {
//     password,
//   });

//   if (error) throw new Error(error.message);

//   return data;
// }

export async function signOut() {
  const { error } = await authClient.auth.signOut();
}

export { authClient };