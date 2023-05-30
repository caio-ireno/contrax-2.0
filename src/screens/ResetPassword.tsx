import React, { useState } from "react";
import { Heading, Icon, Text, VStack, useTheme } from "native-base";
import { Envelope } from "phosphor-react-native";
import { useNavigation } from "@react-navigation/native";
import { Button } from "../components/Button";
import { Alert, TouchableOpacity } from "react-native";
import { Input } from "../components/Input";
import auth from "@react-native-firebase/auth";
import { OndasDeParto } from "../icons/OndasParto";

export const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const theme = useTheme();
  const navigation = useNavigation();

  const handleResetPassword = () => {
    auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        console.log("enviado");
        Alert.alert("Enviado", "Email enviado com sucesso");
        navigation.navigate("login");
      })
      .catch((error) => {
        console.log(error);

        if (error.code === "auth/user-not-found") {
          Alert.alert("Alterar senha", "Usuário não cadastrado.");
        } else {
          Alert.alert(
            "Erro",
            "Ocorreu um erro ao enviar o email de redefinição."
          );
        }
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
      <OndasDeParto
        width="300"
        height="260"
        color="#121629"
        BgColor="transparent"
      />

      <Input
        placeholder="E-mail"
        mb={4}
        InputLeftElement={
          <Icon as={<Envelope color={theme.colors.primary[700]} />} ml={4} />
        }
        onChangeText={setEmail}
      />

      <Button
        mb={2}
        label="Enviar"
        onPress={handleResetPassword}
        isLoading={isLoading}
      />
      <TouchableOpacity onPress={handleLogin}>
        <Text>Já possui uma conta? Acesse</Text>
      </TouchableOpacity>
    </VStack>
  );
};
