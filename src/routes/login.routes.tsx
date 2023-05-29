import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CriarConta } from "../screens/CriarConta";
import { SignIn } from "../screens/SignIn";
import { Login } from "../screens/Login";
import { Profissional } from "../screens/profissional/Profissional";
import { GestanteInfo } from "../screens/profissional/GestanteInfo";
import { ResetPassword } from "../screens/ResetPassword";

const { Navigator, Screen } = createNativeStackNavigator();

export const LoginRoutes = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="initialPage" component={Login} />
      <Screen name="login" component={SignIn} />
      <Screen name="criarConta" component={CriarConta} />
      <Screen name="resetPassword" component={ResetPassword} />
      <Screen name="profissional" component={Profissional} />
      <Screen name="gestanteInfo" component={GestanteInfo} />
    </Navigator>
  );
};
