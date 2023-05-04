import React, { useState } from "react";
import { Heading, Icon, Text, VStack, useTheme } from "native-base";
import { LogoCompleto } from "../icons/LogoCompleto";
import { Envelope, Key, IdentificationBadge } from "phosphor-react-native";
import { useNavigation } from "@react-navigation/native";
import { Button } from "../components/Button";
import { Alert, TouchableOpacity } from "react-native";
import { Input } from "../components/Input";
import auth from "@react-native-firebase/auth";
import { Logo } from "../icons/Logo";

export const CriarConta = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const theme = useTheme();
  const navigation = useNavigation();

  const handleCreateAccount = () => {
    if (!email || !password || !nome || !confirmPassword) {
      return Alert.alert("Cadastro", "Preencha todos os campos");
    }

    if (password !== confirmPassword) {
      return Alert.alert("Cadastro", "as senhas são diferentes");
    }
    setIsLoading(true);
    auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((error) => {
        setIsLoading(false);
        console.log(error);

        if (error.code === "auth/invalid-email") {
          return Alert.alert("Criar", "E-mail inválido.");
        }
        if (error.code === "auth/weak-password") {
          return Alert.alert(
            "Criar",
            "Digite uma senha com pelo menos 6 digitos."
          );
        }
        if (error.code === "auth/email-already-in-use") {
          return Alert.alert("Criar", "Esse e-mail ja está em uso.");
        }
        return Alert.alert("Criar", "Não foi possível acessar");
      });
  };

  const handleLogin = () => {
    navigation.navigate("login");
  };
  return (
    <VStack
      flex={1}
      alignItems={"center"}
      px={8}
      pt={24}
      backgroundColor={"primary.300"}
    >
      <Logo width="100" height="100" color="#121629" />

      <Input
        mt={10}
        placeholder="Nome"
        mb={4}
        InputLeftElement={
          <Icon
            as={<IdentificationBadge color={theme.colors.primary[700]} />}
            ml={4}
          />
        }
        onChangeText={setNome}
      />
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
      <Input
        placeholder="Confirmar senha"
        InputLeftElement={
          <Icon as={<Key color={theme.colors.primary[700]} />} ml={4} />
        }
        secureTextEntry
        mb={4}
        onChangeText={setConfirmPassword}
      />
      <Button
        mb={2}
        label="Entrar"
        onPress={handleCreateAccount}
        isLoading={isLoading}
      />
      <TouchableOpacity onPress={handleLogin}>
        <Text>Já possui uma conta? Acesse</Text>
      </TouchableOpacity>
    </VStack>
  );
};
