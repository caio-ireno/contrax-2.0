import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { CriarConta } from '../screens/CriarConta'
import { Login } from '../screens/Login'
import { GestanteInfo } from '../screens/profissional/GestanteInfo'
import { Profissional } from '../screens/profissional/Profissional'
import { ResetPassword } from '../screens/ResetPassword'
import { SignIn } from '../screens/SignIn'

const { Navigator, Screen } = createNativeStackNavigator()

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
  )
}
