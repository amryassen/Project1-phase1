/** @format */
const container = document.querySelector('.container-grid-div');
const form = document.querySelector('form');
let data;

/**
 *
 * @param {*} i - users rating number
 * @returns array of values checked or just empty string to use it to add a class checked to make a star color = orange.
 * and empty string for not changing the color.
 */
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

/**
 *
 * @param {*} i json object
 * @param {*} checked array of values checked or just empty string to use it to add a class checked to make a star color = orange.
 * and empty string for not changing the color.
 * @returns template to render the card into UI.
 */
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
/**
 * @description - fetching the API and iteate over the json file to render it into DOM.
 */
const loadPosts = async () => {
  let uri = 'http://localhost:3000/python';

  const res = await fetch(uri);
  const jsonFile = await res.json();
  data = jsonFile;

  let template = '';
  jsonFile.forEach((i) => {
    let checked = checkedOrNot(i);
    template += fillTemp(i, checked);
  });
  container.innerHTML = template;
};
/**
 * @description - filtering posts depends on the input string in the search bar and rendering it.
 * @param {*} e - event
 */
const postsFilter = async (e) => {
  e.preventDefault();
  let input = form.input_txt.value.trim().toLowerCase();
  let template = '';
  data.forEach((i) => {
    const string = i.title.toLowerCase();
    if (string.includes(input)) {
      let checked = checkedOrNot(i);
      template += fillTemp(i, checked);
    }
  });
  container.innerHTML = template;
};

form.addEventListener('submit', postsFilter);
window.addEventListener('DOMContentLoaded', loadPosts);
