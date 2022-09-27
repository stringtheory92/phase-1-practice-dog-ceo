console.log('%c HI', 'color: firebrick')



addEventListener('DOMContentLoaded', renderJs)
// HTML Elements
const imgContainer = document.querySelector('#dog-image-container')
const breedsList = document.querySelector('#dog-breeds')
const breedDropdown = document.querySelector('#breed-dropdown')

// URLs
const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = 'https://dog.ceo/api/breeds/list/all'

// Event Listeners
breedDropdown.addEventListener('change', filterBreeds)

function renderJs() {
    // Receives dog images
    receive(imgUrl)
    .then(addImgToDOM)

    // Receives dog breeds
    receive(breedUrl)
    .then(addBreedToDOM)
}

function addImgToDOM(data) {
    console.log(imgContainer)
    for (let img of data.message) {
        const imgElement = document.createElement('img')
        imgElement.src = img
        imgContainer.append(imgElement)
    }
}

function addBreedToDOM(data) {
    console.log('breed data: ', data)
    for (let breed in data.message) {
        const breedElement = document.createElement('li')
        breedElement.textContent = breed;
        breedsList.append(breedElement)

        // Change color of breed when clicked
        breedElement.addEventListener('click', e => {
            breedElement.style.color = 'tomato'
        })
    }
}

function filterBreeds() {
    const startsWith = breedDropdown.value

    
    receive(breedUrl)
    .then(breedsData => {
        
        breedsList.innerHTML = '';
        for (let breed in breedsData.message)
            if (startsWith === breed[0]) {
                const breedElement = document.createElement('li')
                breedElement.textContent = breed;
                breedsList.append(breedElement)
            }
    })
    

}

function receive(url) {
    return fetch(url).then(res => res.json())
}