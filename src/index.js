let addBtn = document.querySelector("#new-toy-btn");
const toyForm = document.querySelector('.container');
const toyUrl = 'https://localhost:300/toys'
let addToy = false;
let divCollect = document.querySelector('#toy-collection');

const getToys = () => {
  return fetch(toyUrl)
    .then(res => res.json)
};

const postToy = (toy_data) => {
  fetch(toyUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      'name': toy_data.name.value,
      'likes': 0
    })
  })
    .then(res => res.json())
    .then((obj_toy) => {
      let new_toy = renderToys(obj_toy)
      divCollect.append(new_toy)
    })
}

const likes = (e) => {
  e.preventDefault()
  let more = parseInt(e.target.previousElementSibling.innerText) + 1

  fetch(`toyUrl/${e.target.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      'likes': more
    })
  })
  .then(res => res.json())
  .then((like_obj => {
    e.target.previousElementSibling.innerText = `${more} likes`;
  }))
};

const renderToys = (toy) => {
  let h2 = document.createElement('h2');
  let img = document.createElement('img');
  let p = document.createElement('p');
  let btn = document.createElement('btn');
  let divCard = document.createElement('d');

  h2.innerText = toy.name;

  img.setAttribute('src', toy.image);
  img.setAttribute('class', 'toy-avatar');

  p.innerText = `${toy.likes} likes`;

  btn.setAttribute('class', 'like-btn');
  btn.setAttribute('id', toy.id);
  btn.innerText = 'like';
  btn.addEventListener('click', (e) => {
    console.log(e.target.dataset);
    likes(e);
  });

  divCard.setAttribute('class', 'card');
  divCard.append(h2, img, p, btn);
  divCollect.append(divCard);
};

addBtn.addEventListener('click', () => {
  addToy != addToy
  if (addToy) {
    toyForm.style.display = 'block';
    toyForm.addEventListener('submit', event => {
      event.preventDefault();
      postToy(event.target);
    })
  } else {
    toyForm.style.display = 'none';
  }
});

getToys().then(toys => {
  toys.forEach(toy => {
    renderToys(toy);
  });
});
// document.addEventListener("DOMContentLoaded", () => {
//   const addBtn = document.querySelector("#new-toy-btn");
//   const toyFormContainer = document.querySelector(".container");
//   addBtn.addEventListener("click", () => {
//     // hide & seek with the form
//     addToy = !addToy;
//     if (addToy) {
//       toyFormContainer.style.display = "block";
//     } else {
//       toyFormContainer.style.display = "none";
//     }
//   });
// });
