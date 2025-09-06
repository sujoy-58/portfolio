import React from "react";
import ContactForm from "./components/ContactForm";

const page = () => {
  return (
    <>
      <div className="min-h-screen bg-[#deddd9] text-[#1e1e1e] flex items-center justify-center mt-40 font-second font-semibold pb-10">
        <ContactForm />
      </div>
    </>
  );
};

export default page;
