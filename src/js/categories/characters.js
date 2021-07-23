import {getAllPeople, getPerson, getPersonImage,
    getAllStarships,getStarship,getStarshipImage,
    getAllPlanets,getPlanet,getPlanetImage} from '../api.js';
// import * as from "../api";

// let blockCharacters = document.querySelector('.block__characters');
let allWrapper = document.querySelector('.all-wrapper');
let personalInformationWrapper = document.querySelector('.personal-information-wrapper');
let categoriesWrapper = document.querySelector('.categories-wrapper');
let other = document.querySelector('.other');
let loader = document.querySelector('.loader-wrapper');
// let backToAllPeople = document.querySelector('.back-to-all-people');

function checkImgSrc(url){
    let http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return http.status!=404;
}

function createInfoAboutPerson(res){
    let img =  document.querySelector('.img');
    let name = document.querySelector('.name-block');
    let gender = document.querySelector('.gender');
    let birthday = document.querySelector('.birthday');
    let eyeColor = document.querySelector('.eye-color');

    let imgSrc = checkImgSrc(`${getPersonImage(res.id)}`);
    imgSrc ? img.setAttribute('src',`${getPersonImage(res.id)}`) :
        img.setAttribute('src','../../assets/images/not-picture.jpg')

    name.innerText = res.name;
    gender.innerText = `Gender : ${res.gender}`;
    birthday.innerText = `Birth Year : ${res.birthYear}`;
    eyeColor.innerText = `Eye color : ${res.eyeColor}`;
}

function createInfoAboutStarship(res){

    let name = document.querySelector('.name-block');
    let model = document.querySelector('.model');
    let lengthStarship = document.querySelector('.length');
    let passengers = document.querySelector('.passengers');
    let manufacturer = document.querySelector('.manufacturer');
    let crew = document.querySelector('.crew');
    let cargoCapacity = document.querySelector('.cargo-capacity');
    let costInCredits = document.querySelector('.const-in-credits');
    let img =  document.querySelector('.img');

    let imgSrc = checkImgSrc(`${getStarshipImage(res.id)}`);
    imgSrc ? img.setAttribute('src',`${getStarshipImage(res.id)}`) :
        img.setAttribute('src','../../assets/images/not-picture.jpg');

    name.innerText = `${res.name}`;
    model.innerText = `Model : ${res.model}`;
    lengthStarship.innerText = `Length : ${res.length}m`;
    passengers.innerText = `Passengers : ${res.passengers}`;
    manufacturer.innerText = `Manufacturer : ${res.manufacturer}`;
    crew.innerText = `Minimum crew : ${res.crew}`;
    cargoCapacity.innerText = `Cargo Capacity : ${res.cargoCapacity} metric tons`;
    costInCredits.innerText = `Cost ${res.costInCredits} credits`;
}

function createInfoAboutPlanet(res){
    let name = document.querySelector('.name-block');
    let population = document.querySelector('.population');
    let rotationPeriod = document.querySelector('.rotation-period');
    let diameter = document.querySelector('.diameter');

    let img =  document.querySelector('.img');

    let imgSrc = checkImgSrc(`${getPlanetImage(res.id)}`);
    imgSrc ? img.setAttribute('src',`${getPlanetImage(res.id)}`) :
        img.setAttribute('src','../../assets/images/not-picture.jpg')

    name.innerText = `${res.name}`;
    population.innerText = `Population : ${res.population}`;
    rotationPeriod.innerText = `Rotation Period : ${res.rotationPeriod} days`;
    diameter.innerText = `Diameter : ${res.diameter}km`
}

function showInfo(res,blockName) {
    allWrapper.style.display = 'none';
    personalInformationWrapper.style.display = 'block';

    if(blockName === 'person'){createInfoAboutPerson(res);}
    else if(blockName === 'starship'){
        createInfoAboutStarship(res);
    }
    else if(blockName === 'planet'){createInfoAboutPlanet(res);}

    let title = document.querySelector('.other__title');
    title.innerText = `Other ${blockName}s`;

    other.appendChild(allWrapper);
}


function showAll(res,getImageFunction,blockName) {

    let block = document.createElement('div');
    block.classList.add(`${res.id}-id-block`);
    block.classList.add('block');
    block.classList.add(`block__${blockName}`);
    block.setAttribute('id-block',res.id);

    let img = document.createElement('img');
    img.classList.add('image');
    img.setAttribute('id-block',res.id);
    img.classList.add(`${blockName}`);
    let imgSrc = checkImgSrc(`${getImageFunction(res.id)}`);
    imgSrc ? img.setAttribute('src',`${getImageFunction(res.id)}`) :
        img.setAttribute('src','../../assets/images/not-picture.jpg');

    let nameWrapper = document.createElement('div');
    nameWrapper.classList.add('name-wrapper');

    let name = document.createElement('p');
    name.classList.add('name');
    name.classList.add(`${blockName}`);
    name.setAttribute('id-block',res.id);
    name.innerText = res.name;

    block.appendChild(img);
    nameWrapper.appendChild(name);
    block.appendChild(nameWrapper);
    allWrapper.appendChild(block);
    loader.style.display = 'none';
}

categoriesWrapper.addEventListener('click', (e)=>{
    if(e.target.classList.contains('block__characters') || e.target.innerHTML === 'characters'){
        choiceCategory(getAllPeople, getPersonImage, 'person');
    }
    else if(e.target.classList.contains('block__starships') || e.target.innerHTML === 'starships'){
        choiceCategory(getAllStarships,getStarshipImage, 'starship');
    }
    else if(e.target.classList.contains('block__planets') || e.target.innerHTML === 'planets'){
        choiceCategory(getAllPlanets, getPlanetImage, 'planet');
    }
});

function choiceCategory(category, getImgFunction,blockName){
    categoriesWrapper.style.display = 'none';
    if(allWrapper.children.length === 0){
        loader.style.display = 'flex';
    }
    category().then((res) => {
        for(let i = 0; i<res.length; i++){
            showAll(res[i],getImgFunction,blockName);
        }
    });
};

allWrapper.addEventListener('click',(e)=>{
    if(!e.target.classList.contains('all-wrapper') && !e.target.classList.contains('name-wrapper')){
        let id = e.target.getAttribute('id-block');
        if(e.target.classList.contains('people')){
            getPerson(id).then((res)=>{
                showInfo(res, 'people');
            });
        }
        else if(e.target.classList.contains('starship')){
            getStarship(id).then((res)=>{
                showInfo(res,'starship');
            });
        }
        else if(e.target.classList.contains('planet')){
            getPlanet(id).then((res)=>{
                showInfo(res,'planet');
            });
        }
    }
});

// backToAllPeople.addEventListener('click',()=>{
//     personInformationWrapper.style.display = 'none';
//     allPeopleWrapper.style.display = 'flex';
// });
