export const Projects = () => {
  const projects = [];
  return (
    <div className="text-[#474747] text-[15px] sm:text-[17px] mt-[4px]">
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
      className={`border-l-[4px] sm:border-l-[6px] my-[12px] sm:my-[16px] py-[2px] px-[8px] sm:px-[12px] text-[14px] sm:text-[16px]`}
      style={{ borderColor: color }}
    >
      <div className="flex justify-between items-center flex-wrap gap-[4px]">
        <h4 className="text-[16px] sm:text-[18px]">Cyclr</h4>
        <p className="text-[14px] sm:text-[16px]">2025</p>
      </div>
      <p className="text-[14px] sm:text-[16px]">A brief description</p>
      <div className="text-[13px] sm:text-[15px]">
        Built with: React Native, Elysia.js, Drizzle, PlatformIO
      </div>
    </div>
  );
};
