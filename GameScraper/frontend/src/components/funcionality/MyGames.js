import React, {useState, useEffect} from "react";
import axios from "axios";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import PaginationComponent from "react-reactstrap-pagination";
import useReactRouter from "use-react-router";
import {Button, Card, CardBody, CardImg, CardText, CardTitle} from "reactstrap";

const MyGames = ({auth}) => {
    const [gamesInfo, setGamesInfo] = useState([]);
    const [games, setGames] = useState([]);
    const [results, setResults] = useState([]);
    const [pagesCount, setPagesCount] = useState(0);
    const [flag, setFlag] = useState(false);
    const URL = 'http://localhost:8000/api/acc_games';
    const URL_INFO = 'http://localhost:8000/api/game_info'
    const {history} = useReactRouter();

    const updateData = () => {
        let config = {
            headers: {
                "Authorization": "Token " + auth.token,
            }
        }
        axios
            .get(URL, config)
            .then((response) => {
                setResults(response.data.results);
                getGameInfo(response.data.results);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        updateData();
    }, []);


    const getGameInfo = (games) => {
        let tempUrl = URL_INFO + `?id=`;
        games.forEach((game) => {
            tempUrl += game.game_id + ',';
        })
        tempUrl = tempUrl.substring(0, tempUrl.length - 1);
        axios.get(tempUrl)
            .then((response) => {
                setGamesInfo(response.data.results);
                setPagesCount(response.data.count);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const handleOnSelect = (selectedPage) => {
        const offset = selectedPage * 54;
        let link = URL + `?limit=54&offset=${offset}`;
        axios.get(link).then((response) => {
            setResults(response.data.results);
        });
    };

    const handleOnClick = (e) => {
        e.preventDefault();
        history.push(`/cardview/${e.target.value}`);
    };

    const displayCards = () => {
        const games = [];
        gamesInfo.forEach((game) => {
            games.push(
                <Card className="card-style">
                    <CardImg className="img-card" alt="..." src={game.img} top></CardImg>
                    <CardBody>
                        <CardTitle>{game.title}</CardTitle>
                        <CardText>{game.price} zł</CardText>
                        <Button
                            color="primary"
                            onClick={(e) => handleOnClick(e, "value")}
                            value={game.id}
                        >
                            Go to page
                        </Button>
                    </CardBody>
                </Card>
            );
        });
        return games;
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

MyGames.propTypes = {
    auth: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(MyGames)