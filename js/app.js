//Variables
const listaCursos = document.querySelector('#lista-cursos');
const listaCarrito = document.querySelector('#lista-carrito tbody')
const btnVaciarCarrito = document.getElementById("vaciar-carrito");
let cursosEnCarrito = [];

//Event Listeners
listaCursos.addEventListener('click',seleccionarCurso);
listaCarrito.addEventListener('click', borrarCurso);
btnVaciarCarrito.addEventListener('click',VaciarCarrito);

//Funciones primarias
function seleccionarCurso(e){
    if(e.target.classList.contains('button')){
        e.preventDefault();
        const divCurso = e.target.parentElement.parentElement;
        limpiarHTML();
        agregarCurso(divCurso);
        mostrarCarrito();
    }
}

function borrarCurso(e){
    if(e.target.classList.contains('borrar-curso')){
        e.preventDefault();
        const id = e.target.getAttribute('data-id');
        cursosEnCarrito = cursosEnCarrito.filter(element => element.id !== id);
        limpiarHTML();
        mostrarCarrito();
    }
}

function VaciarCarrito(e){
    e.preventDefault();
    cursosEnCarrito = [];
    limpiarHTML();
}

//Funciones secundarias
function agregarCurso(e){
    const infoCurso ={
        imagen: e.querySelector('img').src,
        nombre: e.querySelector('h4').textContent,
        precio: e.querySelector('p span').textContent,
        cantidad: 1,
        id: e.querySelector('a').getAttribute('data-id'),
    }
    const existe = cursosEnCarrito.some(element => element.id === infoCurso.id);
    
    if(existe){
        cursosEnCarrito.forEach(element =>{
            if(element.id === infoCurso.id){
                element.cantidad++;
            }
        });
    }else{
        cursosEnCarrito = [...cursosEnCarrito, infoCurso];
    }
}
function mostrarCarrito(){
    
    cursosEnCarrito.forEach( element =>{
        const info = document.createElement('tr');
        info.innerHTML = `
            <td><img src="${element.imagen}" width="150"/></td>
            <td>${element.nombre}</td>
            <td>${element.precio}</td>
            <td>${element.cantidad}</td>
            <td><a href="#" class="borrar-curso"/ data-id="${element.id}"> X </td>
        `
        listaCarrito.appendChild(info);
    })
    
}

function limpiarHTML(){
    while (listaCarrito.firstChild) {
        listaCarrito.removeChild(listaCarrito.firstChild);
    }
}