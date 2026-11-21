// 1. DATA: our projects stored as an array of objects (replace with your own!)
const projects = [
  { id: 1, title: "CampusMart", description: "A student marketplace to buy and sell second-hand items.", tech: ["HTML", "CSS", "JavaScript"], year: 2026, link: "https://github.com/lolakshah/campusmart-static" },
  { id: 2, title: "Multi-Level Marketing", description: "A system that manages participant recruitment, records sales, computes multi-tier commissions, undoes transactions and ranks top performers.", tech: ["C++"], year: 2025, link: "https://github.com/lolakshah/MLM-code" },
  { id: 3, title: "NYC Airbnb Data Analysis", description: "Analyzes Airbnb data for the NYC area.", tech: ["Python", "Pandas", "Matplotlib"], year: 2025, link: "https://github.com/lolakshah/nyc-airbnb-data-analysis" },
  { id: 4, title: "Fake News Detector", description: "A Streamlit web app that classifies news articles as fake or real using TF-IDF features and a Decision Tree, with about 99% accuracy.", tech: ["Python", "Scikit-learn"], year: 2025, link: "https://github.com/lolakshah/Fake-News-Detector-Machine-Learning-Based-News-Authenticity-Classifier" },
  { id: 5, title: "DDoS Detection ML Pipeline", description: "A machine learning pipeline for detecting DDoS attacks.", tech: ["Python", "Scikit-learn"], year: 2025, link: "https://github.com/lolakshah/DDoS-Detection-ML-Pipeline" },
  { id: 6, title: "LavaLand Unity", description: "A Unity 6 project with stylized flowing lava and day/night skyboxes.", tech: ["Unity", "C#"], year: 2024, link: "https://github.com/lolakshah/Gaming-Project" },
];

// 2. ELEMENTS from the page
const grid = document.querySelector("#project-grid");
const searchInput = document.querySelector("#search");
const techSelect = document.querySelector("#tech-filter");
const resultCount = document.querySelector("#result-count");
const emptyMessage = document.querySelector("#empty-message");

// 3. Build ONE card with DOM methods (createElement + textContent, no innerHTML)
function createCard(project) {
  const article = document.createElement("article");
  article.className = "card";

  const title = document.createElement("h2");
  title.textContent = project.title;

  const year = document.createElement("p");
  year.className = "year";
  year.textContent = `Year: ${project.year}`;

  const description = document.createElement("p");
  description.textContent = project.description;

  // a small list with one item for each technology
  const tags = document.createElement("ul");
  tags.className = "tags";
  for (const tech of project.tech) {
    const li = document.createElement("li");
    li.textContent = tech;
    tags.append(li);
  }

  const link = document.createElement("a");
  link.href = project.link;
  link.textContent = `View ${project.title} on GitHub`;

  article.append(title, year, description, tags, link);
  return article;
}

// 4. Filter the projects (search AND select together) and show them
function showProjects() {
  const query = searchInput.value.trim().toLowerCase();
  const selectedTech = techSelect.value;

  const filtered = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(query) ||
      project.tech.some((tech) => tech.toLowerCase().includes(query));
    const matchesTech = selectedTech === "All" || project.tech.includes(selectedTech);
    return matchesSearch && matchesTech;
  });

  grid.replaceChildren(...filtered.map(createCard));       // swap old cards for new ones
  resultCount.textContent = `${filtered.length} project(s) found`;
  emptyMessage.textContent = filtered.length === 0 ? "No projects found" : "";
}

// 5. EVENTS: run showProjects whenever the user types or changes the select
searchInput.addEventListener("input", showProjects);
techSelect.addEventListener("change", showProjects);

showProjects(); // first time the page loads
