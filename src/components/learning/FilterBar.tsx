export default function FilterBar() {
  const filters = ["All Missions", "Beginner", "Advanced", "Security", "Wireless"];
  return (
    <div className="flex flex-wrap gap-4 mt-12 mb-8">
      {filters.map(filter => (
        <button key={filter} className="px-6 py-2 border border-white/10 rounded-full font-mono text-[10px] uppercase font-bold text-gray-500 hover:text-[#7ed957] hover:border-[#7ed957] transition-all cursor-pointer active:bg-[#7ed95711]">
          {filter}
        </button>
      ))}
    </div>
  );
}