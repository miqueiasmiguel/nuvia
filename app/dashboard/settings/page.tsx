import { WeddingSettingsForm } from "@/modules/wedding-list/components/wedding-settings-form";

export default async function SettingsPage() {
  return (
    <section className="mb-4 w-full flex justify-center">
      <div className="w-full max-w-2xl px-4">
        <h2 className="text-lg font-semibold mb-2">Configurações da Lista de Presentes</h2>
        <div className="space-y-4">
          <WeddingSettingsForm />
        </div>
      </div>
    </section>
  );
}
