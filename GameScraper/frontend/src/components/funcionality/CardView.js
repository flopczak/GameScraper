import React, { useState, useEffect } from "react";
import { Col, Row, Container } from "reactstrap";
import axios from "axios";
import { useParams } from "react-router-dom";

const CardView = () => {
  const { id } = useParams();
  const [data, setData] = useState({});

  const updateData = () => {
    axios.get().then((data) => {
      setData(data);
    });
  };

  useEffect(() => {
    updateData();
  });

  return (
    <div className="card-padding">
      <Container>
        <Row>
          <Col>pupcia</Col>
          <Col>dupcia</Col>
        </Row>
      </Container>
    </div>
  );
};

export default CardView;
