import React, {useState, useEffect} from "react";
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
import {useParams} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";

export const FilteredGamesView = () => {
    const [results, setResults] = useState([]);
    const [flag, setFlag] = useState(false);
    const [pagesCount, setPagesCount] = useState(0);
    const {id} = useParams();

    const {history} = useReactRouter();

    const updateData = () => {
        let link = `http://localhost:8000/api/games`;
        if (id) {
            link = `http://localhost:8000/api/games?console=${id}`
        }
        axios
            .get(link)
            .then((response) => {
                setResults(response.data.results);
                setPagesCount(response.data.count);
                setFlag(true);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleOnSelect = (selectedPage) => {
        const offset = selectedPage * 54;
        let link = `http://localhost:8000/api/games?limit=54&offset=${offset}`;
        if (id) {
            link = `http://127.0.0.1:8000/api/games?console=${id}&limit=54&offset=${offset}`;
        }
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
    }, [id]);

    const displayCards = () => {
        const cards = [];
        results.forEach((card) => {
            cards.push(
                <Card className="card-style">
                    <CardImg className="img-card" alt="..." src={card.img} top></CardImg>
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

const mapStateToProps = (state) => ({
    auth: state.auth
});

FilteredGamesView.propTypes = {
    auth: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(FilteredGamesView);
