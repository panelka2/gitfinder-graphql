import { Link, generatePath } from "react-router-dom";
import styles from "./card.module.scss";
import { REPO_PAGE_ROUTE } from "../../constants/routes";

const options = {
  year: "numeric",
  month: "long",
  day: "numeric",
} as Intl.DateTimeFormatOptions;

type RepoProps = {
  name: string;
  html_url: string;
  pushed_at: string;
  stargazers_count: number;
};

export const Card = ({
  name,
  html_url,
  pushed_at,
  stargazers_count,
}: RepoProps) => {
  const formattedDate = new Date(pushed_at).toLocaleDateString(
    "en-US",
    options
  );
  const newName = name.length > 15 ? name.slice(0, 15) + "..." : name;

  const usernameRegex = /https:\/\/github\.com\/([^/]+)/;
  const match = html_url.match(usernameRegex);
  const username = match ? match[1] : null;

  return (
    <div className={styles.repo_card}>
      <h2>
        <a
          target="_blank"
          href={html_url}
          rel="noreferrer"
          className={styles.name_repo}
          title={html_url}
        >
          {newName}
        </a>
      </h2>
      <div className={styles.description_block}>
        <div>
          <p>Last commit - {formattedDate}</p>
          <p>Stars at the repository - {stargazers_count}</p>
        </div>
        <p className={styles.link}>
          <Link to={generatePath(REPO_PAGE_ROUTE, { owner: username, name: name })}>
            More...
          </Link>
        </p>
      </div>
    </div>
  );
};
