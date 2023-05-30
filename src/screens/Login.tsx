import { VStack } from "native-base";
import { Button } from "../components/Button";
import { useNavigation } from "@react-navigation/native";
import { OndasDeParto } from "../icons/OndasParto";

export const Login = () => {
  const navigation = useNavigation();

  const handlePregnant = () => {
    navigation.navigate("login");
  };

  const handleProfessional = () => {
    navigation.navigate("profissional");
  };

  return (
    <VStack
      flex={1}
      alignItems={"center"}
      px={8}
      pt={24}
      backgroundColor={"primary.300"}
    >
      <OndasDeParto
        width="300"
        height="260"
        color="#121629"
        BgColor="transparent"
      />

      <Button mt={5} label="Paciente" mb={4} onPress={handlePregnant} />
      <Button label="Profissional" onPress={handleProfessional} />
    </VStack>
  );
};
