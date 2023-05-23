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

  const [minutes, setMinutes] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [timerOn, setTimerOn] = useState(false);

  useEffect(() => {
    if (timerOn) startTimer();
    else BackgroundTimer.stopBackgroundTimer();
    return () => {
      BackgroundTimer.stopBackgroundTimer();
    };
  }, [timerOn]);

  const startTimer = () => {
    BackgroundTimer.runBackgroundTimer(() => {
      setSecondsLeft((secs) => {
        if (secs === 59) {
          setMinutes((prevMinutes) => prevMinutes + 1);
          return 0;
        } else {
          return secs + 1;
        }
      });
    }, 1000);
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

      <View>
        <Text>
          {minutes < 10 ? "0" + minutes : minutes}:
          {secondsLeft < 10 ? "0" + secondsLeft : secondsLeft}
        </Text>
        <Button
          label="start/stop"
          onPress={() => setTimerOn((timerOn) => !timerOn)}
        />
      </View>
    </VStack>
  );
};
