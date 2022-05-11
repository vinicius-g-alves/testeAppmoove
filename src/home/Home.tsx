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
  const [listaFilmesCartaz, setlistaFilmesCartaz] = useState<Filme[]>([]);
  const [listaFilmesTopRated, setlistaFilmesTopRated] = useState<Filme[]>([]);
  const [filmePesquisado, setFilmePesquisado] = useState<string>("");
  const [resultadoPesquisa, setResultadoPesquisa] = useState<Filme[]>([]);
  const [passaFilme, setPassaFilme] = useState<Filme>(filmeInicio);
  const [open, setOpen] = useState<boolean>(false);
  // filtro de datas
  const [dataPesquisada, setDataPesquisada] = useState<string>("");
  const [resultadoData, setResultadoData] = useState<Filme[]>([]);
  //ordenar por votos
  const [votos, setVotos] = useState<string>("");
  const [resultadoVotos, setResultadoVotos] = useState<Filme[]>([]);

  function getFilmesCartaz() {
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

  function getTopRated() {
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

  function pesquisa() {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=8238e0429d265d4d18abf1b53a68e7cb&language=pt-BR&query=${filmePesquisado}&page=1&include_adult=false`
      )
      .then((response: AxiosResponse<any>) => {
        setResultadoPesquisa(response.data.results);
      })
      .catch((error: AxiosError) => {
        console.error(error);
      });
  }

  const pegaTexto = (event: any) => {
    setFilmePesquisado(event.target.value);
  };

  function orderByVote() {
    axios
      .get(
        "https://api.themoviedb.org/3/movie/top_rated?api_key=8238e0429d265d4d18abf1b53a68e7cb&language=pt-BR&page=1&"
      )
      .then((response: AxiosResponse<any>) => {
        setResultadoVotos(response.data.results);
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
        setResultadoData(response.data.results);
      })
      .catch((error: AxiosError) => {
        console.error(error);
      });
  }

  const getData = (event: any) => {
    setDataPesquisada(event.target.value);
  };

  useEffect(() => {
    getFilmesCartaz();
    getTopRated();
    dateSearch();
  }, []);

  // Abre e fecha modal:
  function handleOpen(filme: Filme) {
    setOpen(true);
    setPassaFilme(filme);
  }
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
          <ul className="menu">
            <li>
              <i className="fa-solid fa-bars"></i>menu
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <ul className="pesquisa">
          {resultadoPesquisa.slice(0, 3).map((filme) => {
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
              {listaFilmesCartaz.slice(0, 3).map((filme) => {
                console.log("filme.poster_path", filme.poster_path)
                return (
                  // <div className="card">
                  //   <a href="#" onClick={() => handleOpen(filme)}>
                  //     <img src="" width="300px" />
                  //     <h2 id="movie">{filme.title}</h2>
                  //     <h4 id="lancamento"> date: {filme.release_date}</h4>
                  //     <h4 id="id"> id: {filme.id}</h4>
                  //   </a>
                  // </div>

                  // https://image.tmdb.org/t/p/w500/wwemzKWzjKYJFfCeiB57q3r4Bcm.png
                  <div>
                    <Card style={{ width: "18rem" }}>
                      <a href="" onClick={() => handleOpen(filme)}>
                        <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w300/${filme.poster_path}`} />
                        <Card.Body>
                          <Card.Title>{filme.title}</Card.Title>
                          <Card.Text>{filme.release_date}</Card.Text>
                          <Button variant="primary">Veja!</Button>
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
            <div className="h3-top">
              <input
                type="number"
                id="searchData"
                value={dataPesquisada}
                onChange={getData}
                placeholder="Pesquisar por ano..."
              />
              <button onClick={() => dateSearch()}>Pesquisar</button>

              <button
                onClick={() => {
                  listaFilmesTopRated.sort();
                }}
              >
                Ordenar p/ mais votos
              </button>
            </div>

            <div className="row">
              {listaFilmesTopRated.map((filme) => {
                if (dataPesquisada == filme.release_date.substring(0, 4)) {
                  return (
                    <div className="card">
                      <a href="#" onClick={() => handleOpen(filme)}>
                        <img src="" width="300px" />
                        <h2 id="movie">{filme.title}</h2>
                        <h4 id="lancamento">{filme.release_date}</h4>
                        <h4 id="lancamento">{filme.vote_count}</h4>
                      </a>
                    </div>
                  );
                }
              })}

              {listaFilmesTopRated.map((filme_geral) => {
                if (dataPesquisada == "") {
                  return (
                    <div className="card">
                      <a href="#" onClick={() => handleOpen(filme_geral)}>
                        <img src="" width="300px" />
                        <h2 id="movie">{filme_geral.title}</h2>
                        <h4 id="lancamento">{filme_geral.release_date}</h4>
                        <h4 id="lancamento">
                          {" "}
                          votos: {filme_geral.vote_count}
                        </h4>
                      </a>
                    </div>
                  );
                }
              })}

              {/* {listaFilmesTopRated.map((filme_votado) => {
                return (

                  <div className="card">
                    <a href="#" onClick={() => handleOpen(filme_votado)}>
                      <img src="" width="300px" />
                      <h2 id="movie">{filme_votado.title}</h2>
                      <h4 id="lancamento">{filme_votado.release_date}</h4>
                      <h4 id="lancamento"> votos: {filme_votado.vote_count}</h4>
                    </a>
                  </div>
                );
              })} */}
            </div>
          </section>

          <section className="credits">
            All credits for <a href="https://www.themoviedb.org/">TMDB API</a>
          </section>
        </div>
      </main>
      <Details
        open={open}
        handleClose={handleClose}
        passaFilme={passaFilme}
        handleOpen={handleOpen}
      />
    </div>
  );
}

export default Home;
