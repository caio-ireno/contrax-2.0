import { FlatList, HStack, Text } from 'native-base'
import React from 'react'

interface TableListProps {
  data: {
    id: number
    hour: string
    frequency: string
    duration: string
  }[]
}

export const TableList: React.FC<TableListProps> = ({ data }) => {
  return (
    <FlatList
      width={'full'}
      data={data}
      renderItem={({ item }) => (
        <HStack
          px={4}
          flex={1}
          alignItems={'center'}
          justifyContent={'space-between'}
          backgroundColor={'secondary.100'}
          height={10}
        >
          <Text>{item.hour}</Text>
          <Text>{item.duration}</Text>
          <Text>{item.frequency}</Text>
        </HStack>
      )}
    />
  )
}
