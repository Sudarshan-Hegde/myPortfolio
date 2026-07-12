import React, { useState } from "react";
import { SectionHeading } from "./Bio";

function Certificates() {
  const [selectedCert, setSelectedCert] = useState(null);

  const certificates = [
    {
      title: "Deep Learning — IIT Ropar",
      issuer: "NPTEL",
      description:
        "Completed the NPTEL Deep Learning course offered by IIT Ropar, gaining foundational and advanced knowledge in neural networks and deep learning techniques.",
      moreDescription:
        "This NPTEL course by IIT Ropar provided a strong foundation in deep learning, covering neural networks, perceptrons, activation functions, backpropagation, CNNs, RNNs, and generative models. The program balanced theory with hands-on practice using frameworks like TensorFlow and Keras. Through lectures and assignments, I learned to design, train, and evaluate deep learning models for tasks such as image classification and natural language processing, preparing me to apply deep learning to real-world AI problems.",
      imageSrc: `${import.meta.env.BASE_URL}deepLearning.jpeg`,
    },
    {
      title: "OSCode Appointment Certificate",
      issuer: "OSCODE COMMUNITY",
      description:
        "Appointed as a Creative Team Member at OSCode Community, bridging technical innovation with visual storytelling to empower the developer ecosystem.",
      moreDescription:
        "I officially joined the OSCode Community as a Creative Team Member, a role that sits at the intersection of technology and design. In this capacity, I am responsible for crafting the visual identity of our technical events, translating complex engineering concepts into accessible, engaging digital content. My journey with OSCode is driven by a commitment to continuous learning—leveraging my skills to build not just better software, but a stronger, more inclusive developer community.",
      imageSrc: `${import.meta.env.BASE_URL}certOSCode.jpg`,
    },
    {
      title: "Variables, Constants & Arguments in Studio",
      issuer: "UIPATH",
      description:
        "A comprehensive introduction to the UiPath platform, covering everything from the basics of RPA to advanced automation techniques.",
      moreDescription:
        "The course explores UiPath Studio, attended vs unattended bots, workflow automation, and practical examples that simulate real-world business processes. This helps build a solid foundation in RPA development.",
      imageSrc: `${import.meta.env.BASE_URL}cert-auto-01.jpg`,
    },
    {
      title: "Introduction to Automation",
      issuer: "UIPATH",
      description:
        "A comprehensive introduction to the UiPath platform, covering everything from the basics of RPA to advanced automation techniques.",
      moreDescription:
        "The course explores UiPath Studio, attended vs unattended bots, workflow automation, and practical examples that simulate real-world business processes. This helps build a solid foundation in RPA development.",
      imageSrc: `${import.meta.env.BASE_URL}cert-auto-02.jpg`,
    },
    {
      title: "Build Your First Process",
      issuer: "UIPATH",
      description:
        "Hands-on introduction to building automation workflows in UiPath Studio, from process design to execution.",
      moreDescription:
        "The course explores UiPath Studio, attended vs unattended bots, workflow automation, and practical examples that simulate real-world business processes. This helps build a solid foundation in RPA development.",
      imageSrc: `${import.meta.env.BASE_URL}cert-auto-02.jpg`,
    },
    {
      title: "Robotic Process Automation (RPA)",
      issuer: "CERTIFICATION",
      description:
        "A comprehensive introduction to RPA, covering everything from the basics to advanced automation techniques.",
      moreDescription:
        "The course explores UiPath Studio, attended vs unattended bots, workflow automation, and practical examples that simulate real-world business processes. This helps build a solid foundation in RPA development.",
      imageSrc: `${import.meta.env.BASE_URL}cert004.jpg`,
    },
    {
      title: "Power BI & Data Visualization",
      issuer: "SKILL DEVELOPMENT PROGRAM",
      description:
        "A comprehensive introduction to Power BI, covering everything from the basics of data visualization to advanced analytics techniques.",
      moreDescription:
        "The course explores Power BI Desktop, data modeling, DAX expressions, and practical examples that simulate real-world business scenarios. This helps build a solid foundation in data visualization and analytics.",
      imageSrc: `${import.meta.env.BASE_URL}cert005.jpg`,
    },
    {
      title: "Data Analytics with Power BI",
      issuer: "WORKSHOP",
      description:
        "A hands-on training program designed to equip participants with the skills needed to analyze and visualize data effectively using Power BI.",
      moreDescription:
        "The workshop covers data modeling, DAX expressions, and practical examples that simulate real-world business scenarios. This helps build a solid foundation in data analytics and visualization.",
      imageSrc: `${import.meta.env.BASE_URL}cert006.jpg`,
    },
  ];

  const handleOpenModal = (cert) => {
    setSelectedCert(cert);
    document.body.style.overflow = "hidden";
  };

  const handleCloseModal = () => {
    setSelectedCert(null);
    document.body.style.overflow = "auto";
  };

  return (
    <section id="certificates" className="border-b border-[var(--line)]">
      <div className="max-w-[104rem] mx-auto px-6 lg:px-10 py-20 lg:py-28">
        <SectionHeading index="05" label="Certifications">
          Credentials, <em>formally</em>
          <br />
          <em>on the record.</em>
        </SectionHeading>

        <div className="border-t border-[var(--line)]">
          {certificates.map((cert, index) => (
            <button
              key={index}
              onClick={() => handleOpenModal(cert)}
              className="w-full text-left grid grid-cols-[40px_1fr_auto] md:grid-cols-[60px_1fr_240px_100px] gap-4 md:gap-8 items-baseline py-6 border-b border-[var(--line)] group hover:bg-[var(--panel)] transition-colors md:px-4 md:-mx-4"
            >
              <span className="mono-label">{String(index + 1).padStart(2, '0')}</span>
              <div>
                <h3 className="font-display text-xl md:text-2xl text-[var(--ink)] leading-tight mb-1">
                  {cert.title}
                </h3>
                <p className="mono-label md:hidden">{cert.issuer}</p>
              </div>
              <p className="mono-label hidden md:block">{cert.issuer}</p>
              <span className="mono-label md:text-right group-hover:text-[var(--ink)] transition-colors">
                View →
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedCert && (
        <div
          onClick={handleCloseModal}
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[var(--paper)] border border-[var(--line-strong)] max-w-3xl w-full max-h-[90vh] overflow-auto"
          >
            <div className="flex items-center justify-between px-6 py-3 border-b border-[var(--line)] sticky top-0 bg-[var(--paper)]">
              <span className="mono-label">{'//'} Certificate · {selectedCert.issuer}</span>
              <button
                onClick={handleCloseModal}
                className="font-mono-ed text-xs text-[var(--ink-dim)] hover:text-[var(--ink)] transition-colors"
              >
                [ CLOSE ✕ ]
              </button>
            </div>
            <div className="p-6 lg:p-10">
              <img
                src={selectedCert.imageSrc}
                alt={selectedCert.title}
                className="w-full max-h-[60vh] object-contain border border-[var(--line)] bg-[var(--panel)] mb-8"
              />
              <h2 className="font-display text-3xl text-[var(--ink)] mb-4">{selectedCert.title}</h2>
              <p className="font-mono-ed text-[13px] leading-relaxed text-[var(--ink-dim)] mb-4">
                {selectedCert.description}
              </p>
              <p className="font-mono-ed text-xs leading-relaxed text-[var(--ink-faint)]">
                {selectedCert.moreDescription}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Certificates;
