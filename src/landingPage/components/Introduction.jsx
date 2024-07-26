import React from "react";
import BlurFade from "@/components/magicui/blur-fade";

const Introduction = () => {
  return (
    <div
      className="mx-auto mb-8 max-w-screen-2xl px-4 lg:px-14"
      id="Introduction"
    >
      <BlurFade delay={0.25} inView>
        <h1 className="font-bitter text-cvsu flex flex-col items-center justify-center text-2xl">
          "Exploring places, so we can highlight them to you."
        </h1>
      </BlurFade>
      <BlurFade delay={0.25 * 2} inView>
        <h1 className="font-bitter text-cvsu flex flex-col items-center justify-center pb-48 text-2xl font-bold">
          - Adventura Team
        </h1>
      </BlurFade>
    </div>
  );
};

export default Introduction;
