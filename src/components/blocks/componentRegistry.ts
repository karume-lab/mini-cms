import type React from "react";
import ApplyCTA from "@/components/directorates/ict/ApplyCta";
import CardCentre from "@/components/directorates/ict/CardCentre";
import DepartmentsListPage from "@/components/directorates/ict/DepartmentsListPage";
import DepartmentsSection from "@/components/directorates/ict/DepartmentsSection";
import Hero from "@/components/directorates/ict/Hero";
import MissionSection from "@/components/directorates/ict/MissionStatement";
import NewsListPage from "@/components/directorates/ict/NewsListPage";
import NewsSection from "@/components/directorates/ict/NewsSection";

export const ComponentRegistry: Record<string, React.ElementType> = {
  hero: Hero,
  newsSection: NewsSection,
  missionSection: MissionSection,
  departmentsSection: DepartmentsSection,
  cardCentre: CardCentre,
  applyCTA: ApplyCTA,
  departmentsListPage: DepartmentsListPage,
  newsListPage: NewsListPage,
};
