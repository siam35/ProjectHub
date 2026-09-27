import { useState } from "react";
import AddorEditForm from "./AddorEditForm";
import FilterSection from "./FilterSection";
import ProjectList from "./ProjectList";
import Summary from "./Summary";
import SummaryOverview from "./SummaryOverview";

const totalBudgetOf = (project) => project.unitBudget * project.unit;

function getVisibleProjects(
  projects,
  search,
  category,
  status,
  sortBy,
  favoriteOnly,
) {
  const term = search.trim().toLowerCase();
  const visible = projects.filter((project) => {
    const matchesSearch =
      !term ||
      project.projectName.toLowerCase().includes(term) ||
      project.projectUrl.toLowerCase().includes(term);
    const matchesCategory = category === "ALL" || project.category === category;
    const matchesStatus = status === "ALL" || project.status === status;
    const matchesFavorite = !favoriteOnly || project.isFavorite;
    return matchesSearch && matchesCategory && matchesStatus && matchesFavorite;
  });

  const sorted = [...visible];
  switch (sortBy) {
    case "name-asc":
      sorted.sort((a, b) => a.projectName.localeCompare(b.projectName));
      break;
    case "name-desc":
      sorted.sort((a, b) => b.projectName.localeCompare(a.projectName));
      break;
    case "budget-asc":
      sorted.sort((a, b) => totalBudgetOf(a) - totalBudgetOf(b));
      break;
    case "budget-desc":
      sorted.sort((a, b) => totalBudgetOf(b) - totalBudgetOf(a));
      break;
    default:
      break;
  }
  return sorted;
}

export default function Dashboard() {
  const defaultProject = {
    id: crypto.randomUUID(),
    projectName: "Learn React Native",
    clientName: "Sumit",
    projectUrl: "https://www.google.com",
    category: "Mobile App",
    isFavorite: false,
    unitBudget: 10000,
    unit: 1,
    status: "Pending",
  };
  const [projects, setProjects] = useState([defaultProject]);
  const [projectToUpdate, setProjectToUpdate] = useState(null);
  // search items
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("ALL");
  const [status, setStatus] = useState("ALL");
  const [sortBy, setSortBy] = useState("default");
  const [favoriteOnly, setFavoriteOnly] = useState(false);

  const visibleProjects = getVisibleProjects(
    projects,
    search,
    category,
    status,
    sortBy,
    favoriteOnly,
  );

  const handleAddEditTask = (newProject, isAdd) => {
    if (isAdd) {
      setProjects([...projects, newProject]);
    } else {
      setProjects(
        projects.map((project) => {
          if (project.id === newProject.id) {
            return newProject;
          }
          return project;
        }),
      );
    }
    setProjectToUpdate(null);
  };
  function toggleFavorite(projectId) {
    setProjects(
      projects.map((project) =>
        project.id === projectId
          ? { ...project, isFavorite: !project.isFavorite }
          : project,
      ),
    );
  }
  function handleEditProject(project) {
    setProjectToUpdate(project);
  }
  function changeQuantity(projectId, amount) {
    setProjects(
      projects.map((project) =>
        project.id === projectId
          ? { ...project, unit: Math.max(0, project.unit + amount) }
          : project,
      ),
    );
  }
  function toggleStatus(projectId) {
    setProjects(
      projects.map((project) =>
        project.id === projectId
          ? {
              ...project,
              status: project.status === "Pending" ? "Completed" : "Pending",
            }
          : project,
      ),
    );
  }
  function deleteProject(projectId) {
    setProjects(projects.filter((project) => project.id !== projectId));
  }

  function clearSearchInput() {
    setSearch("");
  }
  function toggleFavoriteFilter() {
    setFavoriteOnly(!favoriteOnly);
  }
  function resetAllFilters() {
    setSearch("");
    setCategory("ALL");
    setStatus("ALL");
    setSortBy("default");
    setFavoriteOnly(false);
  }

  return (
    <>
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
        <section
          aria-labelledby="summary-heading"
          className="space-y-3 sm:space-y-4"
        >
          <Summary />
          <SummaryOverview
            totalProjects={projects.length}
            pendingProjects={
              projects.filter((p) => p.status === "Pending").length
            }
            completedProjects={
              projects.filter((p) => p.status === "Completed").length
            }
            totalBudget={projects.reduce(
              (sum, project) => sum + totalBudgetOf(project),
              0,
            )}
          />
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          <AddorEditForm
            onSave={handleAddEditTask}
            onCancel={() => setProjectToUpdate(null)}
            projectToUpdate={projectToUpdate}
          />
          <section className="lg:col-span-8 w-full space-y-4 sm:space-y-6">
            <FilterSection
              search={search}
              onSearchChange={setSearch}
              category={category}
              onCategoryChange={setCategory}
              status={status}
              onStatusChange={setStatus}
              sortBy={sortBy}
              onSortChange={setSortBy}
              favoriteOnly={favoriteOnly}
              toggleFavoriteFilter={toggleFavoriteFilter}
              clearSearchInput={clearSearchInput}
              resetAllFilters={resetAllFilters}
              shownCount={visibleProjects.length}
              totalCount={projects.length}
            />
            <ProjectList
              projects={visibleProjects}
              deleteProject={deleteProject}
              editProject={handleEditProject}
              toggleFavorite={toggleFavorite}
              changeQuantity={changeQuantity}
              toggleStatus={toggleStatus}
              resetAllFilters={resetAllFilters}
            />
          </section>
        </div>
      </main>
    </>
  );
}
