import {
  Box,
  HStack,
  Icon,
  Modal,
  Button as NativeBaseButton,
  Pressable,
  Text,
  VStack,
} from "native-base";
import GestanteContext from "../context/GestanteContext";
import { ButtonCopy } from "../components/ButtonCopy";
import React, { useContext, useState } from "react";
import { useContractionContext } from "../context/useContraction";

export const Contractions = () => {
  const { gestante } = useContext(GestanteContext);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedContracao, setSelectedContracao] = useState(0);

  const handleLongPress = (contracao: number) => {
    setSelectedContracao(contracao);
    setShowDeleteModal(true);
    console.log("handle modal");
  };

  const { handleDeleteId, isActive, minutes, seconds, stopTimer, startTime } =
    useContractionContext();

  return (
    <VStack
      flex={1}
      alignItems={"center"}
      px={8}
      pt={24}
      //pb={4}
      backgroundColor={"primary.300"}
    >
      <ButtonCopy idName={gestante.id} />
      <NativeBaseButton
        bg="secondary.700"
        width={"full"}
        _pressed={{ bgColor: "secondary.900" }}
        height={24}
        onPress={isActive ? stopTimer : startTime}
        mb={6}
        borderRadius={12}
        mt={6}
      >
        <Text fontFamily={"body"} fontSize={32}>
          {isActive
            ? `${minutes < 10 ? "0" + minutes : minutes}:${
                seconds < 10 ? "0" + seconds : seconds
              }`
            : "Iniciar"}
        </Text>
      </NativeBaseButton>

      {gestante.contracoes.map((contracao) => {
        return (
          <Pressable
            key={contracao.id}
            width={"full"}
            px={4}
            py={2}
            borderRadius={16}
            mb={2}
            backgroundColor={"secondary.100"}
            _pressed={{ backgroundColor: "secondary.200" }}
            onLongPress={() => handleLongPress(contracao.id)}
          >
            <HStack
              style={{}}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Text>{contracao.hour}</Text>
              <VStack alignItems={"center"}>
                <Text fontFamily={"bold"}>Duração</Text>
                <Text>{contracao.duration}</Text>
              </VStack>
              <VStack alignItems={"center"}>
                <Text fontFamily={"bold"}>Frequência</Text>
                <Text>{contracao.frequency}</Text>
              </VStack>
            </HStack>
          </Pressable>
        );
      })}

      {showDeleteModal && (
        <Modal
          isOpen={showDeleteModal}
          justifyContent="center"
          alignItems="center"
        >
          <Box
            p={6}
            alignItems={"center"}
            backgroundColor={"primary.400"}
            width={"80%"}
          >
            <Text>Tem certeza que deseja excluir?</Text>
            <NativeBaseButton
              width={100}
              mt={6}
              onPress={() => setShowDeleteModal(false)}
            >
              Cancelar
            </NativeBaseButton>
            <NativeBaseButton
              mt={6}
              width={100}
              onPress={() => {
                handleDeleteId(selectedContracao);
                setSelectedContracao(null);
                setShowDeleteModal(false);
              }}
            >
              Excluir
            </NativeBaseButton>
          </Box>
        </Modal>
      )}
      {/* <TableList data={gestante.contracoes} /> */}
    </VStack>
  );
};
