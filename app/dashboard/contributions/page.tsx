import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ContributionsPage() {
  return (
    <section className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold">Contribuições</h2>
        <Select>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filtrar" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="30dias">Últimos 30 dias</SelectItem>
            <SelectItem value="mes">Este mês</SelectItem>
            <SelectItem value="todos">Todos</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        {/* Placeholder para contribuições */}
        <Card>
          <CardContent className="flex flex-col md:flex-row md:items-center md:justify-between p-3">
            <div>
              <span className="font-medium">Convidado Exemplo</span>
              <span className="ml-2 text-zinc-500 text-sm">R$ 0,00</span>
            </div>
            <div className="text-zinc-400 text-xs mt-1 md:mt-0">01/01/2024</div>
          </CardContent>
        </Card>
      </div>
      {/* Estatísticas resumidas */}
      <div className="mt-4 grid grid-cols-2 gap-2">
        <Card>
          <CardContent className="p-2 text-center">
            <div className="text-xs text-zinc-500">Total de Contribuições</div>
            <div className="font-bold">0</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-2 text-center">
            <div className="text-xs text-zinc-500">Média por Contribuição</div>
            <div className="font-bold">R$ 0,00</div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
