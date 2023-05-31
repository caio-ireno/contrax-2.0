import AsyncStorage from '@react-native-async-storage/async-storage'
import firestore from '@react-native-firebase/firestore'
import { createContext, useContext, useEffect, useState } from 'react'
import { Alert } from 'react-native'
import BackgroundTimer from 'react-native-background-timer'

import GestanteContext from './GestanteContext'

interface ContractionHook {
  seconds: number
  minutes: number

  isActive: boolean
  handleDelete: () => void
  startTime: () => void
  stopTimer: () => void
  handleDeleteId: (id: number) => void
}

interface AppThemeProviderProps {
  children: React.ReactNode
}

const ContractionContext = createContext<ContractionHook>({
  seconds: 0,
  minutes: 0,
  isActive: false,
  handleDelete: () => {},
  startTime: () => {},
  stopTimer: () => {},
  handleDeleteId: () => {},
})

export const useContractionContext = () => {
  return useContext(ContractionContext)
}

export const AppContraction: React.FC<AppThemeProviderProps> = ({
  children,
}) => {
  const { gestante } = useContext(GestanteContext)

  const [customInterval, SetCustomInterval] = useState<number | null>(null)
  const [seconds, SetSeconds] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [id, setId] = useState(0)

  const [isActive, setIsActive] = useState(false) //altera o estado do botão para multi função

  const [oldHour, setOldHour] = useState('')

  const storeData = async (value: string) => {
    try {
      await AsyncStorage.setItem('oldHour', value)
    } catch (error) {
      console.log('Erro ao armazenar valor no AsyncStorage:', error)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const value = await AsyncStorage.getItem('oldHour')
        if (value !== null) {
          console.log(value)
          setOldHour(value)
        }
      } catch (error) {
        console.log('Erro ao obter valor do AsyncStorage:', error)
      }
    }

    fetchData()
  }, [])

  function getCurrentHour() {
    const now = new Date()
    const hour = now.getHours()
    const minute = now.getMinutes()
    const seconds = now.getSeconds()
    const paddedHour = String(hour).padStart(2, '0')
    const paddedMinute = String(minute).padStart(2, '0')
    const paddedSeconds = String(seconds).padStart(2, '0')
    return `${paddedHour}:${paddedMinute}:${paddedSeconds}`
  }

  const startTime = () => {
    setIsActive(true)
    SetCustomInterval(
      BackgroundTimer.setInterval(() => {
        changeTimer()
      }, 1000),
    )
  }

  const stopTimer = () => {
    setIsActive(false)
    const durationMinutes = minutes
    const durationSeconds = seconds
    setMinutes(0)
    SetSeconds(0)
    if (customInterval) {
      BackgroundTimer.clearInterval(customInterval)
    }
    handleCreateContraction(durationMinutes, durationSeconds)
  }

  const changeTimer = () => {
    SetSeconds(prevState => {
      if (prevState === 59) {
        setMinutes(prevMinutes => prevMinutes + 1)
        return 0
      } else {
        return prevState + 1
      }
    })
  }

  const createContraction = (
    duration: string,
    hour: string,
    frequency: string,
    id: number,
  ) => {
    return async () => {
      const newContraction = { duration, hour, frequency, id }

      try {
        const gestanteRef = firestore()
          .collection('gestantes')
          .doc(gestante.gestanteId)

        const gestanteDoc = await gestanteRef.get()
        const gestanteData = gestanteDoc.data()

        do {
          id = Math.floor(Math.random() * 10000)
        } while (id === gestanteData.contracoes) // Verifique se o ID já existe no array

        newContraction.id = id

        await gestanteRef.update({
          contracoes: firestore.FieldValue.arrayUnion(newContraction),
        })
      } catch (error) {
        alert(error.message || 'Erro ao criar uma nova contração')
      }
    }
  }

  const calculateTimer = (hour1: string, hour2: string) => {
    const [hour1Hours, hour1Minutes, hour1Seconds] = hour1.split(':')
    const [hour2Hours, hour2Minutes, hour2Seconds] = hour2.split(':')

    const time1 = new Date()
    time1.setHours(
      Number(hour1Hours),
      Number(hour1Minutes),
      Number(hour1Seconds),
    )

    const time2 = new Date()
    time2.setHours(
      Number(hour2Hours),
      Number(hour2Minutes),
      Number(hour2Seconds),
    )

    const differenceInMilliseconds = Math.abs(time1.getTime() - time2.getTime())
    const hours = Math.floor(differenceInMilliseconds / (1000 * 60 * 60))
    const minutes = Math.floor(
      (differenceInMilliseconds % (1000 * 60 * 60)) / (1000 * 60),
    )
    const seconds = Math.floor((differenceInMilliseconds % (1000 * 60)) / 1000)

    return `${hours}:${String(minutes).padStart(2, '0')}:${String(
      seconds,
    ).padStart(2, '0')}`
  }

  const handleCreateContraction = (
    durationMinutes: number,
    durationSeconds: number,
  ) => {
    let frequency = ''

    const duration = `${
      durationMinutes < 10 ? '0' + durationMinutes : durationMinutes
    }:${durationSeconds < 10 ? '0' + durationSeconds : durationSeconds}`

    const hour = getCurrentHour()
    setOldHour(hour)
    storeData(hour)

    if (!oldHour) {
      frequency = '--:--'
    } else {
      const ArrayNumber = []
      const ArrayFrequency = calculateTimer(oldHour, hour).split(':')
      ArrayFrequency.forEach(value => {
        ArrayNumber.push(Number(value))
      })
      if (ArrayNumber[0] >= 1) {
        frequency = 'longa'
      } else {
        frequency = calculateTimer(oldHour, hour)
      }
    }

    const createNewContraction = createContraction(
      duration,
      hour,
      frequency,
      id,
    )
    createNewContraction()
  }

  const handleDeleteId = async (id: number) => {
    console.log(id)
    const updateContracao = []
    gestante.contracoes.map(contracao => {
      if (contracao.id != id) {
        updateContracao.push(contracao)
      }
    })
    console.log(updateContracao)
    try {
      const gestanteRef = firestore()
        .collection('gestantes')
        .doc(gestante?.gestanteId)
      await gestanteRef.update({
        contracoes: updateContracao,
      })
    } catch (error) {
      alert(error.message || 'Erro ao apagar registros')
    }
  }

  const handleDelete = async () => {
    try {
      const gestanteRef = firestore()
        .collection('gestantes')
        .doc(gestante?.gestanteId)
      await gestanteRef.update({
        contracoes: [],
      })
      setId(0)
      setOldHour('')
      setMinutes(0)
      SetSeconds(0)
      setIsActive(false)
      storeData('')

      if (customInterval) {
        clearInterval(customInterval)
      }
      console.log('delete do useContraction')
      Alert.alert('Registros Apagados com sucesso')
    } catch (error) {
      alert(error.message || 'Erro ao apagar registros')
    }
  }

  return (
    <ContractionContext.Provider
      value={{
        seconds,
        minutes,
        isActive,
        handleDelete,
        startTime,
        stopTimer,
        handleDeleteId,
      }}
    >
      {children}
    </ContractionContext.Provider>
  )
}
