import React, { useContext, useState } from "react";
import {
  Avatar,
  Box,
  Circle,
  Icon,
  Modal,
  Text,
  VStack,
  useTheme,
} from "native-base";
import auth from "@react-native-firebase/auth";
import { Alert } from "react-native";
import { Button } from "../components/Button";
import { useAppThemeContext } from "../context/ThemeContext";
import { useContractionContext } from "../context/useContraction";
import GestanteContext from "../context/GestanteContext";
import { Logo } from "../icons/Logo";
import { Trash, SignOut, Palette } from "phosphor-react-native";

export const Ajuda = () => {
  const theme = useTheme();
  const { gestante } = useContext(GestanteContext);
  const { toggleTheme } = useAppThemeContext();
  const { handleDelete } = useContractionContext();
  const [showModal, setShowModal] = useState(false);
  const img = require("../assets/pregnant1.png");

  const handleLogout = () => {
    auth()
      .signOut()
      .catch((error) => {
        console.log(error);
        return Alert.alert("logout", "Não foi possivel sair");
      })
      .then(() => console.log("saiu"));
  };

  return (
    <VStack flex={1} pt={10} backgroundColor={"primary.300"}>
      <Box py={5} flexDirection={"column"} alignItems={"center"} width={"full"}>
        <Avatar size={100} source={img} backgroundColor={"transparent"} />
        <Text mt={3} fontSize={20}>
          Bem vinda, {gestante.name}
        </Text>
      </Box>

      <Box
        pl={5}
        mb={5}
        mt={5}
        width={"full"}
        height={10}
        justifyContent={"center"}
        backgroundColor={"primary.200"}
      >
        Configurações
      </Box>
      <VStack flex={1} px={8} pb={4}>
        <Button
          justifyContent={"space-between"}
          leftIcon={<Icon as={<Trash color={theme.colors.primary[700]} />} />}
          label="Deletar informações"
          width={"full"}
          onPress={() => setShowModal(true)}
          mb={5}
        />

        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <Box alignItems={"center"} width={"80%"}>
            <Button
              mb={2}
              backgroundColor={"primary.400"}
              width={"full"}
              label="Cancelar"
              onPress={() => {
                setShowModal(false);
              }}
            />

            <Button
              backgroundColor={"primary.400"}
              width={"full"}
              label="Deletar"
              onPress={() => {
                handleDelete();
                setShowModal(false);
              }}
            />
          </Box>
        </Modal>
        <Button
          justifyContent={"space-between"}
          leftIcon={<Icon as={<SignOut color={theme.colors.primary[700]} />} />}
          label="Sair da Conta"
          width={"full"}
          onPress={handleLogout}
          mb={5}
        />
        <Button
          justifyContent={"space-between"}
          leftIcon={<Icon as={<Palette color={theme.colors.primary[700]} />} />}
          mb={5}
          label="Trocar tema do App"
          width={"full"}
          onPress={toggleTheme}
        />
      </VStack>
    </VStack>
  );
};
