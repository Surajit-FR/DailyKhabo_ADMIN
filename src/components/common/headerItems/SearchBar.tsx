const SearchBar = (): JSX.Element => {
    return (
        <>
            <form className="searchbar">
                <div className="position-absolute top-50 translate-middle-y search-icon ms-3"><i className="bi bi-search"></i></div>
                <input className="form-control" type="text" placeholder="Type here to search" />
                <div className="position-absolute top-50 translate-middle-y search-close-icon"><i className="bi bi-x-lg"></i></div>
            </form>
        </>
    )
}

export default SearchBar