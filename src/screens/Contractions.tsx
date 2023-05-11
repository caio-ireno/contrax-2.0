import { HStack, Button as NativeBaseButton, Text, VStack } from "native-base";
import GestanteContext from "../context/GestanteContext";
import { ButtonCopy } from "../components/ButtonCopy";
import { TableList } from "../components/TableList";
import React, { useContext } from "react";
import { useContractionContext } from "../context/useContraction";

export const Contractions = () => {
  const { gestante } = useContext(GestanteContext);

  const {
    freqMinutes,
    freqSeconds,
    handleDelete,
    isActive,
    minutes,
    seconds,
    stopTimer,
    startTime,
  } = useContractionContext();

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
        mb={10}
        borderRadius={10}
        mt={3}
      >
        <Text fontFamily={"body"} fontSize={32}>
          {isActive
            ? `${minutes < 10 ? "0" + minutes : minutes}:${
                seconds < 10 ? "0" + seconds : seconds
              }`
            : "Iniciar"}
        </Text>
      </NativeBaseButton>

      <Text fontFamily={"body"} fontSize={32}>
        {`${freqMinutes < 10 ? "0" + freqMinutes : freqMinutes}:${
          freqSeconds < 10 ? "0" + freqSeconds : freqSeconds
        }`}
      </Text>

      <HStack
        borderTopRadius={5}
        px={4}
        width={"full"}
        alignItems={"center"}
        justifyContent={"space-between"}
        backgroundColor={"secondary.100"}
        height={10}
      >
        <Text fontFamily={"bold"} fontSize={16}>
          Horário
        </Text>
        <Text fontFamily={"bold"} fontSize={16}>
          Duração
        </Text>
        <Text fontFamily={"bold"} fontSize={16}>
          Frequência
        </Text>
      </HStack>
      <TableList data={gestante.contracoes} />
    </VStack>
  );
};
