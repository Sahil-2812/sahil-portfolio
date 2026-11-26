import { PortfolioShell } from "@/components/portfolio/portfolio-shell";
import { projects } from "@/lib/portfolio-data";
import { siteConfig } from "@/lib/site";

/** Crawlable summary for search engines (visually hidden, not duplicate h1). */
function CrawlableSummary() {
  return (
    <div className="sr-only">
      <p>
        {siteConfig.description} Email: {siteConfig.email}. Skills include React, Next.js,
        TypeScript, Node.js, Firebase, Tailwind CSS, and mobile development with Expo.
      </p>
      <ul>
        {projects.map((project) => (
          <li key={project.title}>
            <strong>{project.title}</strong>: {project.description} Technologies:{" "}
            {project.techStack.join(", ")}.
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <CrawlableSummary />
      <PortfolioShell />
    </>
  );
}