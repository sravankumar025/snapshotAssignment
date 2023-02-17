import { useContext, useEffect, useState } from "react";
import { UserContext } from "../flickrapi";
import { Link } from "react-router-dom";
import "./search.css";
const SearchBar = () => {
  const { fetchPhotos } = useContext(UserContext);
  const [photos, setPhotos] = useState([]);
  const [val, setVal] = useState(" ");
  const [val2, setVal2] = useState(false);
  const handleChange = (e) => {
    setVal(e.target.value);
  };
  const handleClick = () => {
    setVal2(true);
  };
  useEffect(() => {
    if (val2) {
      fetchPhotos(val, val)
        .then((res) => {
          setPhotos(res);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [val, fetchPhotos,val2]);
  return (
    <div>
      <div id="header-container">
        <h1>SnapShot</h1>
        <div>
          <input
            type="text"
            placeholder="Search Here...."
            onChange={handleChange}
          />
            <button id="sub-btn" onClick={handleClick}>
              <i className="fa fa-search"></i>
            </button>
        </div>
        <div id="btns-container">
          <Link to="/mountains">
            <button className="btns">Mountians</button>
          </Link>
          <Link to="/beaches">
            <button className="btns">Beaches</button>
          </Link>
          <Link to="/birds">
            <button className="btns">Birds</button>
          </Link>
          <Link to="/Food">
            <button className="btns">Food</button>
          </Link>
        </div>
      </div>
      {val2 && (
        <div>
          <h2 id="container-heading">Your Search Results : </h2>
          <div id="main-container">
            <div id="container">
              {photos.map((item, index) => {
                return (
                  <div key={index}>
                    <img src={item.url} alt={item.title} id="fromapi" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;