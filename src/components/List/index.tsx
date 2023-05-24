import { useAppSelector } from "../../hooks/redux";
import {
  getError,
  getGitItems,
  getIsLoading,
} from "../../store/gitReducer/selectors";
import { Pagination } from "../Pagination";
import { useMemo, useState } from "react";
import { Card } from "../Card";
import styles from "./list.module.scss";

const PageSize = 10;

export const List = () => {
  const { items, isLoading, error } = useAppSelector((state) => ({
    items: getGitItems(state),
    isLoading: getIsLoading(state),
    error: getError(state),
  }));

  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return items.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, items]);

  if (isLoading) {
    return (
      <div className={styles.parent_message}>
        <p className={styles.message}>Searching...</p>
      </div>
    );
  }
  if (error === "Request failed with status code 422") {
    return (
      <div className={styles.parent_message}>
        <p className={styles.message}>Type something &uarr;</p>
      </div>
    );
  }
  if (error === "Request failed with status code 403") {
    return (
      <div className={styles.parent_message}>
        <p className={styles.message}>
          Охлади свой поиск - <p className={styles.error}>{error}</p>
        </p>
      </div>
    );
  }
  if (error) {
    return (
      <div className={styles.parent_message}>
        <p className={styles.message}>{error}</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className={styles.parent_message}>
        <p className={styles.message}>Nothing</p>
      </div>
    );
  }

  return (
    <>
      <div className={styles.parent_cards} data-testid="items-list">
        {currentTableData.map((el) => (
          <Card
            key={el.id}
            name={el.name}
            stargazers_count={el.stargazers.totalCount}
            pushed_at={el.defaultBranchRef.target.committedDate}
            html_url={el.url}
          />
        ))}
      </div>
      <div className={styles.pagination}>
        <Pagination
          currentPage={currentPage}
          totalCount={items.length}
          pageSize={PageSize}
          onPageChange={setCurrentPage}
        />
      </div>
    </>
  );
};
