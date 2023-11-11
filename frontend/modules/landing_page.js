import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  if (cities) {
    cities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  }
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  const URL =`${config.backendEndpoint}/cities` // <= how can i use this
   try {
    let response = await fetch(URL);
    let data = await response.json();
    console.log(data);
    return data;

  } catch (error) {
    return null
  } 
}



//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let cardContainer = document.createElement("section"); 
  cardContainer.className ="class=col-sm-12 col-md-6 col-lg-3 mt-3"
  let cardInnerHtml = `
    <a id=${id} href="./pages/adventures/?city=${id}" />
      <div class="tile">
        <div class="tile-text">
          <h5 class="card-title">${city}</h5>
          <p class="card-text">${description}</p>
        </div>
        <img src=${image} alt="City Image Broken">
      </div>
    </a>
  `;
  cardContainer.innerHTML = cardInnerHtml;
  document.getElementById("data").append(cardContainer);
  console.log(cardContainer);

}

export { init, fetchCities, addCityToDOM };
