import React, { useState, useEffect, useHistory } from "react";
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
  const [data, setData] = useState([]);
  const [results, setResults] = useState([]);
  const [flag, setFlag] = useState(false);
  const [pagesCount, setPagesCount] = useState(0);

  const { history } = useReactRouter();

  const updateData = () => {
    if (!flag) {
      axios.get("http://127.0.0.1:8000/api/games/").then((response) => {
        setData(response.data);
        setResults(response.data.results);
        setPagesCount(response.data.count);
        setFlag(true);
      });
    }
  };

  const handleOnSelect = (selectedPage) => {
    const offset = selectedPage * 51;
    const link = `http://127.0.0.1:8000/api/games/?limit=50&offset=${offset}`;
    axios.get(link).then((response) => {
      setData(response.data);
      setResults(response.data.results);
    });
  };

  const handleOnClick = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    history.push(`/cardview/${e.target.value}`);
  };

  useEffect(() => {
    console.log("useeefect", data);
  }, [data]);

  const displayCards = () => {
    const cards = [];
    results.forEach((card) => {
      cards.push(
        <Card>
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
      {updateData()}
      <div className=" card-columns card-padding">{displayCards()}</div>
      <PaginationComponent
        totalItems={pagesCount}
        pageSize={51}
        onSelect={handleOnSelect}
      />
    </>
  );
};

export default MainGamesView;
