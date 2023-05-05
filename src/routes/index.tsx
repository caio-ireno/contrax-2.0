import { NavigationContainer } from "@react-navigation/native";
import { AppRoutes } from "./gestante.routes";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { useState, useEffect } from "react";
import { LoginRoutes } from "./login.routes";
import { getGestante } from "../firebase services/GetGestante";
import { Gestante } from "../firebase services/InterfaceGestante";
import GestanteContext from "../context/GestanteContext";
import useContraction from "../hooks/useContraction";

export const Routes = () => {
  const [loading, setLoading] = useState(true);
  const [userAuth, setUserAuth] = useState<FirebaseAuthTypes.User>();
  const [gestante, setGestante] = useState<Gestante | null>(null);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(async (user) => {
      if (user) {
        const gestanteData = await getGestante(user.uid);
        setGestante(gestanteData);
      }
      setUserAuth(user);
      setLoading(false);
    });

    return subscriber;
  }, [gestante]);

  return (
    <NavigationContainer>
      {userAuth ? (
        <GestanteContext.Provider value={{ gestante, setGestante }}>
          <AppRoutes />
        </GestanteContext.Provider>
      ) : (
        <LoginRoutes />
      )}
    </NavigationContainer>
  );
};
