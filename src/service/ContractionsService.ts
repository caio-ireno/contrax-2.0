import { Api } from "./api/axios-config"

export interface ContractionProps {
  id: number
  hour: string;
  frequency: string;
  duration: string;
}

export interface ListaContractionsProps {
  id: number
  hour: string;
  frequency: string;
  duration: string;
}

type Contractions = {
  data: ContractionProps[]
}

const getAll = async (): Promise<Contractions | Error> => {
  try {
    const urlRelativa = "/contractions"
    const { data } = await Api.get(urlRelativa)

    if (data) {
      return {
        data
      }
    }

    return new Error('Erro ao listar os Registros')
  } catch (error) {
    console.error(error)
    return new Error(
      (error as { message: string }).message || 'Erro ao Carregar',
    )
  }
}

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await Api.delete<ListaContractionsProps>(`/contractions/${id}`)
  } catch (error) {
    console.error(error)
    return new Error((error as { message: string }).message || 'Erro ao apagar')
  }
}

const create = async (
  dados: Omit<ListaContractionsProps, 'id'>,
): Promise<number | Error> => {
  try {
    const { data } = await Api.post<ListaContractionsProps>('/contractions', dados)

    if (data) {
      return data.id
    }

    return new Error('Erro ao criar o Registro')
  } catch (error) {
    console.error(error)
    return new Error((error as { message: string }).message || 'Erro ao criar')
  }
}

export const ContractionsServices = {
  getAll,
  create,
  deleteById,
}