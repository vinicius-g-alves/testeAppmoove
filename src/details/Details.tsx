import { Modal } from "@mui/material";

function Details(props:any) {
  return (
    <Modal open={props.open} onClose={props.handleClose}>
      <div>
        <header>
          <a href="index.html">
            <h1>Vinicius Alves</h1>
          </a>

          <nav>
            <ul className="list">
              <li>
                <i className="fa-solid fa-magnifying-glass"></i> Pesquisa
              </li>

              <li>
                <i className="fa-solid fa-arrow-down-wide-short"></i> Filtros
              </li>
            </ul>
          </nav>
        </header>

        <main>
          <img src="" width="600px" className="img-detalhes" />
          <ul className="list-detalhes">
            <li className="list-name" id="movie"></li>
            <li className="list-star">
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
            </li>
            <li className="list-sinopse" id="description"></li>
            <li className="list-elenco">
              Elenco: Sonia Braga, Udo Kier, Bárbara Colen, Thomás Aquino,
              Silvero Pereira, Wilson Rabelo, Carlos Francisco, Karine Teles,
              Antonio Saboia, Rubens Santos, Luciana Souza, Eduarda Samara, Lia
              de Itamaracá, Jonny Mars, Alli Willow, James Turpin, Julia Marie
              Peterson, Charles Hodges, Chris Doubek, Brian Townes, Rodger
              Rogério, Jr. Black, Zoraide Coleto, Jamila Facury, Ingrid
              Trigueiro, Edilson Silva, Thardelly Lima, Buda Lira, Fabiola
              Liper, Marcio Fecher, Val Junior, Uirá dos Reis, Valmir do Coco,
              Suzy Lopes, Clebia Sousa, Danny Barbosa
            </li>
            <li className="list-data">
              Data de Lançamento: <span id="lancamento"></span>
            </li>
          </ul>
        </main>
      </div>
    </Modal>
  );
}

export default Details;
