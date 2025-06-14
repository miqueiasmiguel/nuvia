import { Gift } from "lucide-react";

import { GoogleSignInButton } from "@/modules/auth/components/google-sign-in-button";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="w-full max-w-sm mx-auto bg-card rounded-xl shadow-lg p-8 flex flex-col items-center gap-6 border border-border">
        <div className="flex flex-col items-center gap-2">
          <Gift className="w-10 h-10 text-primary" />
          <h1 className="text-2xl font-bold text-center">Entrar no {process.env.NEXT_PUBLIC_APP_NAME}</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-300 text-center">
            Acesse sua conta para criar ou gerenciar sua lista de presentes de casamento.
          </p>
        </div>
        <GoogleSignInButton />
      </div>
    </main>
  );
}
