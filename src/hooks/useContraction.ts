import { useEffect, useState } from "react";
import { ContractionProps, ContractionsServices } from "../service/ContractionsService";
import { useDebounce } from "./UseDebounce";

interface ContractionHook {
  seconds: number;
  minutes: number;
  freqSeconds: number;
  freqMinutes: number;
  rows: ContractionProps[],
  isActive: boolean;
  handleDelete: () => void;
  startTime: () => void;
  stopTimer: () => void;
}

export const useContraction = (): ContractionHook => {
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

    const frequency = `${newFreqMinutes < 10 ? "0" + newFreqMinutes : newFreqMinutes
      }:${newFreqSeconds < 10 ? "0" + newFreqSeconds : newFreqSeconds}`;

    const duration = `${durationMinutes < 10 ? "0" + durationMinutes : durationMinutes
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

  return {
    seconds,
    minutes,
    freqSeconds,
    freqMinutes,
    rows,
    isActive,
    handleDelete,
    startTime,
    stopTimer,
  }
}

export default useContraction;