import { Gift } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-between bg-background text-foreground">
      <header className="w-full flex flex-col items-center pt-12 pb-6">
        <div className="flex items-center gap-2 mb-2">
          <Gift className="w-10 h-10" />
          <span className="text-3xl font-extrabold tracking-tight text-primary">
            {process.env.NEXT_PUBLIC_APP_NAME}
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl font-semibold text-center max-w-xl">
          Sua lista de presentes de casamento, elegante, fácil e moderna.
        </h1>
        <p className="mt-2 text-center max-w-lg">
          Crie uma experiência inesquecível para seus convidados e gerencie todos os presentes do seu grande dia em um
          só lugar.
        </p>
        <Link href="/dashboard" className="mt-6">
          <button className="bg-primary text-primary-foreground px-6 py-3 rounded-[var(--radius)] font-semibold shadow hover:brightness-95 transition">
            Criar minha lista
          </button>
        </Link>
      </header>
      <section className="flex-1 flex flex-col items-center justify-center w-full px-4">
        <div className="relative w-full max-w-2xl rounded-[var(--radius)] bg-card shadow-lg p-6 flex flex-col items-center gap-4 border border-border">
          <span className="text-lg font-bold text-primary mb-2">Veja como sua lista pode ficar:</span>
          <div className="w-full flex flex-col sm:flex-row gap-4 items-center justify-center">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary shadow">
              <Image
                src="https://source.unsplash.com/200x200/?couple,wedding"
                alt="Casal exemplo"
                width={96}
                height={96}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex-1 flex flex-col items-center sm:items-start">
              <span className="text-xl font-bold text-primary">Ana & João</span>
              <span className="text-zinc-500 dark:text-zinc-300 text-sm mt-1 text-center sm:text-left">
                &quot;Seja bem-vindo à nossa lista de presentes! Obrigado por fazer parte desse momento especial.&quot;
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full mt-4">
            <div className="rounded-md bg-zinc-100 p-2 flex flex-col items-center">
              <Image
                src="https://source.unsplash.com/400x300/?kitchen,pot"
                alt="Panela"
                width={60}
                height={60}
                className="rounded object-cover"
              />
              <span className="text-xs font-semibold mt-1">Panela Elétrica</span>
              <span className="text-xs text-primary font-bold">R$ 199,90</span>
            </div>
            <div className="rounded-md bg-zinc-100 p-2 flex flex-col items-center">
              <Image
                src="https://source.unsplash.com/400x300/?towel"
                alt="Toalhas"
                width={60}
                height={60}
                className="rounded object-cover"
              />
              <span className="text-xs font-semibold mt-1">Jogo de Toalhas</span>
              <span className="text-xs text-primary font-bold">R$ 120,00</span>
            </div>
            <div className="rounded-md bg-zinc-100 p-2 flex flex-col items-center">
              <Image
                src="https://source.unsplash.com/400x300/?blender"
                alt="Liquidificador"
                width={60}
                height={60}
                className="rounded object-cover"
              />
              <span className="text-xs font-semibold mt-1">Liquidificador</span>
              <span className="text-xs text-primary font-bold">R$ 180,00</span>
            </div>
          </div>
        </div>
      </section>
      <footer className="w-full py-6 flex flex-col items-center text-xs text-zinc-400">
        <span>
          Feito com ♥ por {process.env.NEXT_PUBLIC_APP_NAME} — {new Date().getFullYear()}
        </span>
        <span>
          <a
            href="https://ui.shadcn.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-primary"
          >
            UI por shadcn/ui
          </a>
        </span>
      </footer>
    </main>
  );
}
