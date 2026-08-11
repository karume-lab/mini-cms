import { db } from "./src/db";
import { directorates, pages } from "./src/db/schema";

async function seed() {
  console.log("Seeding ICT Directorate...");

  const ictDirectorate = {
    id: "ict",
    name: "Directorate of ICT",
    slug: "ict",
    description:
      "Providing innovative technology solutions to support the university's academic and administrative goals.",
    email: "ict@jkuat.ac.ke",
    phone: "+254 67 5870001",
    location: "Main Campus, Juja",
    leadershipName: "Dr. Mwirigi Kiula",
    leadershipTitle: "Director, ICT",
  };

  // Clear existing data
  await db.delete(pages);
  await db.delete(directorates);

  // Insert or update directorate
  await db.insert(directorates).values(ictDirectorate);

  // Define initial BlockNote content containing the ICT components
  const initialContent = JSON.stringify([
    { type: "hero", props: {} },
    { type: "newsSection", props: {} },
    { type: "missionSection", props: {} },
    { type: "departmentsSection", props: {} },
    { type: "cardCentre", props: {} },
    { type: "applyCTA", props: {} },
  ]);

  const subPages = [
    {
      title: ictDirectorate.name,
      slug: ictDirectorate.slug,
      type: "about",
      directorateId: ictDirectorate.id,
      content: initialContent,
    },
    {
      title: "Departments",
      slug: "departments",
      type: "custom",
      directorateId: "ict",
      content: JSON.stringify([{ type: "departmentsListPage", props: {} }]),
    },
    {
      title: "News & Events",
      slug: "news",
      type: "notice-board",
      directorateId: "ict",
      content: JSON.stringify([{ type: "newsListPage", props: {} }]),
    },
  ];

  for (const page of subPages) {
    await db.insert(pages).values(page);
  }

  console.log("Seeding complete!");
}

seed().catch(console.error);
