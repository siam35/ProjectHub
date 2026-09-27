import { useState } from "react";

const emptyProject = {
  projectName: "",
  clientName: "",
  projectUrl: "",
  category: "",
  isFavorite: false,
  unitBudget: 0,
  unit: 1,
  status: "Pending",
};

function isValidUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export default function AddorEditForm({ onSave, onCancel, projectToUpdate }) {
  const [project, setProject] = useState(projectToUpdate || emptyProject);
  const [isAdd, setIsAdd] = useState(Object.is(projectToUpdate, null));
  const [prevUpdate, setPrevUpdate] = useState(projectToUpdate);
  const [errors, setErrors] = useState({});

  if (prevUpdate !== projectToUpdate) {
    setPrevUpdate(projectToUpdate);
    setProject(projectToUpdate || emptyProject);
    setIsAdd(Object.is(projectToUpdate, null));
    setErrors({});
  }

  const handleChange = (evt) => {
    const name = evt.target.name;
    let value = evt.target.value;
    if (name === "unitBudget") {
      value = Number(value);
    }
    setProject({
      ...project,
      [name]: value,
    });
    if (errors[name]) {
      const nextErrors = { ...errors };
      delete nextErrors[name];
      setErrors(nextErrors);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!(project.projectName || "").trim()) {
      newErrors.projectName = "Project name is required.";
    }
    if (!(project.clientName || "").trim()) {
      newErrors.clientName = "Client name is required.";
    }
    if (!(project.projectUrl || "").trim()) {
      newErrors.projectUrl = "Project URL is required.";
    } else if (!isValidUrl(project.projectUrl.trim())) {
      newErrors.projectUrl = "Please enter a valid URL.";
    }
    if (!project.category) {
      newErrors.category = "Please select a category.";
    }
    if (!project.unitBudget || project.unitBudget <= 0) {
      newErrors.unitBudget = "Budget must be a positive number.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setProject(emptyProject);
    setIsAdd(true);
    setErrors({});
    if (onCancel) {
      onCancel();
    }
  };

  const handleSaveClick = () => {
    if (!validate()) {
      return;
    }
    if (isAdd) {
      onSave({ ...project, id: crypto.randomUUID() }, true);
    } else {
      onSave(project, false);
    }
    resetForm();
  };

  return (
    <>
      <aside className="lg:col-span-4 w-full lg:sticky lg:top-20">
        <div className="bg-[#121215] border border-zinc-800 rounded-2xl p-5 sm:p-6 shadow-xl">
          <div className="flex items-center justify-between pb-4 border-b border-zinc-800/80 mb-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                <h3
                  id="formTitle"
                  className="text-sm sm:text-base font-bold text-white uppercase tracking-tight"
                >
                  {isAdd ? "Create Project" : "Edit Project"}
                </h3>
              </div>
              <p id="formSubtitle" className="text-xs text-zinc-400 mt-0.5">
                {isAdd
                  ? "Enter details to add a new project"
                  : "Update the details of this project"}
              </p>
            </div>

            <span
              id="formModeBadge"
              className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-300 border border-zinc-700"
            >
              {isAdd ? "New Entry" : "Editing"}
            </span>
          </div>

          <form id="projectForm" className="space-y-3.5 sm:space-y-4">
            <div>
              <label
                htmlFor="projectName"
                className="block text-xs font-medium text-zinc-300 mb-1"
              >
                Project Name <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                id="projectName"
                name="projectName"
                value={project.projectName}
                onChange={handleChange}
                placeholder="e.g. NextGen SaaS Dashboard"
                className={`w-full px-3 py-2 sm:py-2.5 text-xs bg-zinc-950 ${errors.projectName ? "border-rose-400" : "border-zinc-800"} rounded-xl text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-400/20 transition-all`}
                required
              />
              <p
                id="errorProjectName"
                className={`${errors.projectName ? "flex" : "hidden"} text-[11px] text-rose-400 mt-1 items-center gap-1`}
              >
                <svg
                  className="w-3.5 h-3.5 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span>{errors.projectName}</span>
              </p>
            </div>

            <div>
              <label
                htmlFor="clientName"
                className="block text-xs font-medium text-zinc-300 mb-1"
              >
                Client Name <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                id="clientName"
                onChange={handleChange}
                placeholder="e.g. Acme Global Tech"
                name="clientName"
                value={project.clientName}
                className={`w-full px-3 py-2 sm:py-2.5 text-xs bg-zinc-950 ${errors.clientName ? "border-rose-400" : "border-zinc-800"} rounded-xl text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-400/20 transition-all`}
                required
              />
              <p
                id="errorClientName"
                className={`${errors.clientName ? "flex" : "hidden"} text-[11px] text-rose-400 mt-1 items-center gap-1`}
              >
                <svg
                  className="w-3.5 h-3.5 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span>{errors.clientName}</span>
              </p>
            </div>

            <div>
              <label
                htmlFor="projectUrl"
                className="block text-xs font-medium text-zinc-300 mb-1"
              >
                Project URL <span className="text-rose-400">*</span>
              </label>
              <input
                type="url"
                id="projectUrl"
                name="projectUrl"
                value={project.projectUrl}
                onChange={handleChange}
                placeholder="https://client-project.com"
                className={`w-full px-3 py-2 sm:py-2.5 text-xs bg-zinc-950 ${errors.projectUrl ? "border-rose-400" : "border-zinc-800"} rounded-xl text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-400/20 transition-all font-mono-code`}
                required
              />
              <p
                id="errorProjectUrl"
                className={`${errors.projectUrl ? "flex" : "hidden"} text-[11px] text-rose-400 mt-1 items-center gap-1`}
              >
                <svg
                  className="w-3.5 h-3.5 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span>{errors.projectUrl}</span>
              </p>
            </div>

            <div>
              <label
                htmlFor="category"
                className="block text-xs font-medium text-zinc-300 mb-1"
              >
                Category <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <select
                  id="category"
                  name="category"
                  value={project.category}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 sm:py-2.5 text-xs bg-zinc-950 ${errors.category ? "border-rose-400" : "border-zinc-800"} rounded-xl text-zinc-100 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-400/20 transition-all appearance-none cursor-pointer`}
                  required
                >
                  <option value="" disabled>
                    Select category...
                  </option>
                  <option value="Web Development">Web Development</option>
                  <option value="Mobile App">Mobile App</option>
                  <option value="UI/UX Design">UI/UX Design</option>
                  <option value="Cloud / DevOps">Cloud / DevOps</option>
                  <option value="AI & ML">AI & Machine Learning</option>
                  <option value="Branding & Growth">Branding & Growth</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-zinc-400">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </div>
              </div>
              <p
                id="errorCategory"
                className={`${errors.category ? "flex" : "hidden"} text-[11px] text-rose-400 mt-1 items-center gap-1`}
              >
                <svg
                  className="w-3.5 h-3.5 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span>{errors.category}</span>
              </p>
            </div>

            <div>
              <label
                htmlFor="budget"
                className="block text-xs font-medium text-zinc-300 mb-1"
              >
                Unit Budget ($ USD) <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-500 font-mono-code text-xs">
                  $
                </span>
                <input
                  type="number"
                  id="budget"
                  name="unitBudget"
                  value={project.unitBudget}
                  onChange={handleChange}
                  step="any"
                  placeholder="5000"
                  className={`w-full pl-7 pr-3 py-2 sm:py-2.5 text-xs bg-zinc-950 ${errors.unitBudget ? "border-rose-400" : "border-zinc-800"} rounded-xl text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-400/20 transition-all font-mono-code`}
                  required
                />
              </div>
              <p
                id="errorBudget"
                className={`${errors.unitBudget ? "flex" : "hidden"} text-[11px] text-rose-400 mt-1 items-center gap-1`}
              >
                <svg
                  className="w-3.5 h-3.5 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span>{errors.unitBudget}</span>
              </p>
            </div>

            <div className="pt-3 flex items-center gap-2.5">
              <button
                type="button"
                id="submitBtn"
                onClick={handleSaveClick}
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 sm:py-2.5 text-xs font-semibold rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 shadow-sm active:scale-98 transition-all cursor-pointer"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d={isAdd ? "M12 4v16m8-8H4" : "M4 12l5 5L20 6"}
                  ></path>
                </svg>
                <span id="submitBtnText">
                  {isAdd ? "Add Project" : "Update Project"}
                </span>
              </button>

              <button
                type="button"
                onClick={resetForm}
                id="clearBtn"
                className="px-3.5 py-2 sm:py-2.5 text-xs font-medium rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-300 hover:text-white transition-all cursor-pointer"
              >
                {isAdd ? "Clear" : "Cancel"}
              </button>
            </div>

            <button
              type="button"
              id="cancelEditBtn"
              onClick={resetForm}
              className={`${isAdd ? "hidden" : "block"} w-full text-center text-xs text-zinc-400 hover:text-zinc-200 py-1 transition-colors`}
            >
              Cancel Edit Mode
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}
