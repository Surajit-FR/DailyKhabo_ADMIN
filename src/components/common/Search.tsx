import { Search_props_type } from "../../config/DataTypes.config";

const Search = ({ placeholder, value, onChange }: Search_props_type): JSX.Element => {
    return (
        <>
            <div className="ms-auto position-relative">
                <div className="position-absolute top-50 translate-middle-y search-icon px-3">
                    <i className="bi bi-search"></i>
                </div>
                <input
                    className="form-control ps-5"
                    type="text"
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                />
            </div>
        </>
    );
};

export default Search;