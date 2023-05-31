import auth from '@react-native-firebase/auth'
import { Box, Divider, Icon, Modal, Text, useTheme, VStack } from 'native-base'
import { Palette, SignOut, Trash } from 'phosphor-react-native'
import React, { useContext, useState } from 'react'
import { Alert } from 'react-native'

import { Button } from '../components/Button'
import GestanteContext from '../context/GestanteContext'
import { useAppThemeContext } from '../context/ThemeContext'
import { useContractionContext } from '../context/useContraction'
import { OndasDeParto } from '../icons/OndasParto'

export const Ajuda = () => {
  const theme = useTheme()
  const { gestante } = useContext(GestanteContext)
  const { toggleTheme } = useAppThemeContext()
  const { handleDelete } = useContractionContext()
  const [showModal, setShowModal] = useState(false)

  const handleLogout = () => {
    auth()
      .signOut()
      .catch(error => {
        console.log(error)
        return Alert.alert('logout', 'Não foi possivel sair')
      })
      .then(() => console.log('saiu'))
  }

  return (
    <VStack flex={1} backgroundColor={'primary.300'}>
      <Box flexDirection={'column'} alignItems={'center'} width={'full'} mt={5}>
        <OndasDeParto
          width="200"
          height="180"
          color="#121629"
          BgColor="transparent"
        />
        <Text mt={5} fontSize={20}>
          Bem vinda, {gestante.name}
        </Text>
      </Box>

      <Box
        pl={5}
        mt={5}
        width={'full'}
        height={10}
        justifyContent={'center'}
        backgroundColor={'primary.200'}
      >
        Configurações
      </Box>

      <VStack flex={1}>
        <Button
          borderRadius={0}
          justifyContent={'space-between'}
          leftIcon={
            <Icon as={<Trash color={theme.colors.secondary[800]} />} mr={5} />
          }
          label="Deletar informações"
          width={'full'}
          onPress={() => setShowModal(true)}
        />
        <Divider thickness={1} bg={'primary.200'} />
        <Button
          borderRadius={0}
          justifyContent={'space-between'}
          leftIcon={
            <Icon as={<Palette color={theme.colors.secondary[800]} />} mr={5} />
          }
          label="Trocar tema do App"
          width={'full'}
          onPress={toggleTheme}
        />
        <Divider thickness={1} bg={'primary.200'} />

        <Button
          borderRadius={0}
          justifyContent={'space-between'}
          leftIcon={
            <Icon as={<SignOut color={theme.colors.secondary[800]} />} mr={5} />
          }
          label="Sair da Conta"
          width={'full'}
          onPress={handleLogout}
        />

        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <Box alignItems={'center'} width={'80%'}>
            <Button
              backgroundColor={'primary.400'}
              width={'full'}
              label="Cancelar"
              onPress={() => {
                setShowModal(false)
              }}
            />

            <Button
              backgroundColor={'primary.400'}
              width={'full'}
              label="Deletar"
              onPress={() => {
                handleDelete()
                setShowModal(false)
              }}
            />
          </Box>
        </Modal>
      </VStack>
    </VStack>
  )
}
