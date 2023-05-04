import { NavigationContainer } from "@react-navigation/native";
import { AppRoutes } from "./app.routes";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { useState, useEffect } from "react";
import { Loading } from "../components/Loading";
import { LoginRoutes } from "./login.routes";

export const Routes = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User>();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((r) => {
      setUser(r);
      setLoading(false);
    });

    return subscriber;
  }, []);

  if (loading) {
    <Loading />;
  }

  return (
    <NavigationContainer>
      {user ? <AppRoutes /> : <LoginRoutes />}
    </NavigationContainer>
  );
};
