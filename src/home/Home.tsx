import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import Details from "../details/Details";
import { Filme } from "../types/types";
import "./style.css";

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
  // aaaaa
  // Arrays de Filme
  const [listaFilmesCartaz, setlistaFilmesCartaz] = useState<Filme[]>([]);
  // const [listaFilmesTopRated, setlistaFilmesTopRated] = useState<Filme[]>([]);
  const [pesquisa, setPesquisa] = useState<Filme[]>([]);
  // const [pesquisaTopRated, setPesquisaTopRated] = useState<Filme[]>([]);
  const [listaFilmesTopRated, setListaFilmesTopRated] = useState<Filme[]>([]);

  // States Filme
  const [dataResponse, setDataResponse] = useState<Filme>(filmeInicio);

  // States String
  const [filmePesquisado, setFilmePesquisado] = useState<string>("");
  const [dataPesquisada, setDataPesquisada] = useState<string>("");

  // States Boolean
  const [open, setOpen] = useState<boolean>(false);
  const [confirmClick, setConfirmClick] = useState<boolean>(true);

  //states de ordem
  // const [order, setOrder] useState<Filme>();
  // const [cardOrder, setCardOrder] useState();


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
        // setlistaFilmesTopRated(response.data.results);
        setListaFilmesTopRated(response.data.results);
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

  // function order() {
  //   listaFilmesTopRated.sort((a: Filme, b: Filme) => a.vote_count < b.vote_count? 1:-1)
  // }

  let ListaAnos = [];
  function dateSearch() {
    listaFilmesTopRated.map((film) => {
      ListaAnos.push(film);
    });
  }

  // Abre e fecha modal detals

  function handleOpen(filme: Filme) {
    setOpen(true);
    setDataResponse(filme);
    setPesquisa([]);
  }

  const handleClose = () => setOpen(false);

  const getText = (event: any) => {
    setFilmePesquisado(event.target.value);
  };

  const getDate = (event: any) => {
    setDataPesquisada(event.target.value);
  };


  let cont = 0;
  let contTopRated = 0;

  useEffect(() => {
    getMoviePost();
    getTopRatedMovies();
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
                cont += 1;
                if (cont < 4) {
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
                }
              })}
            </div>
          </section>

          <section className="top-rated">
            <h3 className="h3-top">Melhores Classificados</h3>
            {/* <button onClick={maiorMenor(listaFilmesTopRated)}></button> */}
            <div className="h3-top">
              <input
                className="input-search-year"
                type="number"
                placeholder="Pesquisar por ano..."
                id="searchData"
                value={dataPesquisada}
                onChange={getDate}
              />

              {/* <button onClick={() => order()} > Ordenar </button> */}
              {/* <button onClick={() => dateSearch()}>Pesquisar</button> */}
            </div>
            <div className="row">
              {listaFilmesTopRated.map((filme) => {
                contTopRated += 1;
                // if (contTopRated < 6) {
                // }
                if (dataPesquisada == filme.release_date.substring(0, 4)) {
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
                } else if (dataPesquisada == "") {
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
                }
              })}
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
