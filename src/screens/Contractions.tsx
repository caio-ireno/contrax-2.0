import React from "react";
import { ButtonCopy } from "../components/ButtonCopy";
import { HStack, Button as NativeBaseButton, Text, VStack } from "native-base";
import { TableList } from "../components/TableList";

import { useContraction } from "../hooks/useContraction";

export const Contractions = () => {
  const {
    seconds,
    minutes,
    freqSeconds,
    freqMinutes,
    isActive,
    rows,
    handleDelete,
    startTime,
    stopTimer,
  } = useContraction();

  return (
    <VStack flex={1} alignItems={"center"} px={8} pt={24} pb={4}>
      <ButtonCopy mb={4} />
      <NativeBaseButton
        bg="secondary.700"
        width={"full"}
        _pressed={{ bgColor: "secondary.900" }}
        height={24}
        onPress={isActive ? stopTimer : startTime}
        mb={2}
        borderRadius={10}
      >
        <Text fontFamily={"body"} fontSize={32}>
          {isActive
            ? `${minutes < 10 ? "0" + minutes : minutes}:${
                seconds < 10 ? "0" + seconds : seconds
              }`
            : "Iniciar"}
        </Text>
      </NativeBaseButton>

      <NativeBaseButton
        bg="secondary.700"
        width={"full"}
        _pressed={{ bgColor: "secondary.900" }}
        height={12}
        onPress={handleDelete}
        mb={20}
      >
        <Text fontFamily={"body"} fontSize={16}>
          Deletar tudo
        </Text>
      </NativeBaseButton>

      <Text fontFamily={"body"} fontSize={32}>
        {`${freqMinutes < 10 ? "0" + freqMinutes : freqMinutes}:${
          freqSeconds < 10 ? "0" + freqSeconds : freqSeconds
        }`}
      </Text>

      <HStack
        px={4}
        width={"full"}
        alignItems={"center"}
        justifyContent={"space-between"}
        backgroundColor={"secondary.100"}
        height={10}
      >
        <Text fontFamily={"bold"} fontSize={16}>
          Horario
        </Text>
        <Text fontFamily={"bold"} fontSize={16}>
          Duração
        </Text>
        <Text fontFamily={"bold"} fontSize={16}>
          Frequencia
        </Text>
      </HStack>
      <TableList data={rows} />
    </VStack>
  );
};
