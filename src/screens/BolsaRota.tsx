import firestore from '@react-native-firebase/firestore'
import { Box, HStack, ScrollView, Select, Text, VStack } from 'native-base'
import { Check } from 'phosphor-react-native'
import React, { useContext, useEffect, useState } from 'react'

import GestanteContext from '../context/GestanteContext'
import { Gestante } from '../firebase services/InterfaceGestante'

export const BolsaRota = () => {
  const [horario, setHorario] = useState('')
  const [coloracao, setColoracao] = useState('')
  const { gestante } = useContext(GestanteContext)

  const [hour, setHour] = useState('')
  const [minute, setMinute] = useState('')
  const hourArray = []
  const minuteArray = []

  // Preenchendo o array de horas
  for (let hour = 0; hour < 24; hour++) {
    // Formata o número da hora com dois dígitos
    const formattedHour = hour.toString().padStart(2, '0')
    hourArray.push(formattedHour)
  }

  // Preenchendo o array de minutos
  for (let minute = 0; minute < 60; minute++) {
    // Formata o número do minuto com dois dígitos
    const formattedMinute = minute.toString().padStart(2, '0')
    minuteArray.push(formattedMinute)
  }

  useEffect(() => {
    if (coloracao === '' && hour === '' && minute === '') {
      setColoracao(gestante.bolsa.coloracao)
      if (gestante.bolsa.horario === '') {
        setHour('')
        setMinute('')
      } else {
        const horas = gestante.bolsa.horario.split(':')
        setHour(horas[0])
        setMinute(horas[1])
      }
    } else {
      setHorario(hour + ':' + minute)
      const changeColorBolsaRota = async () => {
        try {
          const NewBolsa: Partial<Gestante> = { bolsa: { coloracao, horario } }
          const gestanteRef = firestore()
            .collection('gestantes')
            .doc(gestante.gestanteId)
          await gestanteRef.update(NewBolsa)
        } catch (error) {
          console.log(error)
        }
      }

      changeColorBolsaRota()
    }
  }, [
    coloracao,
    horario,
    hour,
    minute,
    gestante.bolsa.coloracao,
    gestante.bolsa.horario,
  ])

  return (
    <ScrollView backgroundColor={'primary.300'}>
      <VStack
        flex={1}
        backgroundColor={'primary.300'}
        alignItems={'center'}
        px={8}
        pt={16}
        pb={6}
      >
        <VStack>
          <Text color="primary" fontFamily={'body'} fontSize={12}>
            Horario de rompimento
          </Text>

          <HStack width={'full'} justifyContent={'center'}>
            <Select
              borderRadius={15}
              placeholderTextColor={'black'}
              placeholder={hour !== '' ? hour : 'Horas'}
              bgColor={'white'}
              width={'full'}
              flex={1}
              _selectedItem={{
                bg: 'secondary.700',
                endIcon: <Check size="5" />,
              }}
              mt={1}
              onValueChange={itemValue => {
                setHour(itemValue)
              }}
            >
              {hourArray.map(hour => {
                return <Select.Item key={hour} label={hour} value={hour} />
              })}
            </Select>
            <Select
              borderRadius={15}
              placeholderTextColor={'black'}
              bgColor={'white'}
              placeholder={minute !== '' ? minute : 'Minutos'}
              width={'full'}
              flex={1}
              _selectedItem={{
                bg: 'secondary.700',
                endIcon: <Check size="5" />,
              }}
              mt={1}
              onValueChange={itemValue => {
                setMinute(itemValue)
              }}
            >
              {minuteArray.map(minute => {
                return (
                  <Select.Item key={minute} label={minute} value={minute} />
                )
              })}
            </Select>
          </HStack>
        </VStack>

        <VStack width={'full'} mt={4}>
          <Text fontFamily={'body'} fontSize={12}>
            Coloração da bolsa
          </Text>
          <Select
            borderRadius={15}
            placeholderTextColor={'black'}
            bgColor={'white'}
            width={'full'}
            placeholder={coloracao !== '' ? coloracao : 'Coloração da bolsa'}
            _selectedItem={{
              bg: 'secondary.700',
              endIcon: <Check size="5" />,
            }}
            mt={1}
            onValueChange={itemValue => {
              setColoracao(itemValue)
            }}
          >
            <Select.Item label="transparente" value="transparente" />
            <Select.Item label="Amarelo" value="Amarelo" />
            <Select.Item label="Marrom" value="Marrom" />
            <Select.Item label="esverdeado " value="Esverdeado" />
          </Select>
        </VStack>

        <Box borderRadius={15} backgroundColor={'secondary.100'} p={4} mt={4}>
          <Text fontFamily={'body'} textAlign={'justify'}>
            Naturalmente, a bolsa se rompe durante o trabalho de parto ou
            próximo das 39 semanas e não há problema nesses casos. No entanto,
            quando esse rompimento acontece antes da gestante iniciar o trabalho
            de parto ou, pelo menos, estar próxima da reta final da gravidez, é
            chamada de bolsa rota ou amniorrexe.
          </Text>
        </Box>

        {coloracao !== 'transparente' && coloracao !== '' && (
          <Box
            borderRadius={15}
            borderWidth={1}
            borderColor={'red.500'}
            backgroundColor={'red.100'}
            p={4}
            mt={4}
          >
            <Text fontFamily={'body'} textAlign={'justify'}>
              Se a sua bolsa amniótica apresentar uma coloração
              amarelo-esverdeada, é importante buscar atendimento médico
              imediatamente, pois isso pode ser um sinal de presença de mecônio
              no líquido amniótico. O mecônio é uma substância escura e pegajosa
              que é produzida pelos intestinos do bebê e, em alguns casos, pode
              ser um sinal de sofrimento fetal. Portanto, se você notar que sua
              bolsa amniótica apresenta uma coloração amarelo-esverdeada, não
              hesite em buscar atendimento médico imediatamente para garantir a
              segurança e saúde do bebê e da mãe.
            </Text>
          </Box>
        )}

        {coloracao === 'transparente' && (
          <Box
            borderRadius={15}
            borderWidth={1}
            borderColor={'emerald.500'}
            backgroundColor={'emerald.100'}
            p={4}
            mt={4}
          >
            <Text fontFamily={'body'} textAlign={'justify'}>
              Se a sua bolsa amniótica é transparente, isso é geralmente um
              sinal positivo de que a gestação está progredindo normalmente. A
              bolsa amniótica é uma membrana que envolve o bebê e o líquido
              amniótico, oferecendo proteção e nutrição ao feto durante o
              desenvolvimento na barriga da mãe. A transparência da bolsa
              amniótica indica que o líquido está limpo e que o bebê está
              saudável. No entanto, é importante lembrar que cada gestação é
              única e que é sempre recomendado fazer o acompanhamento médico
              adequado para garantir a saúde e segurança da mãe e do bebê. Se
              você tiver qualquer dúvida ou preocupação em relação à sua bolsa
              amniótica ou à gestação em geral, não hesite em procurar
              atendimento médico.
            </Text>
          </Box>
        )}
      </VStack>
    </ScrollView>
  )
}
