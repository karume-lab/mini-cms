import BlockBuilderCanvas from "@/components/admin/block-builder/BlockBuilderCanvas";

export default function BlockBuilderPage() {
  return (
    <div className="flex h-[calc(100vh-6rem)] flex-col space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Block Builder</h1>
      </div>
      <div className="flex-1 overflow-hidden rounded-lg border bg-background">
        <BlockBuilderCanvas />
      </div>
    </div>
  );
}
