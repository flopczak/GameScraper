import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Button,
} from "reactstrap";
import axios from "axios";
import PaginationComponent from "react-reactstrap-pagination";
import useReactRouter from "use-react-router";

export const MainGamesView = () => {
  const [results, setResults] = useState([]);
  const [flag, setFlag] = useState(false);
  const [pagesCount, setPagesCount] = useState(0);

  const { history } = useReactRouter();

  const updateData = () => {
    if (!flag) {
      axios.get("http://localhost:8000/api/games").then((response) => {
        setData(response.data);
        setResults(response.data.results);
        setPagesCount(response.data.count);
        setFlag(true);
      });
    }
  };

  const handleOnSelect = (selectedPage) => {
    const offset = selectedPage * 54;
    const link = `http://localhost:8000/api/games?limit=54&offset=${offset}`;
    axios.get(link).then((response) => {
      setResults(response.data.results);
    });
  };

  const handleOnClick = (e) => {
    e.preventDefault();
    history.push(`/cardview/${e.target.value}`);
  };

  useEffect(() => {
    updateData();
  }, []);

  const displayCards = () => {
    const cards = [];
    results.forEach((card) => {
      cards.push(
        <Card className="card-style">
          <CardImg alt="..." src={card.img} top></CardImg>
          <CardBody>
            <CardTitle>{card.title}</CardTitle>
            <CardText>{card.price} zł</CardText>
            <Button
              color="primary"
              onClick={(e) => handleOnClick(e, "value")}
              value={card.id}
            >
              Go to page
            </Button>
          </CardBody>
        </Card>
      );
    });
    return cards;
  };

  return (
    <>
      <div className=" card-columns card-padding">{displayCards()}</div>
      <PaginationComponent
        size="lg"
        totalItems={pagesCount}
        pageSize={54}
        onSelect={handleOnSelect}
      />
    </>
  );
};

export default MainGamesView;
