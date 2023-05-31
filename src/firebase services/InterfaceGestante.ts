export interface Gestante {
  gestanteId: string
  id: string
  name: string
  contracoes: Array<{
    id: number
    duration: string
    hour: string
    frequency: string
  }>
  bolsa: {
    coloracao: string
    horario: string
  }
}
