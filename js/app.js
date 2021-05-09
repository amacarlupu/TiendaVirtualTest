const itemProducto = document.getElementById('itemProducto');
const templateCard = document.getElementById('template-card').content;
const fragment = document.createDocumentFragment();
const categorias = document.querySelectorAll('.sidebar-menu ul li');
const searchProducto = document.getElementById('buscarProducto');
const inputProducto = document.getElementById('valueBusqueda');
const logoNavbar = document.querySelector('.logo-navbar');
const load = document.querySelector('.load');

function inicio() {
    document.addEventListener('DOMContentLoaded', fetchProducto);
    logoNavbar.addEventListener('click', cargar);

    for (let i = 0; i < categorias.length; i++) {
        categorias[i].addEventListener('click', fetchProduCategory);
    }

    searchProducto.addEventListener('click', fetchBusquedaProducto);
}


async function fetchProducto() {
    try {
        load.classList.remove('active');
        const resp = await fetch('https://ejercicio-producto.herokuapp.com/tienda/producto/all');
        const data = await resp.json();
        load.classList.toggle('active');
        renderCards(data);
    } catch (err) {
        console.log(err);
    }
}

function renderCards(data) {
    data.forEach(producto => {
        templateCard.querySelector('h5').textContent = producto.name;
        templateCard.querySelector('p').textContent = `S/ ${producto.price}`;
        if (producto.url_image) {
            templateCard.querySelector('img').setAttribute('src', producto.url_image);
        }
        else {
            templateCard.querySelector('img').setAttribute('src', './img/no-image.png');
        }
        templateCard.querySelector('span').textContent = producto.categorium.name;

        const newCard = templateCard.cloneNode(true);
        fragment.appendChild(newCard);
    });

    itemProducto.appendChild(fragment);
}

async function fetchProduCategory(e) {
    e.preventDefault();
    let idCategoria;

    if (e.path[1].classList.contains('logo-navbar')) {
        itemProducto.innerHTML = "";
        fetchProducto();
        return
    }

    if (e.target.localName === 'span') {
        idCategoria = e.target.parentElement.attributes[1].value;
    } else if (e.target.localName === 'i') {
        idCategoria = e.path[2].attributes[1].value;
    }

    try {
        const resp = await fetch(`https://ejercicio-producto.herokuapp.com/tienda/producto/category/${idCategoria}`);
        const data = await resp.json();
        itemProducto.innerHTML = "";
        renderCards(data);
    } catch (err) {
        console.log(err);
    }
}

async function fetchBusquedaProducto(e) {
    e.preventDefault()
    let palabra = inputProducto.value;

    if (palabra.length === 0) {
        return
    }

    try {
        const resp = await fetch(`https://ejercicio-producto.herokuapp.com/tienda/producto/name/${palabra}`);
        const data = await resp.json();
        itemProducto.innerHTML = "";
        renderCards(data);
        inputProducto.value = '';
    } catch (err) {
        console.log(err);
    }
}

function cargar(e) {
    e.preventDefault();

    if (e.path[1].classList.contains('logo-navbar')) {
        itemProducto.innerHTML = "";
        fetchProducto();
    }

    e.stopPropagation();
}

inicio();