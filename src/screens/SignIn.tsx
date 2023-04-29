import React, { useState } from "react";
import { Heading, Icon, VStack, useTheme } from "native-base";
import { LogoCompleto } from "../icons/LogoCompleto";
import { Input } from "../components/Input";
import { Envelope, Key } from "phosphor-react-native";
import { Button } from "../components/Button";

export function SignIn() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const theme = useTheme();

  return (
    <VStack flex={1} alignItems={"center"} px={8} pt={24}>
      <LogoCompleto width="300" height="260" color="#121629" />
      <Heading mb={5}>Acesse sua conta</Heading>
      <Input
        placeholder="E-mail"
        mb={4}
        InputLeftElement={
          <Icon as={<Envelope color={theme.colors.primary[700]} />} ml={4} />
        }
      />
      <Input
        placeholder="Senha"
        InputLeftElement={
          <Icon as={<Key color={theme.colors.primary[700]} />} ml={4} />
        }
        secureTextEntry
        mb={4}
      />
      <Button label="Entrar" />
    </VStack>
  );
}
