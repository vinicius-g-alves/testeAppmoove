import { Modal } from "@mui/material";

function Details(props: any) {
  return (
    <Modal className="modal" open={props.open} onClose={props.handleClose}>
      <div>
        <main>
          <div className="details">
            <img src={`https://image.tmdb.org/t/p/w500/${props.dataResponse.poster_path}`}/>
            <ul className="movie-data">
              <div className="movie-description">
                <li className="list-name">{props.dataResponse.title}</li>
                <li className="list-sinopse">
                  Sinopse:{" "}
                  <span className="description">
                    {props.dataResponse.overview}
                  </span>
                </li>
                <li className="list-data">
                  Data de Lançamento:{" "}
                  <span>{props.dataResponse.release_date}</span>
                </li>
              </div>
              {/* <li className="list-elenco">Elenco:</li>  *NÃO FOI COLOCADO POIS NÃO EXISTE NA API */}
            </ul>
          </div>
          <button className="close-modal" onClick={props.handleClose}>
            Home
          </button>
        </main>
      </div>
    </Modal>
  );
}

export default Details;
