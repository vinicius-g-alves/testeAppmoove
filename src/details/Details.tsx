import { Modal } from "@mui/material";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";
import { Filme } from "../types/types";

function Details(props: any) {
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

  return (
    <Modal className="modal" open={props.open} onClose={props.handleClose}>
      <div>
        <main>
          <div className="details">
            <div className="img-details">
              <img src="" alt="" />
            </div>
            <ul className="movie-data">
              <li className="list-name">Nome</li>
              <li className="list-sinopse">Sinopse</li>
              <li className="list-data">Data de Lançamento:</li>
              <li className="list-elenco">Elenco:</li>
            </ul>
          </div>
        </main>
      </div>
    </Modal>
  );
}

export default Details;
