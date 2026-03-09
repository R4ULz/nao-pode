export default function EndGame() {
    return (
       <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md text-center space-y-4">  
      <h1 className="text-2xl font-bold text-zinc-800">Fim de jogo!</h1>  
      <p className="text-zinc-600">  
        Vencedor: <span className="font-bold">{winnerId === 1 ? "Time 1" : "Time 2"}</span>  
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
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"  
          onClick={() => {  
            // “jogar de novo” com os mesmos jogadores  
            setTimes(prev => prev.map(t => ({ ...t, pontos: 0 })));  
            setWinnerId(null);  
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