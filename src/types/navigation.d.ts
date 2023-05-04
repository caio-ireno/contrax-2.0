import { ParamListBase } from '@react-navigation/native';

export declare global {
  namespace ReactNavigation {
    export interface RootParamList extends ParamListBase {
      contração: { gestante: Gestante };
      bolsaRota: undefined
      ajuda: undefined
      criarConta: undefined
      login: undefined
      profissional: undefined
    }
  }
}

export type RootParamList = ReactNavigation.RootParamList;



