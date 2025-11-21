import React from "react";

export default function StepItem({ title, desc, index, color }) {
  const [pos, setPos] = React.useState({ x: 0, y: 0 });
  const [hovered, setHovered] = React.useState(false);

  return (
    <div
      className="group relative flex flex-col md:flex-row md:grid md:grid-cols-12 py-[24px] px-[20px] bg-[#e7e7e7] text-black rounded-md gap-[16px] md:gap-0"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Animation hover seulement sur desktop */}
      {hovered && typeof window !== 'undefined' && window.innerWidth >= 768 && (
        <div
          className="absolute z-40 rounded-md pointer-events-none"
          style={{
            background: color,
            width: 180,
            height: 180,
            top: pos.y - 100,
            left: pos.x - 100,
          }}
        />
      )}
      
      {/* Version mobile : Numéro d'abord, puis titre */}
      <div className="flex flex-row items-start gap-[16px] md:hidden relative z-10">
        <span className="px-[11px] py-[6px] bg-black text-white rounded-md flex-shrink-0">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="text-[22px] neue-medium">{title}</h3>
      </div>

      {/* Version desktop : Titre à gauche, numéro à droite */}
      <h3 className="hidden md:block col-span-6 text-[22px] neue-medium relative z-10">{title}</h3>
      
      <div className="col-span-6 flex flex-row items-start gap-[24px] relative z-10">
        <span className="hidden md:flex px-[11px] py-[6px] bg-black text-white rounded-md">
          {String(index + 1).padStart(2, "0")}
        </span>
        <p className="text-black/70">{desc}</p>
      </div>
    </div>
  );
}