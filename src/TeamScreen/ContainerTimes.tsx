type Props = {  
    time1: string[];  
    time1ponts?: number;
    time2ponts?: number;
    time2: string[];
    timeDavez?: 1 | 2;
    jogadorDaVez?: string;
    onVoltar?: () => void;
    onPlay?: () => void;
};

export default function ContainerTimes({ time1, time2, onVoltar, time1ponts, time2ponts, onPlay, timeDavez, jogadorDaVez }: Props) {
    return (
        <div className="bg-white max-w-84 lg:max-w-96 rounded-2xl shadow-2xl flex-row justify-center items-center p-5">
            <div className="flex justify-between items-center gap-5">
                <div className="bg-gray-100 rounded-lg p-2 space-y-3 w-60">
                    <p className="text-zinc-800 text-sm">Time 1</p>
                    <h1 className="font-bold text-4xl">{time1ponts}</h1>
                    <p className="text-zinc-800 text-sm">{time1.join(', ')}</p>
                </div>
                <div className="bg-gray-100 rounded-lg p-2 space-y-3 w-60">
                    <p className="text-zinc-800 text-sm">Time 2</p>
                    <h1 className="font-bold text-4xl">{time2ponts}</h1>
                    <p className="text-zinc-800 text-sm">{time2.join(', ')}</p>
                </div>   
            </div>
            <div className="flex flex-col justify-center items-center mt-5 space-y-2">
                <h1 className="text-zinc-800 font-bold text-3xl">Vez do {timeDavez === 1 ? "Time 1" : "Time 2"}!</h1>
                <p className="text-zinc-800 font-semibold text-xl">{jogadorDaVez} é o jogador da vez!</p>
                <p className="text-zinc-800 text-lg">Prepare-se para começar a rodada!</p>
                <div>
                    <button className="bg-linear-to-tl to-blue-950 from-violet-950 cursor-pointer text-white font-bold py-2 px-4 rounded" onClick={onPlay} disabled={!jogadorDaVez}>Iniciar Rodada</button>
                    <button onClick={onVoltar} className="ml-2 bg-gray-300 cursor-pointer text-zinc-800 font-bold py-2 px-4 rounded">Encerrar Jogo</button>
                </div>
            </div>
        </div>
    )
}
