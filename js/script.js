
const URL = 'https://randomuser.me/api/?results=120';

const resultado = document.getElementById('results');
const showPage = document.getElementById('show_page');
const textSearch = document.getElementById('text_search');

let users = [];
let peopleArray = [];
let currentPage = 1;
const usersPerPage = 12;


document.addEventListener('DOMContentLoaded', async (e) => {
    try {
        peopleArray = await getPeople();
        loadPageNumber(currentPage,);
        createPeople(peopleArray);
    } catch (error) {
        console.error('Data Error', error);
    }
})

const peopleFilter = () => {
    let text = textSearch.value;
    console.log(text);
    console.log(peopleArray)
    let res = peopleArray.filter((people) => people.name.last.toLowerCase().includes(text))
    console.log(res)
    if (res.length > 0) {
        createPeople(res);
    }
}


textSearch.addEventListener('keyup', (event) => {
    peopleFilter();
});


function loadPageNumber(currentPage) {
    showPage.value = currentPage;
}

async function getPeople() {
    const response = await fetch(URL);
    const data = await response.json();
    users = data.results;
    return users;
}

function createPeople(users) {
    resultado.innerHTML = '';
    const startIndex = (currentPage - 1) * usersPerPage;
    const endIndex = startIndex + usersPerPage;
    const currentPageUsers = users.slice(startIndex, endIndex);

    currentPageUsers.forEach((users) => {
        resultado.innerHTML += drawCards(users);
    })
};

function drawCards(res) {
    let completeName = res.name.first + " " + res.name.last;

    return `    
    <article class="profile">
        <div class="profile-image">
            <img src="${res.picture.large}" />
        </div>
        <h2 class="profile-username">${completeName}</h2>
        <small class="profile-user-handle">@${completeName}</small>
        <div class="profile-actions">
            <button class="btn btn--primary">Follow</button>
            <button class="btn btn--icon">
                <span class="material-symbols-outlined"> download </span>
            </button>
            <button class="btn btn--icon">
                <span class="material-symbols-outlined">more_horiz</span>
            </button>
        </div>

        <div class="profile-links">
            <a href="#" class="link link--icon">
                <i class="bi bi-twitter"></i>
            </a>
            <a href="#" class="link link--icon">
                <i class="bi bi-facebook"></i>
            </a>
            <a href="#" class="link link--icon">
                <i class="bi bi-instagram"></i>
            </a>
        </div>
    </article>
  `
}

//Pagination Controls
function goToPage() {
    const totalPages = Math.ceil(users.length / usersPerPage);
    destinationPage = showPage.value;

    if (totalPages < destinationPage || destinationPage < 1) {
        alert("error, no existe esa pagina");
        location.reload();
    } else {
        currentPage = destinationPage;
        loadPageNumber(currentPage);
        createPeople(users);
    }
}

function goToPreviousPage() {
    currentPage = showPage.value;
    if (currentPage > 1) {
        currentPage--;
        createPeople(users);
        loadPageNumber(currentPage);
    }
}

function goToNextPage() {
    const totalPages = Math.ceil(users.length / usersPerPage);
    currentPage = showPage.value;
    if (currentPage < totalPages) {
        currentPage++;
        createPeople(users);
        loadPageNumber(currentPage);
    }
}
