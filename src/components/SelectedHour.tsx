import React, { useState } from "react";
import { Box, Input, Text, VStack } from "native-base";

export function SelectedHour() {
  const [text, setText] = useState("");

  const handleTextChange = (newText) => {
    // Formata a entrada do usuário
    const formattedText = newText
      .replace(/[^0-9]/g, "")
      .substring(0, 4)
      .replace(/^(.{2})/, "$1:");

    // Atualiza o estado do componente com a nova string formatada
    setText(formattedText);
  };

  return (
    <VStack>
      <Text fontFamily={"body"} fontSize={12}>
        Horario de rompimento
      </Text>
      <Input
        backgroundColor={"secondary.100"}
        placeholderTextColor={"primary.700"}
        size={"md"}
        borderWidth={0}
        fontFamily={"body"}
        color={"primary.700"}
        _focus={{
          borderWidth: 1,
          borderColor: "secondary.700",
          backgroundColor: "secondary.300",
        }}
        textAlign={"center"}
        maxLength={5}
        width={"full"}
        value={text}
        onChangeText={handleTextChange}
      />
    </VStack>
  );
}
