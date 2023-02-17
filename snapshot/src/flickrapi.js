import React from "react";
import axios from "axios";
import "./flickr.css";
import Mountains from "./components/mountain";
import Beaches from "./components/beaches";
import Birds from "./components/birds";
import Food from "./components/food";
import SearchBar from "./components/search";
import { BrowserRouter, Routes, Route } from "react-router-dom";
export const UserContext = React.createContext();
const StartPage = () => {
  const API_KEY = "26e3e10d57e8e6f07b4df6603df0f737";
  const API_ENDPOINT = "https://api.flickr.com/services/rest/";

  const fetchPhotos = async (category, keyword) => {
    const response = await axios.get(API_ENDPOINT, {
      params: {
        method: "flickr.photos.search",
        api_key: API_KEY,
        format: "json",
        nojsoncallback: 1,
        safe_search: 1,
        per_page: 24,
        tags: category,
        text: keyword,
      },
    });

    if (response.status === 200) {
      return response.data.photos.photo.map((photo) => ({
        id: photo.id,
        title: photo.title,
        url: `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`,
      }));
    } else {
      throw new Error("Failed to fetch photos");
    }
  };
  const contextValue = { fetchPhotos };
  return (
    <BrowserRouter>
      <div id="main-container">
        <UserContext.Provider value={contextValue}>
          <Routes>
            <Route path="/" element={<SearchBar />} />
            <Route path="mountains" element={<Mountains />} />
            <Route path="beaches" element={<Beaches />} />
            <Route path="birds" element={<Birds />} />
            <Route path="food" element={<Food />} />
          </Routes>
        </UserContext.Provider>
      </div>
    </BrowserRouter>
  );
};

export default StartPage;
