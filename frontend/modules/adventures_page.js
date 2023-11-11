
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const searchParams = new URLSearchParams(search);
  // console.log(searchParams);  
  const cityParam = searchParams.get('city');
  console.log(cityParam);
  return cityParam;

}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  const cityURL = `${config.backendEndpoint}/adventures/?city=${city}`;
  try {
    let response = await fetch(cityURL);

    let cityData = await response.json();
    // console.log(cityData);
    return cityData;
    
  } catch (error) {
    return null;
  }

}

function addAdventureToDOM(adventures) {
//Implementation of DOM manipulation to add adventures for the given city from list of adventures
for (let i = 0; i < adventures.length; i++) {
  const cardContainer = document.createElement("div");
  cardContainer.className = "col-sm-12 col-md-6 col-lg-3 mt-3 position-relative";

  const cardHTML = `
    <a id="${adventures[i].id}" href="detail/?adventure=${adventures[i].id}">
      <div class="activity-card">
        <div class="position-absolute category-banner">${adventures[i].category}</div>
        <img class="activity-card-image" src="${adventures[i].image}" alt="City Image Broken">
        <div class="activity-card-text text-md-center w-100 mt-3 px-2">
          <div class="d-block d-md-flex justify-content-between flex-wrap pl-3 pr-3">
            <p class="text-left">${adventures[i].name}</p>
            <p class="">₹${adventures[i].costPerHead}</p>
          </div>
          <div class="d-block d-md-flex justify-content-between flex-wrap pl-3 pr-3">
            <p class="text-left">Duration</p>
            <p class="">${adventures[i].duration}</p>
          </div>
        </div>
      </div>
    </a>
  `;

  cardContainer.innerHTML = cardHTML;
  document.getElementById("data").append(cardContainer);
  // console.log(cardContainer);
}
}
//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  const filteredList = list.filter(ele => ele.duration > low && ele.duration <= high);
  console.log(filteredList);
  return filteredList;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  const filteredList = list.filter(elements => categoryList.includes(elements.category))
  console.log(filteredList);
  return filteredList;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
 let filterList = [];
 if(filters["duration"] && filters["category"].length > 0){

  let choice = filters["duration"].split("-");
  filterList = filterByDuration(
    list, 
    parseInt(choice[0]),  
    parseInt(choice[1])  
  );
  filterList = filterByCategory(filterList, filters["category"]);

} else if(filters["duration"]) {

  let choice = filters["duration"].split("-");
  filterList = filterByDuration(
    list, 
    parseInt(choice[0]), 
    parseInt(choice[1])
  );
 
} else if (filters["category"].length > 0) {
 
  filterList = filterByCategory(list, filters["category"]);
 
} else {
   filterList = list;
}
  return filterList;
  // Place holder for functionality to work in the Stubs
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem("filters", JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object

  return JSON.parse(localStorage.getItem("filters"));
  // Place holder for functionality to work in the Stubs
  // return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  document.getElementById("duration-select").value = filters.duration;

  filters["category"].forEach((element) => {
    let pillsContainer = document.createElement("div");
    pillsContainer.className = "category-filter"
    pillsContainer.innerHTML = `<div>${element}</div>`
  document.getElementById("category-list").appendChild(pillsContainer);
  })

}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
