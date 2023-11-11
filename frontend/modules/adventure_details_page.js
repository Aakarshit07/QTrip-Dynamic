import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  const searchParams = new URLSearchParams(search);
  const paramId = searchParams.get('adventure');
  // console.log(paramId);
  return paramId;


  // Place holder for functionality to work in the Stubs
  // return null;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  const adventureIdUrl = `${config.backendEndpoint}/adventures/detail?adventure=${adventureId}` 
  try {
    const response = await fetch(adventureIdUrl);
    const detailPage = await response.json();
    // console.log(detailPage);
    return detailPage;
  } catch (error) {
    return null;
  }
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  const imageArray = adventure.images;
  console.log(imageArray.length);

  /* Adding a adventure name to the  Dom */ 
  const adventureName = document.querySelector("#adventure-name")
  adventureName.textContent = `${adventure["name"]}`;
  
  /* Adding a adventure subtitle to the  Dom */ 
  const adventureSubTitle = document.querySelector("#adventure-subtitle");
  adventureSubTitle.textContent = `${adventure["subtitle"]}`;

  /* Adding a adventure Images to the  Dom */ 
  const adventureImages = document.querySelector("#photo-gallery");

  for(let imageUrl of imageArray) {
  let adventureImageContainer = document.createElement("div");
  let adventureImage = document.createElement("img");
  adventureImage.className = "activity-card-image";
  adventureImage.src = imageUrl;
  adventureImageContainer.appendChild(adventureImage);
  adventureImages.appendChild(adventureImageContainer);
  
  }

  /* Adding Adventure Content */ 
  const adventureContent = document.querySelector("#adventure-content");
  adventureContent.textContent = `${adventure["content"]}`;

}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  
  //creating an carousel main-wrapper  
  const carouselWrapper = document.createElement("div");
  carouselWrapper.id = "carousel-wrapper";
  carouselWrapper.classList.add("carousel", "slide");
  

  // creating casousel indicators container;
  const carouselIndicators = document.createElement("div");
  carouselIndicators.classList.add("carousel-indicators");
  
  // creating carousel-indicator buttons;
  for(let i = 0; i < images.length; i++){
    let indicatorButton = document.createElement("button");
    indicatorButton.type="button";
    if(i == 0){
      indicatorButton.setAttribute("data-bs-target", "#carousel-wrapper"); 
      indicatorButton.setAttribute("data-bs-slide-to", i);
      indicatorButton.className="active";
      indicatorButton.setAttribute("aria-current", true);
      indicatorButton.setAttribute("aria-label", `Slide ${i}`);
    } else {
      indicatorButton.setAttribute("data-bs-target", "#carousel-wrapper"); 
      indicatorButton.setAttribute("data-bs-slide-to", i);
      indicatorButton.setAttribute("aria-label", `Slide ${i}`);
    }
    carouselIndicators.appendChild(indicatorButton);

  }

  // Creating the images of carousel
  const carouselInner = document.createElement("div");
  carouselInner.classList = "carousel-inner";
  for(let i = 0; i < images.length; i++){

    let carouselImageContainer = document.createElement("div");

    if(i === 0){
      carouselImageContainer.classList.add("carousel-item", "active");
    } else {
      carouselImageContainer.classList.add("carousel-item");
    }

    let image  = document.createElement("img");
    image.classList.add("d-block", "w-100");

    image.src = images[i];
    
    carouselImageContainer.appendChild(image);
    carouselInner.appendChild(carouselImageContainer);
    
  }

  //Creating the carousel-control Buttons
  // control next button 
  const carouselNextButton = document.createElement("button");
  carouselNextButton.type = "button";
  carouselNextButton.className="carousel-control-next";
  carouselNextButton.setAttribute("data-bs-target", "#carousel-wrapper");
  carouselNextButton.setAttribute("data-bs-slide", "next");

  // adding next Icon;
  const controlNextIcon = document.createElement("span");
  controlNextIcon.className="carousel-control-next-icon";
  controlNextIcon.setAttribute("aria-hidden", true);
  
  //adding next Icon text 
  const nextIconText = document.createElement("span");
  nextIconText.className="visually-hidden"
  nextIconText.textContent="Next" 

  carouselNextButton.appendChild(controlNextIcon);
  carouselNextButton.appendChild(nextIconText);
  
  // control Prev button 
  const carouselPrevButton = document.createElement("button");
  carouselPrevButton.type="button";
  carouselPrevButton.className="carousel-control-prev";
  carouselPrevButton.setAttribute("data-bs-target", "#carousel-wrapper");
  carouselPrevButton.setAttribute("data-bs-slide", "prev")

  // adding next Icon;
  const controlPrevIcon = document.createElement("span");
  controlPrevIcon.className="carousel-control-prev-icon";
  controlPrevIcon.setAttribute("aria-hidden", true);
  
  //adding next Icon text 
  const pervIconText = document.createElement("span");
  pervIconText.className="visually-hidden"
  pervIconText.textContent="Previous" 

  carouselPrevButton.appendChild(controlPrevIcon);
  carouselPrevButton.appendChild(pervIconText);


  // adding all the components to main carousel wrapper;
  carouselWrapper.appendChild(carouselIndicators);
  carouselWrapper.appendChild(carouselInner);
  carouselWrapper.appendChild(carouselPrevButton);
  carouselWrapper.appendChild(carouselNextButton);

  // console.log(carouselWrapper);
  // adding the carousel into dom;
  const adventureCarouselContainer = document.querySelector("#photo-gallery");
  adventureCarouselContainer.textContent = "";
  // adventureCarouselContainer.innerHTML = "";
  adventureCarouselContainer.append(carouselWrapper);
  console.log(adventureCarouselContainer);

}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  // console.log(adventure);
  if(adventure["available"]){
    document.querySelector("#reservation-panel-sold-out").style.display = "none";
    document.querySelector("#reservation-panel-available").style.display = "block";
    document.querySelector("#reservation-person-cost").innerHTML = adventure.costPerHead;
  } else {
    document.querySelector("#reservation-panel-sold-out").style.display = "block";
    document.querySelector("#reservation-panel-available").style.display = "none";
  }

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  // console.log(adventure, persons);
  document.querySelector("#reservation-cost").textContent = adventure.costPerHead * persons;
  
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  // console.log(adventure);
  const myForm = document.querySelector("#myForm");
  myForm.addEventListener("submit", async (event) =>{
    event.preventDefault();
    let URL = `${config.backendEndpoint}/reservations/new`;
    // getting the form elements object. that has all three input feild data in it. 
    let formElements = myForm.elements;

    let formDataString = JSON.stringify({
      name: formElements["name"].value,
      date: formElements["date"].value,
      person: formElements["person"].value,
      adventure: adventure.id
    });

    try {
      let response = await fetch(URL, {
        method: "POST",
        body: formDataString,
        headers: {
          "Content-Type": "application/json",
        }
      });

      if(response.ok){
        alert("Success!");
        window.location.reload();
      } else {
        let responseData = await response.json();
        alert(`Failed - ${responseData.message}`);
      }
    } catch (error) {
      console.log(error);
      alert("Failed - fetch response result in error")
    }


  })

}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  // console.log(adventure);
  if(adventure.reserved){
    document.querySelector("#reserved-banner").style.display = "block";
  } else {
    document.querySelector("#reserved-banner").style.display = "none";
  }
  
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
