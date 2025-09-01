export default function SearchBar({ value, onChange, onSubmit }) {
  return (
    <form
      className="search-bar enhanced"
      role="search"
      onSubmit={(e) => { e.preventDefault(); onSubmit?.(); }}
    >
      <input
        type="search"
        placeholder="Search services..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search services"
        autoComplete="off"
      />
      {value && (
        <button
          type="button"
          className="clear-btn"
          onClick={() => onChange("")}
          aria-label="Clear search"
        >
          ×
        </button>
      )}
    </form>
  );
}