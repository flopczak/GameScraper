import React, {useState, useEffect} from "react";
import {
    Col,
    Row,
    Container,
    Card,
    CardImg,
    CardBody,
    Button,
    CardTitle,
    CardText,
} from "reactstrap";
import axios from "axios";
import {useParams} from "react-router-dom";
import {Line} from "react-chartjs-2";
import {connect} from "react-redux";
import PropTypes from "prop-types";

const CardView = ({auth}) => {

    const URL = 'http://localhost:8000/api/'
    const {id} = useParams();
    const [data, setData] = useState({});
    const [chartData, setChartData] = useState([]);
    const [xyAxis, setxyAxis] = useState({});
    const [chartLayoutData, setChartLayoutData] = useState({});
    const [favGame, setFavGame] = useState(false);

    const convertData = () => {
        const xAxis = [];
        const yAxis = [];
        chartData.forEach((item) => {
            console.log(item);
            xAxis.push(item.date);
            yAxis.push(item.price);
        });
        setxyAxis({xAxis: xAxis, yAxis: yAxis});
    };

    const updateData = () => {
        let config = {
            headers: {
                "Authorization": "Token " + auth.token,
            }
        }
        axios
            .get(URL + `game_info?id=${id}`)
            .then((data) => {
                setData(data.data.results[0]);
            })
            .catch((err) => console.log(err));
        axios.get(URL + `price?game_id=${id}`).then((data) => {
            setChartData(data.data.results);
        });
        axios.get(URL + `del_games/${id}`, config)
            .then(() => {
                setFavGame(true);
            })
            .catch((err) => {
                console.log(err);
                setFavGame(false);
            })
    };

    useEffect(() => {
        updateData();
    }, []);

    useEffect(() => {
        convertData();
    }, [chartData]);

    useEffect(() => {
        console.log(xyAxis);
        const data1 = {
            labels: xyAxis.xAxis,
            datasets: [
                {
                    label: "Changes in price over time",
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: "rgba(75,192,192,0.4)",
                    borderColor: "rgba(75,192,192,1)",
                    borderCapStyle: "butt",
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: "miter",
                    pointBorderColor: "rgba(75,192,192,1)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(75,192,192,1)",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: xyAxis.yAxis,
                },
            ],
        };
        setChartLayoutData(data1);
    }, [xyAxis]);

    const postSub = () => {
        let body = {"game_id": data.id};
        let config = {
            headers: {
                "Authorization": "Token " + auth.token,
            }
        }
        axios.post(URL + `acc_games`, body, config)
            .then(() => {
                setFavGame(true);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const delSub = () => {
        let config = {
            headers: {
                "Authorization": "Token " + auth.token,
            }
        }
        axios.delete(URL + 'del_games/' + data.id, config)
            .then(() => {
                setFavGame(false);
            })
            .catch((err) => {
                console.log(err);
            })
    }


    const handleOnClick = (e) => {
        e.preventDefault();
        favGame ? delSub() : postSub();
    }

    return (
        <Container className="card-padding2">
            <Row>
                <Col>
                    <Card>
                        <CardImg alt="..." src={data.img} top></CardImg>
                        <CardBody>
                            <CardTitle className=" h2 mb-0">{data.title}</CardTitle>
                            <small className=" text-muted">{data.date}</small>
                            <CardText className=" mt-4">{data.price} zł</CardText>
                        </CardBody>
                    </Card>
                </Col>
                <Col className="card-padding chart-size">
                    <Button
                        className='button button-center'
                        onClick={(e) => handleOnClick(e, "value")}
                        value={id}
                    >
                        {favGame ? "Unsubscribe game" : "Subscribe game"}
                    </Button>
                    <Line data={chartLayoutData} width={100} height={100}/>
                    {/* <Button className="button-center" color="primary">
            Go to shop page
          </Button> */}
                    <a className="button button-center" target="_blank" href={data.link}>
                        Go to shop page
                    </a>
                </Col>
            </Row>
        </Container>
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

CardView.propTypes = {
    auth: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(CardView);
