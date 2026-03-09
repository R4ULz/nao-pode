import { LuCircleCheckBig, LuCircleX, LuSkipForward, LuTimer } from "react-icons/lu";
import CardPalavra from "./CardPalavra";
import { useCountdown } from "../hooks/useCountdown";
import { useEffect, useState } from "react";
import cartasJson from "../data/palavras.json";
import type { Carta } from "../models/Cartas";

type GameContainerProps = {  
    time1: string[];
    time2: string[];
    time1ponts: number;
    time2ponts: number;
    timeDavez: 1 | 2;
    onPontuar: (timeId: 1 | 2, delta: number) => void;
    onFimRodada: () => void;
};

function embaralharPalavras<T>(arr: T[]) {  
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

const cartas = cartasJson as Carta[];
const TAM_RODADA = 5;

export default function GameContainer({ time1, time2, time1ponts, time2ponts, timeDavez, onPontuar, onFimRodada }: GameContainerProps) {
    const { secondsLeft } = useCountdown(60, {autoStart: true, onFinish: finalizarRodada});
    const [rodada, setRodada] = useState<Carta[]>([]);
    const [rodadaIndex, setRodadaIndex] = useState(0);

    useEffect(() => {  
        const deckEmbaralhado = embaralharPalavras(cartas);  
        setRodada(deckEmbaralhado.slice(0, TAM_RODADA));  
        setRodadaIndex(0);  
    }, []);

    const cartaAtual = rodada[rodadaIndex];

    function finalizarRodada(){
        onFimRodada();
    }

    function proximaCarta() {
        setRodadaIndex((prev) =>{
            const next = prev + 1;
            if(next >= TAM_RODADA){
                finalizarRodada();
                return prev;
            }
            return next;
        })
    }

    function acertou(){
        onPontuar(timeDavez, 1);
        proximaCarta();
        console.log("Game timeDavez:", timeDavez);
    }

    function errou(){
        onPontuar(timeDavez, -1);
        proximaCarta();
    }

    if(!cartaAtual){
        return <div className="bg-white min-w-96 rounded-2xl shadow-2xl p-5">Carregando rodada...</div>
    }


    return (
        <div className="bg-white max-w-84 lg:max-w-125 rounded-2xl shadow-2xl flex-row justify-center items-center p-5">
            <div className="flex justify-around items-center gap-5">
                <div className="bg-gray-100 rounded-lg p-2 space-y-3 w-1/2 flex justify-between">
                    <div>
                        <p className="text-zinc-800 text-sm">Time 1</p>
                        <h1 className="font-bold text-4xl">{time1ponts}</h1>
                    </div>
                    <div>
                        <ul>{time1.map((item, index) => <li key={index} className="text-zinc-800 text-sm">{item}</li>)}</ul>
                    </div>
                </div>
                <div className="bg-gray-100 rounded-lg p-2 space-y-3 w-1/2 flex justify-between">
                    <div>
                        <p className="text-zinc-800 text-sm">Time 2</p>
                        <h1 className="font-bold text-4xl">{time2ponts}</h1>
                    </div>
                    <div>
                        <ul>{time2.map((item, index) => <li key={index} className="text-zinc-800 text-sm">{item}</li>)}</ul>
                    </div>
                </div>  
            </div>
            <div className="flex flex-col justify-center items-center mt-5">
                <div className="flex gap-1 items-center">
                    <LuTimer />
                    <p className="text-6xl font-bold text-zinc-700">{secondsLeft}</p>
                </div>
                <div>
                    <p className="text-sm text-zinc-500">Palavra {rodadaIndex + 1} de 5</p>
                </div>
            </div>
            <div className="flex justify-center items-center mt-3">
                <CardPalavra carta={cartaAtual}/>
            </div>
            <div className="flex justify-center items-center gap-3 lg:gap-5 mt-5 max-w-68 lg:max-w-125 mx-auto">
                <div className="bg-red-500 hover:bg-red-800 text-white px-5 lg:px-11 py-3 rounded-lg cursor-pointer flex justify-center items-center flex-col" onClick={errou}>
                    <LuCircleX size={32}/> 
                    <p className="text-sm">Errou</p>
                </div>
                <div className="bg-zinc-500 hover:bg-zinc-600 text-white px-5 lg:px-11 py-3 rounded-lg cursor-pointer flex justify-center items-center flex-col" onClick={proximaCarta}>
                    <LuSkipForward size={32}/>
                    <p className="text-sm">Pular</p>
                </div>
                <div className="bg-green-500 hover:bg-green-600 text-white px-5 lg:px-11 py-3 rounded-lg cursor-pointer flex justify-center items-center flex-col" onClick={acertou}>
                    <LuCircleCheckBig size={32}/>
                    <p className="text-sm">Acertou</p>
                </div>
            </div>
        </div>
    )
}