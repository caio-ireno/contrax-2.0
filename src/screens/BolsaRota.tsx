import React, { useState } from "react";
import { Box, ScrollView, Select, Text, VStack } from "native-base";
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
    <ScrollView>
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
            <Select.Item label="esverdeado " value="esverdeado" />
          </Select>
        </VStack>

        <Text fontFamily={"body"} mt={5} textAlign={"justify"} p={4}>
          Naturalmente, a bolsa se rompe durante o trabalho de parto ou próximo
          das 39 semanas e não há problema nesses casos. No entanto, quando esse
          rompimento acontece antes da gestante iniciar o trabalho de parto ou,
          pelo menos, estar próxima da reta final da gravidez, é chamada de
          bolsa rota ou amniorrexe.
        </Text>

        {service !== "transparente" && (
          <Box backgroundColor={"secondary.700"} p={4}>
            <Text fontFamily={"body"} textAlign={"justify"}>
              Se a sua bolsa amniótica apresentar uma coloração
              amarelo-esverdeada, é importante buscar atendimento médico
              imediatamente, pois isso pode ser um sinal de presença de mecônio
              no líquido amniótico. O mecônio é uma substância escura e pegajosa
              que é produzida pelos intestinos do bebê e, em alguns casos, pode
              ser um sinal de sofrimento fetal. Portanto, se você notar que sua
              bolsa amniótica apresenta uma coloração amarelo-esverdeada, não
              hesite em buscar atendimento médico imediatamente para garantir a
              segurança e saúde do bebê e da mãe.
            </Text>
          </Box>
        )}

        <Box backgroundColor={"secondary.700"} p={4}>
          <Text fontFamily={"body"} textAlign={"justify"}>
            Se a sua bolsa amniótica é transparente, isso é geralmente um sinal
            positivo de que a gestação está progredindo normalmente. A bolsa
            amniótica é uma membrana que envolve o bebê e o líquido amniótico,
            oferecendo proteção e nutrição ao feto durante o desenvolvimento na
            barriga da mãe. A transparência da bolsa amniótica indica que o
            líquido está limpo e que o bebê está saudável. No entanto, é
            importante lembrar que cada gestação é única e que é sempre
            recomendado fazer o acompanhamento médico adequado para garantir a
            saúde e segurança da mãe e do bebê. Se você tiver qualquer dúvida ou
            preocupação em relação à sua bolsa amniótica ou à gestação em geral,
            não hesite em procurar atendimento médico.
          </Text>
        </Box>
      </VStack>
    </ScrollView>
  );
};
