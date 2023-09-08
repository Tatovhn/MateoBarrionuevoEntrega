// constructor de objeto producto
class Producto{
  constructor(id,nombre,precio){
  this.id=id;
  this.nombre = nombre;
  this.precio = precio;
} 
}
// constructor de objeto pokemon
class Pokemon{
  constructor(id,nombre,precio,img){
  this.id=id;
  this.nombre = nombre;
  this.precio = precio;
  this.img=img;
} 
}

// comienzo de el arreglo de productos
let Productos =[
  {id:2,
   nombre:"pokebola",
   precio: 20
  } ,
  {id:3,
   nombre:"pokedex",
   precio: 300
    } ,
   {id:4,
   nombre:"pokemedicina",
   precio: 456
   } ,
   {id:5,
   nombre:"pokecrap",
   precio: 23
   } ,
   {id:6,
   nombre:"vendas",
   precio: 4
   } ,
   {id:7,
   nombre:"peine",
   precio: 344
   } ,
   {id:8,
   nombre:"alimento",
   precio: 4563
   } ,
   {id:9,
   nombre:"antiparasitario",
   precio: 344
   }
]

localStorage.getItem("productos")?Productos=JSON.parse(localStorage.getItem("productos")):localStorage.setItem("productos",JSON.stringify(Productos));
let Pokemones=[];
localStorage.getItem("pokemones")?Pokemones=JSON.parse(localStorage.getItem("pokemones")):localStorage.setItem("pokemones",JSON.stringify(Pokemones));

// carrusel
let carrusel = document.getElementById("carrusel");
let carrusel1 = document.getElementById("tarjeta1");
let divcar1 = document.createElement("div");
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


let carrusel2 = document.getElementById("tarjeta2");
let divcar2 = document.createElement("div");
let divcar2prod= divcar1prod + 1;

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

let carrusel3 = document.getElementById("tarjeta3");
let divcar3 = document.createElement("div");
let divcar3prod= divcar2prod + 1;

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

let dcto = false;
let carrito=[];
const ProductosFinal =[];
Productos.push(new Producto(1,"prueba",200));
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

// boton ingresar producto nuevo
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

// DOM para mostrar las tarjetas con productos
let lista = document.getElementById('lista');
let template = document.getElementById('resultados');

// boton buscar
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

// mostrar todos los productos
function inventario(){
  productosDelInventario=JSON.parse(localStorage.getItem("productos"));
  lista.innerHTML="";
  carrusel.innerHTML="";
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

function Pokeinventario(){
  lista.innerHTML="";carrusel.innerHTML="";
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

//agregar al array de carrito provisorio el producto
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



// vaciar carrito
function carritoVaciar(){
  if(localStorage.length>0 || carrito.length>0){
  localStorage.clear();;
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

function carritoVer(){
 if (carrito.length>0){lista.innerHTML="";carrusel.innerHTML="";
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
// mostrar el carrito guardado, no está funcionando
else if(carrito.length=0 && localStorage.length>0){
  lista.innerHTML="";carrusel.innerHTML="";
  carrito= JSON.parse(localStorage.getItem("carritoVerificado"));
console.log(typeof carrito);
carrito.forEach((item)=>{
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
  carrito.splice(quitar,1); Toastify({
    text: "producto quitado del carrito",
    duration: 3000,
    gravity: "bottom", // `top` or ``
    position: "center", // `left`, `center` or `right`
    style: {
      background: "red",color: "white",padding: "50px"
    },
    
  }).showToast();lista.innerHTML = "";
  quitarSound.play();
  console.log(carrito);
return carrito}

// limpiar la pantalla
let limpieza = document.getElementById("clear");
limpieza.onclick = () => {lista.innerHTML="";carrusel.innerHTML="";}
let productosCash = "";

let preciofinalStorage = [];let preciofinal =0

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
}).showToast();

}



// mostrar productos del carrito verificado y precio final
function pagar(){
if (carrito.length>0 && dcto){lista.innerHTML="";carrusel.innerHTML="";
carrito.forEach((item)=>{
 preciofinal = preciofinal + parseInt(item.precio);
 productosCash =  productosCash + item.nombre +" | ";
})
preciofinal= preciofinal - ((preciofinal*10)/100);
//la tarjeta con el precio total
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
 else if ((carrito.length>0 && !dcto) || carrito.length<=0 && localStorage.length>0){lista.innerHTML="";carrusel.innerHTML="";
JSON.parse(localStorage.getItem("carritoVerificado")).forEach((item)=>{
 
 preciofinal = preciofinal + parseInt(item.precio);
 productosCash =  productosCash + item.nombre +" | ";

   })
//la tarjeta con el precio total
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
    result.isConfirmed? (Swal.fire('LISTO','Tu compra fue registrada','success'),carrito=[],carritoVerificado=[],localStorage.clear(),location.reload())
    :Swal.fire({
      icon: 'error',
      title: 'Ok, aún no está listo',
      text: 'Mantendremos tus productos en el carrito',
      footer: '<button onclick="carritoVer()">Ver carrito</button>'
    })
  }
)}



document.getElementById('kokemon').addEventListener("click", api)

function api(el){
  let name = document.getElementById('searchPoke').value;
  lista.innerHTML="";carrusel.innerHTML="";
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
  )},30000);

const audio = new Audio("https://www.fesliyanstudios.com/play-mp3/6253");
const buttons = document.querySelectorAll("button");

buttons.forEach(button => {
  button.addEventListener("click", () => {
    if (button.className==="btn btn-primary" || button.className==="btn btn-success"){
    audio.play();}
  });
});

const quitarSound = new Audio("https://www.fesliyanstudios.com/play-mp3/7017");

const pagoSound = new Audio("https://soundboardguy.com/wp-content/uploads/2022/06/ka-ching-1.mp3");
