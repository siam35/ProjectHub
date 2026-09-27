export default function FilterSection({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  status,
  onStatusChange,
  sortBy,
  onSortChange,
  favoriteOnly,
  toggleFavoriteFilter,
  clearSearchInput,
  resetAllFilters,
  shownCount,
  totalCount,
}) {
  return (
    <>
      <div className="bg-[#121215] border border-zinc-800 rounded-2xl p-4 space-y-3 shadow-sm">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
          <div className="relative flex-1">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-zinc-500">
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
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </span>
            <input
              type="text"
              id="searchProjects"
              placeholder="Search by project name or domain..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 pr-8 py-2 text-xs bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-400/20 transition-all"
            />
            <button
              id="clearSearchBtn"
              onClick={clearSearchInput}
              className={`${
                search ? "flex" : "hidden"
              } absolute inset-y-0 right-0 pr-3 items-center text-zinc-500 hover:text-zinc-300`}
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
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0">
            <span className="text-xs text-zinc-400">Count:</span>
            <span
              id="displayedCount"
              className="text-xs font-bold font-mono-code px-2.5 py-1 bg-zinc-800 text-zinc-200 border border-zinc-700 rounded-lg"
            >
              {shownCount} of {totalCount}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2.5 border-t border-zinc-800/80">
          <div>
            <label
              htmlFor="filterCategory"
              className="block text-[10px] font-medium text-zinc-400 mb-1"
            >
              Category
            </label>
            <div className="relative">
              <select
                id="filterCategory"
                value={category}
                onChange={(e) => onCategoryChange(e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-200 focus:outline-none focus:border-zinc-500 transition-all appearance-none cursor-pointer"
              >
                <option value="ALL">All Categories</option>
                <option value="Web Development">Web Development</option>
                <option value="Mobile App">Mobile App</option>
                <option value="UI/UX Design">UI/UX Design</option>
                <option value="Cloud / DevOps">Cloud / DevOps</option>
                <option value="AI & ML">AI & Machine Learning</option>
                <option value="Branding & Growth">Branding & Growth</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-zinc-500">
                <svg
                  className="w-3.5 h-3.5"
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
          </div>

          <div>
            <label
              htmlFor="filterStatus"
              className="block text-[10px] font-medium text-zinc-400 mb-1"
            >
              Status
            </label>
            <div className="relative">
              <select
                id="filterStatus"
                value={status}
                onChange={(e) => onStatusChange(e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-200 focus:outline-none focus:border-zinc-500 transition-all appearance-none cursor-pointer"
              >
                <option value="ALL">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-zinc-500">
                <svg
                  className="w-3.5 h-3.5"
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
          </div>

          <div>
            <label
              htmlFor="sortBy"
              className="block text-[10px] font-medium text-zinc-400 mb-1"
            >
              Sort
            </label>
            <div className="relative">
              <select
                id="sortBy"
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-200 focus:outline-none focus:border-zinc-500 transition-all appearance-none cursor-pointer"
              >
                <option value="default">Default</option>
                <option value="name-asc">Name: A-Z</option>
                <option value="name-desc">Name: Z-A</option>
                <option value="budget-asc">Budget: Low-High</option>
                <option value="budget-desc">Budget: High-Low</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-zinc-500">
                <svg
                  className="w-3.5 h-3.5"
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
          </div>

          <div className="flex items-end gap-1.5">
            <button
              id="filterFavoriteBtn"
              onClick={toggleFavoriteFilter}
              aria-pressed={favoriteOnly}
              className={`flex-1 py-1.5 px-2 rounded-xl border text-xs font-medium inline-flex items-center justify-center gap-1 transition-all cursor-pointer ${
                favoriteOnly
                  ? "border-amber-500/40 bg-amber-500/10 text-amber-400"
                  : "border-zinc-800 bg-zinc-950 hover:bg-zinc-900 text-zinc-400 hover:text-amber-400"
              }`}
              title="Filter Starred"
            >
              <svg
                id="filterStarIcon"
                className={`w-3.5 h-3.5 ${
                  favoriteOnly ? "text-amber-400" : "text-zinc-500"
                }`}
                fill={favoriteOnly ? "currentColor" : "none"}
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                ></path>
              </svg>
              <span>Starred</span>
            </button>

            <button
              onClick={resetAllFilters}
              className="py-1.5 px-2.5 rounded-xl border border-zinc-800 bg-zinc-950 hover:bg-zinc-900 text-zinc-400 hover:text-white text-xs font-medium transition-all cursor-pointer"
              title="Reset Filters"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
