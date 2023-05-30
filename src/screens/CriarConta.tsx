import React, { useState } from "react";
import { Icon, Text, VStack, useTheme } from "native-base";
import { Envelope, Key, IdentificationBadge } from "phosphor-react-native";
import { useNavigation } from "@react-navigation/native";
import { Button } from "../components/Button";
import { TouchableOpacity } from "react-native";
import { Input } from "../components/Input";
import { criarNovaGestante } from "../firebase services/NovaGestante";
import { OndasDeParto } from "../icons/OndasParto";

export const CriarConta = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const theme = useTheme();
  const navigation = useNavigation();

  const handleCreateAccount = () => {
    setIsLoading(true);
    criarNovaGestante(email, password, nome)
      .then((userCredential) => {
        setIsLoading(false);
        console.log(userCredential.id);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  const handleLogin = () => {
    navigation.navigate("login");
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
        height="260"
        color="#121629"
        BgColor="transparent"
      />

      <Input
        mt={10}
        placeholder="Nome"
        mb={4}
        InputLeftElement={
          <Icon
            as={<IdentificationBadge color={theme.colors.primary[700]} />}
            ml={4}
          />
        }
        onChangeText={setNome}
      />
      <Input
        placeholder="E-mail"
        mb={4}
        InputLeftElement={
          <Icon as={<Envelope color={theme.colors.primary[700]} />} ml={4} />
        }
        onChangeText={setEmail}
      />
      <Input
        placeholder="Senha"
        InputLeftElement={
          <Icon as={<Key color={theme.colors.primary[700]} />} ml={4} />
        }
        secureTextEntry
        mb={4}
        onChangeText={setPassword}
      />

      <Button
        mb={2}
        label="Criar conta"
        onPress={handleCreateAccount}
        isLoading={isLoading}
      />
      <TouchableOpacity onPress={handleLogin}>
        <Text>Já possui uma conta? Acesse</Text>
      </TouchableOpacity>
    </VStack>
  );
};
