import SearchListComponent from "./SearchListComponent";
import NavComponent from "./NavComponent";
import MainComponent from "./MainComponent";
import "./App.css";
import "./index.css";
import { useState } from "react";
import { Route, Switch } from "react-router-dom";
import React from "react";

function App(props) {
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const addRecentlyViewed = (id) => {
    if (!recentlyViewed.includes(id)) {
      recentlyViewed.push(id);
    }
    setRecentlyViewed([...recentlyViewed]);
  };
  return (
    <div className="App">
      <NavComponent recentlyViewed={recentlyViewed}></NavComponent>
      <Switch>
        <Route
          path="/city/:updateSearchId"
          children={
            <SearchListComponent addRecentlyViewed={addRecentlyViewed} />
          }
        ></Route>
        <Route path="/" children={<MainComponent location={"6167865"} />} />
        <Route path="id/:id" children={<SearchListComponent />}></Route>
      </Switch>
    </div>
  );
}

export default App;
