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
  const [customInterval, SetCustomInterval] = useState<NodeJS.Timer>();
  const [customIntervalFreq, SetCustomIntervalFreq] = useState<NodeJS.Timer>();
  const [seconds, SetSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);

  const [freqSeconds, SetFreqSeconds] = useState(0);
  const [freqMinutes, setFreqMinutes] = useState(0);

  const [DurationFreqSeconds, SetDurationFreqSeconds] = useState(0);
  const [DurationFreqMinutes, setDurationFreqMinutes] = useState(0);

  const [isActive, setIsActive] = useState(false);

  const [render, setRender] = useState(false);
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
    SetDurationFreqSeconds(freqSeconds);
    setDurationFreqMinutes(freqMinutes);
    setFreqMinutes(0);
    SetFreqSeconds(0);
    if (customIntervalFreq) {
      clearInterval(customIntervalFreq);
    }

    console.log(freqMinutes);
    console.log(freqSeconds);
    SetCustomInterval(
      setInterval(() => {
        changeTimer();
      }, 1000)
    );
  };

  const stopTimer = () => {
    setIsActive(false);
    const durationMinutes = minutes;
    const durationSeconds = seconds;
    setMinutes(0);
    SetSeconds(0);
    if (customInterval) {
      clearInterval(customInterval);
    }
    handleCreateContraction(durationMinutes, durationSeconds);
    SetCustomIntervalFreq(
      setInterval(() => {
        changeTimerFreq();
      }, 1000)
    );
  };

  const changeTimer = () => {
    SetSeconds((prevState) => {
      if (prevState === 59) {
        setMinutes((prevMinutes) => prevMinutes + 1);
        return 0;
      } else {
        return prevState + 1;
      }
    });
  };

  const changeTimerFreq = () => {
    SetFreqSeconds((prevState) => {
      if (prevState === 59) {
        setFreqMinutes((prevMinutes) => prevMinutes + 1);
        return 0;
      } else {
        return prevState + 1;
      }
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

  const handleCreateContraction = (
    durationMinutes: number,
    durationSeconds: number
  ) => {
    const durationSecond = durationMinutes * 60 + durationSeconds;
    const freqSecond = DurationFreqMinutes * 60 + DurationFreqSeconds;
    const totalSeconds = freqSecond + durationSecond;
    const newFreqSeconds = totalSeconds % 60;
    const newFreqMinutes = freqMinutes + Math.floor(totalSeconds / 60);

    const frequency = `${
      newFreqMinutes < 10 ? "0" + newFreqMinutes : newFreqMinutes
    }:${newFreqSeconds < 10 ? "0" + newFreqSeconds : newFreqSeconds}`;

    const duration = `${
      durationMinutes < 10 ? "0" + durationMinutes : durationMinutes
    }:${durationSeconds < 10 ? "0" + durationSeconds : durationSeconds}`;

    const hour = getCurrentHour();

    const createNewContraction = createContraction(duration, hour, frequency);
    createNewContraction();
  };

  const handleDelete = async () => {
    try {
      for (let i = 0; i < rows.length; i++) {
        await ContractionsServices.deleteAll(rows[i].id);
      }
      alert("Registros Apagados com sucesso");
      setFreqMinutes(0);
      SetFreqSeconds(0);
      setMinutes(0);
      SetSeconds(0);
      setIsActive(false);
      setRender(!render);
      if (customIntervalFreq) {
        clearInterval(customIntervalFreq);
      }
      if (customInterval) {
        clearInterval(customInterval);
      }
    } catch (error) {
      alert(error.message || "Erro ao apagar registros");
    }
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
        mb={2}
      >
        <Text fontFamily={"body"} fontSize={32}>
          {isActive
            ? `${minutes < 10 ? "0" + minutes : minutes}:${
                seconds < 10 ? "0" + seconds : seconds
              }`
            : "Iniciar"}
        </Text>
      </NativeBaseButton>

      <NativeBaseButton
        bg="secondary.700"
        width={"full"}
        _pressed={{ bgColor: "secondary.900" }}
        height={12}
        onPress={handleDelete}
        mb={20}
      >
        <Text fontFamily={"body"} fontSize={16}>
          Deletar tudo
        </Text>
      </NativeBaseButton>
      <Text fontFamily={"body"} fontSize={32}>
        {`${freqMinutes < 10 ? "0" + freqMinutes : freqMinutes}:${
          freqSeconds < 10 ? "0" + freqSeconds : freqSeconds
        }`}
      </Text>
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
