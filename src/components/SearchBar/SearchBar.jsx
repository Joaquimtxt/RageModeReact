"use client";

import { useState } from "react";
import "./SearchBar.css";

function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsLoading(true);

      // Simulando uma busca com tempo de carregamento
      setTimeout(() => {
        console.log("Pesquisando por:", searchQuery);
        setIsLoading(false);
      }, 2000);
    }
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Pesquisar..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          disabled={isLoading}
        />
        <button
          type="submit"
          className="search-button"
          disabled={isLoading || !searchQuery.trim()}
        >
          {isLoading ? (
            <span className="search-icon loading">⏳</span>
          ) : (
            <span className="search-icon">🔍</span>
          )}
        </button>
      </div>
      {isLoading && (
        <div className="search-progress">
          <div className="search-progress-bar"></div>
        </div>
      )}
    </form>
  );
}

export default SearchBar;
