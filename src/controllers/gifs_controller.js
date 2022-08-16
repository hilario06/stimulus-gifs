import { Controller } from "@hotwired/stimulus";

export default class extends Controller {

  static targets = ["input", "results", "titleSearch"];

  connect() {
    console.log("movies controller connected");
    this.getGifs('popeye');
  }

  search(event) {
    event.preventDefault();
    this.resultsTarget.innerHTML = "";
    this.getGifs(this.inputTarget.value);
    this.titleSearchTarget.innerHTML = this.inputTarget.value
    this.inputTarget.value = '';
  }

  getGifs(query) {
    // const url = `https://api.giphy.com/v1/gifs/search?q=${query}&limit=10&api_key=D9203eQxvMT4uZ2Ah5Ce9Gib3wFEvpxk`;
    // const response = await fetch(url);
    // const { data } = await response.json();
    // this.insertGifs(data);
    fetch(`https://api.giphy.com/v1/gifs/search?q=${query}&limit=12&api_key=D9203eQxvMT4uZ2Ah5Ce9Gib3wFEvpxk`)
      .then(response => response.json())
      .then(data => this.insertGifs(data.data));
  }

  insertGifs(data){
    data.forEach(element => {
      const movieTag = `<div class="card">
        <img src="${element.images?.downsized_medium.url}" alt="image gif">
        <p>${element.title}</p>
      </div>`
      this.resultsTarget.insertAdjacentHTML("beforeend", movieTag)
    });
  }
}
