//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  episodeList.forEach((episode) => {
    const card = document.getElementById("tv-shows").content.cloneNode(true);

    card.querySelector("h2").textContent = `${episode.name} - S${String(
      episode.season
    ).padStart(2, 0)}E${String(episode.number).padStart(2, 0)}`;
    card.querySelector("img").src = episode.image.medium;
    card.querySelector("p").innerHTML = episode.summary;

    rootElem.appendChild(card);

    return card;
  });
}


window.onload = setup;
