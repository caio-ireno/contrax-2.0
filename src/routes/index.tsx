import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { NavigationContainer } from '@react-navigation/native'
import { useEffect, useState } from 'react'

import GestanteContext from '../context/GestanteContext'
import { getGestante } from '../firebase services/GetGestante'
import { Gestante } from '../firebase services/InterfaceGestante'
import { AppRoutes } from './gestante.routes'
import { LoginRoutes } from './login.routes'

export const Routes = () => {
  const [userAuth, setUserAuth] = useState<FirebaseAuthTypes.User>()
  const [gestante, setGestante] = useState<Gestante | null>(null)

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(async user => {
      if (user) {
        const gestanteData = await getGestante(user.uid)
        setGestante(gestanteData)
      }
      setUserAuth(user)
    })

    return subscriber
  }, [gestante])

  return (
    <NavigationContainer>
      {userAuth ? (
        <GestanteContext.Provider value={{ gestante, setGestante }}>
          <AppRoutes />
        </GestanteContext.Provider>
      ) : (
        <LoginRoutes />
      )}
    </NavigationContainer>
  )
}
