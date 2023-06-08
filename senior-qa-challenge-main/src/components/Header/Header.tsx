import React from "react";
import { Link } from "react-router-dom";

export interface Props {
  title: string;
  withBackButton?: boolean;
}

const Header = ({ title, withBackButton = false }: Props) => {
  if (!withBackButton)
    return <h1 className="title has-text-centered">{title}</h1>;

  return (
    <div className="has-text-centered mb-5">
      <h1 className="title mb-0">{title}</h1>
      <Link to="/">Back to Dashboard</Link>
    </div>
  );
};

export default Header;
