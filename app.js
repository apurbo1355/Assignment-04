// Data (8 jobs)
const jobs = [
  {
    id: "J1",
    companyName: "Mobile First Corp",
    position: "React Native Developer",
    location: "Remote",
    type: "Full-time",
    salary: "$130,000 - $175,000",
    description:
      "Build cross-platform mobile applications using React Native. Work on products used by millions of users worldwide.",
    status: "Applied",
  },
  {
    id: "J2",
    companyName: "WebFlow Agency",
    position: "Web Designer & Developer",
    location: "Los Angeles, CA",
    type: "Part-time",
    salary: "$80,000 - $120,000",
    description:
      "Create stunning web experiences for high-profile clients. Portfolio and experience with modern web design trends required.",
    status: "Applied",
  },
  {
    id: "J3",
    companyName: "DataViz Solutions",
    position: "Data Visualization Specialist",
    location: "Boston, MA",
    type: "Full-time",
    salary: "$125,000 - $165,000",
    description:
      "Transform complex data into compelling visualizations. Required skills: D3.js, React, and strong analytical thinking.",
    status: "Applied",
  },
  {
    id: "J4",
    companyName: "CloudFirst Inc",
    position: "Backend Developer",
    location: "Seattle, WA",
    type: "Full-time",
    salary: "$140,000 - $190,000",
    description:
      "Design and maintain scalable backend systems using Python and AWS. Work with modern DevOps practices and cloud infrastructure.",
    status: "Applied",
  },
  {
    id: "J5",
    companyName: "Innovation Labs",
    position: "UI/UX Engineer",
    location: "Austin, TX",
    type: "Full-time",
    salary: "$110,000 - $150,000",
    description:
      "Create beautiful and functional user interfaces for our product suite. Strong design skills and frontend expertise required.",
    status: "Applied",
  },
  {
    id: "J6",
    companyName: "MegaCorp Solutions",
    position: "JavaScript Developer",
    location: "New York, NY",
    type: "Full-time",
    salary: "$130,000 - $170,000",
    description:
      "Build enterprise applications with JavaScript and modern frameworks. Competitive compensation, insurance, and growth opportunities.",
    status: "Applied",
  },
  {
    id: "J7",
    companyName: "StartupXYZ",
    position: "Full Stack Engineer",
    location: "Remote",
    type: "Full-time",
    salary: "$120,000 - $160,000",
    description:
      "Join a fast-growing startup and work on our core platform. Experience with Node.js and React required. Equity package included.",
    status: "Applied",
  },
  {
    id: "J8",
    companyName: "TechCorp Industries",
    position: "Senior Frontend Developer",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$130,000 - $175,000",
    description:
      "Build scalable web applications using React and TypeScript. Collaborate with a talented team on cutting-edge projects.",
    status: "Applied",
  },
];


// DOM refs
const totalCountEl = document.getElementById("totalCount");
const interviewCountEl = document.getElementById("interviewCount");
const rejectedCountEl = document.getElementById("rejectedCount");
const activeTabCountEl = document.getElementById("activeTabCount");

const tabs = document.querySelectorAll(".tab");
const cardsContainer = document.getElementById("cardsContainer");
const emptyState = document.getElementById("emptyState");

// current tab
let activeTab = "all";


// Helpers
function getFilteredJobs(tab) {
  if (tab === "interview") return jobs.filter((j) => j.status === "Interview");
  if (tab === "rejected") return jobs.filter((j) => j.status === "Rejected");
  return jobs; // all
}

function updateDashboard() {
  const total = jobs.length;
  const interview = jobs.filter((j) => j.status === "Interview").length;
  const rejected = jobs.filter((j) => j.status === "Rejected").length;

  totalCountEl.textContent = total;
  interviewCountEl.textContent = interview;
  rejectedCountEl.textContent = rejected;
}

function statusBadgeText(status) {
  if (status === "Interview") return "INTERVIEW";
  if (status === "Rejected") return "REJECTED";
  return "NOT APPLIED";
}

function createTrashIcon() {
  return `
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M9 3h6m-8 4h10m-9 0 1 15h6l1-15" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M10 11v7M14 11v7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    </svg>
  `;
}


// Render UI

function render(tab) {
  activeTab = tab;

  // Update active tab UI
  tabs.forEach((t) => {
    const isActive = t.dataset.tab === tab;
    t.classList.toggle("active", isActive);
    t.setAttribute("aria-selected", isActive ? "true" : "false");
  });

  updateDashboard();

  const filtered = getFilteredJobs(tab);
  activeTabCountEl.textContent = filtered.length;

  // Empty state for Interview/Rejected when no jobs
  const shouldShowEmpty =
    (tab === "interview" || tab === "rejected") && filtered.length === 0;

  if (shouldShowEmpty) {
    cardsContainer.innerHTML = "";
    emptyState.classList.remove("hidden");
    return;
  }

  emptyState.classList.add("hidden");
  cardsContainer.innerHTML = filtered.map(jobCardHTML).join("");
}


// Card HTML

function jobCardHTML(job) {
  const interviewSelected = job.status === "Interview";
  const rejectedSelected = job.status === "Rejected";

  return `
    <article class="card" data-id="${job.id}">
      <div class="card-top">
        <div>
          <p class="company">${job.companyName}</p>
          <p class="position">${job.position}</p>
        </div>

        <button class="icon-btn btn-delete" title="Delete job" aria-label="Delete job">
          ${createTrashIcon()}
        </button>
      </div>

      <div class="meta">
        <span>${job.location}</span>
        <span>•</span>
        <span>${job.type}</span>
        <span>•</span>
        <span>${job.salary}</span>
      </div>

      <div class="badge">${statusBadgeText(job.status)}</div>

      <p class="desc">${job.description}</p>

      <div class="actions">
        <button class="btn btn-interview ${interviewSelected ? "btn-selected-interview" : ""}" data-action="interview">
          INTERVIEW
        </button>
        <button class="btn btn-rejected ${rejectedSelected ? "btn-selected-rejected" : ""}" data-action="rejected">
          REJECTED
        </button>
      </div>
    </article>
  `;
}


// - Tab switching
// - Event Delegation for buttons
tabs.forEach((tabBtn) => {
  tabBtn.addEventListener("click", () => {
    render(tabBtn.dataset.tab);
  });
});

cardsContainer.addEventListener("click", (e) => {
  const card = e.target.closest(".card");
  if (!card) return;

  const jobId = card.dataset.id;
  const job = jobs.find((j) => j.id === jobId);
  if (!job) return;

  // Delete
  if (e.target.closest(".btn-delete")) {
    const idx = jobs.findIndex((j) => j.id === jobId);
    if (idx !== -1) jobs.splice(idx, 1);
    render(activeTab);
    return;
  }

  const actionBtn = e.target.closest("button[data-action]");
  if (!actionBtn) return;

  const action = actionBtn.dataset.action;

  // Toggle status
  if (action === "interview") job.status = "Interview";
  if (action === "rejected") job.status = "Rejected";

  // Re-render current tab (counts + lists updated)
  render(activeTab);
});

// Initial render

render("all");