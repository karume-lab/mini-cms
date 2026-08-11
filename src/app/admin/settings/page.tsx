import { getSiteSetting, updateSiteSetting } from "@/actions/content";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default async function SettingsPage() {
  const missionStatement = await getSiteSetting("mission_statement");
  const applyCtaTitle = await getSiteSetting("apply_cta_title");
  const applyCtaDescription = await getSiteSetting("apply_cta_description");

  async function saveSettings(formData: FormData) {
    "use server";
    const ms = formData.get("mission_statement") as string;
    const at = formData.get("apply_cta_title") as string;
    const ad = formData.get("apply_cta_description") as string;

    await updateSiteSetting("mission_statement", ms);
    await updateSiteSetting("apply_cta_title", at);
    await updateSiteSetting("apply_cta_description", ad);
  }

  return (
    <div className="max-w-2xl">
      <h1 className="mb-6 text-3xl font-bold">Site Settings</h1>
      <form action={saveSettings} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="mission_statement">Mission Statement</Label>
          <Textarea
            id="mission_statement"
            name="mission_statement"
            defaultValue={missionStatement || ""}
            rows={4}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="apply_cta_title">Apply CTA Title</Label>
          <Input
            id="apply_cta_title"
            name="apply_cta_title"
            defaultValue={applyCtaTitle || ""}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="apply_cta_description">Apply CTA Description</Label>
          <Textarea
            id="apply_cta_description"
            name="apply_cta_description"
            defaultValue={applyCtaDescription || ""}
            rows={3}
          />
        </div>

        <Button type="submit">Save Settings</Button>
      </form>
    </div>
  );
}
