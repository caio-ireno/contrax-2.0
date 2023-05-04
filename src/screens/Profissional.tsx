import { Heading, Text, VStack } from "native-base";
import { LogoCompleto } from "../icons/LogoCompleto";
import { Button } from "../components/Button";
import { useNavigation } from "@react-navigation/native";
import { Input } from "../components/Input";

export const Profissional = () => {
  const navigation = useNavigation();

  const handlePregnentInfo = () => {
    console.log("login");
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
      <Input mb={5} />
      <Button label="Entrar" onPress={handlePregnentInfo} />
    </VStack>
  );
};
