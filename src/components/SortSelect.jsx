export default function SortSelect({ value, onChange }) {
  return (
    <div className="sort-select">
      <label className="visually-hidden" htmlFor="sortSel">Sort services</label>
      <select
        id="sortSel"
        value={value}
        onChange={e => onChange(e.target.value)}
        aria-label="Sort services"
      >
        <option value="name-asc">Name A–Z</option>
        <option value="name-desc">Name Z–A</option>
        <option value="category">Category</option>
      </select>
    </div>
  );
}