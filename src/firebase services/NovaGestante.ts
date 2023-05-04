import firestore from '@react-native-firebase/firestore'
import auth from "@react-native-firebase/auth"


interface NewGestante {
  id: string
  name: string;
  contracoes: Array<{
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

export const criarNovaGestante = async (email: string, password: string, nome: string): Promise<NewGestante> => {
  try {
    // Cria um novo usuário com email e senha
    const userCredential = await auth()
      .createUserWithEmailAndPassword(email, password)

    // Adiciona um novo documento para essa gestante no Firestore
    const gestanteRef = firestore().collection('gestantes').doc();
    await gestanteRef.set({
      name: nome,
      contracoes: [],
      bolsa: {
        coloracao: '',
        horario: ''
      },
      userId: userCredential.user?.uid
    });

    return {
      id: gestanteRef.id,
      name: nome,
      contracoes: [],
      bolsa: {
        coloracao: '',
        horario: ''
      }
    };

  } catch (error) {
    console.error(error);
    console.log(email)
    throw new Error('Erro ao criar nova gestante');
  }
};
