import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  const reservationsUrl = `${config.backendEndpoint}/reservations`;
  try {
    const response = await fetch(reservationsUrl);
    const reservationData = await response.json();
    // console.log(response);
    return reservationData;
  } catch (error) {
    return null;
  }
}

// cancel reservation
// const cancelReservation = (key) => {
// };
// let table = document.querySelector(".table");
// table.addEventListener("click", (event) => {
//   if(event.target.className === "reservation-cancel-button") {
//     cancelReservation(e.target.id);
//   }
// });


//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table
  console.log(reservations);
  const reservationTable = document.querySelector("#reservation-table-parent");
  const reservationBanner = document.querySelector("#no-reservation-banner");
  
  if(reservations.length > 0){
    reservationBanner.style.display = "none"
    reservationTable.style.display = "block";
  } else {
    reservationBanner.style.display = "block"
    reservationTable.style.display = "none";
  }
  //Conditionally render the no-reservation-banner and reservation-table-parent
  reservations.forEach((element, index) => {
    let myDatePart = new Date(element.time).toLocaleTimeString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    });
    let resultDate = myDatePart.split(" at");
    resultDate = resultDate.join();
    let tableRow = document.createElement("tr");
    tableRow.innerHTML = `
      <td scope="row" >${element.id}</td>
      <td>${element.name}</td>
      <td>${element.adventureName}</td>
      <td>${element.person}</td>
      <td>${new Date(element.date).toLocaleDateString("en-IN",{
      day:"numeric",
      year: "numeric",
      month: "numeric",
    })}</td>
    <td>${element.price}</td>
    <td>${resultDate}</td>
    <td id="${element.id}"><a href="../detail/?adventure=${element.adventure}">
    <div class="reservation-visit-button">Visit Adventure</div>
   </a></td>`;
  

    document.querySelector("#reservation-table").appendChild(tableRow); 
  });
  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */

}

export { fetchReservations, addReservationToTable };
