import { ExternalLink } from "lucide-react";
import Link from "next/link";

export const Projects = () => {
  const currentProjects = [
    {
      name: "Alfie",
      year: 2026,
      description:
        "An AI personal assistant that helps you organize, plan, and manage your life more effectively.",
      builtWith: "",
      color: "#A855F7",
      link: "",
    },
    {
      name: "Aethon",
      year: 2026,
      description:
        "Vercel-like developer experience for deploying and managing apps on your own VPS.",
      builtWith: "",
      color: "#F59E0B",
      link: "",
    },
  ];

  const pastProjects = [
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
      name: "Datburnt",
      year: 2023,
      description:
        "A multiplayer game where players battle it out by roasting funny images",
      builtWith: "Next.js, Tailwind, Express, SocketIO, MongoDB",
      color: "#FB6A6A",
      link: "https://github.com/DS-Infinity/datburnt/",
    },
    {
      name: "Smart Jab",
      year: 2022,
      description: "App to find COVID-19 vaccination slots in India",
      builtWith: "Flutter, React, Express",
      color: "#64D762",
      link: "https://github.com/chiragbhansali/smart-jab-mobile",
    },
  ];

  return (
    <div className="text-[#474747] text-[15px] sm:text-[17px] mt-[4px]">
      I like to keep working on personal projects whenever I can. Here are a few
      of them:
      <h4 className="font-[quando] text-[#777] text-[13px] sm:text-[14px] mt-[16px] mb-[4px]">
        Current
      </h4>
      <div>
        {currentProjects.map((project) => (
          <ProjectCard key={project.name} {...project} />
        ))}
      </div>
      <h4 className="font-[quando] text-[#777] text-[13px] sm:text-[14px] mt-[20px] mb-[4px]">
        Past
      </h4>
      <div>
        {pastProjects.map((project) => (
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
      style={{ borderColor: `${color}60` }}
    >
      <div className="flex justify-between items-center flex-wrap gap-[4px]">
        {link ? (
          <Link href={link} target="_blank" rel="noopener noreferrer">
            <h4 className="text-[15px] sm:text-[17px] text-[#000] font-[quando] flex items-center cursor-pointer hover:underline">
              {name}
              <ExternalLink size={14} className="ml-[5px] mb-[1px]" />
            </h4>
          </Link>
        ) : (
          <h4 className="text-[15px] sm:text-[17px] text-[#000] font-[quando] flex items-center">
            {name}
          </h4>
        )}
        <p className="text-[14px] sm:text-[16px] italic">{year}</p>
      </div>
      <p className="text-[14px] sm:text-[16px] mr-[6px]">{description}</p>
      {builtWith && (
        <div className="text-[13px] sm:text-[15px] mt-[4px]">
          Built with: {builtWith}
        </div>
      )}
    </div>
  );
};
