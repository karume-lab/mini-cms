import { createReactBlockSpec } from "@blocknote/react";
import { ComponentRegistry } from "./componentRegistry";

export const HeroBlock = createReactBlockSpec(
  {
    type: "hero",
    propSchema: {},
    content: "none",
  },
  {
    render: () => {
      const Component = ComponentRegistry.hero;
      return (
        <div
          contentEditable={false}
          className="my-4 w-full block border-2 border-dashed border-primary/20 rounded-xl overflow-hidden opacity-90 hover:opacity-100 transition-opacity"
        >
          <div className="bg-primary/5 p-2 text-xs font-bold text-primary uppercase text-center border-b border-primary/10">
            Hero Section
          </div>
          <div className="pointer-events-none select-none">
            <Component />
          </div>
        </div>
      );
    },
  },
);

export const NewsSectionBlock = createReactBlockSpec(
  {
    type: "newsSection",
    propSchema: {},
    content: "none",
  },
  {
    render: () => {
      const Component = ComponentRegistry.newsSection;
      return (
        <div
          contentEditable={false}
          className="my-4 w-full block border-2 border-dashed border-primary/20 rounded-xl overflow-hidden opacity-90 hover:opacity-100 transition-opacity"
        >
          <div className="bg-primary/5 p-2 text-xs font-bold text-primary uppercase text-center border-b border-primary/10">
            News Section
          </div>
          <div className="pointer-events-none select-none">
            <Component />
          </div>
        </div>
      );
    },
  },
);

export const MissionSectionBlock = createReactBlockSpec(
  {
    type: "missionSection",
    propSchema: {},
    content: "none",
  },
  {
    render: () => {
      const Component = ComponentRegistry.missionSection;
      return (
        <div
          contentEditable={false}
          className="my-4 w-full block border-2 border-dashed border-primary/20 rounded-xl overflow-hidden opacity-90 hover:opacity-100 transition-opacity"
        >
          <div className="bg-primary/5 p-2 text-xs font-bold text-primary uppercase text-center border-b border-primary/10">
            Mission Section
          </div>
          <div className="pointer-events-none select-none">
            <Component />
          </div>
        </div>
      );
    },
  },
);

export const DepartmentsSectionBlock = createReactBlockSpec(
  {
    type: "departmentsSection",
    propSchema: {},
    content: "none",
  },
  {
    render: () => {
      const Component = ComponentRegistry.departmentsSection;
      return (
        <div
          contentEditable={false}
          className="my-4 w-full block border-2 border-dashed border-primary/20 rounded-xl overflow-hidden opacity-90 hover:opacity-100 transition-opacity"
        >
          <div className="bg-primary/5 p-2 text-xs font-bold text-primary uppercase text-center border-b border-primary/10">
            Departments Section
          </div>
          <div className="pointer-events-none select-none">
            <Component />
          </div>
        </div>
      );
    },
  },
);

export const CardCentreBlock = createReactBlockSpec(
  {
    type: "cardCentre",
    propSchema: {},
    content: "none",
  },
  {
    render: () => {
      const Component = ComponentRegistry.cardCentre;
      return (
        <div
          contentEditable={false}
          className="my-4 w-full block border-2 border-dashed border-primary/20 rounded-xl overflow-hidden opacity-90 hover:opacity-100 transition-opacity"
        >
          <div className="bg-primary/5 p-2 text-xs font-bold text-primary uppercase text-center border-b border-primary/10">
            Card Centre Section
          </div>
          <div className="pointer-events-none select-none">
            <Component />
          </div>
        </div>
      );
    },
  },
);

export const ApplyCTABlock = createReactBlockSpec(
  {
    type: "applyCTA",
    propSchema: {},
    content: "none",
  },
  {
    render: () => {
      const Component = ComponentRegistry.applyCTA;
      return (
        <div
          contentEditable={false}
          className="my-4 w-full block border-2 border-dashed border-primary/20 rounded-xl overflow-hidden opacity-90 hover:opacity-100 transition-opacity"
        >
          <div className="bg-primary/5 p-2 text-xs font-bold text-primary uppercase text-center border-b border-primary/10">
            Apply CTA Section
          </div>
          <div className="pointer-events-none select-none">
            <Component />
          </div>
        </div>
      );
    },
  },
);

export const DepartmentsListPageBlock = createReactBlockSpec(
  {
    type: "departmentsListPage",
    propSchema: {},
    content: "none",
  },
  {
    render: () => {
      const Component = ComponentRegistry.departmentsListPage;
      return (
        <div
          contentEditable={false}
          className="my-4 w-full block border-2 border-dashed border-primary/20 rounded-xl overflow-hidden opacity-90 hover:opacity-100 transition-opacity"
        >
          <div className="bg-primary/5 p-2 text-xs font-bold text-primary uppercase text-center border-b border-primary/10">
            Departments List Page
          </div>
          <div className="pointer-events-none select-none">
            <Component />
          </div>
        </div>
      );
    },
  },
);

export const NewsListPageBlock = createReactBlockSpec(
  {
    type: "newsListPage",
    propSchema: {},
    content: "none",
  },
  {
    render: () => {
      const Component = ComponentRegistry.newsListPage;
      return (
        <div
          contentEditable={false}
          className="my-4 w-full block border-2 border-dashed border-primary/20 rounded-xl overflow-hidden opacity-90 hover:opacity-100 transition-opacity"
        >
          <div className="bg-primary/5 p-2 text-xs font-bold text-primary uppercase text-center border-b border-primary/10">
            News List Page
          </div>
          <div className="pointer-events-none select-none">
            <Component />
          </div>
        </div>
      );
    },
  },
);

import { DynamicTemplateBlock } from "./DynamicTemplateBlock";

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
