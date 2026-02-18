import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DrawerNavigator from "./src/navigation/DrawerNavigator";
import Account from "./src/screens/Account";
import { AuthContextProvider, AuthContext } from "./src/context/AuthContext";
import { GlobalContextProvider } from "./src/context/GlobalContext"; // Importa el GlobalContextProvider

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthContextProvider>
      <GlobalContextProvider>
        <NavigationContainer>
          <AuthContext.Consumer>
            {({ userToken }) =>
              userToken == null ? (
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                  <Stack.Screen name="Account" component={Account} />
                </Stack.Navigator>
              ) : (
                <DrawerNavigator />
              )
            }
          </AuthContext.Consumer>
        </NavigationContainer>
      </GlobalContextProvider>
    </AuthContextProvider>
  );
}
