import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { Provider } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import favorites from "./reducers/favorites";

import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import HomeScreen from "./screens/HomeScreen";
import RecipeScreen from "./screens/RecipeScreen";
import SearchScreen from "./screens/SearchScreen";
import MyRecipesScreen from "./screens/MyRecipesScreen";
import { RootStackParamList, RootDrawerParamList } from "./types";

const reducers = combineReducers({ favorites });
const persistConfig = { key: "asian-yum", storage: AsyncStorage };
const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const RootStack = createNativeStackNavigator<RootStackParamList>();
const RootDrawer = createDrawerNavigator<RootDrawerParamList>();

const DrawerNavigator = () => {
  return (
    <RootDrawer.Navigator>
      <RootDrawer.Screen name="Search" component={SearchScreen} />
      <RootDrawer.Screen name="My recipes" component={MyRecipesScreen} />
    </RootDrawer.Navigator>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <RootStack.Navigator screenOptions={{ headerShown: false }}>
            <RootStack.Screen name="Home" component={HomeScreen} />
            <RootStack.Screen name="DrawerNavigator" component={DrawerNavigator} />
            <RootStack.Screen name="Recipe" component={RecipeScreen} />
          </RootStack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
