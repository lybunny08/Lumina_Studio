function Contact() {
  return (
    <div className="w-full">
      <div className="grid md:grid-cols-2 h-full w-full md:mr-[-30px]">
        <div className="flex flex-col w-full md:pr-[16px] gap-[24px] md:justify-between">
          <p className="uppercase text-[24px] leading-[32px] md:text-[38px] md:leading-[46px] neue-bold ">
            Partagez votre vision — <br /> Construisons-le
          </p>
          <div className="flex flex-col gap-[16px] ">
            <div className="flex flex-col md:flex-row gap-[16px]">
              <input type="text" placeholder="Votre nom*" className="bg-black w-full rounded-md h-[40px] text-white px-[16px] " />
              <input type="mail" placeholder="Votre email*" className="bg-black w-full rounded-md h-[40px] text-white px-[16px] " />
            </div>
            <input type="text" placeholder="Object: Branding, Landing page, ect ...*" className="bg-black w-full rounded-md h-[40px] text-white px-[16px] " />
            <textarea name="" id="" rows="8" placeholder="Je veux créer ....*" className="bg-black rounded-lg text-white px-[16px] pt-[10px] resize-none"></textarea>
            <button className="bg-black text-white rounded-md">
              <div className="flex flex-row justify-center items-center gap-[8px] ">
                <span className="neue-medium">Envoyer</span>
                <div className="size-[20px] bg-white rounded-md "></div>
              </div>
            </button>
            <span>Nous répondons généralement dans 24 heures.</span>
          </div>
        </div>
        <div className="hidden md:block w-full h-full bg-black"></div>
      </div>
    </div>
  );
}

export default Contact;