import { NavigationContainer } from "@react-navigation/native";
import { AppRoutes } from "./app.routes";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { useState, useEffect } from "react";
import { LoginRoutes } from "./login.routes";
import { getGestante } from "../firebase services/GetGestante";

interface Gestante {
  id: string;
  name: string;
  contracoes: Array<{
    id: number;
    duration: string;
    hour: string;
    frequency: string;
  }>;
  bolsa: {
    coloracao: string;
    horario: string;
  };
}
export const Routes = () => {
  const [loading, setLoading] = useState(true);
  const [userActivi, setUserActivi] = useState<FirebaseAuthTypes.User>();
  const [gestante, setGestante] = useState<Gestante | null>(null);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(async (user) => {
      console.log(user);
      if (user) {
        const gestanteData = await getGestante(user.uid);
        setGestante(gestanteData);
      }
      setUserActivi(user);
      setLoading(false);
    });

    return subscriber;
  }, []);

  return (
    <NavigationContainer>
      {userActivi ? <AppRoutes gestante={gestante} /> : <LoginRoutes />}
    </NavigationContainer>
  );
};
