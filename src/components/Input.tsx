import { IInputProps, Input as NativeBaseInput } from 'native-base'
import React from 'react'

export const Input = ({ ...rest }: IInputProps) => {
  return (
    <NativeBaseInput
      backgroundColor={'secondary.100'}
      placeholderTextColor={'primary.700'}
      height={12}
      size={'md'}
      borderWidth={0}
      fontFamily={'body'}
      color={'primary.700'}
      _focus={{
        borderWidth: 1,
        borderColor: 'secondary.700',
        backgroundColor: 'secondary.300',
      }}
      {...rest}
    />
  )
}
