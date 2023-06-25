const turnOffBtn = document.querySelector('.add-window__turnoff');
const addWindow = document.querySelector('.add-window');
const addBtn = document.querySelector('.add-btn');
const addCounterBtn = document.querySelector('.select-counter__addBtn');
const table = document.querySelector ('.counter');
const selectedCounter = document.querySelector('#champion');
const counterOne = document.querySelector ('#counter-one');
const counterTwo = document.querySelector ('#counter-two');
const counterThree = document.querySelector ('#counter-three');
const descriptionOne = document.querySelector('#description-one');
const descriptionTwo = document.querySelector('#description-two');
const descriptionThree = document.querySelector('#description-three');
const role = document.querySelector('#role');
const searchBtn = document.querySelector('.search-btn');
const search = document.querySelector('.search-engine')
const tablePosition = document.querySelectorAll('td')
const inputSearch = document.querySelector('#search')
let idNumber = 0;
let saveChanges = []

const closeWindow = () => {
    addWindow.classList.add('cancel');
}

const openWindow = () => {
    addWindow.classList.remove('cancel');
}

const checkNewCounter = () => {
    if (selectedCounter.value === ''){
        alert ('Display name');
    } else {
        addCounter()
        selectedCounter.value = '';
        counterOne.value = '';
        counterTwo.value = '';
        counterThree.value = '';
        descriptionOne.value = '';
        descriptionTwo.value = '';
        descriptionThree.value = '';
    }
}

const addCounter = () => {
    idNumber++;

    const newCounter = table.appendChild(document.createElement('tr'));
    newCounter.setAttribute('id', `counter${idNumber}`);

    const champion = newCounter.appendChild(document.createElement('td'));
    champion.classList.add ('test')
    champion.innerText = selectedCounter.value;

    const selectedRole = newCounter.appendChild(document.createElement('td'));
    selectedRole.innerText = role.value;
    selectedRole.style.textTransform = 'uppercase';

    const firstCounter = newCounter.appendChild(document.createElement('td'));
    firstCounter.innerText = counterOne.value;
    firstCounter.setAttribute ('title', `${descriptionOne.value}`);

    const secoundCounter = newCounter.appendChild(document.createElement('td'));
    secoundCounter.innerText = counterTwo.value;
    secoundCounter.setAttribute ('title', `${descriptionTwo.value}`);

    const thirdCounter = newCounter.appendChild(document.createElement('td'));
    thirdCounter.innerText = counterThree.value;
    thirdCounter.setAttribute ('title', `${descriptionThree.value}`);


    const edit = newCounter.appendChild(document.createElement('td'));
    const editBtn = edit.appendChild(document.createElement('button'));
    editBtn.classList.add('btn');
    editBtn.classList.add('edit-btn');
    
    const deleteCounter = newCounter.appendChild(document.createElement('td'));
    const deleteBtn = deleteCounter.appendChild(document.createElement('button'));
    deleteBtn.classList.add('btn');
    deleteBtn.classList.add('delete-btn');
    
    addWindow.classList.add('cancel');

    const remove = () => {
        newCounter.remove();
    }

    const editCounter = () => {
        openWindow();
        selectedCounter.value = champion.innerText;
        counterOne.value = firstCounter.innerText;
        counterTwo.value = secoundCounter.innerText;
        counterThree.value = thirdCounter.innerText;
        descriptionOne.value = firstCounter.getAttribute('title')
        descriptionTwo.value = secoundCounter.getAttribute('title')
        descriptionThree.value = thirdCounter.getAttribute('title')

        const confirmChanges = () => {
            newCounter.remove();
            selectedCounter.value = '';
            counterOne.value = '';
            counterTwo.value = '';
            counterThree.value = '';
            descriptionOne.value = '';
            descriptionTwo.value = '';
            descriptionThree.value = '';
        }

        addCounterBtn.addEventListener('click', confirmChanges)
    }

    deleteBtn.addEventListener('click', remove);
    editBtn.addEventListener('click', editCounter);

    const counterObject = {
        id: idNumber,
        champion: selectedCounter.value,
        role: role.value,
        counters: [
          {
            counter: counterOne.value,
            description: descriptionOne.value
          },
          {
            counter: counterTwo.value,
            description: descriptionTwo.value
          },
          {
            counter: counterThree.value,
            description: descriptionThree.value
          }
        ]
      };

    saveChanges.push(counterObject)

    localStorage.setItem("save", JSON.stringify(saveChanges))
    
    
}

const searchEngine = () => {
    search.classList.toggle('off');
    inputSearch.value = '';
}

const searchChampion = e => {
    const tablePosition = document.querySelectorAll('.test')
    const text = e.target.value.toLowerCase();
    console.log(text);
    
    tablePosition.forEach(el => {
        if(el.textContent.toLowerCase().indexOf(text) !== -1){
            console.log(`object`);
            el.parentElement.classList.remove('cancel')
        } else {
            el.parentElement.classList.add('cancel')
        }
    })
}

localStorage.getItem('save')

turnOffBtn.addEventListener('click', closeWindow);
addBtn.addEventListener('click', openWindow);
addCounterBtn.addEventListener('click', checkNewCounter);
searchBtn.addEventListener('click', searchEngine);
search.addEventListener('keyup', searchChampion);