/* eslint-disable react/no-unescaped-entities */
import StepItem from '../components/StepItem'
import ReusableText from '../components/Common/ReusableText';
export default function Approach() {
  const steps = [
    { title: "Discovery & Strategy", desc: "Every great projects  starts with a deep dive into understanding your unique vision. We take the time to learn about your brand, market, and goals. This phase is all aboutgetting to know what makes your business tick, so we can craft a strategic plan that lays the foundation for your success." },
    { title: "Creative Design", desc: "This is where the magic happen. We take the insights from our discovery phase and transform them into creative concepts that reflect your brand's essence. Our goal? To design something that not only looks amazing but truly resonnates with audiences." },
    { title: "Development", desc: "With a strong design in hand, we move into development. Our team brings those creative ideas to life, ensurings the website not only functions flawlessly but also embodies the creativity and innovation we envisionned together." },
    { title: "Testing & Quality Assurance", desc: "Before we launch, we rigorously test every aspect of the project. From functionality to user experience, we ensure everything works seamlessly. We're obsessed with the details beacause we want your users to have the best experience possible." },
    { title: "Launch & Optimization", desc: "Launch day is just the beginning. We optimized your site for performance and make sure everithing is running smoothy. Then ,we're there to monitor, tweak, and refine-making sure your project hits the ground running" },
    { title: "Continuous Support & Growth", desc: "We don't hand overy the key and walk away. Our team provides ongoing support to help you grow and adapt as your need evolve. Whether it's updates, new features, or just some advices, we've got your back." },
    { title: "Asking you for Clucth review", desc: "Finally , we'de love to hear your feedback. If your're happy with the work we've done, sharing your experience on Clucth would mean the world to us. It helps us continue doing what we love and lets others know they're in good hands." },
  ];

  const colors = [
    "#000",
    "#000",
    "#000",
    "#000",
    "#000",
    "#000",
    "#000",
  ];

  return (
    <section className="-mx-[10px] md:-mx-[20px] my-[100px] md:mt-[200px] space-y-[16px] md:space-y-[48px]">
      <div className="space-y-[16px] text-center">
        <ReusableText>Our approach</ReusableText>
        <h2 className="pp-editorial text-[42px] leading-[42px] md:text-[140px] md:leading-[140px] uppercase neue-medium">How it's done</h2>
      </div>

      <div className="space-y-[8px] relative">
        {steps.map((step, i) => (
          <StepItem
            key={i}
            title={step.title}
            desc={step.desc}
            index={i}
            color={colors[i]}
          />
        ))}
      </div>
    </section>
  );
}


