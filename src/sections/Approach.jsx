/* eslint-disable react/no-unescaped-entities */
import StepItem from '../components/StepItem'
import ReusableText from '../components/Common/ReusableText';
export default function Approach() {
  const steps = [
    { title: "Découverte et Stratégie", desc: "Chaque grand projet débute par une compréhension approfondie de votre vision. Nous apprenons à connaître votre marque, votre marché et vos objectifs, afin d'élaborer un plan stratégique pour assurer votre succès." },
    { title: "Design Creatif", desc: "Nous transformons les insights de notre phase de découverte en concepts créatifs qui reflètent votre marque, avec pour objectif de concevoir quelque chose de magnifique et qui résonne avec les audiences." },
    { title: "Développement", desc: "Avec un design solide en main, nous passons au développement. Notre équipe fait vivre ces idées créatives, s'assurant que le site web non seulement fonctionne parfaitement mais incarne également la créativité et l'innovation que nous avons imaginées ensemble." },
    { title: "Test et Assurance Qualité", desc: "Avant de lancer, nous testons rigoureusement chaque aspect du projet. De la fonctionnalité à l'expérience utilisateur, nous assurons que tout fonctionne parfaitement. Nous sommes obsédés par les détails car nous voulons que vos utilisateurs aient la meilleure expérience possible." },
    { title: "Lancement et Optimisation", desc: "Le jour du lancement n'est que le début. Nous avons optimisé votre site pour la performance et nous assurons que tout fonctionne sans accroc. Ensuite, nous sommes là pour surveiller, ajuster et affiner, en veillant à ce que votre projet démarre sur les chapeaux de roues." },
    { title: "Soutien et croissance continus", desc: "Nous ne remettons pas les clés et nous nous éloignons. Notre équipe vous offre un soutien continu pour vous aider à croître et à vous adapter au fur et à mesure que vos besoins évoluent. Que ce soit des mises à jour, de nouvelles fonctionnalités ou simplement des conseils, nous sommes là pour vous." },
    { title: "Demande de retour sur Clucth.", desc: "Enfin, nous aimerions connaître vos retours. Si vous êtes satisfait du travail que nous avons réalisé, partager votre expérience sur Clutch signifierait énormément pour nous. Cela nous aide à continuer à faire ce que nous aimons et permet aux autres de savoir qu'ils sont entre de bonnes mains." },
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
        <ReusableText>Notre approche</ReusableText>
        <h2 className="pp-editorial text-[42px] leading-[42px] md:text-[140px] md:leading-[140px] uppercase neue-medium">Les démarches</h2>
      </div>

      <div className="space-y-[8px] relative">
        {steps.map((step, i) => (
          <StepItem
            key={i}
            title={step.title}
            desc={step.desc}
            index={i}
          />
        ))}
      </div>
    </section>
  );
}


