import { Center, Spinner } from 'native-base'

export const Loading = () => {
  return (
    <Center flex={1}>
      <Spinner color={'secondary.700'}></Spinner>
    </Center>
  )
}
