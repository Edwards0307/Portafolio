let menuVisible = false;
//Función que oculta o muestra el menu
function mostrarOcultarMenu() {
  if (menuVisible) {
    document.getElementById("nav").classList = "";
    menuVisible = false;
  } else {
    document.getElementById("nav").classList = "responsive";
    menuVisible = true;
  }
}

function seleccionar() {
  //oculto el menu una vez que selecciono una opcion
  document.getElementById("nav").classList = "";
  menuVisible = false;
}

//Detecto el scrolling para aplicar la animacion de la barra de habilidades
window.onscroll = function () {
  efectoHabilidades();
};

//Enviar Correo
const btn = document.getElementById("button");
const nombre = document.getElementById("from_name");
const mensaje = document.getElementById("message");
const correo = document.getElementById("user_email");

document.getElementById("form").addEventListener("submit", function (event) {
  event.preventDefault();

  btn.value = "Enviando...";

  const serviceID = "default_service";
  const templateID = "contact_form";

  emailjs.sendForm(serviceID, templateID, this).then(
    () => {
      btn.value = "Correo enviado con exito";
      alert("Enviado!");
      nombre.value = "";
      mensaje.value = "";
      correo.value = "";
    },
    (err) => {
      btn.value = "Correo enviado con exito";
      alert(JSON.stringify(err));
    }
  );
});
