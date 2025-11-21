function ProjectsComponent({ number, title, category }) {
  return (
    <div className="flex flex-col gap-[16px]">
      <div className="h-[230px] md:h-[430px] w-full md:w-[300px] bg-[#bababa] rounded-md"></div>

      <div className="flex flex-col gap-[8px]">
        <div className="flex flex-row text-[14px] justify-between">
          <span>{number}</span>
          <span>{category}</span>
        </div>
        <span>{title}</span>
      </div>
    </div>
  );
}

export default function ProjectsList() {
  const projects = [
    { number: "01", title: "Portfolio Website", category: "Web Design" },
    { number: "02", title: "Luxury Store", category: "E-commerce" },
    { number: "03", title: "Travel Agency", category: "Landing Page" },
    { number: "04", title: "AI Dashboard", category: "Web App" },
    { number: "05", title: "Music Studio", category: "Creative Site" },
    { number: "06", title: "Fashion Brand", category: "Brand Identity" },
  ];

  return (
    <div className="flex flex-col gap-[20px] md:flex-row md:gap-[200px]  ">
      {/* afficher seulement 2 sur petits écrans */}
      {projects.slice(0, 2).map((p, i) => (
        <div key={i} className="block md:hidden">
          <ProjectsComponent {...p} />
        </div>
      ))}

      {/* afficher les 6 sur grand écran */}
      {projects.map((p, i) => (
        <div key={i} className="hidden md:block">
          <ProjectsComponent {...p} />
        </div>
      ))}
    </div>
  );
}
