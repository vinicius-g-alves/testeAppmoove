import { Modal } from "@mui/material";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";
import { Filme } from "../types/types";

function Details(props: any) {

  function getFilmeClicado() {

  }

  return (
    <Modal className="modal" open={props.open} onClose={props.handleClose}>
      <div>
        <main>
          <div className="details">

            <div className="img-details">NO IMAGE
            </div>

            <ul className="movie-data">
              <li className="list-name">Nome</li>
              <li className="list-sinopse">Sinopse: <span className="description">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex suscipit obcaecati saepe adipisci in, itaque tempora, quia, impedit harum tempore autem! Illo mollitia non quaerat amet ad impedit, doloribus perspiciatis?</span></li>
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
