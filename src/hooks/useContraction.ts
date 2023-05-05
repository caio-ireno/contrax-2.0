import { useContext, useEffect, useState } from "react";
import { useDebounce } from "./UseDebounce";
import GestanteContext from "../context/GestanteContext";
import firestore from '@react-native-firebase/firestore'
import { Gestante } from "../firebase services/InterfaceGestante";


interface ContractionHook {
  seconds: number;
  minutes: number;
  freqSeconds: number;
  freqMinutes: number;
  isActive: boolean;
  handleDelete: () => void;
  startTime: () => void;
  stopTimer: () => void;
}

export const useContraction = (): ContractionHook => {
  const { gestante } = useContext(GestanteContext);

  const [customInterval, SetCustomInterval] = useState<NodeJS.Timer>();
  const [customIntervalFreq, SetCustomIntervalFreq] = useState<NodeJS.Timer>();
  const [seconds, SetSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);

  const [freqSeconds, SetFreqSeconds] = useState(0);
  const [freqMinutes, setFreqMinutes] = useState(0);

  const [DurationFreqSeconds, SetDurationFreqSeconds] = useState(0);
  const [DurationFreqMinutes, setDurationFreqMinutes] = useState(0);

  const [isActive, setIsActive] = useState(false); //altera o estado do botão para multi função

  const [render, setRender] = useState(false); //Da um re render na tabela


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

    //Crio dois estados para armazenar os valore antes de zerar.
    SetDurationFreqSeconds(freqSeconds);
    setDurationFreqMinutes(freqMinutes);

    //Quando start, cronometro de frequencia nao funciona, apenas de duração.
    setFreqMinutes(0);
    SetFreqSeconds(0);

    //Limpar um intervalo  aso esteja sendo executado.
    if (customIntervalFreq) {
      clearInterval(customIntervalFreq);
    }

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
    return async () => {
      const newContraction = { duration, hour, frequency };
      const gestanteRef = firestore().collection('gestantes').doc(gestante.id);
      await gestanteRef.update({
        contracoes: firestore.FieldValue.arrayUnion(newContraction)
      });
      setRender(!render)
    };
  };


  const handleCreateContraction = (
    durationMinutes: number,
    durationSeconds: number
  ) => {
    let frequency = ''
    if (DurationFreqSeconds === 0) {
      frequency = '--:--'
    } else {

      const durationSecond = durationMinutes * 60 + durationSeconds;
      const freqSecond = DurationFreqMinutes * 60 + DurationFreqSeconds;
      const totalSeconds = freqSecond + durationSecond;
      const newFreqSeconds = totalSeconds % 60;
      const newFreqMinutes = freqMinutes + Math.floor(totalSeconds / 60);

      frequency = `${newFreqMinutes < 10 ? "0" + newFreqMinutes : newFreqMinutes
        }:${newFreqSeconds < 10 ? "0" + newFreqSeconds : newFreqSeconds}`;
    }


    const duration = `${durationMinutes < 10 ? "0" + durationMinutes : durationMinutes
      }:${durationSeconds < 10 ? "0" + durationSeconds : durationSeconds}`;

    const hour = getCurrentHour();

    const createNewContraction = createContraction(duration, hour, frequency);
    createNewContraction();
  };

  const handleDelete = async () => {
    try {
      const gestanteRef = firestore().collection('gestantes').doc(gestante?.id);
      await gestanteRef.update({
        contracoes: []
      });

      setRender(!render);
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



  return {
    seconds,
    minutes,
    freqSeconds,
    freqMinutes,
    isActive,
    handleDelete,
    startTime,
    stopTimer,
  }
}

export default useContraction;