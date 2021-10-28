import React from "react";
// routing
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// components
import Home from "./components/Home";
import Header from "./components/Header";
import Movie from "./components/Movie";

// styles
import { GlobalStyle } from "./GlobalStyles";
import NotFound from "./components/NotFound";

const App: React.FC = () => (
  <Router>
    <Header />

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:movieId" element={<Movie />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>

    <GlobalStyle />
  </Router>
);

export default App;
