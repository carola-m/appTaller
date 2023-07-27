const form$$=document.querySelector(".b-form")
const email$$=document.querySelector(".b-form__email")
const password$$=document.querySelector(".b-form__passwd")
const submit$$=document.querySelector(".b-form__submit")
const name$$=document.querySelector(".b-form__fullname")
const phone$$=document.querySelector(".b-form__phone")
const address$$=document.querySelector(".b-form__address")


const register= async() => {
    let userData ={
        email: email$$.value,
        password: password$$.value,
        nombre_completo: name$$.value,
        telefono: phone$$.value,
        direccion: address$$.value
      
    }
    const response = await fetch('http://localhost:5000/clientes/register', {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(userData), // data can be `string` or {object}!
        headers:{
          'Content-Type': 'application/json'
        } 
        })
    const resJson = await response.json()
     if(resJson._id){
        
        const p$$ = document.createElement("p");
        p$$.innerHTML=`Haz <a href="./index.html">LOGIN</a> con el usuario registrado<br>`
        form$$.append(p$$)
        //document.body.appendChild(p$$)
      }
      else{
        alert("Email o password no pasan validacion\nEj. password: Abcd123$")
      }
    

     
      
}

submit$$.addEventListener("click",register)



