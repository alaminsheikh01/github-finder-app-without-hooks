import React from "react";
import ReposItem from "./ReposItem";

export const Repos = ({ repos }) => {
  return (
    <div>
      {repos.map((repo) => (
        <ReposItem repo={repo} key={repo.id} />
      ))}
    </div>
  );
};

export default Repos;
