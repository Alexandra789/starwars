let categoriesName = ['character', 'starships', 'planets'];
let categoriesImg =
    ["../../assets/images/character.jpg",
    "../../assets/images/starships.jpg",
    "../../assets/images/planets.jpg"];

let categoriesWrapper = document.querySelector('.categories-wrapper');

function createCategory(categoriesName, categoriesImg) {
    for (let i = 0; i < categoriesName.length; i++) {
        let block = document.createElement('div');
        block.classList.add('block');
        block.classList.add(`block__${categoriesName[i]}`);
        block.style.backgroundImage = `url(${categoriesImg[i]})`;

        let title = document.createElement('a');
        title.classList.add('title');
        title.classList.add('block__title');
        title.setAttribute('href','#');
        title.innerText = `${categoriesName[i]}`;

        block.appendChild(title);
        categoriesWrapper.appendChild(block);
    }
}

createCategory(categoriesName,categoriesImg);
