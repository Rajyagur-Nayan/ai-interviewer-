import React from "react";
import Section1 from "../components/Section1";
import Section2 from "../components/Section2";
import Section3 from "../components/Section3";
import Section4 from "../components/Section4";

const page = () => {
  return (
    <div className="bg-white dark:bg-black min-h-screen">
      <Section1 />
      <Section2 />
      <Section4 />
      <Section3 />
    </div>
  );
};

export default page;
