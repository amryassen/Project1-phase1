/** @format */
const container = document.querySelector('.container-grid-div');
const form = document.querySelector('form');
let data;
let checkedOrNot = (i) => {
  let checked = {};
  let nmOfStart = Math.floor(Number(i.rating));
  for (let y = 1; y <= 5; ++y) {
    if (y <= nmOfStart) {
      checked[y] = 'checked';
    } else {
      checked[y] = '';
    }
  }
  return checked;
};

let fillTemp = (i, checked) => {
  let str = '';
  str += `<figure class="container-item">
      <a href="${i.link}">
        <img src=${i.image} class="conainer-img" alt=${i.title} />
        <figcaption>
          <h3>${i.title}</h3>
        </figcaption>
        <figcaption>${i.author}</figcaption>
        <figcaption>
          <span class="checked">${i.rating}</span>
          <span class="fa fa-star ${checked[1]}"></span>
          <span class="fa fa-star ${checked[2]}"></span>
          <span class="fa fa-star ${checked[3]}"></span>
          <span class="fa fa-star ${checked[4]}"></span>
          <span class="fa fa-star ${checked[5]}"></span>
          <span>${i.people}</span>
        </figcaption>
        <figcaption><strong>${i.price}</strong></figcaption>
      </a>
    </figure>`;
  return str;
};
const loadPosts = async () => {
  let uri = 'http://localhost:3000/python';

  const res = await fetch(uri);
  const jsonFile = await res.json();
  data = jsonFile;

  let template = '';
  for (i of jsonFile) {
    let checked = checkedOrNot(i);
    template += fillTemp(i, checked);
  }
  container.innerHTML = template;
};

const postsFilter = async (e) => {
  e.preventDefault();
  let input = form.input_txt.value.trim().toLowerCase();
  let template = '';
  for (i of data) {
    const string = i.title.toLowerCase();
    if (string.includes(input)) {
      let checked = checkedOrNot(i);
      template += fillTemp(i, checked);
    }
  }
  container.innerHTML = template;
};

form.addEventListener('submit', postsFilter);
window.addEventListener('DOMContentLoaded', loadPosts);
