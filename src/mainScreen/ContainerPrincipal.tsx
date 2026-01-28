import { useState } from 'react';
import donwload from '../assets/download.png';
import { LuSplit } from 'react-icons/lu';
import ContainerNomes from './ContainerNomes';

type ContainerPrincipalProps = {
    nomes: string[];
    setNomes: React.Dispatch<React.SetStateAction<string[]>>;
    onStart: () => void;
    podeComecar: boolean;
    tutorial?: boolean;
}

export default function ContainerPrincipal({ nomes, setNomes, podeComecar, onStart }: ContainerPrincipalProps) {

    const [nome , setNome] = useState('')

    function verificarNomeExistente(n: string){
        return nomes.includes(n);
    }

    function handleAddNome() {
        const n = nome.trim();
        if(verificarNomeExistente(n)) return
        if(!n)  return;
        
        setNomes(prevNomes => [...prevNomes, n]);
        setNome('');
    }

    function handleDeleteNome(index: number) {
        setNomes(prevNomes => prevNomes.filter((_, i) => i !== index));
    }

    return (
        <div className="bg-white w-96 min-h-96 rounded-2xl shadow-2xl flex-row justify-center items-center p-4">
            <div className="flex justify-center items-center">
                <img src={donwload} alt="Logo" className="size-40 flex "/>
            </div>
            <div className='flex justify-center items-center'>
                <h1 className='text-lg font-bold text-zinc-800'>Não Pode!</h1>
            </div>
            <div className='flex justify-center items-center flex-col'>
                <p className='text-sm text-zinc-700 text-center'>Adicione os Participantes</p>
                <p className='text-sm text-zinc-700 text-center'>(Para facilitar, não pode adicionar nomes repetidos)</p>
            </div>
            <div className='flex justify-between items-center mt-4 gap-2'>
                <div className='w-3/4'>
                    <input type="text" id="nome" value={nome} onChange={(e) => setNome(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleAddNome()} placeholder='Nome do participante' className='border-2 border-zinc-400 rounded-lg focus:outline-none focus:border-violet-950 focus:ring-2 focus:ring-violet-950 w-full h-10 px-5'/>
                </div>
                <div className='w-1/4'>
                    <button className='bg-indigo-800 text-zinc-100 w-full h-10 rounded-lg text-sm lg:text-md lg:px-2 cursor-pointer' onClick={handleAddNome}>Adicionar</button>
                </div>
            </div>
            {nomes.length > 0 && (
                <div className='m-5'>
                    <ContainerNomes nomes={nomes} onDeleteNome={handleDeleteNome} />
                </div>
            )}
            <div className='mt-4'>
                <button onClick={onStart} disabled={!podeComecar} className={`bg-indigo-800 text-zinc-100 w-full h-10 rounded-lg cursor-pointer px-2 flex justify-center items-center gap-2 ${!podeComecar ? "opacity-50 cursor-not-allowed" : ""}`}><LuSplit />Dividir em Grupos e Começar</button>
            </div>
        </div>
    )
}