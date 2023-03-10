import React from "react";
import axios from "axios";
import NoMatch from "./NoMatch";
import Chart from "./Chart";

function Data({ searchText }) {
  const searchURL = process.env.REACT_APP_URL;
  const key = process.env.REACT_APP_KEY;
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const getChannelData = async () => {
    setIsLoading(true);
    const authAxios = axios.create({
      params: {
        part: "statistics",
        key,
        forUsername: searchText,
      },
    });
    try {
      const response = await authAxios.get(searchURL + "channels");
      setIsLoading(false);
      if (response.data.pageInfo.totalResults > 0) {
        setData(response.data.items[0].statistics);
      }
    } catch (err) {
      console.error(err);
    }
  };

  React.useEffect(() => {
    if (searchText) {
      getChannelData();
    }
  }, [searchText]);

  if (!isLoading && data.length === 0) {
    return <NoMatch />;
  }

  return (
    <>
      {data && (
        <>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h4 style={{ color: "white", fontSize: "1rem" }}>
                  <strong>Views:</strong> {data.viewCount}
                </h4>
                <h4 style={{ color: "white", fontSize: "1rem" }}>
                  <strong>Subscribers:</strong> {data.subscriberCount}
                </h4>
                <h4 style={{ color: "white", fontSize: "1rem" }}>
                  <strong> Videos:</strong> {data.videoCount}
                </h4>
              </div>
            </div>
          </div>
          <Chart data={data} />
        </>
      )}
    </>
  );
}

export default Data;
