"use client";

import React, { useState, useEffect } from "react";
import InputField from "./InputField";
import OptionButton from "./OptionButton";
import ContactLinks from "./ContactLinks";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    description: "",
    services: [],
    timeline: "",
    deadline: "",
    source: "",
  });

  const initialFormState = {
    name: "",
    company: "",
    email: "",
    description: "",
    services: [],
    timeline: "",
    deadline: "",
    source: "",
  };

  const [errors, setErrors] = useState([]);
  const [touched, setTouched] = useState([]);
  const [missingFields, setMissingFields] = useState(7);

  const serviceOptions = [
    "WEBDEVELOPMENT",
    "WEBDESIGN",
    "BRANDING",
    "ANIMATIONS",
    "OTHER",
  ];
  const timelineOptions = ["NOW", "IN 1-2 WEEKS", "IN 1 MONTH", "LATER"];
  const deadlineOptions = [
    "FINISH ASAP",
    "WITHIN THE NEXT MONTH",
    "3+ MONTHS",
    "NO DEADLINE",
  ];
  const sourceOptions = [
    "SOCIAL MEDIA",
    "REFERAL",
    "INTERNET",
    "WEBFLOW",
    "AWWWARDS",
    "OTHER",
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (!touched.includes(field)) {
      setTouched((prev) => [...prev, field]);
    }
  };

  const handleServiceToggle = (service) => {
    const updatedServices = formData.services.includes(service)
      ? formData.services.filter((s) => s !== service)
      : [...formData.services, service];

    setFormData((prev) => ({ ...prev, services: updatedServices }));
    if (!touched.includes("services")) {
      setTouched((prev) => [...prev, "services"]);
    }
  };

  const handleOptionSelect = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (!touched.includes(field)) {
      setTouched((prev) => [...prev, field]);
    }
  };

  const validateForm = () => {
    const newErrors = [];
    let filled = 0;

    if (!formData.name) newErrors.push("name");
    else filled++;
    if (!formData.company) newErrors.push("company");
    else filled++;
    if (!formData.email) newErrors.push("email");
    else filled++;
    if (!formData.description || formData.description.length < 20)
      newErrors.push("description");
    else filled++;
    if (formData.services.length === 0) newErrors.push("services");
    else filled++;
    if (!formData.timeline) newErrors.push("timeline");
    else filled++;
    if (!formData.deadline) newErrors.push("deadline");
    else filled++;

    setErrors(newErrors);
    setMissingFields(7 - filled);

    return newErrors.length === 0;
  };

  useEffect(() => {
    validateForm();
  }, [formData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
      alert("Form submitted successfully!");

      setFormData(initialFormState);
      setErrors([]);
      setTouched([]);
      setMissingFields(7);
    } else {
      console.log("Form has errors:", errors);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-6xl grid md:grid-cols-2 gap-24"
    >
      <div className="space-y-6">
        <InputField
          label="NAME & SURNAME"
          value={formData.name}
          onChange={(val) => handleInputChange("name", val)}
          required
          error={errors.includes("name") && touched.includes("name")}
        />
        <InputField
          label="COMPANY NAME"
          value={formData.company}
          onChange={(val) => handleInputChange("company", val)}
          required
          error={errors.includes("company") && touched.includes("company")}
        />
        <InputField
          label="E-MAIL ADDRESS"
          value={formData.email}
          onChange={(val) => handleInputChange("email", val)}
          required
          error={errors.includes("email") && touched.includes("email")}
        />
        <InputField
          label="PROJECT DESCRIPTION (MIN. 20 CHAR)"
          value={formData.description}
          onChange={(val) => handleInputChange("description", val)}
          required
          multiline
          error={
            errors.includes("description") && touched.includes("description")
          }
        />
      </div>

      <div className="space-y-6">
        <div>
          <p className="mb-3">
            WHAT SERVICES DO YOU NEED? <span className="text-red-500">*</span>
          </p>
          <div className="flex flex-wrap gap-3">
            {serviceOptions.map((service) => (
              <OptionButton
                key={service}
                label={service}
                selected={formData.services.includes(service)}
                onClick={() => handleServiceToggle(service)}
              />
            ))}
          </div>
        </div>

        <div>
          <p className="mb-3">
            WHEN SHOULD WE START? <span className="text-red-500">*</span>
          </p>
          <div className="flex flex-wrap gap-3">
            {timelineOptions.map((option) => (
              <OptionButton
                key={option}
                label={option}
                selected={formData.timeline === option}
                onClick={() => handleOptionSelect("timeline", option)}
              />
            ))}
          </div>
        </div>

        <div>
          <p className="mb-3">
            ANY DEADLINES? <span className="text-red-500">*</span>
          </p>
          <div className="flex flex-wrap gap-3">
            {deadlineOptions.map((option) => (
              <OptionButton
                key={option}
                label={option}
                selected={formData.deadline === option}
                onClick={() => handleOptionSelect("deadline", option)}
              />
            ))}
          </div>
        </div>

        <div className="mt-8 mb-4">
          <button
            type="submit"
            className="bg-[#0b0b0b] hover:opacity-65 transition-colors text-[#deddd9] py-3 px-16 rounded-full font-medium"
          >
            Submit
          </button>
          <p className="mt-3 text-[#1e1e1e] opacity-60">
            {missingFields}/7 MISSING FIELDS
          </p>
        </div>

        <ContactLinks />
      </div>
    </form>
  );
};

export default ContactForm;
