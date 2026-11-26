import { projects } from "@/lib/portfolio-data";
import { siteConfig, siteUrl } from "@/lib/site";

export function StructuredData() {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteUrl}/#person`,
    name: siteConfig.name,
    url: siteUrl,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    jobTitle: siteConfig.jobTitle,
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.location.locality,
      addressRegion: siteConfig.location.region,
      addressCountry: "PK",
    },
    knowsAbout: [
      "Web Development",
      "Mobile App Development",
      "Next.js",
      "React",
      "TypeScript",
      "Firebase",
      "UI/UX",
    ],
    sameAs: [...siteConfig.sameAs],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: `${siteConfig.name} Portfolio`,
    description: siteConfig.description,
    inLanguage: "en-US",
    publisher: { "@id": `${siteUrl}/#person` },
  };

  const profilePage = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${siteUrl}/#profile`,
    url: siteUrl,
    name: siteConfig.title,
    description: siteConfig.description,
    isPartOf: { "@id": `${siteUrl}/#website` },
    mainEntity: { "@id": `${siteUrl}/#person` },
    dateModified: new Date().toISOString().split("T")[0],
  };

  const projectList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Portfolio projects",
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "CreativeWork",
        name: project.title,
        description: project.description,
        url: project.liveUrl?.startsWith("http")
          ? project.liveUrl
          : `${siteUrl}/#project-${project.slug}`,
        author: { "@id": `${siteUrl}/#person` },
        keywords: project.techStack.join(", "),
      },
    })),
  };

  const graph = {
    "@context": "https://schema.org",
    "@graph": [person, website, profilePage, projectList],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}