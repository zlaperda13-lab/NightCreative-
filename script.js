(() => {
  const projects = window.NC_PORTFOLIO || [];
  const grid = document.querySelector("#portfolio-grid");
  const filters = [...document.querySelectorAll(".filter-button")];
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#site-nav");
  const dialog = document.querySelector("#project-dialog");
  const dialogImage = document.querySelector("#dialog-image");
  const closeButton = document.querySelector("#dialog-close");
  const previousButton = document.querySelector("#dialog-prev");
  const nextButton = document.querySelector("#dialog-next");
  const year = document.querySelector("#year");
  let activeProject = null;
  let activeImage = 0;

  if (year) year.textContent = new Date().getFullYear();

  function renderProjects(filter = "all") {
    if (!grid) return;
    grid.replaceChildren();

    projects.filter((project) => filter === "all" || project.category === filter).forEach((project) => {
      const card = document.createElement("button");
      card.type = "button";
      card.className = "work-card";
      card.setAttribute("aria-label", `Открыть проект: ${project.title}`);

      const visual = document.createElement("span");
      visual.className = "work-image";

      const image = document.createElement("img");
      image.src = project.cover;
      image.alt = project.coverAlt;
      image.loading = "lazy";
      image.decoding = "async";
      visual.append(image);

      const chip = document.createElement("span");
      chip.className = "work-chip";
      chip.textContent = project.category === "concept" || project.category === "fashion" || project.category === "cards" ? "ДЕМО / КОНЦЕПТ" : "ПРИМЕР";
      visual.append(chip);

      const openIcon = document.createElement("span");
      openIcon.className = "work-open";
      openIcon.setAttribute("aria-hidden", "true");
      openIcon.textContent = "↗";
      visual.append(openIcon);

      const meta = document.createElement("span");
      meta.className = "work-meta";

      const category = document.createElement("span");
      category.className = "work-category";
      category.textContent = project.categoryLabel;

      const title = document.createElement("span");
      title.className = "work-title";
      title.textContent = project.title;

      const count = document.createElement("span");
      count.className = "work-count";
      const countLabel = project.images.length === 1 ? "КАДР" : project.images.length >= 5 ? "КАДРОВ" : "КАДРА";
      count.textContent = `${String(project.images.length).padStart(2, "0")} ${countLabel}`;

      meta.append(category, title, count);
      card.append(visual, meta);
      card.addEventListener("click", () => openProject(project));
      grid.append(card);
    });
  }

  function showImage() {
    if (!activeProject) return;
    const image = activeProject.images[activeImage];
    dialogImage.src = image.src;
    dialogImage.alt = image.alt;
    document.querySelector("#dialog-count").textContent = `${String(activeImage + 1).padStart(2, "0")} / ${String(activeProject.images.length).padStart(2, "0")}`;
    previousButton.hidden = activeProject.images.length < 2;
    nextButton.hidden = activeProject.images.length < 2;
  }

  function openProject(project) {
    activeProject = project;
    activeImage = 0;
    document.querySelector("#dialog-category").textContent = project.categoryLabel.toUpperCase();
    document.querySelector("#dialog-label").textContent = "NIGHT CREATIVE / ПОРТФОЛИО";
    document.querySelector("#dialog-title").textContent = project.title;
    document.querySelector("#dialog-description").textContent = project.description;
    document.querySelector("#dialog-disclaimer").textContent = project.disclaimer;
    showImage();
    dialog.showModal();
  }

  function moveImage(direction) {
    if (!activeProject || activeProject.images.length < 2) return;
    activeImage = (activeImage + direction + activeProject.images.length) % activeProject.images.length;
    showImage();
  }

  filters.forEach((button) => {
    button.addEventListener("click", () => {
      filters.forEach((item) => {
        const active = item === button;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-pressed", String(active));
      });
      renderProjects(button.dataset.filter);
    });
  });

  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const open = menuButton.getAttribute("aria-expanded") !== "true";
      menuButton.setAttribute("aria-expanded", String(open));
      nav.classList.toggle("is-open", open);
    });
    nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
      menuButton.setAttribute("aria-expanded", "false");
      nav.classList.remove("is-open");
    }));
  }

  closeButton.addEventListener("click", () => dialog.close());
  previousButton.addEventListener("click", () => moveImage(-1));
  nextButton.addEventListener("click", () => moveImage(1));
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") moveImage(-1);
    if (event.key === "ArrowRight") moveImage(1);
  });

  renderProjects();
})();
