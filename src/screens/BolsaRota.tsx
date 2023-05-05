import React, { useState } from "react";
import { Select, Text, VStack } from "native-base";
import { Check } from "phosphor-react-native";

import { SelectedHour } from "../components/SelectedHour";

export const BolsaRota = () => {
  const [service, setService] = useState("");
  const [hora, setHora] = useState("");
  const [minuto, setMinuto] = useState("");

  const setInfo = () => {
    if (service === "transparente" || "amarelo") {
      console.log("bolsa ruim");
    } else {
      console.log("bolsa boa");
    }
  };

  return (
    <VStack
      flex={1}
      backgroundColor={"primary.300"}
      alignItems={"center"}
      px={8}
      pt={24}
      pb={4}
    >
      <SelectedHour />
      <VStack width={"full"} mt={5}>
        <Text fontFamily={"body"} fontSize={12}>
          Horario de rompimento
        </Text>
        <Select
          placeholderTextColor={"black"}
          bgColor={"white"}
          width={"full"}
          placeholder="Coloração da bolsa"
          _selectedItem={{
            bg: "secondary.700",
            endIcon: <Check size="5" />,
          }}
          mt={1}
          onValueChange={(itemValue) => {
            setService(itemValue), setInfo;
          }}
        >
          <Select.Item label="transparente" value="transparente" />
          <Select.Item label="Amarelo" value="Amarelo" />
          <Select.Item label="Marrom" value="Marrom" />
          <Select.Item label="Roxo" value="Roxo" />
          <Select.Item label="Preto" value="Preto" />
        </Select>
      </VStack>
    </VStack>
  );
};
