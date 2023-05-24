import "./App.css";
import { Main } from "./pages/Main";
import { Link, Route, Routes } from "react-router-dom";
import { Repo } from "./pages/RepoPage";
import { REPO_PAGE_ROUTE } from "./constants/routes";

function App() {
  return (
    <div className="App">
      <span className="header">
        <h1>
          <Link to="/" className="logo">
            GitFinder
          </Link>
        </h1>
        <a
          href="https://github.com/panelka2/gitfinder-graphql"
          target="_blank"
          rel="noreferrer"
        >
          <img src="/git_icon.svg" alt="Git Icon" className="icon" />
        </a>
      </span>

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path={REPO_PAGE_ROUTE} element={<Repo />} />
      </Routes>
    </div>
  );
}

export default App;
