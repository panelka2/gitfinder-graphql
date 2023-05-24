import { usePagination, DOTS } from "../../hooks/usePagination";
import "./style.scss";
import classnames from "classnames";

export const Pagination = (props: any) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className,
  } = props;

  const paginationRange: any = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const onTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul
      className={classnames("pagination-container", { [className]: className })}
      data-testid="pagination-block"
    >
      <li className="fix"></li>
      <li
        className={classnames("pagination-item", {
          disabled: currentPage === 1,
        })}
        onClick={() => {
          onTop();
          onPrevious();
        }}
      >
        <div className="arrow left" data-testid="left-arrow" />
      </li>
      {paginationRange.map((pageNumber: string) => {
        if (pageNumber === DOTS) {
          return (
            <li className="pagination-item dots" key="dots">
              &#8230;
            </li>
          );
        }

        return (
          <li
            className={classnames("pagination-item", {
              selected: pageNumber === currentPage,
            })}
            onClick={() => {
              onTop();
              onPageChange(pageNumber);
            }}
            key={pageNumber}
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        className={classnames("pagination-item", {
          disabled: currentPage === lastPage,
        })}
        onClick={() => {
          onTop();
          onNext();
        }}
        key="next"
      >
        <div className="arrow right" data-testid="right-arrow" />
      </li>
    </ul>
  );
};
