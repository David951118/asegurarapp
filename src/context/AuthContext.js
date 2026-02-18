import React, { createContext, useReducer, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingScreen from "../screens/LoadingScreen";
import { login } from "../utils/utils";

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
        default:
          return prevState;
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem("token");
      } catch (e) {
        console.error("Failed to load token", e);
      }

      dispatch({ type: "RESTORE_TOKEN", token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (credentials) => {
        const result = await login(credentials);
        if (result.success) {
          await AsyncStorage.setItem("token", result.token);
          console.log(result.token);
          dispatch({ type: "SIGN_IN", token: result.token });
        }
      },
      signOut: async () => {
        await AsyncStorage.removeItem("token");
        dispatch({ type: "SIGN_OUT" });
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={{ ...state, ...authContext }}>
      {state.isLoading ? <LoadingScreen /> : children}
    </AuthContext.Provider>
  );
}
