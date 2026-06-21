import React from 'react';

const skillLogos = {
  "C++": `${import.meta.env.BASE_URL}logos/CPP.svg`,
  "C": `${import.meta.env.BASE_URL}logos/C.svg`,
  "Java": `${import.meta.env.BASE_URL}logos/Java-Dark.svg`,
  "Python": `${import.meta.env.BASE_URL}logos/Python-Dark.svg`,
  "HTML": `${import.meta.env.BASE_URL}logos/HTML.svg`,
  "CSS": `${import.meta.env.BASE_URL}logos/CSS.svg`,
  "JavaScript": `${import.meta.env.BASE_URL}logos/JavaScript.svg`,
  "React": `${import.meta.env.BASE_URL}logos/React-Dark.svg`,
  "Node.js": `${import.meta.env.BASE_URL}logos/NodeJS-Dark.svg`,
  "Tailwind CSS": `${import.meta.env.BASE_URL}logos/TailwindCSS-Dark.svg`,
  "Git": `${import.meta.env.BASE_URL}logos/Git.svg`,
  "AWS": `${import.meta.env.BASE_URL}logos/AWS-Dark.svg`,
  "Azure": `${import.meta.env.BASE_URL}logos/Azure-Dark.svg`,
  "TensorFlow": `${import.meta.env.BASE_URL}logos/TensorFlow-Dark.svg`,
  "PyTorch": `${import.meta.env.BASE_URL}logos/PyTorch-Dark.svg`,
  "MySQL": `${import.meta.env.BASE_URL}logos/MySQL-Dark.svg`,
  "VS Code": `${import.meta.env.BASE_URL}logos/VSCode-Dark.svg`,
  "PyCharm": `${import.meta.env.BASE_URL}logos/PyCharm-Dark.svg`,
  "Ubuntu": `${import.meta.env.BASE_URL}logos/Ubuntu-Dark.svg`,
  "Linux": `${import.meta.env.BASE_URL}logos/Linux-Dark.svg`,
  "Maven": `${import.meta.env.BASE_URL}logos/Maven-Dark.svg`,
  "Gradle": `${import.meta.env.BASE_URL}logos/Gradle-Dark.svg`,
  "Jenkins": `${import.meta.env.BASE_URL}logos/Jenkins-Dark.svg`,
  "LaTeX": `${import.meta.env.BASE_URL}logos/LaTeX-Dark.svg`
};

const downloadCV = () => {
  const link = document.createElement('a');
  link.href = '/Sudarshan_Hegde-Resume.pdf'; 
  link.download = 'ResumeSuper.pdf'; 
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
const viewCV = () => {
  window.open('/Sudarshan_Hegde-Resume.pdf', '_blank');
}

const skills = Object.keys(skillLogos);

const Bio = () => {
  return (
    <>
    <section id="home" >
      <div className="w-full mx-auto  bg-stone-900/50 rounded-lg shadow-lg overflow-hidden p-8 md:p-36">
        <div className="md:flex">
          {/* Left side - Image and Contact Button */}
          <div className="md:w-1/3 p-6 flex flex-col items-center">
            <div className="w-96 h-96 rounded-full overflow-hidden mb-4 mt-10 md:mt-0">
              <img src={`${import.meta.env.BASE_URL}profile_pic.jpg`} alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div>
              <h1 className="text-white text-3xl mb-1">
                SUDARSHAN R. HEGDE
              </h1>
              <p className="text-white text-2xl mb-6">
                Computer Science Engineer
              </p>
            </div>
            <a
              href="mailto:sudohegde@gmail.com"
              className="bg-gray-600 hover:bg-gray-800 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
            >
              Contact Me
            </a>
            <div  className=" flex justify-center items-center pt-10 ">
            <button 
                type="button" 
                className="mx-4 text-white bg-[#0f1419] hover:bg-[#0f1419]/90 focus:ring-4 focus:outline-none focus:ring-[#0f1419]/50 box-border border border-transparent font-medium leading-5 rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:hover:bg-[#24292F] dark:focus:ring-[#24292F]/55" 
                onClick={downloadCV}
            >
                <svg className="w-4 h-4 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M13 11.15V4a1 1 0 1 0-2 0v7.15L8.78 8.374a1 1 0 1 0-1.56 1.25l4 5a1 1 0 0 0 1.56 0l4-5a1 1 0 1 0-1.56-1.25L13 11.15Z" clipRule="evenodd"/>
                <path fillRule="evenodd" d="M9.657 15.874 7.358 13H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-2.358l-2.3 2.874a3 3 0 0 1-4.685 0ZM17 16a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H17Z" clipRule="evenodd"/>
                </svg>
                     Download CV
            </button>
            <button 
                type="button" 
                className="mx-4 text-white bg-[#0f1419] hover:bg-[#0f1419]/90 focus:ring-4 focus:outline-none focus:ring-[#0f1419]/50 box-border border border-transparent font-medium leading-5 rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:hover:bg-[#24292F] dark:focus:ring-[#24292F]/55" 
                onClick={viewCV}
            >
                <svg className="w-4 h-4 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M4.998 7.78C6.729 6.345 9.198 5 12 5c2.802 0 5.27 1.345 7.002 2.78a12.713 12.713 0 0 1 2.096 2.183c.253.34.465.682.618.997.14.286.284.658.284 1.04s-.145.754-.284 1.04a6.497 6.497 0 0 1-.618.997 12.712 12.712 0 0 1-2.096 2.183C17.271 17.655 14.802 19 12 19c-2.802 0-5.27-1.345-7.002-2.78a12.712 12.712 0 0 1-2.096-2.183 6.497 6.497 0 0 1-.618-.997C2.144 12.754 2 12.382 2 12s.145-.754.284-1.04c.153-.315.365-.656.618-.997A12.714 12.714 0 0 1 4.998 7.78ZM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd"/>
                </svg>
                View CV
            </button>
        </div>
          </div>

          {/* Right side - Text Content */}
          <div className="md:w-2/3 p-6">
            <h2 className="text-4xl font-bold text-gray-600 mb-4">Biography</h2>
            <p className="text-xl text-gray-100 mb-4">
              I am Sudarshan R. Hegde, a Computer Science and Engineering undergraduate at Sambhram Institute of Technology (VTU), graduating in 2026 with a CGPA of 9.1/10. With strong foundations in data structures, algorithms, and machine learning, I am proficient in C++, Java, Python, and modern web technologies. I am driven by a passion for applying AI and ML to solve real-world problems, and I thrive at the intersection of research, engineering, and product development.
            </p>
            <p className="text-xl text-gray-100 mb-4">
              I have accumulated hands-on industry experience through multiple concurrent internships: contributing to decision-support tools for the electric power sector at Continuum Associates LLC, deploying AI models within cloud-native environments at SuprMentr Technologies, and building scalable applications through the full software development lifecycle at Heartiest Mind Technologies. I also serve as a Creative Team Member at the OSCode-SaIT Chapter, leading UI/UX design and open-source contributions for the developer community.
            </p>
            <p className="text-xl text-gray-100 mb-4">
              My research on Geo-Agri Analyst — an end-to-end deep learning pipeline combining Super-Resolution GANs and Deep Bayesian Active Learning for precision agriculture — was published in the International Journal of Scientific Development and Research (IJSDR, Feb 2026). The system achieves a fourfold resolution increase on Sentinel-2 imagery while reducing labeled data requirements by ~85%. Alongside my ML expertise, I hold certifications in Deep Learning (IIT Ropar / NPTEL), RPA, and Power BI, and I continuously seek to build impactful solutions at the frontier of artificial intelligence and software engineering.
            </p>
          </div>
        </div>
      </div>
    </section>
      {/* Edu section */}
      <div className="bg-stone-900/50 px-4 py-16 mx-auto  sm:max-w-xl md:max-w-full lg:max-w-full md:px-24 lg:px-8 lg:py-20">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-600 mb-4">My Education Journey</h2>
          <div className="w-[200px] h-1 border-b-4 border-yellow-500 mx-auto rounded-3xl"></div>
        </div>
        <div className="mx-auto grid gap-10 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 md:px-10">
          {/* High School */}
          <div className=" bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:border-blue-400 hover:bg-white/10">
            <div className="flex items-center justify-between mb-6">
              <p className="text-2xl font-bold text-blue-400">High School</p>
              <svg className="w-6 text-gray-400 transform rotate-90 sm:rotate-0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <line fill="none" strokeMiterlimit="10" x1="2" y1="12" x2="22" y2="12"></line>
                <polyline fill="none" strokeMiterlimit="10" points="15,5 22,12 15,19"></polyline>
              </svg>
            </div>
            <p className="text-gray-300 mb-2 font-medium">Shri Kalika Bhavani English Medium High School</p>
            <p className="text-gray-400 text-sm mb-3">Kansur, Karnataka | 2018-2020</p>
            <p className="text-gray-300">
              Completed 8th to 10th grade with distinction in Science and Mathematics. Scored 94% in SSLC examinations.
            </p>
            <div className="mt-4 flex items-center gap-3">
              <span className="px-2 py-1 text-xs bg-blue-900/50 text-blue-300 rounded-full">SSLC</span>
              <span className="px-2 py-1 text-xs bg-green-900/50 text-purple-300 rounded-full">94%</span>
            </div>
          </div>

          {/* PUC */}
          <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:border-purple-400 hover:bg-white/10">
            <div className="flex items-center justify-between mb-6">
              <p className="text-2xl font-bold text-purple-400">Pre-University</p>
              <svg className="w-6 text-gray-400 transform rotate-90 sm:rotate-0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <line fill="none" strokeMiterlimit="10" x1="2" y1="12" x2="22" y2="12"></line>
                <polyline fill="none" strokeMiterlimit="10" points="15,5 22,12 15,19"></polyline>
              </svg>
            </div>
            <p className="text-gray-300 mb-2 font-medium">MES PU College</p>
            <p className="text-gray-400 text-sm mb-3">Sirsi, Karnataka | 2020-2022</p>
            <p className="text-gray-300">
              Completed 1st and 2nd PUC in Science stream (PCMCS) with 88% aggregate. Developed strong foundation in Physics, Chemistry, and Mathematics.
            </p>
            <div className="mt-4 flex items-center gap-3">
              <span className="px-2 py-1 text-xs bg-blue-900/50 text-blue-300 rounded-full">PUC</span>
              <span className="px-2 py-1 text-xs bg-purple-900/50 text-purple-300 rounded-full">88%</span>
            </div>
          </div>

          {/* Engineering */}
          <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:border-green-400 hover:bg-white/10">
            <div className="flex items-center justify-between mb-6">
              <p className="text-2xl font-bold text-green-700">Engineering</p>
              <svg className="w-8 text-green-400" stroke="currentColor" viewBox="0 0 24 24">
                <polyline fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" points="6,12 10,16 18,8"></polyline>
              </svg>
            </div>
            <p className="text-gray-300 mb-2 font-medium">Sambhram Institute Of Technology</p>
            <p className="text-gray-400 text-sm mb-3">Bangalore, Karnataka | 2022-2026</p>
            <p className="text-gray-300">
              Pursuing Bachelor of Engineering in Computer Science with a CGPA of 9.1/10. Specializing in data structures, algorithms, machine learning, and cloud computing.
            </p>
            <div className="mt-4 flex items-center gap-3">
              <span className="px-2 py-1 text-xs bg-blue-900/50 text-blue-300 rounded-full">VTU</span>
              <span className="px-2 py-1 text-xs bg-purple-900/50 text-purple-300 rounded-full">9.1 CGPA</span>
              <span className="px-2 py-1 text-xs bg-green-900/50 text-green-300 rounded-full">Ongoing</span>
            </div>
          </div>
        </div>
      </div>
      <WorkExperienceSection />
      <TechStackSection />
    </>
  );
};

function WorkExperienceSection() {
  const experiences = [
    {
      role: "Product Development Intern",
      company: "Continuum Associates LLC",
      location: "Remote / India",
      period: "Jan 2026 – Present",
      color: "blue",
      badge: "Current",
      badgeColor: "bg-blue-900/50 text-blue-300",
      borderHover: "hover:border-blue-400",
      dotColor: "bg-blue-400",
      lineColor: "bg-blue-400/30",
      description:
        "Contributing to internal technology products and decision-support tools for clients in the electric power and energy sector. Translating quantitative analysis and planning studies into robust software features, ensuring alignment with ISO, RTO, and industry planning rules.",
    },
    {
      role: "AI with Cloud Computing Intern",
      company: "SuprMentr Technologies Pvt Ltd",
      location: "India",
      period: "Jan 2026 – May 2026",
      color: "purple",
      badge: "Internship",
      badgeColor: "bg-purple-900/50 text-purple-300",
      borderHover: "hover:border-purple-400",
      dotColor: "bg-purple-400",
      lineColor: "bg-purple-400/30",
      description:
        "Developed and deployed AI models within cloud-native environments, leveraging scalable infrastructure to optimize performance and cost-efficiency. Architected automated data pipelines and integrated machine learning services into cloud platforms.",
    },
    {
      role: "Software Developer Intern",
      company: "Heartiest Mind Technologies Pvt Ltd",
      location: "India",
      period: "Jan 2026 – Apr 2026",
      color: "green",
      badge: "Internship",
      badgeColor: "bg-green-900/50 text-green-300",
      borderHover: "hover:border-green-400",
      dotColor: "bg-green-400",
      lineColor: "bg-green-400/30",
      description:
        "Contributed to the full software development lifecycle — design, testing, and deployment of scalable applications. Collaborated with cross-functional teams in an Agile environment to build robust features and implement clean, efficient code.",
    },
    {
      role: "Creative Team Member",
      company: "OSCode – SaIT Chapter",
      location: "Bangalore, Karnataka",
      period: "Sept 2025 – May 2026",
      color: "yellow",
      badge: "Open Source",
      badgeColor: "bg-yellow-900/50 text-yellow-300",
      borderHover: "hover:border-yellow-400",
      dotColor: "bg-yellow-400",
      lineColor: "bg-yellow-400/30",
      description:
        "Led OSCode's visual strategy at the intersection of design and development. Responsibilities included UI/UX design, open-source codebase maintenance, and technical documentation to ensure a seamless developer community experience.",
    },
  ];

  return (
    <div className="bg-stone-900/50 px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-full md:px-24 lg:px-8 lg:py-20">
      <div className="max-w-2xl mx-auto text-center mb-16">
        <h2 className="text-3xl font-bold text-gray-600 mb-4">Work Experience</h2>
        <div className="w-[200px] h-1 border-b-4 border-yellow-500 mx-auto rounded-3xl"></div>
      </div>

      <div className="relative max-w-3xl mx-auto">
        {/* Vertical line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-700"></div>

        <div className="space-y-10">
          {experiences.map((exp, index) => (
            <div key={index} className="relative flex gap-8">
              {/* Dot on timeline */}
              <div className="relative flex-shrink-0 flex flex-col items-center">
                <div className={`w-4 h-4 rounded-full mt-1.5 z-10 ring-4 ring-stone-900 ${exp.dotColor}`}></div>
              </div>

              {/* Card */}
              <div
                className={`flex-1 bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-gray-700 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:bg-white/10 ${exp.borderHover}`}
              >
                <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-white">{exp.role}</h3>
                    <p className="text-gray-300 font-medium">{exp.company}</p>
                    <p className="text-gray-500 text-sm">{exp.location}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`px-3 py-1 text-xs rounded-full font-medium ${exp.badgeColor}`}>
                      {exp.badge}
                    </span>
                    <span className="text-gray-400 text-sm whitespace-nowrap">{exp.period}</span>
                  </div>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TechStackSection() {
  // Group skills by category for better organization
  const skillCategories = {
    "Languages": ["C++", "C", "Java", "Python", "JavaScript"],
    "Frontend": ["HTML", "CSS", "React", "Tailwind CSS"],
    "Backend": ["Node.js"],
    "Cloud & DevOps": ["AWS", "Azure", "Jenkins"],
    "Data Science": ["TensorFlow", "PyTorch"],
    "Databases": ["MySQL"],
    "Tools": ["VS Code", "PyCharm", "Git", "LaTeX"],
    "Systems": ["Ubuntu", "Linux", "Maven", "Gradle"]
  };

  // State for active category filter
  const [activeFilter, setActiveFilter] = React.useState("All");
  
  // Get filtered skills based on active filter
  const filteredSkills = activeFilter === "All" 
    ? skills 
    : skills.filter(skill => skillCategories[activeFilter]?.includes(skill));

  return (
    <section className="bg-stone-900/50 min-h-screen w-full md:px-8 xl:px-20 text-white bg-primary flex items-center">
      <div className="flex container flex-col md:flex-row items-center md:items-start gap-16 w-full">
        {/* Left Side Content */}
        <div className="w-full md:w-1/2 relative p-6 sm:px-28 md:p-0">
          <div className="text-white p-6 pl-10 pr-20 sm:pl-10 lg:pr-20">
            {/* Vertical Label */}
            <div className="absolute -left-4 top-16 sm:left-16 top-20 sm:top-24 md:-left-12 xl:-left-16 md:top-16 xl:top-24 rotate-[-90deg] text-sm tracking-widest flex flex-row justify-start gap-2">
              <div className="xl:w-16 md:w-10 sm:w-8 w-8 h-[2px] bg-white mt-2 mx-auto"></div>
              <p>All Skills</p>
            </div>

            {/* Main Heading */}
            <h2 className="text-3xl md:text-4xl xl:text-6xl font-bold leading-tight">
              Explore My Expertise & Tech Stack
            </h2>
          </div>

          <p className="p-3 text-gray-400 text-sm leading-relaxed">
            These are the tools and technologies that I use daily to develop applications across various domains. 
            With expertise spanning from frontend to backend development, cloud computing, and data science, 
            I focus on delivering robust, scalable solutions with clean, maintainable code.
          </p>

          <span className="py-4 px-2 space-x-2 rounded-lg bg-secondary shadow-lg">
            <button 
              onClick={() => setActiveFilter("All")}
              className={`rounded-lg px-4 py-2 transition-all duration-300 ${
                activeFilter === "All" 
                  ? "bg-blue-500 text-white" 
                  : "bg-transparent text-gray-300 hover:bg-gray-700"
              }`}
            >
              All Skills
            </button>
          </span>
        </div>

        {/* Right Side: Enhanced Tech Grid */}
        <div className="w-full md:w-1/2">
          {/* Category Filters */}
          <div className="mb-8 flex flex-wrap gap-2 justify-center">
            {Object.keys(skillCategories).map(category => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  activeFilter === category
                    ? "bg-blue-500 text-white"
                    : "bg-secondary text-gray-300 hover:bg-gray-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Dynamic Grid */}
          <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8  gap-4">
            {filteredSkills.map((skill, index) => (
              <div 
                key={index} 
                className="text-center transition-all duration-300 hover:scale-105 hover:bg-stone-900/100 hover:rounded-lg"
              >
                <div className="p-4 bg-secondary rounded-lg shadow-lg flex flex-col justify-center items-center h-full">
                  <img
                    src={skillLogos[skill]}
                    alt={`${skill} logo`}
                    className="w-10 h-10 object-contain"
                    loading="lazy"
                  />
                  <p className="text-xs mt-2 font-semibold">{skill}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredSkills.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              No skills found in this category
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Bio;