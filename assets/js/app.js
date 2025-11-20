const burger = document.querySelector(".burger");
const closeNav = document.querySelector(".nav_close");
const nav = document.querySelector(".nav");
const navItems = document.querySelectorAll(".nav_item");
let dataCache = null;

initNav();
highlightActiveNav();
initSmoothScroll();
initTypingEffect();
initProfileTilt();

main();

async function main() {
  await Promise.all([renderSkills(), initProjectsPage(), initBlogPage()]);
  initScrollReveal();
}

function initNav() {
  if (!burger || !nav || !closeNav) return;

  burger.addEventListener("click", () => {
    nav.classList.toggle("active");
  });

  closeNav.addEventListener("click", () => {
    nav.classList.remove("active");
  });

  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      nav.classList.remove("active");
    });
  });
}

function highlightActiveNav() {
  if (!navItems.length) return;
  const currentPage = document.body?.dataset?.page;
  if (!currentPage) return;

  navItems.forEach((item) => {
    const isActive = item.dataset.nav === currentPage;
    item.classList.toggle("active", isActive);
  });
}

function initSmoothScroll() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach((link) => {
    const targetId = link.getAttribute("href");
    if (!targetId || targetId.length <= 1) return;

    link.addEventListener("click", (event) => {
      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();
      const offset = target.getBoundingClientRect().top + window.pageYOffset - 79;
      window.scrollTo({
        top: offset,
        behavior: "smooth",
      });
    });
  });
}

function initTypingEffect() {
  const typingTarget = document.querySelector(".typing");
  if (!typingTarget || typeof Typed === "undefined") return;

  new Typed(".typing", {
    strings: ["full-stack MERN developer", "product-focused engineer", "technical team collaborator"],
    loop: true,
    typeSpeed: 50,
    backSpeed: 25,
    backDelay: 900,
  });
}

function initProfileTilt() {
  const profileImage = document.querySelector(".personal_img");
  if (!profileImage || typeof VanillaTilt === "undefined") return;

  VanillaTilt.init(profileImage, {
    max: 25,
    speed: 400,
  });
}

async function loadData() {
  if (dataCache) return dataCache;

  try {
    const response = await fetch("./assets/data.json");
    dataCache = await response.json();
  } catch (error) {
    console.error("Failed to load portfolio data.", error);
    dataCache = {};
  }

  return dataCache;
}

async function renderSkills() {
  const skillsWrapper = document.querySelector(".skills_sec");
  if (!skillsWrapper) return;

  const data = await loadData();
  const skills = data?.skills ?? [];

  if (!skills.length) {
    skillsWrapper.innerHTML = '<p class="skills_empty">Skill stack showcase will be refreshed shortly.</p>';
    return;
  }

  const skillsHTML = skills
    .map(
      (skill) => `
        <div class="skill">
          <div class="skill_content">
            <img class="skill_img" src="${skill.icon}" alt="${skill.name}" loading="lazy" />
            <p class="skill_name">${skill.name}</p>
          </div>
        </div>
      `
    )
    .join("");

  skillsWrapper.innerHTML = skillsHTML;
}

async function initProjectsPage() {
  const projectsGrid = document.querySelector(".projects_grid");
  if (!projectsGrid) return;

  const searchInput = document.getElementById("projectSearch");
  const filterButtons = document.querySelectorAll(".project_filter");
  const data = await loadData();

  const typedProjects = buildProjectsCollection(data);

  let activeType = "all";
  let searchTerm = "";

  function applyFilters() {
    const filtered = typedProjects.filter((project) => {
      const matchesType = activeType === "all" || project.type === activeType;
      if (!matchesType) return false;

      if (!searchTerm) return true;

      const haystack = `${project.name} ${project.type}`.toLowerCase();
      return haystack.includes(searchTerm);
    });

    renderProjects(filtered);
  }

  function renderProjects(projects) {
    if (!projects.length) {
      projectsGrid.style.gridTemplateColumns = "1fr";
      projectsGrid.innerHTML = `<div class="projects_empty">No projects match your filters just yet. Try a different keyword or type.</div>`;
      return;
    }
    projectsGrid.style.gridTemplateColumns = "1fr 1fr 1fr 1fr";

    const cards = projects
      .map((project) => {
        const demoIsInternal = project.demo_link?.startsWith("#");
        const demoTarget = demoIsInternal ? "_self" : "_blank";
        const demoRel = demoIsInternal ? "" : ' rel="noopener noreferrer"';

        return `
          <article class="project_card" data-type="${project.type}">
            <div class="project_media">
              <img src="${project.img}" alt="${project.name} preview" loading="lazy" />
            </div>
            <div class="project_body">
              <div class="project_header">
                <span class="project_type project_type--${project.type}">${project.typeLabel}</span>
                <h3>${project.name}</h3>
              </div>
              <p>${project.desc}</p>
            </div>
            <div class="project_actions">
              ${
                project.repo_link
                  ? `<a href="${project.repo_link}" target="_blank" rel="noopener noreferrer">Repo</a>`
                  : ""
              }
              ${
                project.demo_link
                  ? `<a href="${project.demo_link}" target="${demoTarget}"${demoRel}>Live</a>`
                  : ""
              }
            </div>
          </article>
        `;
      })
      .join("");

    projectsGrid.innerHTML = cards;

    if (typeof VanillaTilt !== "undefined") {
      VanillaTilt.init(projectsGrid.querySelectorAll(".project_card"), {
        max: 12,
        speed: 400,
        glare: true,
        "max-glare": 0.15,
      });
    }
  }

  if (searchInput) {
    searchInput.addEventListener("input", (event) => {
      searchTerm = event.target.value.trim().toLowerCase();
      applyFilters();
    });
  }

  filterButtons.forEach((button) => {
    button.setAttribute("aria-pressed", button.classList.contains("active") ? "true" : "false");

    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => {
        btn.classList.remove("active");
        btn.setAttribute("aria-pressed", "false");
      });

      button.classList.add("active");
      button.setAttribute("aria-pressed", "true");
      activeType = button.dataset.type ?? "all";
      applyFilters();
    });
  });

  applyFilters();
}

function buildProjectsCollection(data) {
  if (!data) return [];

  const typeLabels = {
    fullstack: "Fullstack",
    frontend: "Frontend",
    backend: "Backend",
  };

  const groups = ["fullstack", "frontend", "backend"];

  const projects = groups.flatMap((type) => {
    const items = data?.[type] ?? [];
    return items.map((project) => ({
      ...project,
      type,
      typeLabel: typeLabels[type] ?? type,
    }));
  });

  return projects;
}

async function initBlogPage() {
  const blogGrid = document.querySelector(".blog_grid");
  if (!blogGrid) return;

  const data = await loadData();
  const writings = data?.writings ?? [];

  if (!writings.length) {
    blogGrid.innerHTML = `<div class="blog_empty">Stay tuned—new articles and study notes are on their way.</div>`;
    return;
  }

  const cards = writings
    .map((entry) => {
      const summary = getWritingSummary(entry.name);
      return `
        <article class="blog_card">
          <h3>${entry.name}</h3>
          <p>${summary}</p>
          <a href="${entry.link}" target="_blank" rel="noopener noreferrer">Read now <i class="fa-solid fa-arrow-up-right-from-square"></i></a>
        </article>
      `;
    })
    .join("");

  blogGrid.innerHTML = cards;
}

if (document.body?.classList.contains("notfound_page")) {
  document.addEventListener("mousemove", (event) => {
    const orb = document.querySelector(".notfound_orb");
    if (!orb) return;

    const orbRect = orb.getBoundingClientRect();
    const centerX = orbRect.left + orbRect.width / 2;
    const centerY = orbRect.top + orbRect.height / 2;
    const angle = Math.atan2(event.clientY - centerY, event.clientX - centerX);
    const rotateDeg = angle * (180 / Math.PI);

    orb.style.setProperty("--rotate", `${rotateDeg}deg`);
    orb.style.transform = `translateY(-6px) rotate(${rotateDeg}deg)`;
  });
}

function getWritingSummary(name = "") {
  const mappings = [
    {
      match: /mongo/i,
      text: "Schema design decisions, aggregation pipelines, and indexing tactics for scalable data.",
    },
    {
      match: /solid|design/i,
      text: "Principles and patterns that keep large JavaScript and Node codebases maintainable.",
    },
    {
      match: /socket/i,
      text: "Real-time communication patterns, socket lifecycle, and deployment-ready examples.",
    },
    {
      match: /network/i,
      text: "Fundamental layers, protocols, and debugging techniques for dependable networking.",
    },
    {
      match: /javascript/i,
      text: "Core language notes covering modern syntax, patterns, and performance gotchas.",
    },
    {
      match: /react query/i,
      text: "State synchronization, caching strategies, and background updates with React Query.",
    },
    { match: /git/i, text: "Commit workflows, branching models, and collaborative Git tactics for teams." },
    {
      match: /security/i,
      text: "Practical information security checklist, threat modeling, and mitigation strategies.",
    },
  ];

  const mapping = mappings.find((item) => item.match.test(name));
  return mapping
    ? mapping.text
    : `Notebook recap covering ${name} essentials and the key takeaways I apply in projects.`;
}

function initScrollReveal() {
  if (typeof ScrollReveal === "undefined") return;

  const hasHomeHero = document.querySelector(".main_content");
  if (hasHomeHero) {
    ScrollReveal({ origin: "left", distance: "30rem", duration: 2000, reset: true }).reveal(
      ".main_img, .main_content",
      { delay: 100 }
    );

    ScrollReveal({ origin: "bottom", distance: "30rem", duration: 2000, reset: true }).reveal(
      ".gateway_card",
      { interval: 120 }
    );
  }

  if (document.querySelector(".about_sec")) {
    ScrollReveal({ origin: "left", distance: "30rem", duration: 2000, reset: true }).reveal(".about_sec", {
      delay: 150,
    });
  }

  if (document.querySelector(".skills_sec")) {
    ScrollReveal({ origin: "bottom", distance: "25rem", duration: 2000, reset: true }).reveal(".skill", {
      interval: 80,
    });
  }

  if (document.querySelector(".edu_card")) {
    ScrollReveal({ origin: "right", distance: "30rem", duration: 2000, reset: true }).reveal(".edu_card", {
      delay: 120,
    });
  }

  if (document.querySelector(".projects_grid")) {
    ScrollReveal({ origin: "bottom", distance: "25rem", duration: 2000, reset: true }).reveal(
      ".project_card",
      {
        interval: 120,
      }
    );
  }

  if (document.querySelector(".blog_grid")) {
    ScrollReveal({ origin: "bottom", distance: "25rem", duration: 2000, reset: true }).reveal(".blog_card", {
      interval: 100,
    });
  }

  if (document.querySelector(".timeline_item")) {
    ScrollReveal({ origin: "bottom", distance: "20rem", duration: 1800, reset: true }).reveal(
      ".timeline_item",
      {
        interval: 120,
        beforeReveal: (el) => el.classList.add("is-visible"),
        beforeReset: (el) => el.classList.remove("is-visible"),
      }
    );
  }
}
