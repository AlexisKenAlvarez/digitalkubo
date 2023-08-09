import React from "react";

const Location = () => {
  return (
    <div className="w-full flex flex-col h-auto items-center justify-center px-5 py-10 font-primary">
      <h1 className="text-center text-[#D1770E] text-4xl font-bold p-2">
        Location
      </h1>
      <h1 className="text-center text-[#000000] text-1xl md:text-1xl py-4 font-secondary ">
        911 T.A Tandang Sora, 70th Floor TnT Building, Ohio, Calabarzon 619, PH
      </h1>

      <iframe
        className="w-full min-h-screen"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2620.1014290379035!2d2.3537549769005954!3d48.95155449414505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66939de4deebb%3A0xe219f0aee9315277!2s4%20Av.%20Sacco%20et%20Vanzetti%2C%2093200%20Saint-Denis%2C%20France!5e0!3m2!1sen!2sph!4v1691590933385!5m2!1sen!2sph"
        // width="600"
        // height="450"
        // style="border:0;"
        // allowfullscreen=""
        // loading="lazy"
        // referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default Location;
