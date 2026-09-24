import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function Introducao({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>🔮 Mago dos Sensores 🔮</Text>
      <Text style={styles.descricao}>
        Aprenda a dominar os elementos utilizando a energia do seu próprio corpo!
      </Text>
      
      <View style={styles.instrucoes}>
        <Text style={styles.instrucaoItem}>🔥 Movimentos fortes: Feitiços de Fogo</Text>
        <Text style={styles.instrucaoItem}>🌊 Movimento suave/inclinado: Feitiços de Água</Text>
        <Text style={styles.instrucaoItem}>⚡ Mover pros lados: Feitiços de Raio</Text>
        <Text style={styles.instrucaoItem}>🦶 Caminhar na vida real: Feitiços de Terra</Text>
      </View>

      <TouchableOpacity 
        style={styles.botao} 
        onPress={() => navigation.navigate('Jogo')}
      >
        <Text style={styles.textoBotao}>Iniciar Jornada</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a102f', alignItems: 'center', justifyContent: 'center', padding: 20 },
  titulo: { fontSize: 26, fontWeight: 'bold', color: '#e0d0ff', marginBottom: 15, textAlign: 'center' },
  descricao: { fontSize: 16, color: '#b0a0d0', textAlign: 'center', marginBottom: 25 },
  instrucoes: { backgroundColor: '#2a1b4e', padding: 15, borderRadius: 10, width: '100%', marginBottom: 30 },
  instrucaoItem: { color: '#ffffff', fontSize: 14, marginVertical: 5 },
  botao: { backgroundColor: '#7b2cbf', paddingVertical: 15, paddingHorizontal: 40, borderRadius: 25 },
  textoBotao: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});