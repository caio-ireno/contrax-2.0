import React from "react";
import { Box, Button, VStack } from "native-base";
import auth from "@react-native-firebase/auth";
import { Alert } from "react-native";

export const Ajuda = () => {
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
      <Button width={"full"} onPress={handleLogout}>
        Logout
      </Button>
    </VStack>
  );
};
