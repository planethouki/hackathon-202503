import React from "react";
import { Pagination } from "react-bootstrap";

interface PaginationComponentProps {
  pageNumber: number;
  maxPage: number;
  handlePageChange: (page: number) => void;
}

const PaginationComponent: React.FC<PaginationComponentProps> = ({
  pageNumber,
  maxPage,
  handlePageChange,
}) => {
  return (
    <Pagination>
      <Pagination.First
        onClick={() => handlePageChange(1)}
        disabled={pageNumber === 1}
      />
      <Pagination.Prev
        onClick={() => handlePageChange(pageNumber - 1)}
        disabled={pageNumber === 1}
      />
      {Array.from({ length: maxPage }, (_, index) => (
        <Pagination.Item
          key={index + 1}
          active={index + 1 === pageNumber}
          onClick={() => handlePageChange(index + 1)}
        >
          {index + 1}
        </Pagination.Item>
      ))}
      <Pagination.Next
        onClick={() => handlePageChange(pageNumber + 1)}
        disabled={pageNumber === maxPage}
      />
      <Pagination.Last
        onClick={() => handlePageChange(maxPage)}
        disabled={pageNumber === maxPage}
      />
    </Pagination>
  );
};

export default PaginationComponent;