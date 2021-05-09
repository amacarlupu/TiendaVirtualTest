const sidebarMenu = document.querySelector('.sidebar-menu');
const toggle = document.querySelector('.toggle');
const categ = document.querySelectorAll('.sidebar-menu ul li');

function inicio(){
    toggle.addEventListener('click', toogleMenu );

    for (let i = 0; i < categ.length; i++) {
        categ[i].addEventListener('click', addClassSidebarMenu);
    }

    sidebarMenu.addEventListener('mouseover', restoreClassSidebarMenu);

}

function toogleMenu(){
    sidebarMenu.classList.remove('off');
    sidebarMenu.classList.toggle('active');
    toggle.classList.toggle('active');
}

function addClassSidebarMenu(e){
    e.preventDefault();
    sidebarMenu.classList.remove('active');
    sidebarMenu.classList.toggle('off');
    toggle.classList.remove('active');
}

function restoreClassSidebarMenu(e){
    e.preventDefault();
    sidebarMenu.classList.remove('off');
}

inicio();