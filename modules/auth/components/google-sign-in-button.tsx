"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

import { Icons } from "@/components/icons";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export function GoogleSignInButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const handleSignIn = async () => {
    try {
      setIsLoading(true);
      setError(null);

      await authClient.signIn.social({
        provider: "google",
        callbackURL: callbackUrl || "/dashboard/gifts",
      });
    } catch {
      setError("Ocorreu um erro ao tentar fazer login com Google");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Button variant="outline" type="button" disabled={isLoading} className="w-full" onClick={handleSignIn}>
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}
        {isLoading ? "Conectando..." : "Continuar com Google"}
      </Button>
    </div>
  );
}
