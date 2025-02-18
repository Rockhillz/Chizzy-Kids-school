import HrElement from "./HrElement";
import Cardtext from "../CardList/Cardtext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";


const News = () => {
  const navigate = useNavigate();
  const [news, setNews] = useState([]);

  const fetchNews = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/latest-news`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setNews(data.news || data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  //function to take us to event
  const handleClick = () => {
    navigate("/news");
  };


  return (
    <section
      className="container-fluid"
      style={{ backgroundColor: "", marginTop: "0px", height: "auto" }}
    >
      <div>
        <h2 className=" text-center fontColor" style={{ marginTop: "30px" }}>
          WE KEEP YOU IN THE KNOW
        </h2>
        <HrElement />

        <div className="container">
          <div className="row d-flex justify-content-center">
            {news.map((news) => (
              <div key={news._id} className="col-sm-4 col-12 d-flex justify-content-center mb-3" >
                <Cardtext
                  title={news.title}
                  cardtext={news.content}
                  linkout={() => handleClick()}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default News;
