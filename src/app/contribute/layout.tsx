import { NimbusHeader } from "@/components/nimbus-header";

export default function ContributeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <NimbusHeader />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
