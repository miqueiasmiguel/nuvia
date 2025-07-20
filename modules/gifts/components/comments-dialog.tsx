"use client";

import { useEffect, useState } from "react";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { getContributionsByGiftId } from "@/modules/contributions/actions";
import { Contribution } from "@/modules/contributions/types";

export function CommentsDialog({
  giftId,
  theme,
  commentsDialogOpen,
  setCommentsDialogOpen,
}: {
  giftId: string;
  theme: string;
  commentsDialogOpen: boolean;
  setCommentsDialogOpen: (open: boolean) => void;
}) {
  const [contributions, setContributions] = useState<Contribution[]>([]);
  useEffect(() => {
    const fetchContributions = async () => {
      const result = await getContributionsByGiftId(giftId);
      setContributions(result);
    };

    fetchContributions();
  }, [giftId]);

  return (
    <Dialog open={commentsDialogOpen} onOpenChange={setCommentsDialogOpen}>
      <DialogContent
        className={theme ? `theme-${theme}` : undefined}
        style={theme ? { fontFamily: "var(--font-family)" } : undefined}
      >
        <DialogHeader>
          <DialogTitle>Comentários dos convidados</DialogTitle>
        </DialogHeader>
        <div className="mt-4 flex flex-col gap-4">
          {contributions.length === 0 ? (
            <span className="text-sm text-zinc-500">Nenhum comentário ainda.</span>
          ) : (
            contributions.map((contribution) => (
              <div
                key={contribution.id}
                className={`theme-${theme} border-b pb-2 last:border-b-0 last:pb-0`}
                style={{ fontFamily: "var(--font-family)" }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm">{contribution.name}</span>
                  <span className="text-xs text-zinc-400">
                    {new Date(contribution.createdAt).toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "2-digit",
                    })}
                  </span>
                </div>
                <div className="text-sm text-zinc-700 mt-1 whitespace-pre-line">
                  {contribution.message || <span className="italic text-zinc-400">Sem mensagem</span>}
                </div>
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
