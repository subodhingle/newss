const container = document.querySelector(".container");
const optionsContainer = document.querySelector(".options-container");
const searchInput = document.querySelector("#searchInput");
const searchButton = document.querySelector("#search-button");
const loadMoreButton = document.querySelector("#load-more");

const country = "in";
const options = [
  "General",
  "Entertainment",
  "Health",
  "Science",
  "Sports",
  "Technology",
  "Environment",
  "Economy",
  "Politics",
];

let requestURL;
let currentPage = 1;
const pageSize = 10;
const likedNewsKey = 'likedNews'; // Key to store liked news in localStorage

const generateUI = (articles) => {
  for (let item of articles) {
    let card = document.createElement("div");
    card.classList.add("news-card");
    card.innerHTML = `<div class="news-image-container">
      <img src="${item.urlToImage || "./newspaper.jpg"}" alt="" />
    </div>
    <div class="news-content">
      <div class="news-title">
        ${item.title}
      </div>
      <div class="news-description">
        ${item.description || item.content || ""}
      </div>
      <div class="news-actions">
        <a href="${item.url}" target="_blank" class="view-button">Read More</a>
        <button class="like-button">
          <i class="fas fa-heart"></i> Like
        </button>
      </div>
    </div>`;
    const likeButton = card.querySelector('.like-button');
    likeButton.addEventListener('click', () => likeNews(item));
    container.appendChild(card);
  }
};

const getNews = async (url) => {
  let response = await fetch(url);
  if (!response.ok) {
    alert("Data unavailable at the moment. Please try again later");
    return false;
  }
  let data = await response.json();
  generateUI(data.articles);
};

const selectCategory = (e, category) => {
  let options = document.querySelectorAll(".option");
  options.forEach((element) => {
    element.classList.remove("active");
  });
  requestURL = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category.toLowerCase()}&pageSize=${pageSize}&apiKey=dcecf3660a1341d9bd8c655efa0b944e`;
  e.target.classList.add("active");
  currentPage = 1;
  container.innerHTML = ""; // Clear previous articles
  getNews(requestURL);
};

const loadMoreNews = () => {
  currentPage++;
  let nextPageURL = `${requestURL}&page=${currentPage}`;
  getNews(nextPageURL);
};

const searchNews = () => {
  const query = searchInput.value;
  if (query.trim() !== "") {
    requestURL = `https://newsapi.org/v2/everything?q=${query}&pageSize=${pageSize}&apiKey=dcecf3660a1341d9bd8c655efa0b944e`;
    currentPage = 1; // Reset page number for new search
    container.innerHTML = ""; // Clear previous articles
    getNews(requestURL);
  }
};

const likeNews = (item) => {
  let likedNews = JSON.parse(localStorage.getItem(likedNewsKey)) || [];
  likedNews.push(item);
  localStorage.setItem(likedNewsKey, JSON.stringify(likedNews));
  alert("News saved in profile!");
};

const init = () => {
  optionsContainer.innerHTML = "";
  createOptions();
  requestURL = `https://newsapi.org/v2/top-headlines?country=${country}&category=general&pageSize=${pageSize}&apiKey=dcecf3660a1341d9bd8c655efa0b944e`;
  getNews(requestURL);
};

const createOptions = () => {
  for (let i of options) {
    optionsContainer.innerHTML += `<button class="option ${
      i == "General" ? "active" : ""
    }" onclick="selectCategory(event,'${i}')">${i}</button>`;
  }
};

window.onload = () => {
  init();
  searchButton.addEventListener("click", searchNews);
  loadMoreButton.addEventListener("click", loadMoreNews);
};
  