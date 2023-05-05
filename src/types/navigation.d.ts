import { ParamListBase } from '@react-navigation/native';

export declare global {
  namespace ReactNavigation {
    export interface RootParamList extends ParamListBase {
      contração: undefined
      bolsaRota: undefined
      ajuda: undefined
      criarConta: undefined
      login: undefined
      profissional: undefined
      gestanteInfo: { gestante: Gestante }
    }
  }
}

export type RootParamList = ReactNavigation.RootParamList;



