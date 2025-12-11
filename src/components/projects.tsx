export const Projects = () => {
  const projects = [];
  return (
    <div className="text-[#474747] text-[17px] mt-[4px]">
      I like to keep working on personal projects whenever I can. Here are a few
      of them:
      <div>
        <ProjectCard color={"#f00"} />
        <ProjectCard color={"#0f0"} />
        <ProjectCard color={"#00f"} />
      </div>
    </div>
  );
};

const ProjectCard = ({ color }: { color: string }) => {
  return (
    <div
      className={`border-l-[6px] my-[16px] py-[2px] px-[12px]`}
      style={{ borderColor: color }}
    >
      <div className="flex justify-between items-center">
        <h4>Cyclr</h4>
        <p>2025</p>
      </div>
      <p>A brief description</p>
      <div>Built with: React Native, Elysia.js, Drizzle, PlatformIO</div>
    </div>
  );
};
