/** @format */
const container = document.querySelector('.container-grid-div');
const triggerTabList = document.querySelectorAll('#myTab button');
const form = document.querySelector('form');

let startView = window.matchMedia('(min-width: 1401px)');
let firstView = window.matchMedia('(min-width: 735px) and (max-width: 1400px)');
let secondView = window.matchMedia('(min-width: 616px) and (max-width: 734px)');
let ThirdView = window.matchMedia('(max-width: 615px)');

let data;
let currentCourseButton = 'Python';
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
let carouselTop = () => {
  let str = '';
  str += `<div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner">`;
  return str;
};
let carouselBottom = () => {
  let str = '';
  str += `
  </div>
    <button class="carousel-control-prev " type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>`;
  return str;
};
let fillTemp = (i, checked) => {
  let str = '';
  str += `
          <figure class="container-item ">
            <a href="${i.link}">
              <img src=${i.image}  alt=${i.title} class="conainer-img"/>
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
          </figure>
        `;
  return str;
};

const loadPosts = async (courseName, cols) => {
  let uri = `http://localhost:3000/${courseName}`;

  const res = await fetch(uri);
  const jsonFile = await res.json();
  data = jsonFile;

  let template = '',
    y = 0,
    active = '',
    closed = true;
  template += carouselTop();
  for (i of jsonFile) {
    if (y % cols == 0) {
      if (y == 0) active = 'active';
      else active = '';
      template += `
      <div class="carousel-item ${active}">
        <div class="row">
        `;
    }
    closed = false;
    let checked = checkedOrNot(i);
    template += fillTemp(i, checked, y);
    y += 1;
    if (y % cols == 0) {
      template += `
      </div>
    </div>
        `;
      closed = true;
    }
  }
  if (!closed) {
    template += `
    </div>
  </div>
      `;
  }
  template += carouselBottom();
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

var lastevent = '';
// Courses
triggerTabList.forEach((triggerEl) => {
  const tabTrigger = new bootstrap.Tab(triggerEl);

  triggerEl.addEventListener('click', (event) => {
    event.preventDefault();
    tabTrigger.show();
    if (lastevent != '') lastevent.classList.remove('table-active');
    lastevent = event.target;
    event.target.classList.add('table-active');
    if (event.target.id == 'Python-tab') {
      currentCourseButton = 'python';
    } else if (event.target.id == 'AWS-Certificate-tab') {
      currentCourseButton = 'aws-res';
    }
    mediaQueryResponsiveDesign();
  });
});

const mediaQueryResponsiveDesign = async () => {
  if (startView.matches) {
    loadPosts(currentCourseButton, 5);
  } else if (firstView.matches) {
    loadPosts(currentCourseButton, 4);
  } else if (secondView.matches) {
    loadPosts(currentCourseButton, 3);
  } else {
    loadPosts(currentCourseButton, 2);
  }
};

mediaQueryResponsiveDesign();

// Call listener function at run time
// Views for Respective Design
startView.addListener(() => {
  mediaQueryResponsiveDesign();
});
firstView.addListener(() => {
  mediaQueryResponsiveDesign();
});
secondView.addListener(() => {
  mediaQueryResponsiveDesign();
});
ThirdView.addListener(() => {
  mediaQueryResponsiveDesign();
});

form.addEventListener('submit', postsFilter);
window.addEventListener('DOMContentLoaded', () => {
  mediaQueryResponsiveDesign();
});
