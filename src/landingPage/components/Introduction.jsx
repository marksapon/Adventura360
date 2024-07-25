import React from "react";

const Introduction = () => {
  const AboutImg = "/assets/Landing Page/introduction/phone girl.png";

  return (
    <div
      className="mx-auto my-8 max-w-screen-2xl px-4 lg:px-14"
      id="Introduction"
    >
      <h1 className="flex flex-col items-center justify-center py-48 text-2xl text-green-600">
        "Exploring places, so we can highlight them to you." <br />{" "}
        <b>- Adventura Team</b>
      </h1>
    </div>
  );
};

export default Introduction;
