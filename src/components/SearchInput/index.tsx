import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchRepos } from "../../store/gitReducer/action";
import { useAppDispatch } from "../../hooks/redux";
import { useDebounce } from "../../hooks/useDebounce";
import styles from "./search.module.scss";

const SEARCH_KEY = "search";

export const SearchInput = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const repoName = searchParams.get(SEARCH_KEY) || "";
  const debouncedSearchValue = useDebounce(repoName, 500);

  const handleInputChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams({ [SEARCH_KEY]: value });
  };

  useEffect(() => {
    dispatch(fetchRepos(debouncedSearchValue));
  }, [debouncedSearchValue, dispatch]);

  return (
    <div className={styles.search_block}>
      <label>
        Search:
        <input
          className={styles.input}
          type="text"
          placeholder="Search"
          value={repoName}
          onChange={handleInputChange}
        />
      </label>
    </div>
  );
};
