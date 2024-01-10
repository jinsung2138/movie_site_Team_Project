const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNDMyODU0ZGE2MmJhOTkzMDY4MzY0M2JmMDdhNDE0YyIsInN1YiI6IjY1OWE0ZDQwMGQxMWYyMDIwMmVhZjc4NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gblV3BT0YUlUmar9z9Bi8YILJ5_16K9ktTGSfG0zts4',
  },
};
const url = 'https://api.themoviedb.org/3/movie/top_rated?language=en-ko-KR';
fetch(url, options)
  .then((response) => response.json())
  .then((data) => {
    // 받아온 데이터 화면에 출력.
    let movieData = data.results;
    let movieCardsWrap = document.querySelector('.movie_cards_wrap');
    movieCardsWrap.innerHTML = '';

    movieData.forEach((element) => {
      let _title = element.title;
      let _overview = element.overview;
      let _poster_path = element.poster_path;
      let _vote_average = element.vote_average.toFixed(2);
      let _id = element.id;

      let temp_html = `
      <div class="movie_cards" data-id="${_id}">
      <img src="https://image.tmdb.org/t/p/w500${_poster_path}" alt="영화 포스터 이미지" id="poster_img">
      <h1 id="movie_title">${_title}</h1>
      <strong id="movie_score">평점: ${_vote_average}</strong>
      <p id="movie_overview">${_overview}</p>
    </div>
    `;
      movieCardsWrap.innerHTML += temp_html;
    });
    idAlert();
  })
  .catch((err) => {
    console.error('에러 발생', error);
  });

// 카드 클릭 시 해당 카드의 영화 id alert창 띄우기.
function idAlert() {
  let movieCards = document.querySelectorAll('.movie_cards');
  movieCards.forEach((card) => {
    card.addEventListener('click', function () {
      let moviesId = this.getAttribute('data-id');
      alert(`영화 id: ${moviesId}`);
    });
  });
}
// 영화 검색 기능
function movieSearch() {
  let searchInput = document.querySelector('#movie_search').value;
  let url = `https://api.themoviedb.org/3/search/movie?query=${searchInput}&language=en-US&page=1&include_adult=false`;
  let movieCardsWrap = document.querySelector('.movie_cards_wrap');
  movieCardsWrap.innerHTML = '';
  fetch(url, options)
    .then((res) => res.json())
    .then((data) => {
      let moveData = data.results;
      let movieContent = moveData
        .map((moveData) => {
          let _title = moveData.title;
          let _overview = moveData.overview;
          let _poster_path = moveData.poster_path;
          let _vote_average = moveData.vote_average.toFixed(2);
          let _id = moveData.id;

          return `
        <div class="movie_cards" data-id="${_id}">
        <img src="https://image.tmdb.org/t/p/w500${_poster_path}" alt="영화 포스터 이미지" id="poster_img">
        <h1 id="movie_title">${_title}</h1>
        <strong id="movie_score">평점: ${_vote_average}</strong>
        <p id="movie_overview">${_overview}</p>
      </div>
      `;
        })
        .join('');
      movieCardsWrap.innerHTML = movieContent;
      idAlert();
    })
    .catch((error) => {
      console.error('에러 발생:', error);
    });
}
