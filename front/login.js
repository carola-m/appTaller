const email$$=document.querySelector(".b-form__email")
const password$$=document.querySelector(".b-form__passwd")
const submit$$=document.querySelector(".b-form__submit")


const login= async() => {
    let userData ={
        email: email$$.value,
        password: password$$.value
      
    }
    const response = await fetch('http://localhost:5000/clientes/login', {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(userData), // data can be `string` or {object}!
        headers:{
          'Content-Type': 'application/json',
          
        } 
        })
    const resJson = await response.json()

        if (resJson.token) {
            localStorage.setItem("token", resJson.token)
            location.href = "./sections.html"
        }
        else {
            const p$$ = document.createElement("p")
            p$$.innerHTML = `Usuario no registrado.<br><a href="./register.html">Registrarse</a>`
            document.body.appendChild(p$$)
        }
    

     
      
}

submit$$.addEventListener("click",login)




