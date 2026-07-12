import React, { useState } from "react";
import { SectionHeading } from "./Bio";

function Project() {
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      title: "Geo-Agri Analyst",
      tag: "The Research",
      stack: "PYTORCH · REACT · FASTAPI · GANS",
      description:
        "An End-to-End Decision Support System for Agriculture via Super-Resolution and Active Learning.",
      fullDescription:
        "This project proposes a cloud-deployable framework that uses Generative Adversarial Networks to upscale low-resolution satellite imagery and Active Learning to reduce manual labeling effort by 85%, making high-precision agricultural monitoring more accessible and cost-effective.",
      imageSrc: `${import.meta.env.BASE_URL}proj_img04.png`,
    },
    {
      title: "Portfolio Website",
      tag: "The Document",
      stack: "REACT · TAILWIND CSS · FIREBASE",
      description:
        "A responsive portfolio website built using React and Tailwind CSS. The website showcases my skills, projects, and certifications.",
      fullDescription:
        "This portfolio includes sections like About Me, Skills, Projects, and Certifications. It's built entirely with React and styled using Tailwind CSS for rapid development and responsive design. It includes dark mode, smooth scroll, and reusable modular components. The project demonstrates a strong understanding of component-driven architecture and modern front-end principles.",
      imageSrc: `${import.meta.env.BASE_URL}proj_img01.png`,
    },
    {
      title: "Object Detection",
      tag: "The Vision",
      stack: "TENSORFLOW · CNN · PYTHON",
      description:
        "A machine learning project that uses TensorFlow to detect objects in images.",
      fullDescription:
        "In this project, a custom CNN model was trained using TensorFlow to recognize multiple object classes with bounding boxes. It includes data preprocessing, augmentation, model architecture, training pipelines, and real-time inference. This project highlights expertise in ML workflows, including TensorBoard visualization, model evaluation, and deployment readiness.",
      imageSrc: `${import.meta.env.BASE_URL}proj_img02.png`,
    },
    {
      title: "UNet Polygon",
      tag: "The Segmenter",
      stack: "PYTORCH · UNET · KAGGLE",
      description:
        "UNet-based model to color polygons using shape and color inputs.",
      fullDescription:
        "This project implements a UNet architecture to color polygons based on user-defined shapes and colors. It includes data preparation, model training, and inference pipelines. The model can generate colored polygon images based on input parameters, showcasing advanced skills in computer vision and deep learning. The project demonstrates expertise in semantic segmentation, custom dataset creation, and advanced neural network architectures for computer graphics applications.",
      imageSrc: `${import.meta.env.BASE_URL}proj_img03.png`,
    },
  ];

  const openModal = (project) => {
    setSelectedProject(project);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = "auto";
  };

  return (
    <section id="projects" className="border-b border-[var(--line)]">
      <div className="max-w-[104rem] mx-auto px-6 lg:px-10 py-20 lg:py-28">
        <SectionHeading index="04" label="Projects">
          Ideas are cheap.
          <br />
          <em>Shipped work is not.</em>
        </SectionHeading>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 border-t border-[var(--line)]">
          {projects.map((project, index) => (
            <article
              key={index}
              onClick={() => openModal(project)}
              className={`cursor-pointer border-b lg:border-b-0 border-[var(--line)] py-10 lg:px-7 group hover:bg-[var(--panel)] transition-colors ${index > 0 ? 'lg:border-l' : ''} ${index === 0 ? 'lg:pl-0' : ''} ${index === 3 ? 'lg:pr-0' : ''} ${index % 2 === 1 ? 'sm:border-l lg:border-l' : ''} sm:px-6`}
            >
              <div className="flex items-baseline justify-between mb-8">
                <span className="mono-label">0{index + 1}</span>
                <span className="mono-label">{project.tag}</span>
              </div>

              <figure className="border border-[var(--line)] mb-6 overflow-hidden">
                <img
                  src={project.imageSrc}
                  alt={project.title}
                  className="w-full h-36 object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </figure>

              <h3 className="font-display text-2xl lg:text-[1.65rem] leading-tight text-[var(--ink)] mb-2">
                {project.title}
              </h3>
              <p className="mono-label mb-4">{project.stack}</p>
              <p className="font-mono-ed text-xs leading-relaxed text-[var(--ink-dim)] mb-8">
                {project.description}
              </p>
              <p className="mono-label group-hover:text-[var(--ink)] transition-colors">
                Read brief →
              </p>
            </article>
          ))}
        </div>
      </div>

      {/* Modal — document panel */}
      {selectedProject && (
        <div
          onClick={closeModal}
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[var(--paper)] border border-[var(--line-strong)] max-w-3xl w-full max-h-[90vh] overflow-auto"
          >
            <div className="flex items-center justify-between px-6 py-3 border-b border-[var(--line)] sticky top-0 bg-[var(--paper)]">
              <span className="mono-label">{'//'} Project Brief · {selectedProject.tag}</span>
              <button
                onClick={closeModal}
                className="font-mono-ed text-xs text-[var(--ink-dim)] hover:text-[var(--ink)] transition-colors"
              >
                [ CLOSE ✕ ]
              </button>
            </div>
            <div className="p-6 lg:p-10">
              <img
                src={selectedProject.imageSrc}
                alt={selectedProject.title}
                className="w-full border border-[var(--line)] mb-8"
              />
              <h2 className="font-display text-4xl text-[var(--ink)] mb-2">
                {selectedProject.title}
              </h2>
              <p className="mono-label mb-6">{selectedProject.stack}</p>
              <p className="font-mono-ed text-[13px] leading-relaxed text-[var(--ink-dim)] whitespace-pre-line">
                {selectedProject.fullDescription}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Project;
