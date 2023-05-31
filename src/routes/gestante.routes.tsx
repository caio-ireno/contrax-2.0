import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useTheme } from 'native-base'
import { Baby, ClockCounterClockwise, Question } from 'phosphor-react-native'

import { AppContraction } from '../context/useContraction'
import { Ajuda } from '../screens/Ajuda'
import { BolsaRota } from '../screens/BolsaRota'
import { Contractions } from '../screens/Contractions'

const { Navigator, Screen } = createBottomTabNavigator()
export const AppRoutes = () => {
  const { colors } = useTheme()
  return (
    <AppContraction>
      <Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.secondary[900],
          tabBarInactiveTintColor: colors.primary[500],
          tabBarShowLabel: false,
        }}
      >
        <Screen
          name="contração"
          component={Contractions}
          options={{ tabBarIcon: ClockCounterClockwise }}
        />
        <Screen
          name="bolsaRota"
          component={BolsaRota}
          options={{ tabBarIcon: Baby }}
        />
        <Screen
          name="ajuda"
          component={Ajuda}
          options={{ tabBarIcon: Question }}
        />
      </Navigator>
    </AppContraction>
  )
}
