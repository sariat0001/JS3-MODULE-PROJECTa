//You can edit ALL of the code here
const searchInput = document.querySelector("#input-search");
let search = '';
const dropDown = document.querySelector('#dropDown');

function dropDownSelect(){
  const selectAll = document.createElement('option');
  selectAll.textContent = "Select all"
  dropDown.appendChild(selectAll);

  const selectNone = document.createElement("option");
  selectNone.textContent = "None...";
  dropDown.appendChild(selectNone);

  getAllEpisodes().forEach((episodes) => {
    const option = document.createElement("option");
    // option.textContent = episodes.name;
    option.textContent = `S${String(episodes.season).padStart(2, 0)}E${String(
      episodes.number
    ).padStart(2, 0)} - ${episodes.name}`;
    dropDown.appendChild(option);
  })
}
dropDownSelect();

dropDown.addEventListener("change", function(e) {
  const selectOption = getAllEpisodes().filter(
    (episode) =>
      `S${String(episode.season).padStart(2, 0)}E${String(
        episode.number
      ).padStart(2, 0)} - ${episode.name}` === e.target.value
  );
  removeCards();
  render(selectOption);
  const count = document.getElementById('count');
  count.textContent = 'Displaying 1/73 episodes';
  if (e.target.value === 'None...'){
    count.textContent = "Displaying 0/73 episodes";
  }
  else if (e.target.value === 'Select all'){
    render(getAllEpisodes());
    count.textContent = "Displaying 73/73 episodes";
  }
});

function removeCards(){
  const cards = document.querySelectorAll('#card');
  cards.forEach((card) => {
    card.remove();
  })
}

function setup() {
  const allEpisodes = getAllEpisodes();
  render(allEpisodes);
}

function makePageForEpisodes(episode) {
  const rootElem = document.getElementById("root");
  const card = document.getElementById("tv-shows").content.cloneNode(true);
  card.querySelector("h2").textContent = `${episode.name} - S${String(
    episode.season
  ).padStart(2, 0)}E${String(episode.number).padStart(2, 0)}`;

  card.querySelector("img").src = episode.image.medium;
  card.querySelector("p").innerHTML = episode.summary;

  rootElem.appendChild(card);

  return card;
}

function render(episodes){
  const rootElem = document.getElementById("root");
  episodes.forEach((episode) => {
    const episodeCard = makePageForEpisodes(episode);
    rootElem.appendChild(episodeCard);
  })
}

function searchEpisodes(){
  search = searchInput.value.toLowerCase();

  const filteredSearch = getAllEpisodes().filter(
    (episode) =>
      episode.name.toLowerCase().includes(search) ||
      episode.summary.toLowerCase().includes(search)
  );

  removeCards();
  render(filteredSearch);
  const count = document.getElementById("count");
  count.textContent = `Displaying ${filteredSearch.length}/73 episodes`;
}

searchInput.addEventListener('input', searchEpisodes);


window.onload = setup;
