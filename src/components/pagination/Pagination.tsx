import { TextButton } from "../buttons/TextButton";
import { NextArrow } from "../icons/NextArrow";
import { useEffect, useState } from "react";
import { getNumbers } from "./utils";

const styles = {
  container: "mt-7 gap-1 hidden md:flex",
  arrowIcon: "fill-dark"
};

export const Pagination = ({ pagesNumber = 1 }: { pagesNumber: number }) => {
  const [currentPage, setCurrentPage] = useState<string>("1");
  const [showPages, setShowPages] = useState<string[]>([]);
  const [counter, setCounter] = useState<number>(3);
  const isBigList = pagesNumber > 5;
  const pages = getNumbers(pagesNumber);

  useEffect(() => {
    setShowPages(() => {
      if (isBigList) {
        return pages.slice(0, 3);
      } else {
        return pages.slice(0, 5);
      }
    });
  }, [pagesNumber]);

  const handleNextPage = () => {
    setCurrentPage((currentPage) => String(Number(currentPage) + 1));
    if (Number(currentPage) >= showPages.length) {
      setShowPages(pages.slice(0, showPages.length + 1));
    }
  };

  return (
    <div className={styles.container}>
      {showPages.map((page) => (
        <TextButton
          key={page}
          handleClick={() => {
            setCurrentPage(page);
          }}
          isActive={page === currentPage}
        >
          {page}
        </TextButton>
      ))}
      {isBigList && counter < pages.length && (
        <>
          <TextButton
            handleClick={() => {
              setCounter(counter + 3);
              setShowPages(() => {
                return pages.slice(0, counter + 3);
              });
            }}
          >
            ...
          </TextButton>
          <TextButton
            handleClick={() => {
              setCurrentPage(pages.slice(-1)[0]);
            }}
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
