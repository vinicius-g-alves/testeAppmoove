import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import Details from "../details/Details";
import { Filme } from "../types/types";
import "./style.css";

function Home() {
  const [listaFilmesCartaz, setlistaFilmesCartaz] = useState<Filme[]>([]);
  const [listaFilmesTopRated, setlistaFilmesTopRated] = useState<Filme[]>([]);
  const [filmePesquisado, setFilmePesquisado] = useState<string>("");
  const [resultadoPesquisa, setResultadoPesquisa] = useState<Filme[]>([]);

  const [open, setOpen] = useState<boolean>(false);

  function getFilmesCartaz() {
    axios
      .get(
        "https://api.themoviedb.org/3/movie/upcoming?api_key=8238e0429d265d4d18abf1b53a68e7cb&language=pt-BR&page=1"
      )
      .then((response: AxiosResponse<any>) => {
        setlistaFilmesCartaz(response.data.results);
        console.log(response.data.results);
      })
      .catch((error: AxiosError) => {
        console.error(error);
      });
  }

  function getTopRated() {
    axios
      .get(
        "https://api.themoviedb.org/3/movie/top_rated?api_key=8238e0429d265d4d18abf1b53a68e7cb&language=en-US&page=1&"
      )
      .then((response: AxiosResponse<any>) => {
        setlistaFilmesTopRated(response.data.results);
        console.log(response.data.results);
      })
      .catch((error: AxiosError) => {
        console.error(error);
      });
  }

  function pesquisa() {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=8238e0429d265d4d18abf1b53a68e7cb&language=pt-BR&query=${filmePesquisado}&page=1&include_adult=false&year=2022`
      )
      .then((response: AxiosResponse<any>) => {
        setResultadoPesquisa(response.data.results);
        console.log(response.data.results);
      })
      .catch((error: AxiosError) => {
        console.error(error);
      });
  }

  const pegaTexto = (event: any) => {
    setFilmePesquisado(event.target.value);
  };

  // axios
  //   .get("https://api.themoviedb.org/3/movie/upcoming?api_key=8238e0429d265d4d18abf1b53a68e7cb&language=pt-BR&page=1", {
  //     responseType: "arraybuffer",
  //   })
  //   .then((response) => {
  //     const foto = Buffer.from(response.data.results.poster_path, "base64")
  //     // setListaImages(foto));
  //     console.log(foto);
  //   })
  //   .catch((ex) => {
  //     console.error(ex);
  //   });

  useEffect(() => {
    getFilmesCartaz();
    getTopRated();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <header className="mobile">
        <a href="index.html">
          <h1>Vinicius Alves</h1>
        </a>

        <div className="search">
          <div className="search-space">
            <input
              type="text"
              id="search"
              value={filmePesquisado}
              onChange={pegaTexto}
              placeholder="Pesquisar..."
            />
            <button onClick={() => pesquisa()}>Pesquisar</button>
          </div>
        </div>

        <nav>
          <ul className="list">
            <li><i className="fa-solid fa-bars"></i>menu</li>
          </ul>
        </nav>
      </header>

      <main>
        <ul className="pesquisa">
          {resultadoPesquisa.slice(0,3).map((filme) => {
            return <li>{filme.title}</li>;
          })}
        </ul>

        <div className="sections">
          <section className="cartaz">
            <h3 className="h3-cartaz">Em Cartaz Agora</h3>
            <div className="row">
              {listaFilmesCartaz.slice(0, 3).map((filme) => {
                return (
                  <div className="card">
                    <a href="#" onClick={handleOpen}>
                      <img src="" width="300px" />
                      <h2 id="movie">{filme.title}</h2>
                      <h4 id="lancamento"> date: {filme.release_date}</h4>
                      <h4 id="id"> id: {filme.id}</h4>
                    </a>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="top-rated">
            <h3 className="h3-top">Melhores Classificados</h3>
            <div className="row">
              {listaFilmesTopRated.slice(0, 5).map((filme) => {
                return (
                  <div className="card">
                    <a href="#" onClick={handleOpen}>
                      <img src="" width="300px" />
                      <h2 id="movie">{filme.title}</h2>
                      <h4 id="lancamento">{filme.release_date}</h4>
                    </a>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </main>
      <Details open={open} handleClose={handleClose} />
    </div>
  );
}

export default Home;
