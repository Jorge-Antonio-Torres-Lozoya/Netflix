document.getElementById("btnLogin").addEventListener("click", validateLogin)

const USER =
{
    email: "jorge@gmail.com",
    password: 123
}

function validateLogin() {
    let inptEmail = document.getElementById("inputEmail").value;
    let inptPassword = document.getElementById("inputPassword").value;
    if(inptEmail==USER.email&&inptPassword==USER.password){
        window.location.href="../html/users.html"
    }
    else{
        alert("Los datos que ingresaste son incorrectos, favor de ingresar su email y contraseña correctamente"+"\n"
        + "El correo es jorge@gmail.com y la contraseña es: 123")
    }
}

