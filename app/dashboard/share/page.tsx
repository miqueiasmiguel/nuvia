import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SharePage() {
  return (
    <section className="flex flex-col md:flex-row items-center gap-2 mb-4">
      <div className="flex-1">
        <span className="text-zinc-700 dark:text-zinc-200 font-medium">Sua página pública:</span>
        <div className="flex items-center mt-1">
          <Input type="text" className="max-w-xs" value="https://nuvia.app/list/seu-slug" readOnly />
          <Button className="ml-2">Copiar Link</Button>
        </div>
      </div>
    </section>
  );
}
