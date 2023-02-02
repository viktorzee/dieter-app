import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootState } from "../store";

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthenticatePayload {
  token: string;
}

export const login = createAsyncThunk<AuthenticatePayload, string, any>(
  "auth/login",
  async (token) => {
    await AsyncStorage.setItem("token", token);
    return { token };
  }
) as any;

export const logout = createAsyncThunk("auth/logout", async () => {
  await AsyncStorage.removeItem("token");
  return;
});

const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<AuthenticatePayload>) => {
          state.isLoading = false;
          state.token = action.payload.token;
          state.isAuthenticated = true;
        }
      )
      .addCase(login.rejected, (state) => {
        state.isAuthenticated = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.token = null;
        state.isAuthenticated = false;
      });
  },
});

export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
export default authSlice.reducer;
