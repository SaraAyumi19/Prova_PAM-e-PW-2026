import { View, Text, StyleSheet, Image } from 'react-native';

export default function Criadores() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Mestres Supremos (Criadores)</Text>

      <View style={styles.card}>
        <Text style={styles.nome}>Criador 1</Text>
        <Text style={styles.funcao}>Especialista em Feitiços de Movimento (DeviceMotion)</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.nome}>Criador 2</Text>
        <Text style={styles.funcao}>Arquiteto de Passos Sagrados (Pedometer)</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a102f', padding: 20, justifyContent: 'center', alignItems: 'center' },
  titulo: { fontSize: 22, fontWeight: 'bold', color: '#ffb703', marginBottom: 30 },
  card: { backgroundColor: '#2a1b4e', width: '100%', padding: 20, borderRadius: 12, marginBottom: 20, alignItems: 'center' },
  nome: { fontSize: 18, fontWeight: 'bold', color: '#fff', marginBottom: 5 },
  funcao: { fontSize: 14, color: '#b0a0d0', textAlign: 'center' },
});