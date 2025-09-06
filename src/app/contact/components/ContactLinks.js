'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';

const ContactLinks = () => {
  return (
    <div className="border border-[#0b0b0b] rounded-lg overflow-hidden">
      <a
        href="mailto:sujoymaji16@gmail.com"
        className="group flex items-center justify-between p-6 border-b border-[#0b0b0b]"
      >
        <span className="text-xl">Send a mail</span>
        <ArrowRight className="transform transition-transform group-hover:translate-x-1" />
      </a>

      {/* <a
        href="https://cal.com/julianfella"
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center justify-between p-6 border-b border-gray-800 hover:bg-gray-900 transition-colors"
      >
        <span className="text-xl">Schedule a Call</span>
        <ArrowRight className="transform transition-transform group-hover:translate-x-1" />
      </a> */}

      <div className="grid grid-cols-2 divide-x divide-gray-800">
        <div className="p-6 space-y-2">
          <a href="https://www.linkedin.com/in/sujoymaji58/" target="_blank" rel="noopener noreferrer" className="hover:underline block">
            Linkedin
          </a>
          <a href="mailto:sujoymaji16@gmail.com" className="hover:underline block">
            E-Mail
          </a>
          <a href="https://github.com/sujoy-58" target="_blank" rel="noopener noreferrer" className="hover:underline block">
            Github
          </a>
          <a href="tel:+916304697737" target="_blank" rel="noopener noreferrer" className="hover:underline block">
            Phone No.
          </a>
        </div>

        <div className="p-6 space-y-2 text-right">
          <a href="https://www.linkedin.com/in/sujoymaji58/" target="_blank" rel="noopener noreferrer" className="hover:underline block">
            @sujoymaji58
          </a>
          <a href="mailto:sujoymaji16@gmail.com" className="hover:underline block">
            sujoymaji16@
          </a>
          <a href="https://github.com/sujoy-58" target="_blank" rel="noopener noreferrer" className="hover:underline block">
            @sujoy-58
          </a>
          <a href="tel:+916304697737" target="_blank" rel="noopener noreferrer" className="hover:underline block">
            +916304697737
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactLinks;
