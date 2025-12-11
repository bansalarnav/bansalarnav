import { ExternalLink } from "lucide-react";
import Link from "next/link";

export const Projects = () => {
  const projects = [
    {
      name: "Cyclr",
      year: 2025,
      description:
        "Bike sharing platform for college campuses. Complete with app and smart locks.",
      builtWith: "React Native, Elysia.js, PostgreSQL + Drizzle, PlatformIO",
      color: "#4886F7",
      link: "https://github.com/bansalarnav/cyclr",
    },
    {
      name: "Canvas Assignment Exporter",
      year: 2025,
      description: "Export assignments from Canvas to a Notion Database",
      builtWith: "SvelteKit, Notion API",
      color: "#F5A267",
      link: "https://canvas.arnav.fish",
    },
    {
      name: "Datburnt",
      year: 2023,
      description:
        "A multiplayer game where players battle it out by roasting images of famous personalities.",
      builtWith: "Next.js, Tailwind, Express, SocketIO, MongoDB",
      color: "#FB6A6A",
      link: "https://github.com/DS-Infinity/datburnt/",
    },
    {
      name: "Smart Jab",
      year: 2022,
      description: "App to find COVID-19 vaccination slots in India",
      builtWith: "Flutter, React, Express",
      color: "#E69EFE",
      link: "https://github.com/chiragbhansali/smart-jab-mobile",
    },
  ];

  return (
    <div className="text-[#474747] text-[15px] sm:text-[17px] mt-[4px]">
      I like to keep working on personal projects whenever I can. Here are a few
      of them:
      <div>
        {projects.map((project) => (
          <ProjectCard key={project.name} {...project} />
        ))}
      </div>
    </div>
  );
};

const ProjectCard = ({
  color,
  name,
  year,
  description,
  builtWith,
  link,
}: {
  color: string;
  name: string;
  year: number;
  description: string;
  builtWith: string;
  link: string;
}) => {
  return (
    <div
      className={`border-l-[4px] sm:border-l-[6px] my-[12px] sm:my-[16px] py-[2px] px-[8px] sm:px-[12px] text-[14px] sm:text-[16px]`}
      style={{ borderColor: color }}
    >
      <div className="flex justify-between items-center flex-wrap gap-[4px]">
        <Link href={link} target="_blank" rel="noopener noreferrer">
          <h4 className="text-[15px] sm:text-[17px] text-[#000] font-[quando] flex items-center cursor-pointer hover:underline">
            {name}
            <ExternalLink size={14} className="ml-[5px] mb-[1px]" />
          </h4>
        </Link>
        <p className="text-[14px] sm:text-[16px] italic">{year}</p>
      </div>
      <p className="text-[14px] sm:text-[16px]">{description}</p>
      <div className="text-[13px] sm:text-[15px] mt-[4px]">
        Built with: {builtWith}
      </div>
    </div>
  );
};
