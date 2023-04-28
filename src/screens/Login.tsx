import { Heading, Text, VStack } from "native-base";
import { LogoCompleto } from "../icons/LogoCompleto";
import { Button } from "../components/Button";

export const Login = () => {
  return (
    <VStack flex={1} alignItems={"center"} px={8} pt={24}>
      <LogoCompleto width="300" height="260" color="#121629" />
      <Heading mb={5}>Acesse sua conta</Heading>

      <Button label="Paciente" mb={4} />
      <Button label="Profissional" />
    </VStack>
  );
};
