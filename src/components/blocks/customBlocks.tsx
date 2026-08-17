import { createReactBlockSpec } from "@blocknote/react";
import { ComponentRegistry } from "./componentRegistry";
import { DynamicTemplateBlock } from "./DynamicTemplateBlock";
import type React from "react";

function createCMSBlock(
  type: string,
  label: string,
  Component: React.ElementType,
) {
  return createReactBlockSpec(
    { type, propSchema: {}, content: "none" },
    {
      render: () => (
        <div
          contentEditable={false}
          className="my-4 w-full block border border-border rounded-xl overflow-hidden"
        >
          <div className="bg-muted/50 px-3 py-1.5 text-[0.65rem] font-semibold text-muted-foreground uppercase tracking-wider border-b border-border flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-primary/60" />
            {label}
          </div>
          <div className="pointer-events-none">
            <Component />
          </div>
        </div>
      ),
    },
  );
}

export const HeroBlock = createCMSBlock("hero", "Hero Section", ComponentRegistry.hero);
export const NewsSectionBlock = createCMSBlock("newsSection", "News Section", ComponentRegistry.newsSection);
export const MissionSectionBlock = createCMSBlock("missionSection", "Mission Section", ComponentRegistry.missionSection);
export const DepartmentsSectionBlock = createCMSBlock("departmentsSection", "Departments Section", ComponentRegistry.departmentsSection);
export const CardCentreBlock = createCMSBlock("cardCentre", "Card Centre", ComponentRegistry.cardCentre);
export const ApplyCTABlock = createCMSBlock("applyCTA", "Apply CTA", ComponentRegistry.applyCTA);
export const DepartmentsListPageBlock = createCMSBlock("departmentsListPage", "Departments List", ComponentRegistry.departmentsListPage);
export const NewsListPageBlock = createCMSBlock("newsListPage", "News List", ComponentRegistry.newsListPage);

export const customBlockSpecs = {
  hero: HeroBlock(),
  newsSection: NewsSectionBlock(),
  missionSection: MissionSectionBlock(),
  departmentsSection: DepartmentsSectionBlock(),
  cardCentre: CardCentreBlock(),
  applyCTA: ApplyCTABlock(),
  departmentsListPage: DepartmentsListPageBlock(),
  newsListPage: NewsListPageBlock(),
  dynamicTemplate: DynamicTemplateBlock(),
};
