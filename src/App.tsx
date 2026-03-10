import { useEffect, useRef, useState } from "react";
import ContainerPrincipal from "./mainScreen/ContainerPrincipal"
import ContainerTimes from "./TeamScreen/ContainerTimes"
import type { Time } from "./models/TimeModel";
import GameContainer from "./gameScreen/GameContainer";
import TutorialModal from "./Tutorial/TutorialModal";
import { TUTORIAL_STEPS } from "./Tutorial/PassosTutorial";
import { LuCircleHelp } from "react-icons/lu";
import cartasJson from "./data/palavras.json";
import type { Carta } from "./models/Cartas";


function embaralhar<T>(arr: T[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function dividirEmDoisTimes(nomes: string[]): Time[] {
  const embaralhado = embaralhar(nomes);
  const meio = Math.ceil(embaralhado.length / 2);
  return [
    { id: 1, nome: "Time 1", jogadores: embaralhado.slice(0, meio), pontos: 0 },
    { id: 2, nome: "Time 2", jogadores: embaralhado.slice(meio), pontos: 0 },
  ];
}

const STORAGE_KEY = "nao-pode:tutorial-dismissed";

function App() {
  const [screen, setScreen] = useState<'main' | 'times' | 'game' | "endGame">('main');
  const [timeVencedor, setTimeVencedor] = useState<1 | 2 | null>(null);
  const [nomes, setNomes] = useState<string[]>([]);
  const [times, setTimes] = useState<Time[]>([
    { id: 1, nome: "Time 1", jogadores: [], pontos: 0 },
    { id: 2, nome: "Time 2", jogadores: [], pontos: 0 },
  ]);
  const time1 = times.find((t) => t.id === 1)!;
  const time2 = times.find((t) => t.id === 2)!;
  const [timeDavez, setTimeDavez] = useState<1 | 2>(1);
  const fimRodadaLock = useRef(false);
  const [tutorialOpen, setTutorialOpen] = useState(false)
  const [jogadorDaVez, setJogadorDaVez] = useState<string>("");
  const cartas = cartasJson as Carta[];
  const [deck, setDeck] = useState<Carta[]>(() => embaralhar(cartas));
  const [deckIndex, setDeckIndex] = useState(0);
  const [rodada, setRodada] = useState<Carta[]>([]);
  const META_PONTOS = 20;

  console.log({deck, deckIndex})

  useEffect(() => {
    if (screen !== 'main') return

    const dismissed = localStorage.getItem(STORAGE_KEY) === "1";
    if (!dismissed) setTutorialOpen(true);
  }, []);

  useEffect(() => {
    if (screen !== 'main') setTutorialOpen(false);
  }, [screen]);

  function sortear<T>(arr: T[]): T {
    const index = Math.floor(Math.random() * arr.length);
    return arr[index];
  }

  useEffect(() => {
    if (screen !== "times") return;

    const jogadores = timeDavez === 1 ? time1.jogadores : time2.jogadores;
    if (jogadores.length === 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setJogadorDaVez("");
      return;
    }

    setJogadorDaVez(sortear(jogadores));
  }, [screen, timeDavez, time1.jogadores, time2.jogadores]);

  function iniciarTimes() {
    const novoDeck = embaralhar(cartas);
    setDeck(novoDeck);
    setDeckIndex(0);
    setRodada([])
    if (nomes.length < 2) return;
    setTimes(dividirEmDoisTimes(nomes));
    setScreen('times');
  }

  function voltar() {
    setScreen('main');
    setTimeVencedor(null);
    setNomes([]);
    setTimes([
      { id: 1, nome: "Time 1", jogadores: [], pontos: 0 },
      { id: 2, nome: "Time 2", jogadores: [], pontos: 0 },
    ]);
  }

  function iniciarRodada() {
    fimRodadaLock.current = false;

    setDeck((prevDeck) => {
      let deck = prevDeck;

      setDeckIndex(prevIndex => {  
      let index = prevIndex;
  
        if (index + 5 > deck.length) {  
          deck = embaralhar(cartas);  
          index = 0;  
        }
        setRodada(deck.slice(index, index + 5));
        return index + 5;
      });

      return deck;
    })

    setScreen('game');
  }

  function onPontuar(timeId: 1 | 2, delta: number = 1) {
    setTimes(prev => {

      let vencedor: 1 | 2 | null = null;

      const next = prev.map(t => {
        if (t.id !== timeId) return t;

        const novosPontos = Math.max(0, t.pontos + delta);
        const atualizado = { ...t, pontos: novosPontos };

        if (novosPontos >= META_PONTOS) {
          vencedor = timeId;
        }
        return atualizado;
      })

      if (vencedor) {
        fimRodadaLock.current = true;
        setTimeVencedor(vencedor);
        setScreen("endGame");

      }
      return next;
    });
  }

  function onFimRodada() {

    if (screen === "endGame" || timeVencedor !== null) return;
    if (fimRodadaLock.current) return;

    fimRodadaLock.current = true;
    setTimeDavez((t) => {
      return t === 1 ? 2 : 1;
    });
    setScreen("times");
  }

  const conteudo = (() => {
    switch (screen) {
      case 'main':
        return <ContainerPrincipal nomes={nomes} setNomes={setNomes} podeComecar={nomes.length >= 2} onStart={iniciarTimes} />
        break;
      case 'times':
        return <ContainerTimes time1={time1.jogadores} time2={time2.jogadores} time1ponts={time1.pontos} time2ponts={time2.pontos} timeDavez={timeDavez} jogadorDaVez={jogadorDaVez} onVoltar={voltar} onPlay={iniciarRodada} />
        break;
      case 'game':
        return <GameContainer rodada={rodada} time1={time1.jogadores} time2={time2.jogadores} time1ponts={time1.pontos} time2ponts={time2.pontos} timeDavez={timeDavez} onPontuar={onPontuar} onFimRodada={onFimRodada} />
        break;
      case 'endGame':
        return (
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md text-center space-y-4">
            <h1 className="text-2xl font-bold text-zinc-800">Fim de jogo!</h1>
            <p className="text-zinc-600">
              Vencedor: <span className="font-bold">{timeVencedor === 1 ? "Time 1" : "Time 2"}</span>
            </p>

            <div className="flex justify-center gap-6">
              <div>
                <p className="text-sm text-zinc-500">Time 1</p>
                <p className="text-3xl font-bold">{time1.pontos}</p>
              </div>
              <div>
                <p className="text-sm text-zinc-500">Time 2</p>
                <p className="text-3xl font-bold">{time2.pontos}</p>
              </div>
            </div>

            <div className="flex gap-3 justify-center">
              <button
                className="bg-linear-to-tl to-blue-950 from-violet-950 cursor-pointer text-white px-4 py-2 rounded-lg"
                onClick={() => {
                  setTimes(prev => prev.map(t => ({ ...t, pontos: 0 })));
                  setTimeVencedor(null);
                  setTimeDavez(1);
                  setScreen("times");
                }}
              >
                Jogar de novo
              </button>

              <button
                className="bg-zinc-200 hover:bg-zinc-300 text-zinc-800 px-4 py-2 rounded-lg"
                onClick={voltar}
              >
                Novo jogo
              </button>
            </div>
          </div>
        );
    }
  })()


  return (
    <>
      <div className="w-screen h-screen flex justify-center items-center p-5 bg-linear-to-bl from-blue-950 to-violet-950">
        {conteudo}
        <div className="absolute bottom-4 right-4 cursor-pointer" onClick={() => setTutorialOpen(true)}>
          <LuCircleHelp className="text-zinc-50 size-8" />
        </div>
        <TutorialModal open={tutorialOpen} onClose={() => setTutorialOpen(false)} steps={TUTORIAL_STEPS} storageKey={STORAGE_KEY} />
      </div>
    </>
  )
}

export default App
