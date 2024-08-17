import React from "react";
import css from "./SearchBar.module.css";

interface SearchBarProps {
  handleSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ handleSearch }) => {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const query = (
      form.elements.namedItem("search") as HTMLInputElement
    ).value.trim();
    handleSearch(query);
    form.reset();
  };

  return (
    <header className={css.header}>
      <form className={css.form} onSubmit={onSubmit}>
        <div className={css.searchContainer}>
          <div className={css.inputWrapper}>
            <input
              className={css.input}
              type="text"
              autoComplete="off"
              name="search"
              autoFocus
              placeholder="Search images and photos"
            />
          </div>
          <button className={css.button} type="submit">
            Search
          </button>
        </div>
      </form>
    </header>
  );
};

export default SearchBar;
