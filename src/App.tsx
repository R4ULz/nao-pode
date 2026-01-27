import { useEffect, useRef, useState } from "react";
import ContainerPrincipal from "./mainScreen/ContainerPrincipal"
import ContainerTimes from "./TeamScreen/ContainerTimes"
import type { Time } from "./models/TimeModel";
import GameContainer from "./gameScreen/GameContainer";
import TutorialModal from "./Tutorial/TutorialModal";
import { TUTORIAL_STEPS } from "./Tutorial/PassosTutorial";
import { LuCircleHelp } from "react-icons/lu";


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
  const [screen, setScreen] = useState<'main' | 'times' | 'game'>('main');
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

  useEffect(() => {
    if(screen !== 'main') return

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
    setJogadorDaVez("");
    return;
  }

  setJogadorDaVez(sortear(jogadores));
}, [screen, timeDavez, time1.jogadores, time2.jogadores]);

  function iniciarTimes() {
    if (nomes.length < 2) return;
    setTimes(dividirEmDoisTimes(nomes));
    setScreen('times');
  }

  function voltar() {
    setScreen('main');
    setNomes([]);
    setTimes([
      { id: 1, nome: "Time 1", jogadores: [], pontos: 0 },
      { id: 2, nome: "Time 2", jogadores: [], pontos: 0 },
    ]);
  }

  function iniciarRodada() {
    fimRodadaLock.current = false;

    setScreen('game');
  }

  function onPontuar(timeId: 1 | 2, delta: number = 1) {
    setTimes(prev => prev.map(t => t.id === timeId ? { ...t, pontos: t.pontos + delta } : t))
  }

  function onFimRodada() {
    if (fimRodadaLock.current) return;
    fimRodadaLock.current = true;
    console.log("FIM RODADA chamada");  
    setTimeDavez((t) => {  
      console.log("trocando de", t, "para", t === 1 ? 2 : 1);  
      return t === 1 ? 2 : 1;  
    });  
    setScreen("times");
  }

  const conteudo = (() => {
    switch (screen) {
      case 'main':
        return <ContainerPrincipal nomes={nomes} setNomes={setNomes} podeComecar={nomes.length >= 2} onStart={iniciarTimes}/>
        break;
      case 'times':
        return <ContainerTimes time1={time1.jogadores} time2={time2.jogadores} time1ponts={time1.pontos} time2ponts={time2.pontos} timeDavez={timeDavez} jogadorDaVez={jogadorDaVez} onVoltar={voltar} onPlay={iniciarRodada} />
        break;
      case 'game':
        return <GameContainer time1={time1.jogadores} time2={time2.jogadores} time1ponts={time1.pontos} time2ponts={time2.pontos} timeDavez={timeDavez} onPontuar={onPontuar} onFimRodada={onFimRodada} />
        break;
    }
  })()


  return (
    <>
      <div className="w-screen h-screen flex justify-center items-center p-5 bg-linear-to-bl from-blue-950 to-violet-950">
        {conteudo}
        <div className="absolute bottom-4 right-4 cursor-pointer" onClick={() => setTutorialOpen(true)}>
          <LuCircleHelp className="text-zinc-50 size-8"/>
        </div>
        <TutorialModal open={tutorialOpen} onClose={() => setTutorialOpen(false)} steps={TUTORIAL_STEPS} storageKey={STORAGE_KEY} />
      </div>
    </>
  )
}

export default App
