import React from "react";
import BlurFade from "@/components/magicui/blur-fade";

const Introduction = () => {
  return (
    <div className="mx-auto mb-40 max-w-screen-2xl px-4 lg:px-14">
      <BlurFade delay={0.25} inView>
        <h1 className="flex flex-col items-center justify-center text-center font-bitter text-2xl text-cvsu">
          "Discover Your Path, Seamlessly."
        </h1>
      </BlurFade>
      <BlurFade delay={0.25 * 2} inView>
        <h1 className="flex flex-col items-center justify-center pb-48 font-bitter text-2xl font-bold text-cvsu">
          - Adventura Team
        </h1>
      </BlurFade>
    </div>
  );
};

export default Introduction;
