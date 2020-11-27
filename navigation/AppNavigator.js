import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";

import MainTabNavigator from "./MainTabNavigator";
import SplashScreen from "../screens/SplashScreen";
import SingleFoodScreen from "../screens/SingleFoodScreen";
import ScannerScreen from "../screens/ScannerScreen";
import EditEntryScreen from "../screens/EditEntryScreen";
import InfoEntryScreen from "../screens/InfoEntryScreen";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import SearchScreen from "../screens/SearchScreen";
import RecalculateScreen from "../screens/RecalculateScreen";
import EditInfoScreen from "../screens/EditInfoScreen";

export default createAppContainer(
  createSwitchNavigator({
    Splash: SplashScreen,
    Login: LoginScreen,
    SignUp: SignupScreen,
    Main: MainTabNavigator,
    Info: InfoEntryScreen,
    SingleFood: SingleFoodScreen,
    Scanner: ScannerScreen,
    EditScreen: EditEntryScreen,
    Search: SearchScreen,
    Recalculate: RecalculateScreen,
    EditInfo: EditInfoScreen
  })
);
