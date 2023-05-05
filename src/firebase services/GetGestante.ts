import firestore from '@react-native-firebase/firestore';
import { Gestante } from './InterfaceGestante';


export const getGestante = async (userId: string): Promise<Gestante> => {
  try {
    // Obtém a referência ao documento da gestante com o ID fornecido
    const gestanteRef = firestore().collection('gestantes').where('userId', '==', userId);

    // Obtém os dados do documento e retorna um objeto Gestante com esses dados
    const gestanteQuery = await gestanteRef.get();
    if (!gestanteQuery.empty) {
      const gestanteDoc = gestanteQuery.docs[0];
      const gestanteData = gestanteDoc.data();
      return {
        id: gestanteDoc.id,
        name: gestanteData.name,
        contracoes: gestanteData.contracoes,
        bolsa: gestanteData.bolsa,
      }
    } else {
      throw new Error(`Documento da gestante com userId ${userId} não encontrado`);
    }
  } catch (error) {
    console.error(error);
    throw new Error(`Erro ao obter dados da gestante com userId ${userId}`);
  }
};
