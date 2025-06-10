import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function DashboardPage() {
  return (
    <section className="grid grid-cols-3 gap-2 sm:gap-4 mb-4">
      <Card>
        <CardContent className="flex flex-col items-center p-2 sm:p-4">
          <span className="text-xs sm:text-sm text-zinc-500">Total Arrecadado</span>
          <span className="text-lg sm:text-2xl font-bold mt-1 sm:mt-2">R$ 0,00</span>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="flex flex-col items-center p-2 sm:p-4">
          <span className="text-xs sm:text-sm text-zinc-500">Presentes Recebidos</span>
          <span className="text-lg sm:text-2xl font-bold mt-1 sm:mt-2">0</span>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="flex flex-col items-center p-2 sm:p-4 w-full">
          <span className="text-xs sm:text-sm text-zinc-500">Meta</span>
          <span className="text-lg sm:text-2xl font-bold mt-1 sm:mt-2">R$ 0,00</span>
          <Progress value={0} className="w-full mt-2 sm:mt-3" />
        </CardContent>
      </Card>
    </section>
  );
}
