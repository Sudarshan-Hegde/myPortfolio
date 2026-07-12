import React from 'react';

const downloadCV = () => {
  const link = document.createElement('a');
  link.href = '/Sudarshan_Hegde-Resume.pdf';
  link.download = 'Sudarshan_Hegde-Resume.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
const viewCV = () => {
  window.open('/Sudarshan_Hegde-Resume.pdf', '_blank');
};

/* ---------------------------------------------------------- */
/* Shared section header:  § 0X / LABEL  +  big italic serif  */
/* ---------------------------------------------------------- */
export const SectionHeading = ({ index, label, children }) => (
  <div className="grid md:grid-cols-[140px_1fr] gap-6 md:gap-10 mb-16">
    <p className="mono-label pt-3"> {index} /<br />{label}</p>
    <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] text-[var(--ink)]">
      {children}
    </h2>
  </div>
);

const Bio = () => {
  return (
    <>
      {/* ====== Document metadata bar ====== */}
      <div className="border-b border-[var(--line)]">
        <div className="max-w-[104rem] mx-auto px-6 lg:px-10 py-3 grid grid-cols-2 lg:grid-cols-4 gap-2">
          <p className="mono-label">Doc. No — SRH/PORT/2026/001</p>
          <p className="mono-label">Status — Open to opportunities</p>
          <p className="mono-label hidden lg:block">Classification — Public profile</p>
          <p className="mono-label hidden lg:block lg:text-right">Rev. 2.0 · Portfolio edition</p>
        </div>
      </div>

      {/* ====== Hero ====== */}
      <section id="home" className="border-b border-[var(--line)]">
        <div className="max-w-[104rem] mx-auto px-6 lg:px-10 pt-14 lg:pt-20 pb-16 lg:pb-24">
          <div className="grid lg:grid-cols-[440px_1fr] xl:grid-cols-[500px_1fr] 2xl:grid-cols-[580px_1fr] gap-12 lg:gap-16 xl:gap-20 items-start">

            {/* Left column — portrait + spec list + CV buttons */}
            <div className="order-2 lg:order-1">
              {/* Portrait as figure panel */}
              <figure className="border border-[var(--line)] bg-[var(--panel)] mb-10">
                <figcaption className="flex items-center justify-between px-4 py-2.5 border-b border-[var(--line)]">
                  <span className="mono-label">{'//'} FIG_00 · Portrait · The Author</span>
                  <span className="mono-label hidden sm:block">B. 2004</span>
                </figcaption>
                <div className="p-4">
                  <img
                    src={`${import.meta.env.BASE_URL}profile_pic.jpg`}
                    alt="Sudarshan R. Hegde"
                    className="w-full max-h-[620px] object-cover"
                  />
                </div>
              </figure>

              {/* Spec list */}
              <dl className="space-y-4 mb-10">
                {[
                  ['Name', 'SUDARSHAN R. HEGDE'],
                  ['Role', 'CSE UNDERGRADUATE · ML ENGINEER'],
                  ['Institute', 'VISVESVARAYA TECHNOLOGICAL UNIVERSITY (VTU)'],
                  ['CGPA', '9.1 / 10 · CLASS OF 2026'],
                  ['Focus', 'ML · DEEP LEARNING · FULL-STACK'],
                  ['Location', 'BANGALORE · KARNATAKA · INDIA'],
                ].map(([k, v]) => (
                  <div key={k} className="grid grid-cols-[110px_1fr] gap-4 items-baseline">
                    <dt className="mono-label">— {k}</dt>
                    <dd className="font-mono-ed text-xs text-[var(--ink)] tracking-wider">{v}</dd>
                  </div>
                ))}
              </dl>

              <p className="mono-label mb-8">[ Writing the next chapter ]</p>

              <div className="flex flex-wrap gap-4">
                <button onClick={downloadCV} className="ed-btn ed-btn--solid">
                  Download CV <span>↓</span>
                </button>
                <button onClick={viewCV} className="ed-btn">
                  View CV <span>→</span>
                </button>
              </div>
            </div>

            {/* Right column — chip + headline + lede */}
            <div className="order-1 lg:order-2 lg:pt-6">
              {/* Programme chip */}
              <div className="flex items-center gap-4 mb-10 lg:mb-14">
                <span className="ed-chip rounded-full flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--ink)] inline-block"></span>
                  Portfolio Brief
                </span>
                <span className="hidden sm:block w-12 h-px bg-[var(--line-strong)]"></span>
                <span className="mono-label hidden sm:block">Machine Learning · Deep Learning · Software Engineering</span>
              </div>

              {/* Headline */}
              <h1 className="font-display text-[11.5vw] sm:text-5xl md:text-6xl lg:text-[2.9rem] xl:text-[3.5rem] 2xl:text-[4.4rem] leading-[1.05] text-[var(--ink)] mb-10 lg:mb-14">
                An engineer working
                <br />
                in <em>machine learning</em>
                <br />
                <em>&amp; intelligent systems.</em>
              </h1>

              {/* Lede */}
              <p className="font-display italic text-2xl lg:text-[1.75rem] leading-snug text-[var(--ink)] mb-6 max-w-2xl">
                A portfolio documenting work at the intersection of machine
                learning research, software engineering, and real-world
                problem-solving.
              </p>
              <p className="font-mono-ed text-[13px] leading-relaxed text-[var(--ink-dim)] max-w-2xl">
                Strong foundations in data structures and algorithms. Proficient
                in C++, Java, Python, and modern web technologies. Published
                researcher — deep learning for precision agriculture — with
                hands-on industry experience across product development, AI in
                cloud-native environments, and full-lifecycle software delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ====== § 01 / EDUCATION ====== */}
      <section className="border-b border-[var(--line)]">
        <div className="max-w-[104rem] mx-auto px-6 lg:px-10 py-20 lg:py-28">
          <SectionHeading index="01" label="Education">
            A foundation <em>is only as strong</em>
            <br />
            <em>as what is built on it.</em>
          </SectionHeading>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                no: '01', tag: 'The School',
                title: 'SSLC',
                sub: 'SHRI KALIKA BHAVANI EM HIGH SCHOOL · KANSUR',
                body: 'Completed 8th to 10th grade with distinction in Science and Mathematics. Scored 94% in SSLC examinations.',
                meta: '2018 – 2020', status: '94% · Completed',
              },
              {
                no: '02', tag: 'The Stream',
                title: 'PCMCS',
                sub: 'MES PU COLLEGE · SIRSI, KARNATAKA',
                body: 'Pre-university in the Science stream — Physics, Chemistry, Mathematics, Computer Science — with an 88% aggregate.',
                meta: '2020 – 2022', status: '88% · Completed',
              },
              {
                no: '03', tag: 'The Degree',
                title: 'B.E. Computer Science and Engineering',
                sub: 'SAMBHRAM INSTITUTE OF TECHNOLOGY · VTU · BANGALORE',
                body: 'Pursuing a Bachelor of Engineering in Computer Science with a CGPA of 9.1/10. Specialising in data structures, algorithms, machine learning, and cloud computing.',
                meta: '2022 – 2026', status: '9.1 CGPA · Ongoing',
              },
            ].map((e) => (
              <article
                key={e.no}
                className="border border-[var(--line)] bg-[var(--panel)] flex flex-col hover:border-[var(--ink-faint)] transition-colors"
              >
                <div className="flex items-baseline justify-between px-6 py-2.5 border-b border-[var(--line)]">
                  <span className="mono-label">{e.no}</span>
                  <span className="mono-label">{e.tag}</span>
                </div>

                <div className="p-6 lg:p-8 flex flex-col flex-1">
                  <h3 className="font-display text-3xl text-[var(--ink)] mb-2">{e.title}</h3>
                  <p className="mono-label mb-5">{e.sub}</p>
                  <p className="font-mono-ed text-[13px] leading-relaxed text-[var(--ink-dim)] mb-8">{e.body}</p>

                  <div className="flex items-center justify-between gap-4 mt-auto pt-6 border-t border-[var(--line)]">
                    <p className="mono-label flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--ink)] inline-block"></span>
                      {e.status}
                    </p>
                    <p className="mono-label">{e.meta}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ======  02 / EXPERIENCE ====== */}
      <section className="border-b border-[var(--line)]">
        <div className="max-w-[104rem] mx-auto px-6 lg:px-10 py-20 lg:py-28">
          <SectionHeading index="02" label="Experience">
            Learning happens <em>on the job</em> —
            <br />
            so I took <em>four of them.</em>
          </SectionHeading>

          <div className="border-t border-[var(--line)]">
            {[
              {
                no: '01',
                role: 'Product Development Intern',
                org: 'CONTINUUM ASSOCIATES LLC · REMOTE / INDIA',
                body: 'Decision-support tools for the electric power and energy sector. Translating quantitative analysis and planning studies into robust software features aligned with ISO, RTO, and industry planning rules.',
                period: 'JAN 2026 – PRESENT', live: true,
              },
              {
                no: '02',
                role: 'AI with Cloud Computing Intern',
                org: 'SUPRMENTR TECHNOLOGIES PVT LTD',
                body: 'Developing and deploying AI models within cloud-native environments — automated data pipelines, ML service integration, and cost-efficient scalable infrastructure.',
                period: 'JAN 2026 – MAY 2026', live: false,
              },
              {
                no: '03',
                role: 'Software Developer Intern',
                org: 'HEARTIEST MIND TECHNOLOGIES PVT LTD',
                body: 'Full software development lifecycle — design, testing, deployment. Agile collaboration with cross-functional teams to build robust features and clean, efficient code.',
                period: 'JAN 2026 – APR 2026', live: false,
              },
              {
                no: '04',
                role: 'Creative Team Member',
                org: 'OSCODE — SAIT CHAPTER · BANGALORE',
                body: "Leading OSCode's visual strategy at the intersection of design and development — UI/UX, open-source codebase maintenance, and technical documentation.",
                period: 'SEPT 2025 – MAY 2026', live: false,
              },
            ].map((x) => (
              <article
                key={x.no}
                className="grid md:grid-cols-[60px_1fr_320px_160px] gap-3 md:gap-8 items-baseline py-8 border-b border-[var(--line)] group hover:bg-[var(--panel)] transition-colors md:px-4 md:-mx-4"
              >
                <span className="mono-label">{x.no}</span>
                <div>
                  <h3 className="font-display text-2xl lg:text-[1.7rem] text-[var(--ink)] mb-1">{x.role}</h3>
                  <p className="mono-label">{x.org}</p>
                </div>
                <p className="font-mono-ed text-xs leading-relaxed text-[var(--ink-dim)]">{x.body}</p>
                <div className="md:text-right">
                  <p className="mono-label mb-1">{x.period}</p>
                  {x.live && (
                    <p className="mono-label flex md:justify-end items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--ink)] inline-block"></span>
                      Active
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ====== § 03 / STACK ====== */}
      <section className="border-b border-[var(--line)]">
        <div className="max-w-[104rem] mx-auto px-6 lg:px-10 py-20 lg:py-28">
          <SectionHeading index="03" label="Stack">
            The toolkit — <em>assembled</em>
            <br />
            <em>instrument by instrument.</em>
          </SectionHeading>

          {/* One instrument panel — stats header, then dense category grid */}
          <figure className="border border-[var(--line)] bg-[var(--panel)]">
            <figcaption className="flex items-center justify-between px-5 lg:px-6 py-2.5 border-b border-[var(--line)]">
              <span className="mono-label">{'//'} FIG_01 · Stack Atlas · Daily Instruments</span>
              <span className="mono-label flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--ink)] inline-block"></span>
                V2.0 · Live
              </span>
            </figcaption>

            {/* Stats strip */}
            <div className="grid grid-cols-2 lg:grid-cols-4 border-b border-[var(--line)]">
              {[
                ['5+', 'Languages'],
                ['25+', 'Tools & frameworks'],
                ['4', 'Cloud platforms'],
                ['2', 'ML frameworks'],
              ].map(([n, l], i) => (
                <div
                  key={l}
                  className={`px-5 lg:px-6 py-6 border-[var(--line)] ${i % 2 === 1 ? 'border-l' : ''} ${i < 2 ? 'border-b lg:border-b-0' : ''} ${i === 2 ? 'lg:border-l' : ''}`}
                >
                  <p className="font-display text-4xl lg:text-5xl text-[var(--ink)] leading-none">{n}</p>
                  <p className="mono-label mt-2">{l}</p>
                </div>
              ))}
            </div>

            {/* Category grid — two dense columns */}
            <div className="grid md:grid-cols-2">
              {[
                ['Languages', [
                  ['C++', 'CPP.svg'], ['C', 'C.svg'], ['Java', 'Java-Dark.svg'],
                  ['Python', 'Python-Dark.svg'], ['JavaScript', 'JavaScript.svg'],
                ]],
                ['Cloud / DevOps', [
                  ['AWS', 'AWS-Dark.svg'], ['Azure', 'Azure-Dark.svg'],
                  ['Google Cloud', null], ['Jenkins', 'Jenkins-Dark.svg'],
                ]],
                ['Frontend', [
                  ['HTML', 'HTML.svg'], ['CSS', 'CSS.svg'],
                  ['React', 'React-Dark.svg'], ['Tailwind CSS', 'TailwindCSS-Dark.svg'],
                ]],
                ['Data Science / ML', [
                  ['TensorFlow', 'TensorFlow-Dark.svg'], ['PyTorch', 'PyTorch-Dark.svg'],
                ]],
                ['Backend', [
                  ['Node.js', 'NodeJS-Dark.svg'], ['Express.js', null],
                ]],
                ['Databases', [
                  ['MySQL', 'MySQL-Dark.svg'],
                ]],
                ['Tools', [
                  ['Git', 'Git.svg'], ['VS Code', 'VSCode-Dark.svg'],
                  ['PyCharm', 'PyCharm-Dark.svg'], ['LaTeX', 'LaTeX-Dark.svg'],
                ]],
                ['Systems', [
                  ['Ubuntu', 'Ubuntu-Dark.svg'], ['Linux', 'Linux-Dark.svg'],
                  ['Windows', null], ['Maven', 'Maven-Dark.svg'], ['Gradle', 'Gradle-Dark.svg'],
                ]],
              ].map(([cat, items], i) => (
                <div
                  key={cat}
                  className={`px-5 lg:px-6 py-5 border-[var(--line)] flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-5 border-b ${i % 2 === 1 ? 'md:border-l' : ''} ${i >= 6 ? 'md:border-b-0' : ''}`}
                >
                  <p className="mono-label sm:w-[165px] sm:flex-shrink-0 sm:pt-2.5">{cat} →</p>
                  <div className="flex flex-wrap gap-2">
                    {items.map(([name, logo]) => (
                      <span key={name} className="ed-chip flex items-center gap-2">
                        {logo && (
                          <img
                            src={`${import.meta.env.BASE_URL}logos/${logo}`}
                            alt=""
                            aria-hidden="true"
                            className="w-4 h-4 object-contain flex-shrink-0"
                          />
                        )}
                        {name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Caption */}
            <div className="px-5 lg:px-6 py-4 border-t border-[var(--line)]">
              <p className="font-mono-ed text-[11px] leading-relaxed text-[var(--ink-faint)]">
                Tools and technologies in daily use — frontend to backend, cloud
                computing to data science. Robust, scalable solutions with clean,
                maintainable code.
              </p>
            </div>
          </figure>
        </div>
      </section>
    </>
  );
};

export default Bio;
