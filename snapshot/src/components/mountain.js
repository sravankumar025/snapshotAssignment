import { useContext, useEffect, useState } from "react";
import { UserContext } from "../flickrapi";
import SearchBar from "./search";
const Mountians = () => {
  const { fetchPhotos } = useContext(UserContext);
  const [photos, setPhotos] = useState([]);
  useEffect(() => {
    fetchPhotos("mountains", "mountians")
      .then((res) => {
        setPhotos(res);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [fetchPhotos]);

  return (
    <div>
      <SearchBar/>
      <h2 id="container-heading">Mountian Pictures</h2>
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
  );
};

export default Mountians;
