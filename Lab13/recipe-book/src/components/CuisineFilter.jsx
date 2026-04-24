export default function CuisineFilter({ cuisines, value, onChange }) {
  return (
    <select className="filter-select" value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="">All Cuisines</option>
      {cuisines.map((c) => <option key={c} value={c}>{c}</option>)}
    </select>
  );
}
