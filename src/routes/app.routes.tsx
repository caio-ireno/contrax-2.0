import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Contractions } from "../screens/Contractions";
import { Ajuda } from "../screens/Ajuda";
import { BolsaRota } from "../screens/BolsaRota";
import { ClockCounterClockwise, Question, Baby } from "phosphor-react-native";
import { useTheme } from "native-base";
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
const { Navigator, Screen } = createBottomTabNavigator();
export const AppRoutes = ({ gestante }: { gestante: Gestante | null }) => {
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
        initialParams={{ gestante }}
      />
      <Screen
        name="bolsaRota"
        component={BolsaRota}
        options={{ tabBarIcon: Baby }}
        initialParams={{ gestante }}
      />
      <Screen
        name="ajuda"
        component={Ajuda}
        options={{ tabBarIcon: Question }}
      />
    </Navigator>
  );
};
