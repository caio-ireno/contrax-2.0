import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Contractions } from "../screens/Contractions";
import { Ajuda } from "../screens/Ajuda";
import { BolsaRota } from "../screens/BolsaRota";
import { ClockCounterClockwise, Question, Baby } from "phosphor-react-native";
import { useTheme } from "native-base";

const { Navigator, Screen } = createBottomTabNavigator();
export const AppRoutes = () => {
  const { colors } = useTheme();
  return (
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
  );
};
