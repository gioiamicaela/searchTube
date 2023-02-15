import React from "react";

const Pagination = ({ videosPerPage, totalVideos, paginate, loadVideos }) => {
  const [pageNumbers, setPageNumbers] = React.useState([]);
  const [count, setCount] = React.useState([]);

  React.useEffect(() => {
    const pages = pageNumbers.slice();
    for (let i = 1; i <= Math.ceil(totalVideos / videosPerPage); i++) {
      const found = pages.find((element) => element === i);
      if (!found) {
        pages.push(i);
      }
    }
    setPageNumbers(pages);
  }, [totalVideos]);

  return (
    <div>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <a
              onClick={() => {
                paginate(number);
                if (number === pageNumbers.length) {
                  loadVideos();
                }
              }}
              className="page-link"
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
