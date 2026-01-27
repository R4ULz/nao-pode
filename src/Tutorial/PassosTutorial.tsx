import imgStep1 from "../assets/telaTimes.png";
import imgStep2 from "../assets/telaJogo.png";
import imgStep4 from "../assets/telaPontuacao.png";


export const TUTORIAL_STEPS = [
  {
    title: "Objetivo",
    body: "Os jogadores serão divididos em dois times. Faça seu time adivinhar a palavra da carta.",
    img: imgStep1,
  },
  {
    title: "Objetivo",
    body: "Um jogador do time da vez sera sorteado e tera que fazer seu time adivinhar a palavra da carta. Cada rodada dura 30 segundos e cada time tem 5 palavras para adivinhar.",
    img: imgStep2,
  },
  {
    title: "Pontuação",
    body: "Um jogador do time inimigo ficará responsável por pontuar as palavras adivinhadas corretamente pelo time da vez.",
  },
  {
    title: "Rodada",
    body: "Quando acabar o tempo ou as 5 palavras, a rodada termina e passa para o outro time.",
    img: imgStep4,
  },
];

