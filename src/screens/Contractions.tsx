import React, { useEffect, useState } from "react";
import { ButtonCopy } from "../components/ButtonCopy";
import {
  FlatList,
  HStack,
  Button as NativeBaseButton,
  Text,
  VStack,
} from "native-base";
import { TableList } from "../components/TableList";
import { useDebounce } from "../hooks/UseDebounce";
import {
  ContractionProps,
  ContractionsServices,
} from "../service/ContractionsService";

export const Contractions = () => {
  const [seconds, SetSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);

  const [freqSeconds, SetFreqSeconds] = useState(0);
  const [freqMinutes, setFreqMinutes] = useState(0);

  const [isActive, setIsActive] = useState(false);
  const [frequencyCalc, setFrequencyCalc] = useState(false);

  const [render, setRender] = useState(false);
  const [customInterval, SetCustomInterval] = useState<NodeJS.Timer>();
  const [rows, setRows] = useState<ContractionProps[]>([]);
  const { debounce } = useDebounce();

  useEffect(() => {
    debounce(() => {
      ContractionsServices.getAll().then((result) => {
        if (result instanceof Error) {
          alert(result.message);
          return;
        } else {
          setRows(result.data);
        }
      });
    });
  }, [render]);

  function getCurrentHour() {
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const paddedHour = String(hour).padStart(2, "0");
    const paddedMinute = String(minute).padStart(2, "0");
    return `${paddedHour}:${paddedMinute}`;
  }

  const startTime = () => {
    setIsActive(true);
    SetCustomInterval(
      setInterval(() => {
        changeTimer();
      }, 1000)
    );
  };
  const stopTimer = () => {
    setIsActive(false);
    if (customInterval) {
      clearInterval(customInterval);
    }
    handleCreateContraction();
    setMinutes(0);
    SetSeconds(0);
  };

  const changeTimer = () => {
    SetSeconds((prevState) => {
      if (prevState + 1 == 60) {
        setMinutes(minutes + 1);
        return 0;
      }
      return prevState + 1;
    });
  };

  const createContraction = (
    duration: string,
    hour: string,
    frequency: string
  ) => {
    return () => {
      ContractionsServices.create({
        duration,
        hour,
        frequency,
      }).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          setRender(!render);
        }
      });
    };
  };

  const handleCreateContraction = () => {
    const durations = `${minutes < 10 ? "0" + minutes : minutes}:${
      seconds < 10 ? "0" + seconds : seconds
    }`;

    const frequencys = `${freqMinutes < 10 ? "0" + freqMinutes : freqMinutes}:${
      freqSeconds < 10 ? "0" + freqSeconds : freqSeconds
    }`;

    const duration = durations;
    const hour = getCurrentHour();
    const frequency = frequencys;

    const createNewContraction = createContraction(duration, hour, frequency);
    createNewContraction();
  };
  return (
    <VStack flex={1} alignItems={"center"} px={8} pt={24}>
      <ButtonCopy mb={4} />
      <NativeBaseButton
        bg="secondary.700"
        width={"full"}
        _pressed={{ bgColor: "secondary.900" }}
        height={24}
        onPress={isActive ? stopTimer : startTime}
        mb={20}
      >
        <Text fontFamily={"body"} fontSize={32}>
          {isActive
            ? `${minutes < 10 ? "0" + minutes : minutes}:${
                seconds < 10 ? "0" + seconds : seconds
              }`
            : "Iniciar"}
        </Text>
      </NativeBaseButton>
      <HStack
        px={4}
        width={"full"}
        alignItems={"center"}
        justifyContent={"space-between"}
        backgroundColor={"secondary.100"}
        height={10}
      >
        <Text fontFamily={"bold"} fontSize={16}>
          Horario
        </Text>
        <Text fontFamily={"bold"} fontSize={16}>
          Duração
        </Text>
        <Text fontFamily={"bold"} fontSize={16}>
          Frequencia
        </Text>
      </HStack>
      <TableList data={rows} />
    </VStack>
  );
};
