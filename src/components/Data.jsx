import React from "react";
import axios from "axios";
import data from "../data.json";

function Data({ searchText }) {
  const searchURL = process.env.REACT_APP_URL;
  const key = process.env.REACT_APP_KEY;
  //   const [data, setData] = React.useState([]);

  const getChannelData = async () => {
    // const authAxios = axios.create({
    //   params: {
    //     part: "statistics",
    //     key,
    //     forUsername: searchText,
    //   },
    // });
    // try {
    //   const response = await authAxios.get(searchURL + "channels");
    //   if (response.data) {
    //     console.log(response.data.items[0].statistics);
    //     setData(response.data.items[0].statistics);
    //   }
    // } catch (err) {
    //   console.error(err);
    // }
  };

  React.useEffect(() => {
    // if (searchText) {
    //   getChannelData();
    // }
  }, [searchText]);

  return (
    <>
      {data.length > 0 && (
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h4 style={{ color: "white", fontSize: "1rem" }}>
                Views: {data[0].viewCount}
              </h4>
              <h4 style={{ color: "white", fontSize: "1rem" }}>
                Subscribers: {data[0].subscriberCount}
              </h4>
              <h4 style={{ color: "white", fontSize: "1rem" }}>
                Videos: {data[0].videoCount}
              </h4>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Data;
