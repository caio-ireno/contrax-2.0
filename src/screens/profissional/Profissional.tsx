import { Heading, VStack } from "native-base";
import { LogoCompleto } from "../../icons/LogoCompleto";
import { Button } from "../../components/Button";
import { useNavigation } from "@react-navigation/native";
import { Input } from "../../components/Input";
import { useState } from "react";
import firestore from "@react-native-firebase/firestore";
import { getGestante } from "../../firebase services/GetGestante";
import { Gestante } from "../../firebase services/InterfaceGestante";

export const Profissional = () => {
  const [gestanteId, setGestanteId] = useState("");
  const [gestante, setGestante] = useState<Gestante | null>(null);

  const navigation = useNavigation();

  const handlePregnentInfo = async () => {
    const gestanteData = await getGestante(gestanteId);
    setGestante(gestanteData);
    navigation.navigate("gestanteInfo", { gestante: gestanteData });
  };

  return (
    <VStack
      flex={1}
      alignItems={"center"}
      px={8}
      pt={24}
      backgroundColor={"primary.300"}
    >
      <LogoCompleto width="300" height="260" color="#121629" />
      <Heading mb={5}>Acesse sua conta</Heading>
      <Input onChangeText={setGestanteId} mb={5} />
      <Button label="Entrar" onPress={handlePregnentInfo} />
    </VStack>
  );
};
