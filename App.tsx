import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { MedicamentosProvider } from './src/contextos/MedicamentosContexto';
import { ResponsaveisProvider } from './src/contextos/ResponsaveisContexto';
import { AutenticacaoProvider, useAutenticacao } from './src/contextos/AutenticacaoContexto';
import { Cores } from './src/constantes/Cores';
import Login from './src/telas/Login';
import NovoUsuario from './src/telas/NovoUsuario';
import Abas from './src/telas/Abas';
import AdicionarMedicamento from './src/telas/AdicionarMedicamento';
import AdicionarResponsavel from './src/telas/AdicionarResponsavel';

// Estas são as telas do Stack principal (o que fica "por cima" das abas).
// Início, Medicamentos, Responsáveis e Sobre vivem dentro do Abas.tsx (AbasParamList).
export type RootStackParamList = {
  Login: undefined;
  Cadastro: undefined;
  Abas: undefined;
  AdicionarMedicamento: undefined;
  AdicionarResponsavel: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function Navegacao() {
  const { usuario, carregando } = useAutenticacao();

  if (carregando) {
    // Enquanto o Firebase confere se já existe uma sessão salva.
    return (
      <View style={styles.telaCarregando}>
        <ActivityIndicator size="large" color={Cores.secundariaClara} />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {usuario ? (
        <>
          <Stack.Screen name="Abas" component={Abas} />
          <Stack.Screen name="AdicionarMedicamento" component={AdicionarMedicamento} />
          <Stack.Screen name="AdicionarResponsavel" component={AdicionarResponsavel} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Cadastro" component={NovoUsuario} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AutenticacaoProvider>
      <MedicamentosProvider>
        <ResponsaveisProvider>
          <NavigationContainer>
            <StatusBar style="light" />
            <Navegacao />
          </NavigationContainer>
        </ResponsaveisProvider>
      </MedicamentosProvider>
    </AutenticacaoProvider>
  );
}

const styles = StyleSheet.create({
  telaCarregando: {
    flex: 1,
    backgroundColor: Cores.primaria,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
