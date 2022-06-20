import { useState, useEffect } from "react";
import { getNumbers } from "../utils";
import { ExchangeTransactionI } from "../../table/interfaces";

export const usePagination = () => {
  const [currentPage, setCurrentPage] = useState<string>("1");
  const [showPages, setShowPages] = useState<string[]>([]);
  const [counter, setCounter] = useState<number>(3);
  const [isBigList, setIsBigList] = useState<boolean>(false);
  const [pages, setPages] = useState<string[]>(["1"]);

  // Calculate the total of pages
  const handleNumberPages = (list: ExchangeTransactionI[]) => {
    const numberOfPages = Math.ceil((list?.length || 1) / 5);
    setIsBigList(numberOfPages > 5);
    setPages(() => getNumbers(numberOfPages));
  };

  // Handle next button
  const handleNextPage = () => {
    setCounter(Number(currentPage) + 1);
    setCurrentPage((currentPage) => String(Number(currentPage) + 1));
    if (Number(currentPage) >= showPages.length) {
      setShowPages(pages.slice(0, showPages.length + 1));
    }
  };

  // Handle current page
  const handleCurrentPage = (page: string) => {
    setCurrentPage(page);
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

  // Observer the length of the list
  useEffect(() => {
    setShowPages(() => {
      if (isBigList) {
        return pages.slice(0, 3);
      } else {
        return pages;
      }
    });
  }, [pages]);

  return {
    counter,
    currentPage,
    handleCurrentPage,
    handleLastPage,
    handleNextPage,
    handleNumberPages,
    handlePlusButton,
    isBigList,
    pages,
    showPages
  };
};
