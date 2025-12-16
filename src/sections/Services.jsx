import TextAnimation from "../components/TextAnimation;";
import ServiceItem from "../components/ServiceItem";
import ReusableText from "../components/Common/ReusableText";

function Services() {
  const services = [
    {
      number: "01",
      title: "Branding",
      description:
        "We shape identities that speak in silence. We give form to what you but can't you see.",
      tags: ["Logo Design", "Visual Identity", "Strategy", "Art Direction"],
    },
    {
      number: "02",
      title: "Web & Mobile Development",
      description:
        "We design and build high-performing websites and apps with precision and intent.",
      tags: ["React", "Next.js", "Node.js", "Tailwind", "UI/UX"],
    },
    {
      number: "03",
      title: "Strategy",
      description:
        "We guide projects with a deep focus on coherence, narrative, and emotional impact.",
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
              Shaped by every brief, built for clarity and impact. We merge design, development, and brand thinking to align vision with execution — with silence, precision, and intent.
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
