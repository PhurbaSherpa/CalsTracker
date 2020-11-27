import React from "react";
import UserProfile from "../components/UserProfile";

export default function ProfileScreen(props) {
  return <UserProfile navigation={props.navigation} />;
}

ProfileScreen.navigationOptions = {
  title: "My Profile"
};
