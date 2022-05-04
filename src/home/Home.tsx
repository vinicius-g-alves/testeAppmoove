import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Filme } from "../types/types";
import "./style.css";

function Home() {
  const [listaFilmes, setListaFilmes] = useState<Filme[]>([]);
  // const [listaImages, setListaImages] = useState<string[]>([]);

  function tituloApi() {
    axios
      .get(
        "https://api.themoviedb.org/3/movie/upcoming?api_key=8238e0429d265d4d18abf1b53a68e7cb&language=pt-BR&page=1"
      )
      .then((response: AxiosResponse<any>) => {
        setListaFilmes(response.data.results);
        console.log(response.data.results);
        // const foto = Buffer.from(response.data.results.poster_path, "base64")
        // const buffer = Buffer.from(response.data, 'base64');
      })
      .catch((error: AxiosError) => {
        console.error(error);
      });
  }

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
    tituloApi();
  }, []);

  return (
    <div>
      <header>
        <a href="index.html">
          <h1>Vinicius Alves</h1>
        </a>

        <input type="text" id="search" />

        <nav>
          <ul className="list">
            <li>
              <i className="fa-solid fa-arrow-down-wide-short"></i> Filtros
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <section className="cartaz">
          <h3>Em Cartaz Agora</h3>
          <div className="row">
            {listaFilmes.slice(0, 3).map((filme) => {
              return (
                <div className="card">
                  <a href="#">
                    <img
                      src=""
                      width="300px"
                    />
                    <h2 id="movie">{filme.title}</h2>
                    <h4 id="lancamento">{filme.release_date}</h4>
                  </a>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;
