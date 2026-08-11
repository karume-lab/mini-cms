import { Target } from "lucide-react";

function MissionSection() {
  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-2xl border bg-muted/30 p-8 shadow-sm lg:p-12">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-full bg-primary/10 p-3 text-primary">
              <Target className="h-6 w-6" />
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                ICT Directorate
              </p>

              <h2 className="text-3xl font-bold">Mission</h2>
            </div>
          </div>

          <div className="border-l-4 border-primary pl-6">
            <p className="text-lg leading-8 text-muted-foreground md:text-xl">
              To enhance efficient and effective data management, user support
              and excellent user experience and nurture innovations
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
export default MissionSection;
