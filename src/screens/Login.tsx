import { Heading, Text, VStack } from "native-base";
import { LogoCompleto } from "../icons/LogoCompleto";
import { Button } from "../components/Button";
import { useNavigation } from "@react-navigation/native";

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
      <LogoCompleto width="300" height="260" color="#121629" />
      <Heading mb={5}>Acesse sua conta</Heading>

      <Button label="Paciente" mb={4} onPress={handlePregnant} />
      <Button label="Profissional" onPress={handleProfessional} />
    </VStack>
  );
};
