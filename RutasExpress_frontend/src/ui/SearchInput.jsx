import { SearchIcon } from "./Icons";

export function SearchInput({ value, onChange, placeholder = "Buscar..." }) {
    return (
        <div className="rex-search-input">
            <SearchIcon size={16} className="rex-search-input__icon" />
            <input type="text" value={value} onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder} className="rex-search-input__field"/>
        </div>
    );
}