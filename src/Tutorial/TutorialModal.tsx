import { useEffect, useState } from "react";

type TutorialStep = {
  title: string;
  body: string;
  img?: string;
};

type TutorialModalProps = {
  open: boolean;
  onClose: () => void;
  steps: TutorialStep[];
  storageKey?: string; // para "não mostrar novamente"
};

export default function TutorialModal({
  open,
  onClose,
  steps,
  storageKey = "nao-pode:tutorial-dismissed",
}: TutorialModalProps) {
  const [index, setIndex] = useState(0);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  useEffect(() => {
    if (open) {
      setIndex(0);
      setDontShowAgain(false);
    }
  }, [open]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (!open) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setIndex((i) => Math.min(i + 1, steps.length - 1));
      if (e.key === "ArrowLeft") setIndex((i) => Math.max(i - 1, 0));
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose, steps.length]);

  function close() {
    if (dontShowAgain) {
      localStorage.setItem(storageKey, "1");
    }
    onClose();
  }

  if (!open) return null;

  const isFirst = index === 0;
  const isLast = index === steps.length - 1;
  const step = steps[index];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* backdrop */}
      <button
        className="absolute inset-0 bg-black/60"
        onClick={close}
        aria-label="Fechar tutorial"
      />

      <div className="relative z-10 w-[min(560px,92vw)] rounded-2xl bg-white p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-zinc-500">
              Tutorial • passo {index + 1} de {steps.length}
            </p>
            <h2 className="mt-1 text-2xl font-bold text-zinc-900">{step.title}</h2>
          </div>

          <button
            className="rounded-lg px-3 py-2 text-sm font-semibold text-zinc-600 hover:bg-zinc-100"
            onClick={close}
          >
            X
          </button>
        </div>
        {step.img && (
          <div className="flex justify-center items-center mt-4">
            <img
              src={step.img}
              className="object-contain rounded-xl bg-zinc-50 shadow-2xs"
              draggable={false}
            />
          </div>
        )}
        <p className="mt-4 text-zinc-700 leading-relaxed">{step.body}</p>

        <div className="mt-5 flex items-center justify-center gap-2">
          {steps.map((_, i) => (
            <button
              key={i}
              className={`h-2.5 w-2.5 rounded-full ${i === index ? "bg-violet-600" : "bg-zinc-300"
                }`}
              onClick={() => setIndex(i)}
              aria-label={`Ir para o passo ${i + 1}`}
            />
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <label className="flex items-center gap-2 text-sm text-zinc-700 select-none">
            <input
              type="checkbox"
              className="h-4 w-4"
              checked={dontShowAgain}
              onChange={(e) => setDontShowAgain(e.target.checked)}
            />
            Não mostrar novamente
          </label>

          <div className="flex items-center justify-end gap-2">
            <button
              className="rounded-lg px-4 py-2 text-sm font-semibold text-zinc-700 hover:bg-zinc-100 disabled:opacity-40"
              onClick={() => setIndex((i) => Math.max(i - 1, 0))}
              disabled={isFirst}
            >
              Voltar
            </button>

            {!isLast ? (
              <button
                className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-700"
                onClick={() => setIndex((i) => Math.min(i + 1, steps.length - 1))}
              >
                Próximo
              </button>
            ) : (
              <button
                className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
                onClick={close}
              >
                Começar!
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}