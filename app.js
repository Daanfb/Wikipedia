const url =
  'https://es.wikipedia.org/w/api.php?action=query&list=search&srlimit=20&format=json&origin=*&srsearch=';

const formDOM = document.querySelector('.form');
const inputDOM = document.querySelector('.form-input');
const resultsDOM = document.querySelector('.results');

formDOM.addEventListener('submit', (e) => {
  e.preventDefault();
  const value = inputDOM.value;
  if (!value) {
    resultsDOM.innerHTML =
      '<div class="error"> Por favor, inserte un término válido.</div>';
    return;
  }
  fetchPages(value);
});

const fetchPages = async (searchValue) => {
  resultsDOM.innerHTML = '<div class="loading"></div>';
  try {
    const response = await fetch(`${url}${searchValue}`);
    const data = await response.json();
    const results = data.query.search;
    if (results.length < 1) {
      resultsDOM.innerHTML =
        '<div class="error">No se han encontrado resultados. Inténtelo de nuevo.</div>';
      return;
    }
    renderResults(results);
  } catch (error) {
    resultsDOM.innerHTML = '<div class="error"> Parece que hubo un error</div>';
  }
};

const renderResults = (list) => {
  const cardsList = list
    .map((item) => {
      const { title, snippet, pageid } = item;
      return `<a href=http://es.wikipedia.org/?curid=${pageid} target="_blank">
            <h4>${title}</h4>
            <p>
              ${snippet}
            </p>
          </a>`;
    })
    .join('');
  resultsDOM.innerHTML = `<div class="articles">
          ${cardsList}
        </div>`;
};
