import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function SettingsPage() {
  return (
    <section className="mb-4">
      <h2 className="text-lg font-semibold mb-2">Configurações</h2>
      <div className="space-y-4">
        {/* Dados básicos */}
        <Card>
          <CardContent className="flex flex-col gap-2 p-4">
            <div className="flex flex-col md:flex-row md:items-center gap-2">
              <Label htmlFor="nome1" className="w-32">
                Nome 1
              </Label>
              <Input id="nome1" className="flex-1" value="Nome 1" readOnly />
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-2">
              <Label htmlFor="nome2" className="w-32">
                Nome 2
              </Label>
              <Input id="nome2" className="flex-1" value="Nome 2" readOnly />
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-2">
              <Label htmlFor="pix" className="w-32">
                Chave PIX
              </Label>
              <Input id="pix" className="flex-1" value="chave@pix.com" readOnly />
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-2">
              <Label htmlFor="tema" className="w-32">
                Tema
              </Label>
              <Select>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Selecione o tema" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="classico">Clássico</SelectItem>
                  <SelectItem value="minimalista">Minimalista</SelectItem>
                  <SelectItem value="romantico">Romântico</SelectItem>
                  <SelectItem value="moderno">Moderno</SelectItem>
                  <SelectItem value="colorido">Colorido</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
