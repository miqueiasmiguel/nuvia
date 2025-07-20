import { Card, CardContent } from "@/components/ui/card";

import { Contribution } from "../types";

export function ContributionCard({ contribution }: { contribution: Contribution }) {
  return (
    <Card key={contribution.id}>
      <CardContent className="flex flex-col md:flex-row md:items-center md:justify-between p-3">
        <div>
          <span className="font-medium">{contribution.name}</span>
          <span className="ml-2 text-zinc-500 text-sm">{`R$ ${contribution.amount}`}</span>
        </div>
        <div className="text-zinc-400 text-xs mt-1 md:mt-0">{contribution.createdAt.toDateString()}</div>
      </CardContent>
    </Card>
  );
}
