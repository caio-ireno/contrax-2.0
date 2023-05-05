import React from "react";
import { Box, VStack } from "native-base";
import { Gestante } from "../../firebase services/InterfaceGestante";

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
      <Box>{gestante.name}</Box>
    </VStack>
  );
}
