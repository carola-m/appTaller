

const allcoches$$ = document.querySelector(".allcoches");
const allservicios$$ = document.querySelector(".allservicios");
const addcoche$$ = document.querySelector(".addcoche");
const deletecoche$$=document.querySelector(".deletecoche")
// const moviebytittle$$ = document.querySelector(".moviebytitle");

let numpagina=1;
let tipo="";
const maincontainer$$=document.createElement("div")
const container$$ = document.createElement("div")
document.body.appendChild(maincontainer$$);



const getallcoches = async (page)=>{
    if (tipo != "coches"){numpagina=1}
    
    maincontainer$$.innerHTML=``;
    container$$.innerHTML=``;
    let token = localStorage.getItem ("token");
    const call = await fetch(`http://localhost:5000/coches?page=${page}&limit=5`, {
        method: 'GET', // or 'PUT'
        body: JSON.stringify(), // data can be `string` or {object}!
        
        headers: { 'Authorization': 'Bearer '+ token}
      });
    const allcochesJson = await call.json();
    
    tipo="coches"
    printresults(allcochesJson,tipo)
  

}

const getallservicios = async (page)=>{
    if (tipo != "servicios"){numpagina=1}
    
    maincontainer$$.innerHTML=``;
    container$$.innerHTML=``;
    let token = localStorage.getItem ("token");
    const call = await fetch(`http://localhost:5000/servicios?page=${page}&limit=5`, {
        method: 'GET', // or 'PUT'
       
        headers:{
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+ token,
        } 
        })
    const allserviciosJson = await call.json();
    tipo="servicios"
    
    printresults(allserviciosJson,tipo);

}
const printresults = async (allJson,tipo)=>{
    //console.log(tipo)
    if (tipo === "coches"){
        const call = await fetch("http://localhost:5000/clientes/all");
        const clientesJson= await call.json();

       
        container$$.className="container"
        allJson.results.forEach(coche => {
            
            let nombrecliente="";
            let telefonocliente="";
            clientesJson.forEach(cochecliente => {
                console.log(cochecliente.coches)
                if (cochecliente.coches.includes(coche._id)){
                    nombrecliente=cochecliente.nombre_completo;
                    telefonocliente=cochecliente.telefono;
                }     
            });
           

            const item$$=document.createElement("div");
            item$$.className="item"
            //console.log(item$$)
            item$$.innerHTML=`<span> Matricula: ${coche.matricula}</span>
            <span> Marca: ${coche.marca}</span>
            <span >Modelo: ${coche.modelo} </span>
            <span> Year: ${coche.year}</span>
            <img src="${coche.imagen}">
            <span> Notas: ${coche.notas}</span>
            <span >Cliente: ${nombrecliente} </span>
            <span >Contacto: ${telefonocliente} </span>
            `
            //console.log(screen$$)
            container$$.appendChild(item$$)
            
            });
            const nav$$=document.createElement("nav")
            nav$$.className="b-nav"
            const previo$$= document.createElement("button")
            const siguiente$$= document.createElement("button")
            const actualpagina$$=document.createElement("p")

            previo$$.textContent="PREVIO"
            siguiente$$.textContent="SIGUIENTE"
            actualpagina$$.textContent=`Pagina: ${numpagina}`
            nav$$.appendChild(previo$$)
            nav$$.appendChild(actualpagina$$)
            nav$$.appendChild(siguiente$$)
            
            
            const resumendatos$$=document.createElement("p")
            resumendatos$$.className="b-nav__p"
            let ultimoamostrar=numpagina*allJson.info.limit;
            if (ultimoamostrar > allJson.info.numCoches){
                ultimoamostrar=allJson.info.numCoches;
            }
            let primeroamostrar = (numpagina-1)*(allJson.info.limit)+1
            resumendatos$$.innerHTML=`Viendo resultados del ${primeroamostrar} al ${ultimoamostrar}<br>
            Resultados totales: ${allJson.info.numCoches}`
            maincontainer$$.appendChild(container$$)
            maincontainer$$.appendChild(nav$$)
            maincontainer$$.appendChild(resumendatos$$)
           
            
            if (numpagina === 1){
            }
            else{
                previo$$.addEventListener("click",function(){getallcoches(numpagina=numpagina-1)})
            }
            if (numpagina === allJson.info.maxpages){

            }
            else{
                siguiente$$.addEventListener("click",function(){getallcoches(numpagina=numpagina+1)})
            }

           
    }
    if (tipo === "servicios"){
        console.log(allJson)
        container$$.className="container"
        allJson.results.forEach(servicio => {
            const item$$=document.createElement("section");
            item$$.className="item"
            item$$.innerHTML=`<span >Id: ${servicio._id}</span>
            <span >Tipo: ${servicio.tipo}</span>
            <span >Kms.: ${servicio.kms}</span>
            <span >Fecha.: ${servicio.fecha} </span>
            <span>Notas.: ${servicio.notas} </span>`
            container$$.appendChild(item$$)
            
            
            });
            
            const nav$$=document.createElement("nav")
            nav$$.className="b-nav"
            const previo$$= document.createElement("button")
            const siguiente$$= document.createElement("button")
            const actualpagina$$=document.createElement("p")
            previo$$.textContent="PREVIO"
            siguiente$$.textContent="SIGUIENTE"
            actualpagina$$.textContent=`Pagina: ${numpagina}`
            nav$$.appendChild(previo$$)
            nav$$.appendChild(actualpagina$$)
            nav$$.appendChild(siguiente$$)
            container$$.appendChild(nav$$)
            
            const resumendatos$$=document.createElement("p")
            resumendatos$$.className="b-nav__p"
            let ultimoamostrar=numpagina*allJson.info.limit;
            if (ultimoamostrar > allJson.info.numServicios){
                ultimoamostrar=allJson.info.numServicios;
            }
            let primeroamostrar = (numpagina-1)*(allJson.info.limit)+1
            resumendatos$$.innerHTML=`Viendo resultados del ${primeroamostrar} al ${ultimoamostrar}<br>
            Resultados totales: ${allJson.info.numServicios}`
            maincontainer$$.appendChild(container$$)
            maincontainer$$.appendChild(nav$$)
            maincontainer$$.appendChild(resumendatos$$)
           
            if (numpagina === 1){
            }
            else{
                previo$$.addEventListener("click",function(){getallservicios(numpagina=numpagina-1)})
            }
            if (numpagina === allJson.info.maxpages){

            }
            else{
                siguiente$$.addEventListener("click",function(){getallservicios(numpagina=numpagina+1)})
            }

    }
}

const addcoche = ()=>{
    maincontainer$$.innerHTML=``;
    container$$.innerHTML=``;
    const form$$=document.createElement("form");
    form$$.id="addform";
    
    form$$.innerHTML=`<span>Matricula: </span><input type="text" class="matricula" placeholder="Inserta matricula"><br>
    <span>Marca:  </span><input type="text" class="marca" placeholder="Inserta marca"><br>
    <span>Modelo: </span> <input type="text" class="modelo" placeholder="Inserta modelo"><br>
    <span>Año: </span><input type="number" class="year" placeholder="Inserta año"><br> 
    <span>Observaciones:</span><input type="text" class="notas" placeholder="Descripcion del problema"><br>
    <span>Imagen: </span><input type="file" class="imagen" placeholder="Inserta imagen"><br>
    <input type="submit" class="submitcoche">`

    
    maincontainer$$.appendChild(form$$);
    const sendcocheButton$$=document.querySelector(".submitcoche");
    console.log(sendcocheButton$$)
    sendcocheButton$$.addEventListener("click",sendNewcoche)
}

const sendNewcoche = async (event)=>{
    event.preventDefault();
    const matricula$$=document.querySelector(".matricula")
    const marca$$=document.querySelector(".marca")
    const modelo$$=document.querySelector(".modelo")
    const year$$=document.querySelector(".year")
    const notas$$=document.querySelector(".notas")
    const foto$$=document.querySelector(".imagen")
    
    
    
    let newcoche = new FormData();
    //let newcoche = new FormData(document.querySelector("#addform"));
    newcoche.append("matricula",matricula$$.value)
    newcoche.append("marca",marca$$.value)
    newcoche.append("modelo",modelo$$.value)
    newcoche.append("year",year$$.value)
    newcoche.append("notas",notas$$.value)
    newcoche.append("imagen",foto$$.files[0])


   
     
    console.log(newcoche)
    
    let token = localStorage.getItem ("token");
    const call = await fetch("http://localhost:5000/coches", {
        method: 'POST',
        
        headers: { 
            
            'Authorization': 'Bearer '+ token,
       
        },
        body: newcoche
        //body: newcoche
      })
      const resultado = await call.json();
    
      maincontainer$$.innerHTML=`<h3 class="cochecreado">Coche creado: ${resultado.matricula}</h3>`;
      numpagina=1;
      printresults();
}
const deletecoche = async ()=>{
    const call= await fetch("http://localhost:5000/coches/all")
    const allcochesJson = await call.json();
    console.log(allcochesJson)
    maincontainer$$.innerHTML=``;
    container$$.innerHTML=``
    const select$$=document.createElement("select")
    allcochesJson.forEach(coche => {
        const option$$=document.createElement("option")
        option$$.value=coche._id;
        option$$.textContent=`Marca: ${coche.marca}  Modelo: ${coche.modelo}  Matricula: ${coche.matricula}`
        select$$.appendChild(option$$)
        
    });
    maincontainer$$.appendChild(select$$)
    select$$.addEventListener("change",function(){cocheaborrar(event)})
    numpagina=1;
}
const cocheaborrar = async ()=>{
    container$$.innerHTML=``;
    console.log(event.target.value)
    const call = await fetch(`http://localhost:5000/coches/id/${event.target.value}`)
    const cocheJson= await call.json();
    const coche$$=document.createElement("h4");
    coche$$.innerHTML=`Coche a borrar: ${cocheJson.marca} - ${cocheJson.modelo} - con matricula: ${cocheJson.matricula}<br>
    <input type="button" class="borrarcoche" value="CONFIRMAR">`;
    maincontainer$$.appendChild(coche$$);
    const confirmar$$=document.querySelector(".borrarcoche");
    confirmar$$.addEventListener("click",function(){borrarCoche(cocheJson._id)});
    numpagina=1;
    
}
const borrarCoche = async (id)=>{
    maincontainer$$.innerHTML=``;
    const call=await fetch(`http://localhost:5000/coches/${id}`,{
        method: 'DELETE'
    })
    const borrarJson= await call.json();
    if (borrarJson){
        const coche$$=document.createElement("h3");
        coche$$.innerHTML=`Coche borrado`;
        maincontainer$$.appendChild(coche$$);
    }
    tipo="borrar"
    numpagina=1;
}


allcoches$$.addEventListener("click",function(){getallcoches(numpagina)});
allservicios$$.addEventListener("click",function(){getallservicios(numpagina)});
addcoche$$.addEventListener("click",addcoche);
deletecoche$$.addEventListener("click",deletecoche)
// moviebytittle$$.addEventListener("change",function(){getmoviesbyid(moviebytittle$$.value)});





