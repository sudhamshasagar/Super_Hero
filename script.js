// Declaring variables
let input = document.getElementById("input-tag");
let button = document.getElementById("search-button");
let characterContainer = document.getElementById("characterDescription");
let listContainer = document.querySelector(".list");

// Get the current timestamp in ms
let date = new Date();
console.log(date.getTime());

const [timestamp, apiKey, hashValue] = [ts, publicKey, hash];
// Function to display in input field
function displayWords(value) {
  input.value = value;
  removeElements();
}
// Function to remove autocomplete suggestions
function removeElements() {
  listContainer.innerHTML = "";
}
// Event listener for input
input.addEventListener("keyup", async () => {
  removeElements();
  if (input.value.length < 4) {
    return false;
  }

  // Construct the Marvel API URL for character search(Marvel Webiste, Get URL request then generate url option, it will give the url with public key)
  const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&apikey=${apiKey}&hash=${hashValue}&nameStartsWith=${input.value}`;

// Fetch data from Marvel API
  const response = await fetch(url);
  const jsonData = await response.json();

  jsonData.data["results"].forEach((result) => {
    let name = result.name;
    let div = document.createElement("div");
    div.style.cursor = "pointer";
    div.classList.add("autocomplete-items");
    div.setAttribute("onclick", "displayWords('" + name + "')");
    let word = "<b>" + name.substr(0, input.value.length) + "</b>";
    word += name.substr(input.value.length);
    div.innerHTML = `<p class="item">${word}</p>`;
    listContainer.appendChild(div);
  });
});

button.addEventListener(
  "click",
  (getRsult = async () => {
    if (input.value.trim().length < 1) {
      alert("Input cannot be blank");
    }
    characterContainer.innerHTML = "";
    const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&apikey=${apiKey}&hash=${hashValue}&name=${input.value}`;

    // Iterate through the characters and fetch request from API with await which will pause the function until JSON is loaded completely
    const response = await fetch(url);
    const jsonData = await response.json();
    jsonData.data["results"].forEach((element) => {
      characterContainer.innerHTML = `<div class="card-container">
        <div class="container-character-image">
        <img src="${
          element.thumbnail["path"] + "." + element.thumbnail["extension"]
        }"/></div>
        <div class="character-name">${element.name}</div>
        <div class="character-description">${element.description}</div>
        </div>`;
    });
  })
)
// Event listener for window load
window.onload = () => {
  getRsult();
};
