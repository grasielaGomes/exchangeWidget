import { useState, useEffect } from "react";
import { getNumbers } from "../utils";
import { useTransactions } from "../../../hooks/transactions/useTransactions";

export const usePagination = () => {
  const [currentPage, setCurrentPage] = useState<string>("1");
  const [showPages, setShowPages] = useState<string[]>([]);
  const [counter, setCounter] = useState<number>(3);
  const [isBigList, setIsBigList] = useState<boolean>(false);
  const [pages, setPages] = useState<string[]>(["1"]);

  const { mappedTransactions } = useTransactions();

  // Calculate the total of pages
  const handleNumberPages = () => {
    const numberOfPages = Math.ceil((mappedTransactions?.length || 1) / 5);
    return numberOfPages;
  };

  // Handle next button
  const handleNextPage = () => {
    setCurrentPage((currentPage) => String(Number(currentPage) + 1));
    if (Number(currentPage) >= showPages.length) {
      setShowPages(pages.slice(0, showPages.length + 1));
    }
  };

  // Handle current page
  const handleCurrentPage = (page: string) => {
    setCurrentPage(page);
    if (page === "1" || page === "2" || page === "3") {
      setShowPages(pages.slice(0, 3));
    }
  };

  // Show last page
  const handleLastPage = () => {
    setCurrentPage(pages.slice(-1)[0]);
  };

  // Handle click on plus button
  const handlePlusButton = () => {
    setCounter(counter + 3);
    setShowPages(() => {
      return pages.slice(0, counter + 3);
    });
  };

  // Set list of strings of pages
  useEffect(() => {
    const pages = handleNumberPages();
    setIsBigList(pages > 5);
    setPages(() => getNumbers(pages));
  }, [mappedTransactions]);

  // Check how many numbers to show on pagination
  useEffect(() => {
    setShowPages(() => {
      if (isBigList) {
        return pages.slice(0, 3);
      } else {
        return pages.slice(0, 5);
      }
    });
  }, [pages]);

  return {
    counter,
    currentPage,
    handleCurrentPage,
    handleLastPage,
    handleNextPage,
    handlePlusButton,
    isBigList,
    pages,
    showPages
  };
};
