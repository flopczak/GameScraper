import React, { Fragment } from "react";
import Form from "./Form";
import Accounts from "./Accounts";

export default function Dashboard() {
  return (
    <div>
      <Fragment>
        <Form />
        <Accounts />
      </Fragment>
    </div>
  );
}
