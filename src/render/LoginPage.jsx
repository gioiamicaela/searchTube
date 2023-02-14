import React from "react";
import Login from "../components/Login";

function LoginPage() {
  return (
    <div className="container mt-5 minHeightContainer d-flex flex-column justify-content-center ">
      <div className="row">
        <div className="col-12">
          <Login />;
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
