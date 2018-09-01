import React from "react";

const Home = props => {
  return (
    <article className="container-home">
      <header>
        <h1>Dungeons & Dragons 5e</h1>
        <h3>Information Site</h3>
      </header>
      <section>
        <p>
          This site is a small personal project I am working on that uses{" "}
          <a
            id="api-link"
            href="http://www.dnd5eapi.co/#"
            target="_blank"
            rel="noopener noreferrer"
          >
            D&D 5th Edition API
          </a>{" "}
          created by Adrian Padua.
        </p>
      </section>
    </article>
  );
};

export default Home;
