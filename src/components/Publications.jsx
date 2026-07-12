import React, { useState } from "react";
import { SectionHeading } from "./Bio";

function Publications() {
  const [showModal, setShowModal] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  const publication = {
    title:
      "Geo-Agri Analyst: An End-to-End Decision Support System for Agriculture via Super-Resolution and Active Learning",
    journal: "INTERNATIONAL JOURNAL OF SCIENTIFIC DEVELOPMENT AND RESEARCH (IJSDR)",
    volume: "VOL. 11 · ISSUE 2 · FEB 2026",
    description:
      "This research proposes an end-to-end framework that integrates RFB-ESRGAN for 4× spatial resolution enhancement of multi-spectral imagery with a Deep Bayesian Active Learning loop to optimize data efficiency. By synergizing perceptual super-resolution and hybrid query strategies, the system achieves state-of-the-art classification accuracy while reducing expert annotation requirements by 85% on accessible cloud infrastructure.",
    moreDescription:
      "Abstract: In the contemporary era of digital agriculture, the ability to accurately classify and monitor land cover types has become paramount for ensuring food security, optimizing resource allocation, and conducting precise yield estimation. However, the coarse spatial resolution of public satellite data and the prohibitive expense of expert ground-truth annotation have frequently stifled the scalability of such systems in developing regions. To bridge this gap, we have proposed a comprehensive, end-to-end decision support system. This system has synergized a Perceptual Extreme Super-Resolution Network with Receptive Field Blocks (RFB-ESRGAN) and a label-efficient Deep Bayesian Active Learning strategy. We have proposed a Generative Adversarial Network enhanced with multi-scale Receptive Field Blocks. This has allowed us to infer and reconstruct latent high-frequency textures. Consequently, it has achieved a fourfold increase in the spatial resolution of multi-spectral imagery. To concurrently address data scarcity, we have employed a hybrid query strategy. This strategy has combined Distance-Based Sampling and Spatial-Spectral Entropy. It has iteratively identified and requested labels for only the most mathematically informative samples. We have validated this approach on accessible cloud infrastructure using the BigEarthNet archive. This approach has significantly enhanced classification accuracy for complex heterogeneous crop patterns. Furthermore, it has reduced labeled data requirements by approximately 85% compared to random sampling baselines. Thus, it has offered a robust pathway for democratizing precision agriculture analytics.",
    images: [
      `${import.meta.env.BASE_URL}research01.jpg`,
      `${import.meta.env.BASE_URL}research02.jpg`,
      `${import.meta.env.BASE_URL}research03.jpg`,
    ],
    certLink: "https://ijsdr.org/certificatemanager.php?a_rid=307202",
    paperLink: "https://ijsdr.org/papers/IJSDR2602037.pdf",
    confirmationLink: "https://ijsdr.org/confirmationlettermanager.php?a_rid=307202",
  };

  const stats = [
    ['4×', 'Resolution increase'],
    ['85%', 'Fewer labels needed'],
    ['+5.4%', 'Top-1 accuracy'],
  ];

  const openModal = () => {
    setShowModal(true);
    document.body.style.overflow = "hidden";
  };
  const closeModal = () => {
    setShowModal(false);
    document.body.style.overflow = "auto";
  };

  const nextImage = (e) => {
    e?.stopPropagation();
    setImageIndex((prev) => (prev + 1) % publication.images.length);
  };
  const prevImage = (e) => {
    e?.stopPropagation();
    setImageIndex((prev) => (prev - 1 + publication.images.length) % publication.images.length);
  };

  return (
    <section id="publications" className="border-b border-[var(--line)]">
      <div className="max-w-[104rem] mx-auto px-6 lg:px-10 py-20 lg:py-28">
        <SectionHeading index="06" label="Publication">
          Research is not done
          <br />
          <em>until it is written.</em>
        </SectionHeading>

        {/* Figure panel */}
        <figure className="border border-[var(--line)] bg-[var(--panel)]">
          <figcaption className="flex items-center justify-between px-4 lg:px-6 py-2.5 border-b border-[var(--line)]">
            <span className="mono-label">{'//'} FIG_02 · Published Research · Peer-Reviewed</span>
            <span className="mono-label hidden sm:flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--ink)] inline-block"></span>
              IJSDR · Feb 2026
            </span>
          </figcaption>

          <div className="grid lg:grid-cols-[1fr_1.2fr]">
            {/* Left — image carousel */}
            <div className="p-6 lg:p-8 lg:border-r border-b lg:border-b-0 border-[var(--line)]">
              <div className="relative border border-[var(--line)] bg-[var(--panel-2)]">
                <img
                  src={publication.images[imageIndex]}
                  alt={publication.title}
                  className="w-full object-cover"
                />
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 font-mono-ed text-xs bg-[var(--paper)] border border-[var(--line-strong)] text-[var(--ink)] px-2.5 py-1.5 hover:bg-[var(--ink)] hover:text-[var(--paper)] transition-colors"
                >
                  ←
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 font-mono-ed text-xs bg-[var(--paper)] border border-[var(--line-strong)] text-[var(--ink)] px-2.5 py-1.5 hover:bg-[var(--ink)] hover:text-[var(--paper)] transition-colors"
                >
                  →
                </button>
                <span className="absolute bottom-2 right-2 mono-label bg-[var(--paper)] border border-[var(--line)] px-2 py-1">
                  {imageIndex + 1} / {publication.images.length}
                </span>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-8">
                {stats.map(([n, l]) => (
                  <div key={l}>
                    <p className="font-display text-3xl lg:text-4xl text-[var(--ink)]">{n}</p>
                    <p className="mono-label mt-1">{l}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — details */}
            <div className="p-6 lg:p-8">
              <p className="mono-label mb-4">{publication.journal}</p>
              <h3 className="font-display text-2xl lg:text-3xl leading-tight text-[var(--ink)] mb-3">
                {publication.title}
              </h3>
              <p className="mono-label mb-6">{publication.volume}</p>
              <p className="font-mono-ed text-[13px] leading-relaxed text-[var(--ink-dim)] mb-8">
                {publication.description}
              </p>

              <div className="flex flex-wrap gap-3 mb-6">
                <a
                  href={publication.paperLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ed-btn ed-btn--solid"
                >
                  Read full paper <span>↗</span>
                </a>
                <button onClick={openModal} className="ed-btn">
                  Abstract <span>→</span>
                </button>
              </div>
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                <a
                  href={publication.certLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mono-label hover:text-[var(--ink)] transition-colors underline underline-offset-4"
                >
                  Certificate ↗
                </a>
                <a
                  href={publication.confirmationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mono-label hover:text-[var(--ink)] transition-colors underline underline-offset-4"
                >
                  Confirmation letter ↗
                </a>
              </div>
            </div>
          </div>
        </figure>
      </div>

      {/* Abstract modal */}
      {showModal && (
        <div
          onClick={closeModal}
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[var(--paper)] border border-[var(--line-strong)] max-w-3xl w-full max-h-[90vh] overflow-auto"
          >
            <div className="flex items-center justify-between px-6 py-3 border-b border-[var(--line)] sticky top-0 bg-[var(--paper)]">
              <span className="mono-label">{'//'} Abstract · IJSDR2602037</span>
              <button
                onClick={closeModal}
                className="font-mono-ed text-xs text-[var(--ink-dim)] hover:text-[var(--ink)] transition-colors"
              >
                [ CLOSE ✕ ]
              </button>
            </div>
            <div className="p-6 lg:p-10">
              <h2 className="font-display text-3xl leading-tight text-[var(--ink)] mb-6">
                {publication.title}
              </h2>
              <p className="font-mono-ed text-[13px] leading-relaxed text-[var(--ink-dim)] whitespace-pre-line">
                {publication.moreDescription}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Publications;
