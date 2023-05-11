import React, { useContext, useEffect, useState } from "react";
import { Box, ScrollView, Select, Text, VStack } from "native-base";
import { Check } from "phosphor-react-native";
import firestore from "@react-native-firebase/firestore";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

import GestanteContext from "../context/GestanteContext";
import { Gestante } from "../firebase services/InterfaceGestante";
import { Input } from "../components/Input";

export const BolsaRota = () => {
  const [horario, setHorario] = useState("");
  const [coloracao, setColoracao] = useState("");

  const { gestante } = useContext(GestanteContext);

  const handleTextChange = (newText) => {
    // Formata a entrada do usuário
    const formattedText = newText
      .replace(/[^0-9]/g, "")
      .substring(0, 4)
      .replace(/^(.{2})/, "$1:");

    // Atualiza o estado do componente com a nova string formatada
    setHorario(formattedText);
  };

  useEffect(() => {}, []);

  useEffect(() => {
    if (coloracao === "" && horario === "") {
      setColoracao(gestante.bolsa.coloracao);
      setHorario(gestante.bolsa.horario);
    } else {
      const changeColorBolsaRota = async () => {
        const NewBolsa: Partial<Gestante> = { bolsa: { coloracao, horario } };
        const gestanteRef = firestore()
          .collection("gestantes")
          .doc(gestante.id);
        await gestanteRef.update(NewBolsa);
      };

      changeColorBolsaRota();
    }
  }, [coloracao, horario, gestante.bolsa.coloracao, gestante.bolsa.horario]);

  return (
    <ScrollView backgroundColor={"primary.300"}>
      <VStack
        flex={1}
        backgroundColor={"primary.300"}
        alignItems={"center"}
        px={8}
        pt={24}
        pb={4}
      >
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
            value={horario}
            onChangeText={handleTextChange}
          />
        </VStack>

        <VStack width={"full"} mt={5}>
          <Text fontFamily={"body"} fontSize={12}>
            Coloração da bolsa
          </Text>
          <Select
            placeholderTextColor={"black"}
            bgColor={"white"}
            width={"full"}
            placeholder={coloracao !== "" ? coloracao : "Coloração da bolsa"}
            _selectedItem={{
              bg: "secondary.700",
              endIcon: <Check size="5" />,
            }}
            mt={1}
            onValueChange={(itemValue) => {
              setColoracao(itemValue);
            }}
          >
            <Select.Item label="transparente" value="transparente" />
            <Select.Item label="Amarelo" value="Amarelo" />
            <Select.Item label="Marrom" value="Marrom" />
            <Select.Item label="esverdeado " value="Esverdeado" />
          </Select>
        </VStack>

        <Text fontFamily={"body"} mt={5} textAlign={"justify"} p={4}>
          Naturalmente, a bolsa se rompe durante o trabalho de parto ou próximo
          das 39 semanas e não há problema nesses casos. No entanto, quando esse
          rompimento acontece antes da gestante iniciar o trabalho de parto ou,
          pelo menos, estar próxima da reta final da gravidez, é chamada de
          bolsa rota ou amniorrexe.
        </Text>

        {coloracao !== "transparente" && coloracao !== "" && (
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

        {coloracao === "transparente" && (
          <Box backgroundColor={"secondary.700"} p={4}>
            <Text fontFamily={"body"} textAlign={"justify"}>
              Se a sua bolsa amniótica é transparente, isso é geralmente um
              sinal positivo de que a gestação está progredindo normalmente. A
              bolsa amniótica é uma membrana que envolve o bebê e o líquido
              amniótico, oferecendo proteção e nutrição ao feto durante o
              desenvolvimento na barriga da mãe. A transparência da bolsa
              amniótica indica que o líquido está limpo e que o bebê está
              saudável. No entanto, é importante lembrar que cada gestação é
              única e que é sempre recomendado fazer o acompanhamento médico
              adequado para garantir a saúde e segurança da mãe e do bebê. Se
              você tiver qualquer dúvida ou preocupação em relação à sua bolsa
              amniótica ou à gestação em geral, não hesite em procurar
              atendimento médico.
            </Text>
          </Box>
        )}
      </VStack>
    </ScrollView>
  );
};
