import React from "react";
import { Box, VStack } from "native-base";
import auth from "@react-native-firebase/auth";
import { Alert } from "react-native";
import useContraction from "../hooks/useContraction";
import { Button } from "../components/Button";
import { useAppThemeContext } from "../context/ThemeContext";

export const Ajuda = () => {
  const { toggleTheme } = useAppThemeContext();
  const { handleDelete } = useContraction();

  const handleLogout = () => {
    auth()
      .signOut()
      .catch((error) => {
        console.log(error);
        return Alert.alert("logout", "Não foi possivel sair");
      });
  };

  return (
    <VStack
      flex={1}
      alignItems={"center"}
      px={8}
      pt={24}
      pb={4}
      backgroundColor={"primary.300"}
    >
      <Button
        label="Sair da Conta"
        width={"full"}
        onPress={handleLogout}
        mb={5}
      />
      <Button
        label="Deletar informações"
        width={"full"}
        onPress={handleDelete}
        mb={5}
      />

      <Button label="Trocar tema do App" width={"full"} onPress={toggleTheme} />
    </VStack>
  );
};
