import { createContext } from 'react'

import { Gestante } from '../firebase services/InterfaceGestante'

type GestanteContextType = {
  gestante: Gestante | null
  setGestante: (newGestante: Gestante) => void
}

const GestanteContext = createContext<GestanteContextType>({
  gestante: null,
  setGestante: () => {},
})

export default GestanteContext
