import { LuTrash2 } from "react-icons/lu";

type ContainerNomesProps = {
    nomes: string[];
    onDeleteNome: (index: number) => void;
}

export default function ContainerNomes({ nomes, onDeleteNome }: ContainerNomesProps) {
    return (
        <div className="bg-zinc-100 rounded-2xl flex-row justify-center items-center p-4">
            <div className="flex flex-col justify-center items-center">
                <div>
                    <h1 className='font-bold text-zinc-800 mb-2'>{nomes.length} Jogadores</h1>
                </div>
                <div className="w-full">
                    <ul className="w-full justify-center items-center space-y-2">
                        {nomes.map((nome, index) => (
                            <li key={index} className="bg-white w-full rounded-md flex p-2 justify-between items-center">
                                {nome}
                                <button onClick={() => onDeleteNome(index)} className="text-red-500 cursor-pointer">
                                    <LuTrash2 />
                                </button>
                            </li>
                        ))}
                        
                    </ul>
                </div>
            </div>
        </div>
    )
}