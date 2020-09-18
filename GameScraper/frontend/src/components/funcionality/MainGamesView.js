import React, { useState, useEffect } from "react";
import {
  Pagination,
  PaginationItem,
  PaginationLink,
  Button,
  Card,
  CardBody,
  CardImg,
  CardTitle,
  CardText,
} from "reactstrap";
import axios from "axios";
import PerfectScrollbar from "react-perfect-scrollbar";

export const MainGamesView = () => {
  const [data, setData] = useState([]);
  const [results, setResults] = useState([]);
  const [flag, setFlag] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [pagesCount, setPagesCount] = useState(0);

  const handleClick = (e, index) => {
    e.preventDefault();

    setCurrentPage({
      currentPage: index,
    });
  };

  const updateData = () => {
    if (!flag) {
      axios.get("http://127.0.0.1:8000/api/games/").then((response) => {
        setData(response.data);
        setResults(response.data.results);
        console.log(response);
        setFlag(true);
      });
    }
  };

  const pagination = () => {
    if (flag) {
      if (data) {
        console.log(data.count);
        setPagesCount(Math.ceil(data.count / 50));
      }
      return (
        <React.Fragment>
          <div className="pagination-wrapper">
            <Pagination aria-label="Page navigation example">
              <PaginationItem disabled={currentPage <= 0}>
                <PaginationLink
                  onClick={(e) => this.handleClick(e, currentPage - 1)}
                  previous
                  href="#"
                />
              </PaginationItem>
              <PaginationItem disabled>
                <PaginationLink previous href="#" />
              </PaginationItem>

              {[...Array(pagesCount)].map((page, i) => (
                <PaginationItem active={i === currentPage} key={i}>
                  <PaginationLink
                    onClick={(e) => this.handleClick(e, i)}
                    href="#"
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationLink next href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink last href="#" />
              </PaginationItem>
            </Pagination>
          </div>
        </React.Fragment>
      );
    }
  };

  useEffect(() => {
    console.log(data);
  }, [flag]);

  const displayCards = () => {
    const cards = [];
    results.forEach((card) => {
      cards.push(
        <Card>
          <CardImg alt="..." src={card.img} top></CardImg>
          <CardBody>
            <CardText>{card.title}</CardText>
          </CardBody>
        </Card>
      );
    });
    return cards;
  };

  return (
    <>
      {updateData()}
      <div className=" card-columns">{displayCards()}</div>
      {/* {pagination()} */}
    </>
  );
};

export default MainGamesView;
