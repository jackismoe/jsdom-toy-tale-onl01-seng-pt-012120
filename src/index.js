// mickey: 
// https://images-na.ssl-images-amazon.com/images/I/71AMazvRIcL._SL1500_.jpg

const toysUrl = 'http://localhost:3000/toys'

const postToy = (toy) => {
  
  fetch(toysUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
      },
    body: JSON.stringify({
      'name': toy.name.value,
      'image': toy.image.value,
      'likes': '0'
    })
  })
    .then(response => {
      return response.json()
    })
    .then(jsonResponse => {
      renderToys(jsonResponse)
      // renders 4 undefined containers, but persists data to the database; upon page load, correct container renders.
    })
}

const getToys = () => {
  fetch(toysUrl)
    .then(response => response.json())
    .then(jsonResponse => renderToys(jsonResponse))
}

const renderToys = (toys) => { 
  for (const key in toys) {
    let oneToy = toys[key]
    let card = document.createElement('div')
    let h2 = document.createElement('h2')
    let img = document.createElement('img')
    let p = document.createElement('p')
    let likeButton = document.createElement('button')
    let hateButton = document.createElement('button')

    const likeIf = (likes) => {
      if (likes < 1) {
        p.innerText = `This toy has ${likes} likes. \n:(`
      } else {
        p.innerText = `${oneToy.name} has ${likes} likes! \n:)`
      }
    }

    likeIf(oneToy.likes)

    card.className = 'card'
    img.className = 'toy-avatar'
    likeButton.className = 'like-btn'
    hateButton.className = 'hate-btn'
    
    h2.innerText = oneToy.name
    img.src = oneToy.image
    likeButton.innerText = 'I love this toy.'
    hateButton.innerText = 'I hate this toy.'

    likeButton.addEventListener('click', (e) => {
      oneToy.likes++
      likeIf(oneToy.likes)
      updateLikes(e)
    })

    hateButton.addEventListener('click', (e) => {
      oneToy.likes--
      likeIf(oneToy.likes)
      updateLikes(e)
    })

    collection.appendChild(card)
    card.appendChild(likeButton)
    card.appendChild(p)
    card.appendChild(img)
    card.appendChild(h2)
    card.appendChild(hateButton)

    const updateLikes = (e) => {
      fetch(toysUrl + `/${oneToy.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          'likes': oneToy.likes
        })
      })
    }
  } // end for...in loop
}// end renderToys


document.addEventListener('DOMContentLoaded', () => {
  const addBtn = document.querySelector('body p button')
  const toyForm = document.querySelector('.container')
  let addToy = false
  collection = document.getElementById('toy-collection')


  addBtn.addEventListener('click', () => {
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
      toyForm.addEventListener('submit', (e) => {
        e.preventDefault()
        postToy(e.target)
      })
    } else {
      toyForm.style.display = 'none'
    }
  })

  getToys()
})
