import TextAnimation from "../components/TextAnimation;";
import ServiceItem from "../components/ServiceItem";
import ReusableText from "../components/Common/ReusableText";

function Services() {
  const services = [
    {
      number: "01",
      title: "Branding",
      description:
        "Nous donnons forme à ce que vous savez mais que vous ne pouvez pas voir.",
      tags: ["Logo Design", "Visual Identity", "Strategy", "Art Direction"],
    },
    {
      number: "02",
      title: "Web & Mobile Development",
      description:
        "Nous créons des sites web et des applications performants avec soin.",
      tags: ["React", "Next.js", "Node.js", "Tailwind", "UI/UX"],
    },
    {
      number: "03",
      title: "Strategie",
      description:
        "Priorité à des projets cohérents, bien racontés et émotifs.",
      tags: ["Concept", "Design System", "Photography", "Motion"],
    },
  ];

  return (
    <section className="-mx-[10px] md:-mx-[20px] rounded-lg mt-[100px] md:mt-[180px] px-[16px] md:px-[20px] min-h-screen bg-[#47a0ff] flex flex-col gap-[60px] md:gap-[100px] text-black pt-[40px] md:pt-[60px] pb-[20px] ">
      <div className="md:grid md:grid-cols-12">
        {/* Colonne gauche */}
        <div className="md:col-span-3">
          <ReusableText>Services</ReusableText>
        </div>

        {/* Colonne droite */}
        <div className="md:col-span-9 ">
          <TextAnimation disableOnMobile={true}>
            <h2 className="text-[24px] leading-[32px] md:text-[32px] md:leading-[40px] neue-medium">
              Façonné par chaque brief, construit pour la clarté et l'impact. Nous fusionnons le design, le développement et la réflexion de marque pour aligner la vision avec l'exécution — avec silence, précision et intention.
            </h2>
          </TextAnimation>
        </div>
      </div>

      {/* Liste des services */}
      <div className="space-y-[16px]">
        {services.map((service, index) => (
          <ServiceItem key={index} {...service} />
        ))}
      </div>
    </section>
  );
}

export default Services;
