import { Heading, Text, VStack } from "native-base";
import { Button } from "../../components/Button";
import { useNavigation } from "@react-navigation/native";
import { Input } from "../../components/Input";
import { useState } from "react";
import { getGestante } from "../../firebase services/GetGestante";
import { Gestante } from "../../firebase services/InterfaceGestante";
import { Alert } from "react-native";
import { OndasDeParto } from "../../icons/OndasParto";

export const Profissional = () => {
  const [gestanteId, setGestanteId] = useState("");
  const [gestante, setGestante] = useState<Gestante | null>(null);

  const navigation = useNavigation();

  const handlePregnentInfo = async () => {
    if (gestanteId) {
      const gestanteData = await getGestante(gestanteId);
      setGestante(gestanteData);
      navigation.navigate("gestanteInfo", { gestante: gestanteData });
    } else {
      return Alert.alert("Login", "Insira um ID valido");
    }
  };

  return (
    <VStack
      flex={1}
      alignItems={"center"}
      px={8}
      pt={24}
      backgroundColor={"primary.300"}
    >
      <OndasDeParto
        width="300"
        height="220"
        color="#121629"
        BgColor="transparent"
      />
      <Text mt={10} mb={2} fontSize={26}>
        Acesse sua conta
      </Text>
      <Input onChangeText={setGestanteId} mb={3} textAlign={"center"} />
      <Button label="Entrar" onPress={handlePregnentInfo} />
    </VStack>
  );
};
