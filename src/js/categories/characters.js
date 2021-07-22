import {getAllPeople, getPerson, getPersonImage} from '../api.js';

let blockCharacters = document.querySelector('.block__characters');
let blockPerson = document.querySelector('.block__person');
let charactersWrapper = document.querySelector('.characters-wrapper');
let allPeopleWrapper = document.querySelector('.all-people-wrapper');
let personInformationWrapper = document.querySelector('.person-information-wrapper');
let categoriesWrapper = document.querySelector('.categories-wrapper');
let otherPeople = document.querySelector('.other-people');

function showInfoAboutPerson(person) {
    allPeopleWrapper.style.display = 'none';
    personInformationWrapper.style.display = 'block';
    let img =  document.querySelector('.img__person');
    let name = document.querySelector('.name__person');
    let gender = document.querySelector('.gender__person');
    let birthday = document.querySelector('.birthday__person');
    let eyeColor = document.querySelector('.eye-color__person');

    img.setAttribute('src',`${getPersonImage(person.id)}`);
    name.innerText =person.name;
    gender.innerText = `Gender : ${person.gender}`;
    birthday.innerText = `Birth Year : ${person.birthYear}`;
    eyeColor.innerText = `Eye color : ${person.eyeColor}`;

    otherPeople.appendChild(allPeopleWrapper);
}

function showAllPeople(person) {
    let block = document.createElement('div');
    block.classList.add(`${person.id}-id-person`);
    block.classList.add('block');
    block.classList.add('block__person');
    block.setAttribute('id-person',person.id);

    let img = document.createElement('img');
    img.classList.add('image');
    img.setAttribute('id-person',person.id);
    img.setAttribute('src',`${getPersonImage(person.id)}`);

    let nameWrapper = document.createElement('div');
    nameWrapper.classList.add('name-wrapper');

    let name = document.createElement('p');
    name.classList.add('name');
    name.setAttribute('id-person',person.id);
    name.innerText = person.name;


    block.appendChild(img);
    nameWrapper.appendChild(name);
    block.appendChild(nameWrapper);
    allPeopleWrapper.appendChild(block);
}

blockCharacters.addEventListener('click',(e)=>{
    categoriesWrapper.style.display = 'none';
    getAllPeople().then((res) => {
        for(let i = 0; i<res.length; i++){
            showAllPeople(res[i])
        }
    });
});

allPeopleWrapper.addEventListener('click',(e)=>{
    if(!e.target.classList.contains('all-people-wrapper') && !e.target.classList.contains('name-wrapper')){
        let id = e.target.getAttribute('id-person');
        // console.log(e.target);
        getPerson(id).then((res)=>{
            showInfoAboutPerson(res);
        });
    }
});
