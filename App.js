import { useEffect, useState } from "react";
import "./App.css";
import { Card } from "./companents/Card";
import { Wishlist } from "./companents/Wishlist";

function App() {
  const [data, setData] = useState([]);
  const [movie, setMovie] = useState("hell");
  const [get, setGet] = useState(false);
  const [wishListActive, setWishListActive] = useState(false);

  useEffect(() => {
    fetch(`http://www.omdbapi.com/?s=${movie}&apikey=d131f1b0`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(data.Search);
      })
      .then(setGet(false));
  }, [get]);

  const movieHandler = (e) => {
    setMovie(e.target.value);
  };

  return (
    <>
      {wishListActive && <Wishlist></Wishlist>}
      <div className="App">
        <header>
          <div onChange={movieHandler} className="search">
            <img
              className="search-icon"
              src="src\assets\magnifying-glass-solid.svg"
              alt=""
            />
            <input
              type="text"
              className="search-box"
              value={movie}
              onchange={(e) => e.target.value}
            />

            <button
              onClick={() => {
                setGet(true);
              }}
              className="search"
            >
              Search
            </button>
          </div>
          <i
            onClick={() => {
              setWishListActive(true);
            }}
            style={{ color: "white", fontSize: "4rem", cursor: "pointer" }}
            className="fa-regular fa-heart"
          ></i>
        </header>
        <div className="movies">
          {data.length > 0 &&
            data.map((movie, index) => {
              return (
                <Card
                  key={index}
                  title={movie.Title}
                  year={movie.Year}
                  img={movie.Poster}
                ></Card>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default App;
