Não Pode!

Um jogo em equipe inspirado no Taboo: descreva a palavra da carta sem usar as 5 palavras proibidas. O time precisa adivinhar antes do tempo acabar.
Visão geral

    App em React + TypeScript + Vite
    UI com Tailwind CSS
    Fluxo em 3 telas:
        Main: cadastro de jogadores
        Times: divisão em 2 times + “vez do time” e sorteio do jogador da rodada
        Game: rodada com 30s, 5 palavras, botões (Errou / Pular / Acertou)

Regras do jogo (implementadas)

    O jogo divide automaticamente os jogadores em 2 times.
    Cada rodada:
        dura 30 segundos
        possui 5 palavras (sem repetição dentro da rodada)
    Ações:
        Pular: apenas avança para a próxima palavra
        Errou: apenas avança para a próxima palavra
        Acertou: soma +1 ponto para o time da vez e avança
    A rodada termina quando:
        o tempo chega em 0, ou
        as 5 palavras acabam
    Ao terminar a rodada:
        volta para a tela de Times
        alterna o time da vez
        sorteia um jogador do próximo time para a próxima rodada

Tutorial

Ao abrir o app, um modal de tutorial aparece (com carrossel). Há opção “Não mostrar novamente”, salva via localStorage.
Estrutura de pastas (sugestão/esperada)

src/  
  mainScreen/ContainerPrincipal.tsx  
  TeamScreen/ContainerTimes.tsx  
  gameScreen/GameContainer.tsx  
  hooks/useCountdown.ts  
  models/TimeModel.ts  
  models/Cartas.ts  
  data/palavras.json  
  Tutorial/TutorialModal.tsx  
  Tutorial/tutorialSteps.ts  

Como rodar o projeto
Pré-requisitos

    Node.js (recomendado 18+)
    npm / pnpm / yarn

Instalação

bash
Copy
npm install  

Rodar em desenvolvimento

bash
Copy
npm run dev  

Abra o endereço mostrado no terminal (geralmente http://localhost:5173).
Build de produção

bash
Copy
npm run build  

Preview do build

bash
Copy
npm run preview  

Banco de palavras (palavras.json)

O arquivo src/data/palavras.json contém as cartas do jogo no formato:

json
Copy
[  
  {  
    "palavra": "VASSOURA",  
    "proibidas": ["VARRER", "LIMPEZA", "CHÃO", "CASA", "BRUXA"]  
  }  
]  

Componentes principais
App.tsx

    Controla navegação entre telas (main | times | game)
    Mantém estado de:
        jogadores
        times (Time { id, nome, jogadores, pontos })
        timeDavez
        modal de tutorial
    Garante que o “fim de rodada” seja chamado apenas uma vez (lock)

ContainerPrincipal

    Adiciona/remover jogadores
    Inicia a divisão em times

ContainerTimes

    Exibe:
        lista de jogadores de cada time
        pontuação
        “vez do time”
        jogador sorteado para a rodada
    Botão “Iniciar rodada”

GameContainer

    Controla a rodada:
        carrega um deck embaralhado
        seleciona 5 cartas por rodada
        timer de 30 segundos (useCountdown)
        botões de ação
    Ao finalizar: chama onFimRodada

Tecnologias

    React
    TypeScript
    Vite
    Tailwind CSS
    react-icons

Próximos incrementos (ideias)

    Tela de fim de jogo (condição por pontos/rodadas)
    Evitar repetir o mesmo jogador consecutivamente no mesmo time
    Estatísticas da partida (acertos por rodada, histórico)
    Modo “cartas infinitas” vs “baralho finito”