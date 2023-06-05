import * as Clipboard from 'expo-clipboard'
import { Button, Text, Toast } from 'native-base'
import React from 'react'

interface ButtonProps {
  idName: string
}
export const ButtonCopy: React.FC<ButtonProps> = ({ idName }) => {
  const emojis = ['😀', '🤰', '😍', '🌈', '🎉', '🌞']
  const randomIndex = Math.floor(Math.random() * emojis.length)
  const randomEmoji = emojis[randomIndex]

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(idName)
    Toast.show({
      title: `Copiado ${randomEmoji}`,
      duration: 3000, // 3 seconds
      placement: 'top',
      backgroundColor: 'primary.400',
    })
  }

  return (
    <Button
      bg="primary.500"
      width={'full'}
      height={16}
      _pressed={{ bgColor: 'primary.400' }}
      onPress={copyToClipboard}
      borderRadius={12}
    >
      <Text color="secondary.100" fontFamily={'body'} fontSize={16}>
        Enviar código 🤰
      </Text>
    </Button>
  )
}
