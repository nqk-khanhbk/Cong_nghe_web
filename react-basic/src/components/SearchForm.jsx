import './search.css'

function SearchForm({ onChangeValue }) {
  return (
    <div className="search-box">
      <input
        className="search-input"
        type="text"
        placeholder="🔍 Tìm theo tên hoặc username..."
        onChange={(e) => onChangeValue(e.target.value)}
      />
    </div>
  );
}

export default SearchForm;
