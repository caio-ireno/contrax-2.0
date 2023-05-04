import React, { useState } from "react";
import { Heading, Icon, Text, VStack, useTheme } from "native-base";
import { LogoCompleto } from "../icons/LogoCompleto";
import { Input } from "../components/Input";
import { Envelope, Key } from "phosphor-react-native";
import { Button } from "../components/Button";
import { Alert, TouchableOpacity } from "react-native";
import auth from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();

  const navigation = useNavigation();

  const handleSignIn = () => {
    if (!email || !password) {
      return Alert.alert("Entrar", "Digite um email e uma senha");
    }
    setIsLoading(false);

    auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        console.log(error);
        setIsLoading(false);

        if (error.code === "auth/user-not-found") {
          return Alert.alert("Entrar", "Usuário nao cadastrado.");
        }

        if (error.code === "auth/invalid-email") {
          return Alert.alert("Entrar", "E-mail ou Senha inválido.");
        }
        if (error.code === "auth/wrong-password") {
          return Alert.alert("Entrar", "E-mail ou Senha inválido.");
        }
        return Alert.alert("Entrar", "Não foi possível acessar");
      })
      .then(() => console.log("entrou"));
  };

  const handleCreateAccount = () => {
    navigation.navigate("criarConta");
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
      <Input
        placeholder="E-mail"
        mb={4}
        InputLeftElement={
          <Icon as={<Envelope color={theme.colors.primary[700]} />} ml={4} />
        }
        onChangeText={setEmail}
      />
      <Input
        placeholder="Senha"
        InputLeftElement={
          <Icon as={<Key color={theme.colors.primary[700]} />} ml={4} />
        }
        secureTextEntry
        mb={4}
        onChangeText={setPassword}
      />
      <Button
        mb={2}
        label="Entrar"
        onPress={handleSignIn}
        isLoading={isLoading}
      />
      <TouchableOpacity onPress={handleCreateAccount}>
        <Text>Não tem conta? Cadastre-se</Text>
      </TouchableOpacity>
    </VStack>
  );
}
