import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import Details from "../details/Details";
import { Filme } from "../types/types";
import "./style.css";
import { Button, Card } from "react-bootstrap";

function Home() {
  const filmeInicio: Filme = {
    id: 0,
    original_title: "",
    overview: "",
    poster_path: "",
    release_date: "",
    title: "",
    vote_count: 0,
  };
  // Arrays de Filme
  const [listaFilmesCartaz, setlistaFilmesCartaz] = useState<Filme[]>([]);
  const [listaFilmesTopRated, setlistaFilmesTopRated] = useState<Filme[]>([]);
  const [pesquisa, setPesquisa] = useState<Filme[]>([]);

  // States Filme
  const [dataResponse, setDataResponse] = useState<Filme>(filmeInicio);

  // States String
  const [filmePesquisado, setFilmePesquisado] = useState<string>("");
  const [dataPesquisada, setDataPesquisada] = useState<string>("");

  // States Boolean
  const [open, setOpen] = useState<boolean>(false);
  const [confirmClick, setConfirmClick] = useState<boolean>(true);

  function getMoviePost() {
    axios
      .get(
        "https://api.themoviedb.org/3/movie/upcoming?api_key=8238e0429d265d4d18abf1b53a68e7cb&language=pt-BR&page=1"
      )
      .then((response: AxiosResponse<any>) => {
        setlistaFilmesCartaz(response.data.results);
      })
      .catch((error: AxiosError) => {
        console.error(error);
      });
  }

  function getTopRatedMovies() {
    axios
      .get(
        "https://api.themoviedb.org/3/movie/top_rated?api_key=8238e0429d265d4d18abf1b53a68e7cb&language=pt-BR&page=1&"
      )
      .then((response: AxiosResponse<any>) => {
        setlistaFilmesTopRated(response.data.results);
      })
      .catch((error: AxiosError) => {
        console.error(error);
      });
  }
  // aaaaaa

  function getMovieSearch() {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=8238e0429d265d4d18abf1b53a68e7cb&language=pt-BR&query=${filmePesquisado}&page=1&include_adult=false`
      )
      .then((response: AxiosResponse<any>) => {
        setPesquisa(response.data.results);
      })
      .catch((error: AxiosError) => {
        console.error(error);
      });
  }

  function dateSearch() {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=8238e0429d265d4d18abf1b53a68e7cb&language=pt-BR&query=%22%22&page=1&include_adult=false&year=${dataPesquisada}`
      )
      .then((response: AxiosResponse<any>) => {
        setlistaFilmesTopRated(response.data.results);
      })
      .catch((error: AxiosError) => {
        console.error(error);
      });
  }

  // Abre e fecha modal detals

  function handleOpen(filme: Filme) {
    setOpen(true);
    setDataResponse(filme);
  }

  const handleClose = () => setOpen(false);

  const getText = (event: any) => {
    setFilmePesquisado(event.target.value);
  };

  const getDate = (event: any) => {
    setDataPesquisada(event.target.value);
  };

  useEffect(() => {
    getMoviePost();
    getTopRatedMovies();
    dateSearch();
  }, []);

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
              onChange={getText}
              placeholder="Pesquisar..."
            />
            <button onClick={() => getMovieSearch()}>Pesquisar</button>
          </div>
        </div>

        <nav>
          <ul className="menu">
            <li>
              <i className="fa-solid fa-bars"></i>menu
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <ul className="pesquisa">
          {pesquisa.map((filme) => {
            return (
              <li className="li-resull-pesquisa">
                <a href="#" onClick={() => handleOpen(filme)}>
                  {filme.title}
                  <div className="invisible-search-elements">
                    {filme.overview}
                    {filme.release_date}
                  </div>
                </a>
              </li>
            );
          })}
        </ul>

        <div className="sections">
          <section className="cartaz">
            <h3 className="h3-cartaz">Em Cartaz Agora</h3>
            <div className="row">
              {listaFilmesCartaz.map((filme) => {
                // console.log("filme.poster_path", filme.poster_path);
                return (
                  <div className="card-movie" key={filme.id}>
                    <Card style={{ width: "18rem" }}>
                      <a href="#" onClick={() => handleOpen(filme)}>
                        <Card.Img
                          variant="top"
                          src={`https://image.tmdb.org/t/p/w300/${filme.poster_path}`}
                        />
                        <Card.Body>
                          <Card.Title>{filme.title}</Card.Title>
                          <Card.Text>{filme.release_date}</Card.Text>
                        </Card.Body>
                      </a>
                    </Card>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="top-rated">
            <h3 className="h3-top">Melhores Classificados</h3>
            <div>
              <input
                type="number"
                placeholder="Pesquisar por ano..."
                id="searchData"
                value={dataPesquisada}
                onChange={getDate}/>

              <button onClick={() => dateSearch()}>Pesquisar</button>
            </div>
          </section>

          <section className="credits">
            All credits for <a href="https://www.themoviedb.org/">TMDB API</a>
          </section>
        </div>
      </main>
      <Details
        open={open}
        dataResponse={dataResponse}
        handleOpen={handleOpen}
        handleClose={handleClose}
      />
    </div>
  );
}

export default Home;
