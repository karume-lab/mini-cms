import { db } from "./src/db";
import {
  directorates,
  pages,
  heroSlides,
  cmsDepartments,
  cmsNews,
  cardCentreServices,
  cardCentreReplacements,
  siteSettings,
} from "./src/db/schema";
import { cardCentre } from "./src/components/directorates/data/card-centre";
import { departments } from "./src/components/directorates/data/departments";
import { news } from "./src/components/directorates/data/news";

const SLIDES = [
  {
    tagline: "CAMPUS LIFE",
    title: "Our Classes that fit your busy life and leisure",
    imageUrl: "/landing-page/robotics-dojo.webp",
  },
  {
    tagline: "ICT COMPETITION 2025",
    title:
      "Vice Chancellor Prof. Victoria Ngumi (4th right) with students and staff winners of Huawei regional ICT competition 2025",
    imageUrl: "/landing-page/huawei-ict-2025.webp",
  },
  {
    tagline: "TRAINING WORKSHOP",
    title:
      "VC interacts with participants of Turkana County during the JICA sponsored in-country training workshop",
    imageUrl: "/landing-page/training-workshop.webp",
  },
  {
    tagline: "COMMERCIALIZATION",
    title:
      "Jkuat and partners JHUB AFRICA, Mush & CO. and KOICA unveil a Smart Mushroom Farm",
    imageUrl: "/landing-page/commercialization.webp",
  },
];

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
  await db.delete(heroSlides);
  await db.delete(cmsDepartments);
  await db.delete(cmsNews);
  await db.delete(cardCentreServices);
  await db.delete(cardCentreReplacements);
  await db.delete(siteSettings);

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

  console.log("Seeding Hero Slides...");
  for (const slide of SLIDES) {
    await db.insert(heroSlides).values(slide);
  }

  console.log("Seeding Departments...");
  for (const dept of departments) {
    await db.insert(cmsDepartments).values({
      slug: dept.slug,
      name: dept.name,
      imageUrl: dept.image,
      headLabel: dept.headLabel,
      head: dept.head,
      excerpt: dept.excerpt,
      introduction: dept.introduction,
      about: JSON.stringify(dept.about),
    });
  }

  console.log("Seeding News...");
  for (const article of news) {
    await db.insert(cmsNews).values({
      slug: article.slug,
      title: article.title,
      excerpt: article.excerpt,
      content: article.paragraphs.map(p => `<p>${p}</p>`).join(""),
      imageUrl: article.image,
      publishedAt: new Date(article.date),
    });
  }

  console.log("Seeding Card Centre...");
  const icons = ["CreditCard", "BadgeCheck", "RefreshCw"];
  for (let i = 0; i < cardCentre.services.length; i++) {
    const service = cardCentre.services[i];
    await db.insert(cardCentreServices).values({
      title: service.title,
      description: service.description,
      iconName: icons[i] || "CreditCard",
    });
  }

  for (const replacement of cardCentre.replacements) {
    await db.insert(cardCentreReplacements).values({
      title: replacement.title,
      steps: JSON.stringify(replacement.steps),
    });
  }

  console.log("Seeding Settings...");
  await db.insert(siteSettings).values({
    key: "mission_statement",
    value: "To enhance efficient and effective data management, user support and excellent user experience and nurture innovations",
  });
  await db.insert(siteSettings).values({
    key: "apply_cta_title",
    value: "Ready to start your journey?",
  });
  await db.insert(siteSettings).values({
    key: "apply_cta_description",
    value: "Join the thousands of students already learning at JKUAT and take the first step towards a successful career.",
  });

  console.log("Seeding complete!");
}

seed().catch(console.error);
