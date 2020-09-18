import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardTitle,
  CardText,
} from "reactstrap";
import { useEffect, useState } from "react";
export const MainGamesView = () => {
  const [data, setData] = useState([]);

  return (
    <div className=" card-deck">
      <Card>
        <CardImg
          alt="..."
          src="https://demos.creative-tim.com/argon-design-system-pro/assets/img/faces/alejandro-escamilla.jpg"
          top
        ></CardImg>
        <CardBody>
          <CardTitle>Card title</CardTitle>
          <CardText>
            This is a wider card with supporting text below as a natural lead-in
            to additional content. This content is a little bit longer.
          </CardText>
          <CardText>
            <small className=" text-muted">Last updated 3 mins ago</small>
          </CardText>
        </CardBody>
      </Card>
      <Card>
        <CardImg
          alt="..."
          src="https://demos.creative-tim.com/argon-design-system-pro/assets/img/faces/alejandro-escamilla.jpg"
          top
        ></CardImg>
        <CardBody>
          <CardTitle>Card title</CardTitle>
          <CardText>
            This card has supporting text below as a natural lead-in to
            additional content.
          </CardText>
          <CardText>
            <small className=" text-muted">Last updated 3 mins ago</small>
          </CardText>
        </CardBody>
      </Card>
      <Card>
        <CardImg
          alt="..."
          src="https://demos.creative-tim.com/argon-design-system-pro/assets/img/faces/alejandro-escamilla.jpg"
          top
        ></CardImg>
        <CardBody>
          <CardTitle>Card title</CardTitle>
          <CardText>
            This is a wider card with supporting text below as a natural lead-in
            to additional content. This card has even longer content than the
            first to show that equal height action.
          </CardText>
          <CardText>
            <small className=" text-muted">Last updated 3 mins ago</small>
          </CardText>
        </CardBody>
      </Card>
    </div>
  );
};

export default MainGamesView;
