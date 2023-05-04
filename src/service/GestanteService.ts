import { Api } from "./api/axios-config"

export interface GestanteProps {
  uuid: string;
  name: string;
  contractions: Array<{
    id: number;
    duration: string;
    hour: string;
    frequency: string;
  }>;
  bolsa: {
    coloracao: string;
    horario: string;
  };
}

export interface ListaContractionsProps {
  id: number
  duration: string;
  hour: string;
  frequency: string;
}

export interface ListaBolsaProps {
  coloracao: string
  horario: string
}
type Contractions = {
  data: ListaContractionsProps[]
}
type Gestantes = {
  data: GestanteProps[]
}

const getAllContractions = async (): Promise<Contractions | Error> => {
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

const deleteAll = async (id: number): Promise<void | Error> => {
  try {
    await Api.delete<ListaContractionsProps>(`/contractions/${id}`)
  } catch (error) {
    console.error(error)
    return new Error((error as { message: string }).message || 'Erro ao apagar')
  }
};

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
  deleteAll,
}