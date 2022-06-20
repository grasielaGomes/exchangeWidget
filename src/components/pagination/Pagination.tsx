import { TextButton } from "../buttons/TextButton";
import { NextArrow } from "../icons/NextArrow";
import { usePagination } from "./hooks/usePagination";
import { useEffect } from "react";
import { PaginationI } from "./interfaces";

const styles = {
  container: "mt-7 gap-1 hidden md:flex",
  arrowIcon: "fill-dark"
};

export const Pagination = ({ handlePage }: PaginationI) => {
  const {
    counter,
    currentPage,
    handleCurrentPage,
    handleLastPage,
    handleNextPage,
    handlePlusButton,
    isBigList,
    pages,
    showPages
  } = usePagination();

  useEffect(() => {
    handlePage(Number(currentPage));
  }, [currentPage]);

  const showNextButton =
    isBigList && counter < pages.length && Number(currentPage) !== pages.length;

  return (
    <div className={styles.container}>
      {showPages.map((page) => (
        <TextButton
          key={page}
          handleClick={() => {
            handleCurrentPage(page);
          }}
          isActive={page === currentPage}
        >
          {page}
        </TextButton>
      ))}
      {showNextButton && (
        <>
          <TextButton handleClick={handlePlusButton}>...</TextButton>
          <TextButton
            handleClick={handleLastPage}
            isActive={pages.slice(-1)[0] === currentPage}
          >
            {pages.slice(-1)[0]}
          </TextButton>
          <TextButton handleClick={handleNextPage} variant="icon">
            <span>Next</span>
            <NextArrow className={styles.arrowIcon} />
          </TextButton>
        </>
      )}
    </div>
  );
};
