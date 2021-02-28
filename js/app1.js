//Variables
const listaCursos = document.querySelector('#lista-cursos');
const listaCarrito = document.querySelector('#lista-carrito tbody');
const btnVaciarCarrito = document.getElementById('vaciar-carrito');
const carrito = document.getElementById('carrito');//Para eliminar cursos del carrito(boton rojo)
let cursosEnCarrito = [];

//Event Listeners
listaCursos.addEventListener('click', agregarCurso);
btnVaciarCarrito.addEventListener('click', vaciarCarrito);
carrito.addEventListener('click', eliminarCurso);

//Funciones primarias
function agregarCurso(e){
    e.preventDefault();
    if(e.target.classList.contains('button')){
        const divCurso = e.target.parentElement.parentElement;
        limpiarHTML();
        agregarAlCarrito(divCurso);
        mostrarCarrito();
    }
}

function vaciarCarrito(){
    cursosEnCarrito = [];
    limpiarHTML();
}

function eliminarCurso(e){
    if(e.target.classList.contains('borrar-curso')){
        e.preventDefault();
        const infoCurso = e.target.getAttribute('data-id');
        cursosEnCarrito = cursosEnCarrito.filter( element => element.id !== infoCurso);
        limpiarHTML();
        mostrarCarrito();
    }
}

//Funciones secundarias
function agregarAlCarrito(e){
    //Tomar datos del curso seleccionado
    const infoCurso ={
        imagen: e.querySelector('img').src,
        nombre: e.querySelector('h4').textContent,
        precio: e.querySelector('p span').textContent,
        cantidad: 1,
        id: e.querySelector('a').getAttribute('data-id'),
    }

    const existe = cursosEnCarrito.some( element => element.id === infoCurso.id);
    if(existe){
        cursosEnCarrito.forEach( element =>{
            element.cantidad++;
        });
    }else{
        //Agregar InfoCurso al arreglo del carrito
        cursosEnCarrito = [...cursosEnCarrito, infoCurso];
    }
}

function mostrarCarrito(){
    cursosEnCarrito.forEach(element => {
        const info = document.createElement('tr');
        info.innerHTML = `
            <td> <img src="${element.imagen}" width="150"/> </td>
            <td>${element.nombre}</td>
            <td>${element.precio}</td>
            <td>${element.cantidad}</td>
            <td><a href="#" class='borrar-curso' data-id="${element.id}"/> X </td>
        `
        listaCarrito.appendChild(info);
    })
}

function limpiarHTML(){
    //listaCarrito.innerHTML = ''; //Esta es una forma lenta para la aplicacion
    
    //Esto es mas eficiente
    while (listaCarrito.firstChild) {
        listaCarrito.removeChild(listaCarrito.firstChild);
    }
}