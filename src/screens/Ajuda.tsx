import React, { useEffect, useState } from "react";
import { Text, VStack, View } from "native-base";
import auth from "@react-native-firebase/auth";
import { Alert } from "react-native";
import { Button } from "../components/Button";
import { useAppThemeContext } from "../context/ThemeContext";
import { useContractionContext } from "../context/useContraction";
import BackgroundTimer from "react-native-background-timer";

export const Ajuda = () => {
  const { toggleTheme } = useAppThemeContext();
  const { handleDelete } = useContractionContext();

  const [hour1, setHour1] = useState("");
  const [hour2, setHour2] = useState("");

  function getCurrentHour() {
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const seconds = now.getSeconds();
    const paddedHour = String(hour).padStart(2, "0");
    const paddedMinute = String(minute).padStart(2, "0");
    const paddedSeconds = String(seconds).padStart(2, "0");
    return `${paddedHour}:${paddedMinute}:${paddedSeconds}`;
  }

  const calculateTimer = () => {
    const [hour1Hours, hour1Minutes, hour1Seconds] = hour1.split(":");
    const [hour2Hours, hour2Minutes, hour2Seconds] = hour2.split(":");

    const time1 = new Date();
    time1.setHours(
      Number(hour1Hours),
      Number(hour1Minutes),
      Number(hour1Seconds)
    );

    const time2 = new Date();
    time2.setHours(
      Number(hour2Hours),
      Number(hour2Minutes),
      Number(hour2Seconds)
    );

    const differenceInMilliseconds = Math.abs(
      time1.getTime() - time2.getTime()
    );
    const hours = Math.floor(differenceInMilliseconds / (1000 * 60 * 60));
    const minutes = Math.floor(
      (differenceInMilliseconds % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((differenceInMilliseconds % (1000 * 60)) / 1000);

    return `${hours}:${String(minutes).padStart(2, "0")}:${String(
      seconds
    ).padStart(2, "0")}`;
  };

  const handleLogout = () => {
    auth()
      .signOut()
      .catch((error) => {
        console.log(error);
        return Alert.alert("logout", "Não foi possivel sair");
      })
      .then(() => console.log("saiu"));
  };

  return (
    <VStack
      flex={1}
      alignItems={"center"}
      px={8}
      pt={24}
      pb={4}
      backgroundColor={"primary.300"}
    >
      <Button
        label="Deletar informações"
        width={"full"}
        onPress={handleDelete}
        mb={5}
      />
      <Button
        label="Sair da Conta"
        width={"full"}
        onPress={handleLogout}
        mb={5}
      />
      <Button label="Trocar tema do App" width={"full"} onPress={toggleTheme} />

      <View mt={10}>
        <Button
          mb={10}
          label="hour1"
          onPress={() => setHour1(getCurrentHour())}
        />
        <Button label="hour2" onPress={() => setHour2(getCurrentHour())} />
      </View>

      <Text>Hora 1: {hour1}</Text>
      <Text>Hora 2: {hour2}</Text>
      <Text>Diferença: {calculateTimer()}</Text>
    </VStack>
  );
};
