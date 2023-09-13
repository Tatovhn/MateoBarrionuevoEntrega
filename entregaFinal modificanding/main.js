//////////////////////////////////////////////////clases/////////////////////////////////////////////////////////////////////////////////
// constructor de objeto producto
class Producto{
  constructor(id,nombre,precio){
  this.id=id;
  this.nombre = nombre;
  this.precio = precio;
}}
let Productos=[{id:2,nombre:"pokebola",precio: 20} ,{id:3,nombre:"pokedex",precio: 300},{id:4,nombre:"pokemedicina",precio: 456},{id:5,nombre:"pokecrap",precio: 23},{id:6,nombre:"vendas",precio: 4},{id:7,nombre:"peine",precio: 344},{id:8,nombre:"alimento",precio: 456},{id:9,nombre:"antiparasitario",precio: 344}]
localStorage.getItem("productos")?Productos=JSON.parse(localStorage.getItem("productos")):localStorage.setItem("productos",JSON.stringify(Productos));

// constructor de objeto pokemon
class Pokemon{
  constructor(id,nombre,precio,img){
  this.id=id;
  this.nombre = nombre;
  this.precio = precio;
  this.img=img;
} 
}
let Pokemones=[];
localStorage.getItem("pokemones")?Pokemones=JSON.parse(localStorage.getItem("pokemones")):localStorage.setItem("pokemones",JSON.stringify(Pokemones));
//constructor de usuario
class Usuario{
  constructor(id,user,pass,admin) {this.id = id,
  this.user= user,
  this.pass=pass,
  this.admin=false
  }
}
let Usuarios=[{id:0, user:"admin",pass:"admin",admin:true},{id:1,user:"yo", pass:"yo", admin:false}];
JSON.parse(localStorage.getItem("Usuarios"))||localStorage.setItem("Usuarios", JSON.stringify(Usuarios));

//////////////////////////////////////////////////Declaraciones varias /////////////////////////////////////////////////////////////////////////////////
let dcto = false;
let carrito=[];
const ProductosFinal =[];
let preciofinalStorage = [];
let preciofinal =0;
const quitarSound = new Audio("https://www.fesliyanstudios.com/play-mp3/7017");
const pagoSound = new Audio("https://soundboardguy.com/wp-content/uploads/2022/06/ka-ching-1.mp3");
//////////////////////////////////////////////////DOM - ELEMENTOS /////////////////////////////////////////////////////////////////////////////////
let filtros = document.getElementById("filtroPrecio");
const filtroPrecioAsc = document.getElementById('PrecioAsc');
const filtroPrecioDesc = document.getElementById('PrecioDesc');
const filtroNombreAsc = document.getElementById('NombreAsc');
const filtroNombreDesc = document.getElementById('NombreDesc');
let lista = document.getElementById('lista');
let template = document.getElementById('resultados');

/////////////////////////////////////////// LOGUEO DE USUARIOS /////////////////////////////////////////
function login(){
let user = document.getElementById("user").value;
let pass = document.getElementById("pass").value;
let usuarios =JSON.parse(localStorage.getItem("Usuarios"));   
let existe = usuarios.find((usuario) => usuario.user===user);
if(existe.user != user|| existe.pass != pass)
  {quitarSound.play();
   Swal.fire('Oops, usuario o clave inccorrecto');
  }
else if (existe.admin==true)
  {
  $('#exampleModal').modal('hide');
  Swal.fire({
    title: 'Bienvenido!',
    text: `Hola ${user}, te estábamos esperando. En la barra de ingresos podrás ingresar productos nuevos o borrarlos desde el catálogo`,
    imageUrl: 'https://media.tenor.com/CA2mkL9q27QAAAAC/nurse-joy-pokemon.gif',
    imageWidth: 400,
    imageHeight: 200,
    imageAlt: 'pokechica',})
    document.getElementById('eliminar').classList.remove('d-none');
    document.getElementById('ingreso').classList.remove('d-none');
    document.getElementById('logins').classList.add('d-none');
    document.getElementById('logout').classList.remove('d-none');
    localStorage.setItem("AdminLogeado", true);
   }
else if (existe.admin==false)
  {
    $('#exampleModal').modal('hide');
      Swal.fire({
      title: 'Bienvenido!',
      text: `Hola ${user}, te estábamos esperando`,
      imageUrl: 'https://media.tenor.com/CA2mkL9q27QAAAAC/nurse-joy-pokemon.gif',
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: 'pokechica',});
      localStorage.setItem("UserLogeado", true);  
      document.getElementById('logins').classList.add('d-none');
      document.getElementById('logout').classList.remove('d-none');
  }
}

function logout()
{
localStorage.removeItem("AdminLogeado"); 
  Toastify({
    text: "Has cerrado tu sesión. ¡Hasta Pronto!",
    duration: 3000,
    gravity: "bottom", // `top` or ``
    position: "center", // `left`, `center` or `right`
    style:{background: "red",color: "white",padding: "50px"},}).showToast();
location.reload();
}

//////////////////////////////////////////// FUNCIONES DEL ADMIN //////////////////////////////////////////// 

// limpiar la pantalla
let limpieza = document.getElementById("clear");
limpieza.onclick = () => {lista.innerHTML="";carrusel.innerHTML="";}
let productosCash = "";

// eliminar productos
function eliminar(e)
{
 lista.innerHTML="";
 carrusel.innerHTML="";
 let buscado = Productos.find(producto => producto.nombre === document.getElementById('borrarProducto').value);
 let div = document.createElement('div');div.classList.add('d-inline-block');div.classList.add('mx-2');div.classList.add('m-t--1');
 div.innerHTML= `
    <div class="card bg-dark d-inline-block border border-warning" style="width: 18rem;text-align: center;margin-left :5%;margin-top :5%;" id="tarj">
          <img src="icon/poke.png" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title red" id="nombreProd1"> Producto: ${buscado.nombre}</h5>
            <h6 class="card-text" id="idProducto" type="number">id: ${buscado.id}</h6>
            <h6 class="card-text" id="precio1" type="number" >$ ${buscado.precio}</h6>
            <button id="${buscado.id}" class="btn btn-primary">Eliminar</button>
          </div>
    </div>`
  lista.append(div);
  let boton = document.getElementById(`${buscado.id}`);
  boton.addEventListener('click',() => quitarProducto(buscado.id));
  document.getElementById('borrarProducto').value="";
}

function quitarProducto(id)
{
 let quitar = Productos.find((item) => item.id===id);
 console.log(quitar);
 Productos.splice(quitar,1);
 localStorage.setItem("productos",JSON.stringify(Productos));
  Toastify({
    text: "producto quitado del inventario",
    duration: 3000,
    gravity: "bottom", // `top` or ``
    position: "center", // `left`, `center` or `right`
    style:{background: "red",color: "white",padding: "50px"},
    }).showToast();
 lista.innerHTML = "";
 quitarSound.play();
return Productos;
}
  
  // chequeo de si está logueado el admin
  addEventListener("DOMContentLoaded", () => {
  if(localStorage.getItem("AdminLogeado")){
  document.getElementById('eliminar').classList.remove('d-none'),
  document.getElementById('ingreso').classList.remove('d-none'),
  document.getElementById('logins').classList.add('d-none'),
  document.getElementById('logout').classList.remove('d-none')}
  });
  
  
  function newUser(){
    let user = document.getElementById('user').value;
    let pass = document.getElementById('pass').value;
    if (user != Usuarios.find((user) => user.user===user)) 
    {Usuarios.push(new Usuario ((Usuarios.length)+1,user,pass,false));
      localStorage.setItem("Usuarios", JSON.stringify(Usuarios));
      Toastify({
        text: "Usuario creado! Ahora hacé clic en loguin para comenzar",
        duration: 3000,
        gravity: "top", // `top` or ``
        position: "center", // `left`, `center` or `right`
        style: {
          background: "green",color: "white",padding: "50px"
    },}).showToast();
    }else{
      Toastify({
        text: "Lo sentimos ya existe un usuario con ese nombre",
        duration: 3000,
        gravity: "bottom", // `top` or ``
        position: "center", // `left`, `center` or `right`
        style: {
          background: "red",color: "white",padding: "50px"
        },}).showToast();
    }
  }
  


//////////////////////////////////////////////////CARRUSEL///////////////////////////////////////////////////////////////////
let carrusel = document.getElementById("carrusel");let carrusel1 = document.getElementById("tarjeta1");let divcar1 = document.createElement("div");

//primera tarjeta
let divcar1prod= Math.floor(Math.random() * 5) + 1;
console.log(divcar1prod)
divcar1.innerHTML = `
<div class="card bg-dark mx-auto border border-warning" style="width: 18rem;text-align: center;">
    <img src="icon/sale.png" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title red" id="nombreProd1"> Producto: ${Productos[divcar1prod].nombre}</h5>
      <h6 class="card-text" id="idProducto" type="number">id: ${Productos[divcar1prod].id}</h6>
      <h6 class="card-text" id="precio1" type="number" >$ ${Productos[divcar1prod].precio}</h6>
      <button id="${Productos[divcar1prod].id}" class="btn btn-primary">Agregar</button>
    </div>
 </div> 
`
carrusel1.append(divcar1);
let botont1 = document.getElementById(`${Productos[divcar1prod].id}`);
botont1.addEventListener('click',() => comprar(Productos[divcar1prod].id));

//segunda tarjeta
let carrusel2 = document.getElementById("tarjeta2");let divcar2 = document.createElement("div");let divcar2prod= divcar1prod + 1;

divcar2.innerHTML = `
<div class="card bg-dark mx-auto border border-warning" style="width: 18rem;text-align: center;">
    <img src="icon/sale.png" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title red" id="nombreProd1"> Producto: ${Productos[divcar2prod].nombre}</h5>
      <h6 class="card-text" id="idProducto" type="number">id: ${Productos[divcar2prod].id}</h6>
      <h6 class="card-text" id="precio1" type="number" >$ ${Productos[divcar2prod].precio}</h6>
      <button id="${Productos[divcar2prod].id}" class="btn btn-primary">Agregar</button>
    </div>
 </div> 
`
carrusel2.append(divcar2);
let botont2 = document.getElementById(`${Productos[divcar2prod].id}`);
botont2.addEventListener('click',() => comprar(Productos[divcar2prod].id));

//tercera tarjeta
let carrusel3 = document.getElementById("tarjeta3");let divcar3 = document.createElement("div");let divcar3prod= divcar2prod + 1;

divcar3.innerHTML = `
<div class="card bg-dark mx-auto border border-warning" style="width: 18rem;text-align: center;">
    <img src="icon/sale.png" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title red" id="nombreProd1"> Producto: ${Productos[divcar3prod].nombre}</h5>
      <h6 class="card-text" id="idProducto" type="number">id: ${Productos[divcar3prod].id}</h6>
      <h6 class="card-text" id="precio1" type="number" >$ ${Productos[divcar3prod].precio}</h6>
      <button id="${Productos[divcar3prod].id}" class="btn btn-primary">Agregar</button>
    </div>
 </div> 
`
carrusel3.append(divcar3);
let botont3 = document.getElementById(`${Productos[divcar3prod].id}`);
botont3.addEventListener('click',() =>comprar(Productos[divcar3prod].id));3



////////////////////////////////FUNCIONES PARA PRODUCTOS////////////////////////////////

//COMPRAR
function comprar(id){
  let compra = Productos.find((item) => item.id===id);
  let aidi = document.getElementById(id).parentNode;
  aidi.parentElement.classList.remove('bg-dark');
  aidi.parentElement.classList.add('bg-warning');
  aidi.lastElementChild.classList.remove('btn-primary');
  aidi.lastElementChild.classList.add('btn-success');
  audio.play();
  carrito.push(compra);
  console.log(carrito);
return carrito}

//INGRESAR PRODUCTO NUEVO
function ingresar(){
  let productoIng= document.getElementById('ingresoProducto').value;
  let precioIng= parseInt(document.getElementById('ingresoPrecio').value)
  Productos.push(new Producto (Math.max(...Productos.map(item => item.id))+1,productoIng,precioIng));
  localStorage.setItem("productos",JSON.stringify(Productos));
  document.getElementById('ingresoProducto').value="";
  document.getElementById('ingresoPrecio').value="";
  console.log(Productos);  Toastify({
    text: "Producto guardado",
    duration: 3000,
    gravity: "bottom", // `top` or `bottom`
    position: "center", // `left`, `center` or `right`
    style: {
      background: "green",padding:"50px"
    },
  }).showToast();return Productos
}



// BUSCAR PRODUCTO
function buscar(e){ 
  lista.innerHTML="";
  carrusel.innerHTML="";
  let buscado = Productos.find(producto => producto.nombre === document.getElementById('searchProducto').value);
  console.log(buscado);
  let div = document.createElement('div');div.classList.add('d-inline-block');div.classList.add('mx-2');div.classList.add('m-t--1');
  div.innerHTML= `
  <div class="card bg-dark d-inline-block border border-warning" style="width: 18rem;text-align: center;margin-left :5%;margin-top :5%;" id="tarj">
      <img src="icon/poke.png" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title red" id="nombreProd1"> Producto: ${buscado.nombre}</h5>
        <h6 class="card-text" id="idProducto" type="number">id: ${buscado.id}</h6>
        <h6 class="card-text" id="precio1" type="number" >$ ${buscado.precio}</h6>
        <button id="${buscado.id}" class="btn btn-primary">Agregar</button>
      </div>
   </div> 
`
lista.append(div);
let boton = document.getElementById(`${buscado.id}`);
boton.addEventListener('click',() => comprar(buscado.id));
  document.getElementById('searchProducto').value="";
}

// CATÁLOGO DE PRODUCTOS
function inventario(){
  productosDelInventario=JSON.parse(localStorage.getItem("productos"));
  lista.innerHTML="";
  carrusel.innerHTML="";
  filtros.innerHTML="";
  productosDelInventario.forEach((item)=>{
  let div = document.createElement('div');div.classList.add('d-inline-block');div.classList.add('mx-2');div.classList.add('m-t--1');
  div.innerHTML= `
  <div class="card bg-dark d-inline-block border border-warning" style="width: 18rem;text-align: center;margin-left :5%;margin-top :5%;" id="tarj">
      <img src="icon/poke.png" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title red" id="nombreProd1"> Producto: ${item.nombre}</h5>
        <h6 class="card-text" id="idProducto" type="number">id: ${item.id}</h6>
        <h6 class="card-text" id="precio1" type="number" >$ ${item.precio}</h6>
        <button id="${item.id}" class="btn btn-primary">Agregar</button>
      </div>
   </div> 
`
lista.append(div);
let boton = document.getElementById(`${item.id}`);
boton.addEventListener('click',() => comprar(item.id));





/////////////////////////////////////////////////////// CARRITO ////////////////////////////////////////////////////

//agregar al array de carrito provisorio el producto
function comprar(id){
  let compra = Productos.find((item) => item.id===id);
  let aidi = document.getElementById(id).parentNode;
  aidi.parentElement.classList.remove('bg-dark');
  aidi.parentElement.classList.add('bg-warning');
  aidi.lastElementChild.classList.remove('btn-primary');
  aidi.lastElementChild.classList.add('btn-success');
  audio.play();
  carrito.push(compra);
  console.log(carrito); Toastify({
    text: "Producto agregado al carrito",
    duration: 3000,  gravity: "bottom", position: "center",
        style: {color: "black",background: "#fff",padding: "50px",},
   
  }).showToast();

return carrito}
})}


// vaciar carrito
function carritoVaciar(){
  if(localStorage.length>0 || carrito.length>0){
  localStorage.clear();
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Borraste tu carrito',
  })
  carrito=[];
  lista.innerHTML = "";
  }else{   lista.innerHTML = "";
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Tu carrito ya está vacío',
    })
  }}


// Renderizar el carrito  
function carritoVer(){
let carritoAlmacenao = JSON.parse(localStorage.getItem("carritoVerificado"));
if (carrito.length>0){lista.innerHTML="";carrusel.innerHTML="";filtros.innerHTML="";
carrito.forEach((item)=>{
 let div = document.createElement('div');div.classList.add('d-inline-block');div.classList.add('mx-2');div.classList.add('m-t--1');
 div.innerHTML= `
   <div class="card bg-dark d-inline-block border border-warning" style="width: 18rem;text-align: center;margin-left :5%;margin-top :5%;" id="tarj">
       <img src="icon/compra.png" class="card-img-top" alt="...">
       <div class="card-body">
         <h5 class="card-title red" id="nombreProd1"> Producto: ${item.nombre}</h5>
         <h6 class="card-text" id="idProducto" type="number">id: ${item.id}</h6>
         <h6 class="card-text" id="precio1" type="number" >$ ${item.precio}</h6>
         <button id="${item.id}" class="btn btn-primary" onclick="quitarCarrito()">Quitar</button>
       </div>
    </div> 
 `
lista.append(div);
})
}
else if((carritoAlmacenao) && carritoAlmacenao.length>0){
lista.innerHTML="";carrusel.innerHTML="";filtros.innerHTML="";
console.log(typeof carritoAlmacenao);
carritoAlmacenao.forEach((item)=>{
 let div = document.createElement('div');div.classList.add('d-inline-block');div.classList.add('mx-2');div.classList.add('m-t--1');
 div.innerHTML= `
   <div class="card bg-dark d-inline-block border border-warning" style="width: 18rem;text-align: center;margin-left :5%;margin-top :5%;" id="tarj">
       <img src="images/4811.jpg" class="card-img-top" alt="...">
       <div class="card-body">
         <h5 class="card-title red" id="nombreProd1"> Producto: ${item.nombre}</h5>
         <h6 class="card-text" id="idProducto" type="number">id: ${item.id}</h6>
         <h6 class="card-text" id="precio1" type="number" >$ ${item.precio}</h6>
         <button id="${item.id}" class="btn btn-primary" onclick="quitarCarrito()">Quitar</button>
       </div>
    </div> 
 `
 lista.append(div);return(carrito)
   })
}
else{Swal.fire({
  icon: 'error',
  title: 'Oops...',
  text: 'Parece que tu carrito está vacío o.O',
})}}

// quitar el elemento del carrito apretando el botón quitar
function quitarCarrito(id){
let quitar = Productos.find((item) => item.id===id);
carrito.splice(quitar,1); 
Toastify({
    text: "producto quitado del carrito",
    duration: 3000,
    gravity: "bottom", // `top` or ``
    position: "center", // `left`, `center` or `right`
    style: {
      background: "red",color: "white",padding: "50px"
  },}).showToast();lista.innerHTML = "";
  quitarSound.play();
  console.log(carrito);
return carrito}

//verificar el carrito = guardarlo en storage baby
function carritoVerificado () {
localStorage.setItem("carritoVerificado",JSON.stringify(carrito));
Toastify({
  text: "Tu carrito fue guardado, ya podés pagar",
  duration: 3000,
  gravity: "bottom", // `top` or `bottom`
  position: "center", // `left`, `center` or `right`
  style: {
    background: "green",padding:"50px"
  },
}).showToast();}

















function Pokeinventario(){
  lista.innerHTML="";carrusel.innerHTML="";filtros.innerHTML="";
  Pokemones.forEach((poke)=>{
  let div = document.createElement('div');div.classList.add('d-inline-block');div.classList.add('mx-2');div.classList.add('m-t--1');
  div.innerHTML= `
  <div class="card bg-dark d-inline-block border border-warning" style="width: 18rem;text-align: center;margin-left :5%;margin-top :5%;" id="tarj">
      <img src="${poke.img}">
      <div class="card-body">
        <h5 class="card-title red" id="nombreProd1"> Producto: ${poke.nombre}</h5>
        <h6 class="card-text" id="idProducto" type="number">id: ${poke.id}</h6>
        <h6 class="card-text" id="precio1" type="number" >$ ${poke.precio}</h6>
        <button id="${poke.id}" class="btn btn-primary">Agregar</button>
      </div>
   </div> 
`
lista.append(div);
let Pokeboton = document.getElementById(`${poke.id}`);
Pokeboton.addEventListener('click',() => comprar(poke.id));

//agregar al array de carrito provisorio el pokemon
function comprar(id){
  let compra = Pokemones.find((item) => item.id===id);
  carrito.push(compra);
  let aidi = document.getElementById(id).parentNode;
  aidi.parentElement.classList.remove('bg-dark');
  aidi.parentElement.classList.add('bg-warning');
  aidi.lastElementChild.classList.remove('btn-primary');
  aidi.lastElementChild.classList.add('btn-success');
  audio.play();
  console.log(carrito); Toastify({
    text: "Pokemon agregado al carrito",
    duration: 3000,  gravity: "bottom", position: "center",
        style: {color: "black",background: "#fff",padding: "50px",},
   
  }).showToast();
return carrito}
})}










////////////////////////////////////// PAGO ///////////////////////////////////////////////////////

// mostrar productos del carrito verificado y precio final
function pagar(){
if (carrito.length>0 && dcto ){lista.innerHTML="";carrusel.innerHTML="";
carrito.forEach((item)=>{
 preciofinal = preciofinal + parseInt(item.precio);
 productosCash =  productosCash + item.nombre +" | ";
})
preciofinal= preciofinal - ((preciofinal*10)/100);
//renderizar la tarjeta con el precio total y productos que llevás
   let div = document.createElement('div');
   div.innerHTML= `
     <div class="card bg-dark d-block mx-auto border border-warning" style="width: 18rem;text-align: center;" id="tarj">
         <img src="images/about.png" class="card-img-top" alt="...">
         <div class="card-body">
         <h5 class="card-title red" id="nombreProd1"> Productos: ${productosCash}</h5>

           <h5 class="card-title red" id="nombreProd1"> Precio final: ${preciofinal}</h5>
         
           <button class="btn btn-tertiary" onclick="Cashout()">Pagar</button>
         </div>
      </div> 
   `
   lista.append(div);

  }
 else if ((carrito.length>0 && !dcto) || carrito.length<=0 && localStorage.length>0){lista.innerHTML="";carrusel.innerHTML="";filtros.innerHTML="";
JSON.parse(localStorage.getItem("carritoVerificado")).forEach((item)=>{
preciofinal = preciofinal + parseInt(item.precio);
productosCash =  productosCash + item.nombre +" | ";
})

// la tarjeta con el precio total final y confirmación
   let div = document.createElement('div');
   div.innerHTML= `
     <div class="card bg-dark d-inline-block border border-warning" style="width: 18rem;text-align: center;margin-left :5%;margin-top :5%;" id="tarj">
         <img src="images/about.png" class="card-img-top" alt="...">
         <div class="card-body">
         <h5 class="card-title red" id="nombreProd1"> Productos: ${productosCash}</h5>

           <h5 class="card-title red" id="nombreProd1"> Precio final: ${preciofinal}</h5>
         
           <button class="btn btn-tertiary" onclick="Cashout()">Pagar</button>
         </div>
      </div> 
   `
   lista.append(div);

  }
else{Swal.fire({
  icon: 'error',
  title: 'Oops...',
  text: 'Parece que tu carrito está vacío o.O',
});}
console.log(preciofinal);
}

// último paso = pagar -si y solo si estás logeado-

function Cashout(){
  pagoSound.play();
  Swal.fire({
    title: 'GRACIAS POR TU POKECOMPRA',
    text: `Estás llevando ${productosCash} por $ ${preciofinal}`,
    icon: 'success',
    showCancelButton: true,
    confirmButtonColor: '#63c132',
    cancelButtonColor: '#d33',
    confirmButtonText: 'COMPRAR'
  }).then((result) => {
    result.isConfirmed && localStorage.getItem("UserLogeado")? (Swal.fire('LISTO','Tu compra fue registrada','success'),carrito=[],carritoVerificado=[],localStorage.clear())
    :(Swal.fire({
      icon: 'error',
      title: 'Ok, aún no está listo o no te has logueado',
      text: 'Mantendremos tus productos! Te redirigiremos al carrito',
    }),preciofinal=0,carritoVer())
  }
)}


document.getElementById('kokemon').addEventListener("click", api)

function api(el){
  let name = document.getElementById('searchPoke').value;
  lista.innerHTML="";carrusel.innerHTML="";filtros.innerHTML="";
  fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
   .then(response => response.json()).
   then(data => {
  let poke = document.createElement('div');
        poke.innerHTML= `
          <div class="card bg-dark d-inline-block border border-warning" style="width: 18rem;text-align: center;mx-auto" id="tarj">
              <img src="${data.sprites.other["official-artwork"].front_default}" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title red" id="poke"> Pokemon: ${data.name}</h5>
                <h5 class="card-title red" id="poke"> Precio: ${data.base_experience}</h5>
                <button id="${data.id}" onclick="Pokeinventario()"class="btn btn-primary">Ver en el Pokeinventario</button>
                </div>
           </div> 
        `
        
        lista.append(poke);
        let img =  data.sprites.other["official-artwork"].front_default;
        Pokemones.push(new Pokemon(data.id,data.name,data.base_experience,img));
        localStorage.setItem("pokemones",JSON.stringify(Pokemones));
        name.value="";
      }).catch((err) =>{Swal.fire({
      icon: 'error',
      title: "KOKEMON'T",
      text: 'Parece que ese pokemon no existe',
  })
  ;
  console.log(err)});
  el.preventDefault();
  }
 
 
  
const audio = new Audio("https://www.fesliyanstudios.com/play-mp3/6253");
const buttons = document.querySelectorAll("button");

buttons.forEach(button => {
  button.addEventListener("click", () => {
    if (button.className==="btn btn-primary" || button.className==="btn btn-success"){
    audio.play();}
  });
});




/////////////////////////////////// FILTRADO POR PRECIOS///////////////////////////////

// descendente
filtroPrecioDesc.addEventListener('click', ()=>{carrusel.innerHTML ="";lista.innerHTML ="";
  let productoss;
  let productosDelInventario=JSON.parse(localStorage.getItem("productos"));
  productoss = productosDelInventario.sort((a,b)=>a.precio - b.precio); 
  carrusel.classList.remove('d-inline');
  carrusel.innerHTML = `<a class="navbar-brand" style="width:10%;height: 10%;" href="index.html"><button class="btn btn-warning">Volver</button></a>
  <br><br>  <h1 class="text-warning mx-auto"> Nuestros productos ordenados de Menor a Mayor Precio </h1>`
  let filtro= document.getElementById('filtroPrecio'); filtro.innerHTML="";
  productoss.forEach((item)=>{
  let div = document.createElement('div');div.classList.add('d-inline-block');div.classList.add('mx-2');div.classList.add('m-t--1');
  div.innerHTML= `
  <div class="card bg-dark d-inline-block border border-warning" style="width: 18rem;text-align: center;margin-left :5%;margin-top :5%;" id="tarj">
      <img src="icon/poke.png" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title red" id="nombreProd1"> Producto: ${item.nombre}</h5>
        <h6 class="card-text" id="idProducto" type="number">id: ${item.id}</h6>
        <h6 class="card-text" id="precio1" type="number" >$ ${item.precio}</h6>
        <button id="${item.id}" class="btn btn-primary">Agregar</button>
      </div>
   </div> 
`
  lista.append(div);
  let boton = document.getElementById(`${item.id}`);
  boton.addEventListener('click',() => comprar(item.id));
});
})

// ascendente
filtroPrecioAsc.addEventListener('click', ()=>{
 carrusel.innerHTML ="";lista.innerHTML ="";
 let productoss;
 let productosDelInventario=JSON.parse(localStorage.getItem("productos"));
 productoss = productosDelInventario.sort((a,b)=>b.precio - a.precio); 
 carrusel.classList.remove('d-inline');
 carrusel.innerHTML = `<a class="navbar-brand" style="width:10%;height: 10%;" href="index.html"><button class="btn btn-warning">Volver</button></a>
 <br><br>  
 <h1 class="text-warning mx-auto"> Nuestros productos ordenados de Mayor a Menor Precio </h1>
 `
 let filtro= document.getElementById('filtroPrecio'); filtro.innerHTML="";
 productoss.forEach((item)=>{
 let div = document.createElement('div');div.classList.add('d-inline-block');div.classList.add('mx-2');div.classList.add('m-t--1');
 div.innerHTML= `
 <div class="card bg-dark d-inline-block border border-warning" style="width: 18rem;text-align: center;margin-left :5%;margin-top :5%;" id="tarj">
    <img src="icon/poke.png" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title red" id="nombreProd1"> Producto: ${item.nombre}</h5>
      <h6 class="card-text" id="idProducto" type="number">id: ${item.id}</h6>
      <h6 class="card-text" id="precio1" type="number" >$ ${item.precio}</h6>
      <button id="${item.id}" class="btn btn-primary">Agregar</button>
    </div>
 </div>`
lista.append(div);
let boton = document.getElementById(`${item.id}`);
boton.addEventListener('click',() => comprar(item.id));
});
})

/////////////////////////////////// FILTRADO POR NOMBRE///////////////////////////////

//ascendente
filtroNombreAsc.addEventListener('click',() =>{
  let productoss;
  let productosDelInventario=JSON.parse(localStorage.getItem("productos"));
  productoss = productosDelInventario.sort((a,b)=>{
  if (a.nombre.toLowerCase()>b.nombre.toLowerCase()){return 1}
  else if (a.nombre.toLowerCase()<b.nombre.toLowerCase()){return -1}
  else {return 0}})

  carrusel.classList.remove('d-inline');
  carrusel.innerHTML = `
  <a class="navbar-brand" style="width:10%;height: 10%;" href="index.html"><button class="btn btn-warning">Volver</button></a>
  <br><br>  <h1 class="text-warning mx-auto"> Nuestros productos ordenados alfabéticamente</h1>
  `
  let filtro= document.getElementById('filtroPrecio'); filtro.innerHTML="";
  productoss.forEach((item)=>{
  let div = document.createElement('div');div.classList.add('d-inline-block');div.classList.add('mx-2');div.classList.add('m-t--1');
  div.innerHTML= `<div class="card bg-dark d-inline-block border border-warning" style="width: 18rem;text-align: center;margin-left :5%;margin-top :5%;" id="tarj">
   <img src="icon/poke.png" class="card-img-top" alt="...">
    <div class="card-body">
    <h5 class="card-title red" id="nombreProd1"> Producto: ${item.nombre}</h5>
    <h6 class="card-text" id="idProducto" type="number">id: ${item.id}</h6>
    <h6 class="card-text" id="precio1" type="number" >$ ${item.precio}</h6>
    <button id="${item.id}" class="btn btn-primary">Agregar</button>
    </div>
  </div>`
  lista.append(div);
  let boton = document.getElementById(`${item.id}`);
  boton.addEventListener('click',() => comprar(item.id));})
})


//descendente
filtroNombreDesc.addEventListener('click',() =>{
let productoss;
let productosDelInventario=JSON.parse(localStorage.getItem("productos"));
productoss = productosDelInventario.sort((a,b)=>{
if (b.nombre.toLowerCase()>a.nombre.toLowerCase()){return 1}
else if (b.nombre.toLowerCase()<a.nombre.toLowerCase()){return -1}
else {return 0}})
carrusel.classList.remove('d-inline');
carrusel.innerHTML = `<a class="navbar-brand" style="width:10%;height: 10%;" href="index.html"><button class="btn btn-warning">Volver</button></a>
<br><br>  
<h1 class="text-warning mx-auto"> Nuestros productos ordenados alfabéticamente</h1>`
let filtro= document.getElementById('filtroPrecio'); filtro.innerHTML="";
productoss.forEach((item)=>{
let div = document.createElement('div');div.classList.add('d-inline-block');div.classList.add('mx-2');div.classList.add('m-t--1');
div.innerHTML= `
  <div class="card bg-dark d-inline-block border border-warning" style="width: 18rem;text-align: center;margin-left :5%;margin-top :5%;" id="tarj">
    <img src="icon/poke.png" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title red" id="nombreProd1"> Producto: ${item.nombre}</h5>
      <h6 class="card-text" id="idProducto" type="number">id: ${item.id}</h6>
      <h6 class="card-text" id="precio1" type="number" >$ ${item.precio}</h6>
      <button id="${item.id}" class="btn btn-primary">Agregar</button>
    </div>
   </div>`
lista.append(div);
let boton = document.getElementById(`${item.id}`);
boton.addEventListener('click',() => comprar(item.id));
})
})



////////////////////////////////////////////////////// PROMOCIÓN ASINCRÓNICA DE DESCUENTO//////////////////////////////
setTimeout (()=>{
  Swal.fire({
    title: '¡Aprovechá nuestra promocion!',
    text: "clickéa para acceder a un descuento de 10% porque somos re piolas",
    icon: 'success',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: 'black',
    confirmButtonText: 'Me interesa!'
  }).then((result) => {
    if (result.isConfirmed) {dcto=true; Toastify({
      text: "Descuento de 10% guardado",
      duration: 3000,
      gravity: "bottom", // `top` or `bottom`
      position: "center", // `left`, `center` or `right`
      style: {
        background: "green",padding:"50px"
      },
    }).showToast();console.log(dcto)}
    else{dcto=false;
    console.log(dcto)}}
)},60000);
