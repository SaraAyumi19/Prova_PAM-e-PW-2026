import { View, Text, StyleSheet, TouchableOpacity, Platform, PermissionsAndroid } from 'react-native';
import { useEffect, useState } from 'react';
import { DeviceMotion, Pedometer } from 'expo-sensors';

const FASES = [
  { id: 1, nome: "Treino de Fogo", objetivo: "Balance o celular com força para lançar uma Bola de Fogo!", tipo: "fogo" },
  { id: 2, nome: "Invocação de Água", objetivo: "Incline o celular suavemente para os lados para invocar uma Onda de Água!", tipo: "agua" },
  { id: 3, nome: "Passos da Terra", objetivo: "Dê 5 passos no mundo real para erguer um Escudo de Pedra!", tipo: "terra" },
  { id: 4, nome: "Tempestade de Raios", objetivo: "Balance rápido o celular de um lado para o outro para soltar um Raio!", tipo: "raio" },
  { id: 5, nome: "Duelo do Mago Supremo", objetivo: "Combine um movimento forte e dê 2 passos para derrotar o Chefe Final!", tipo: "chefe" }
];

export default function Jogo() {
  const [faseAtual, setFaseAtual] = useState(0);
  const [magiaLancada, setMagiaLancada] = useState("Aguardando gesto...");
  const [passosIniciais, setPassosIniciais] = useState(0);
  const [passosContados, setPassosContados] = useState(0);
  const [faseConcluida, setFaseConcluida] = useState(false);

  // Monitoramento dos Movimentos do Aparelho
  useEffect(() => {
    DeviceMotion.setUpdateInterval(150);
    const inscricaoMotion = DeviceMotion.addListener((monitor) => {
      const aceleracao = monitor.acceleration;
      const rotacao = monitor.rotation;

      if (!aceleracao || faseConcluida) return;

      const forcaGeral = Math.abs(aceleracao.x) + Math.abs(aceleracao.y) + Math.abs(aceleracao.z);
      const fase = FASES[faseAtual];

      // Fase 1: Magia de Fogo (Aceleração forte)
      if (fase.tipo === 'fogo' && forcaGeral > 12) {
        dispararMagia("🔥 Bola de Fogo Conjurada!");
      }
      // Fase 2: Magia de Água (Inclinação suave no eixo Y ou Z)
      else if (fase.tipo === 'agua' && rotacao && Math.abs(rotacao.beta) > 0.8) {
        dispararMagia("🌊 Onda de Água Conjurada!");
      }
      // Fase 4: Magia de Raio (Movimento rápido no eixo X)
      else if (fase.tipo === 'raio' && Math.abs(aceleracao.x) > 8) {
        dispararMagia("⚡ Tempestade de Raios Conjurada!");
      }
      // Fase 5: Chefe Final (Aceleração + Passos)
      else if (fase.tipo === 'chefe' && forcaGeral > 10 && passosContados >= 2) {
        dispararMagia("💥 MAGIA SUPREMA CONJURADA! O CHEFE FOI DERROTADO!");
      }
    });

    return () => inscricaoMotion?.remove();
  }, [faseAtual, faseConcluida, passosContados]);

  // Monitoramento de Passos (Pedômetro)
  useEffect(() => {
    let inscricaoPedometer = null;

    async function iniciarPedometro() {
      const disponivel = await Pedometer.isAvailableAsync();
      if (!disponivel) return;

      if (Platform.OS === 'android') {
        await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACTIVITY_RECOGNITION);
      }

      inscricaoPedometer = Pedometer.watchStepCount((result) => {
        setPassosContados(result.steps);
        const fase = FASES[faseAtual];

        if (fase.tipo === 'terra' && result.steps >= 5 && !faseConcluida) {
          dispararMagia("🪨 Escudo de Pedra Conjurado!");
        }
      });
    }

    iniciarPedometro();
    return () => inscricaoPedometer?.remove();
  }, [faseAtual, faseConcluida]);

  function dispararMagia(texto) {
    setMagiaLancada(texto);
    setFaseConcluida(true);
  }

  function proximaFase() {
    if (faseAtual < FASES.length - 1) {
      setFaseAtual(faseAtual + 1);
      setFaseConcluida(false);
      setMagiaLancada("Aguardando gesto...");
      setPassosContados(0);
    }
  }

  function reiniciarJogo() {
    setFaseAtual(0);
    setFaseConcluida(false);
    setMagiaLancada("Aguardando gesto...");
    setPassosContados(0);
  }

  const fase = FASES[faseAtual];

  return (
    <View style={styles.container}>
      <Text style={styles.tituloFase}>Fase {fase.id}: {fase.nome}</Text>
      <Text style={styles.objetivo}>{fase.objetivo}</Text>

      {fase.tipo === 'terra' || fase.tipo === 'chefe' ? (
        <Text style={styles.infoPassos}>Passos detectados nesta fase: {passosContados}</Text>
      ) : null}

      <View style={styles.caixaFeitico}>
        <Text style={styles.statusFeitico}>{magiaLancada}</Text>
      </View>

      {faseConcluida && (
        <View style={styles.containerAcao}>
          {faseAtual < FASES.length - 1 ? (
            <TouchableOpacity style={styles.botaoSucesso} onPress={proximaFase}>
              <Text style={styles.textoBotao}>Avançar para Fase {faseAtual + 2}</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.botaoSucesso} onPress={reiniciarJogo}>
              <Text style={styles.textoBotao}>🏆 Recomeçar o Jogo</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#120924', padding: 20, justifyContent: 'center', alignItems: 'center' },
  tituloFase: { fontSize: 22, fontWeight: 'bold', color: '#ffb703', marginBottom: 10 },
  objetivo: { fontSize: 16, color: '#e0e0e0', textAlign: 'center', marginBottom: 20 },
  infoPassos: { color: '#00f5d4', fontSize: 14, marginBottom: 10 },
  caixaFeitico: { backgroundColor: '#241442', width: '100%', padding: 25, borderRadius: 15, alignItems: 'center', marginVertical: 20, borderWidth: 1, borderColor: '#5a2a82' },
  statusFeitico: { fontSize: 18, color: '#fff', fontWeight: 'bold', textAlign: 'center' },
  containerAcao: { marginTop: 20 },
  botaoSucesso: { backgroundColor: '#38b000', paddingVertical: 12, paddingHorizontal: 25, borderRadius: 20 },
  textoBotao: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});