import React from "react";
import { Box, Text, VStack } from "native-base";
import { Gestante } from "../../firebase services/InterfaceGestante";
import { TableList } from "../../components/TableList";

interface GestanteInfoProps {
  route: {
    params: {
      gestante: Gestante;
    };
  };
}

export function GestanteInfo({ route }: GestanteInfoProps) {
  const { gestante } = route.params;
  return (
    <VStack
      flex={1}
      alignItems={"center"}
      px={8}
      pt={24}
      backgroundColor={"primary.300"}
    >
      <Box
        width="full"
        backgroundColor={"secondary.900"}
        height={16}
        borderWidth={0}
        borderRadius={5}
        fontFamily={"body"}
        color={"primary.700"}
        mb={5}
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection={"row"}
      >
        <Text fontWeight={"bold"} fontSize={24}>
          {gestante.name}
        </Text>
      </Box>
      <Box
        width="full"
        backgroundColor={"secondary.100"}
        height={10}
        borderWidth={0}
        borderRadius={5}
        fontFamily={"body"}
        color={"primary.700"}
        mb={5}
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection={"row"}
      >
        <Text fontWeight={"bold"}>Coloração: </Text>
        {gestante.bolsa.coloracao}
      </Box>

      <Box
        width="full"
        backgroundColor={"secondary.100"}
        height={10}
        borderWidth={0}
        borderRadius={5}
        fontFamily={"body"}
        color={"primary.700"}
        mb={5}
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection={"row"}
      >
        <Text fontWeight={"bold"}>Horário: </Text>
        {gestante.bolsa.horario}
      </Box>

      <TableList data={gestante.contracoes} />
    </VStack>
  );
}
