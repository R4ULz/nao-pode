import { LuTriangleAlert } from "react-icons/lu";
import type { Carta } from "../models/Cartas";

type CardPalavraProps = {  
    carta: Carta;
};

export default function CardPalavra({carta}: CardPalavraProps) {
    return (
        <div className="bg-amber-100 border-2 border-amber-300 h-48 rounded-2xl max-w-76 lg:max-w-lg lg:w-125 flex flex-col justify-center items-center p-5">
            <div className="">
                <p className="text-sm text-zinc-800 text-center">Faça seu time adivinhar:</p>
                <h1 className="font-bold text-2xl lg:text-4xl text-zinc-900 text-center">{carta.palavra}</h1>
            </div>
            <div className="bg-red-50 border max-w-70 lg:max-w-125 border-red-400 px-2 py-2 rounded-lg mt-3 space-y-1">
                <h1 className="text-sm font-bold text-red-600 flex gap-2 items-center justify-center"> <LuTriangleAlert /> NAO PODE DIZER: <LuTriangleAlert /> </h1>
                <ul className="flex gap-1 lg:gap-3 justify-center items-center max-w-78 lg:max-w-lg flex-wrap lg:flex-nowrap">
                    <li className="text-red-800 bg-red-200 rounded-full px-2 py-1 text-sm">{carta.proibidas[0]}</li>
                    <li className="text-red-800 bg-red-200 rounded-full px-2 py-1 text-sm">{carta.proibidas[1]}</li>
                    <li className="text-red-800 bg-red-200 rounded-full px-2 py-1 text-sm">{carta.proibidas[2]}</li>
                    <li className="text-red-800 bg-red-200 rounded-full px-2 py-1 text-sm">{carta.proibidas[3]}</li>
                    <li className="text-red-800 bg-red-200 rounded-full px-2 py-1 text-sm">{carta.proibidas[4]}</li>
                </ul>
            </div>
        </div>
    )
}