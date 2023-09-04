/**@format */

//import { emailValidation } from "./utils/mail.mjs";
function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalclose = document.querySelector(".close");
const modalbg = document.querySelector("#modal-1");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const submit = document.querySelector(".btn-submit");
const modalbg2 = document.querySelector("#modal-2");
const form = Array.from(document.getElementsByName("reserve")[0]);

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}
//close modal event
modalclose.addEventListener("click", closeModal);

//close modal form
function closeModal() {
  modalbg.style.display = "none";
}
//Validation d'un courriel
function checkMail(unMail) {
  const regEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return !regEx.test(unMail) ? false : true;
}
//pour fermer la première modale en cliquant en dehors de celui-ci
modalbg.addEventListener("click", event => {
  if (!event.target.closest(".content")) {
    closeModal();
  }
})
//variable pour éviter de générer en boucle
let errorDone = {
  first: false,
  last: false,
  email: false,
  birthdate: false,
  quantity: false,
  location: false,
  checkbox1: false
}
//variable pour éviter de supprimer en boucle
let supprErrorDone = {
  first: false,
  last: false,
  email: false,
  birthdate: false,
  quantity: false,
  location: false,
  checkbox1: false
}
//Objet contenant tous les messages d'erreur
const Test = {
  first: "Renseignez un prénom correct",
  last: "Renseignez un nom de famille correct",
  email: "Renseignez une adresse correcte",
  birthdate: "Renseignez une date",
  quantity: "Renseignez une quantité",
  location: "Veuillez sélectionner un tournoi",
  checkbox1: "Veuillez accepter les conditions d'utilisation"
}
//Génère un message d'erreur
function genererErrorMsg(key) {
  if (errorDone[key] == false) {
    const localError = document.createElement("p");
    unControle = document.getElementsByName(`${key}`);
    localError.innerText = Test[key];
    localError.classList.add("errorMsg");
    const parent = unControle[0].parentElement;
    parent.appendChild(localError);
    errorDone[key] = true;
  }
}
//Supprimer message d'erreur s'il y en a
function supprErrorMsg(key) {
  const formData = document.getElementsByClassName("formData");
  const parent = document.getElementsByName(`${key}`)[0].parentElement;
  const lastChild = parent.lastChild;
  const check2 = document.getElementsByClassName("checkbox2-label");
  for (let i = 0; i < formData.length; i++) {
    if (lastChild != check2[1] && lastChild != check2[0] && supprErrorDone[key] == false) {
      lastChild.remove();
      supprErrorDone[key] = true;
    }
  }
}

//Ecouteur d'évènement sur le bouton "submit"
submit.addEventListener("click", function (event) {
  event.preventDefault();
  const formData = getFormData();
  const Validation = validationForm(formData);
  if (Validation) {
    closeModal();
    modalbg2.style.display = "block";
  }
});
//Vérification des données
const validationForm = (data) => {
  let errors = 0;
  for (const key in data) {
    const input = document.querySelector(`#${key}`);
    switch (key) {
      case 'first':
        if (data[key].length >= 2) {
          input.style.borderColor = 'green';
          supprErrorMsg(key);
        } else {
          genererErrorMsg(key);
          errors++;
          input.style.borderColor = 'red';
        }

        break
      case 'last':

        if (data[key].length >= 2) {
          input.style.borderColor = 'green';
          supprErrorMsg(key);
        } else {
          errors++;
          input.style.borderColor = 'red';
          genererErrorMsg(key);
        }

        break
      case 'email':

        if (!checkMail(data[key])) {
          errors++;
          genererErrorMsg(key);
          input.style.borderColor = 'red';

        } else {
          input.style.borderColor = 'green';
          supprErrorMsg(key);
        }

        break
      case 'birthdate':

        if (!data[key]) {
          errors++;
          input.style.borderColor = 'red';
          genererErrorMsg(key);
        } else {
          input.style.borderColor = 'green';
          supprErrorMsg(key);
        }

        break
      case 'quantity':

        if (!data[key]) {
          errors++;
          input.style.borderColor = 'red';
          genererErrorMsg(key);
        } else {
          input.style.borderColor = 'green';
          supprErrorMsg(key);
        }

        break
      case 'location':

        if (data[key] == "on" || data[key] == null) {
          errors++;
          genererErrorMsg(key);
        } else {
          supprErrorMsg(key);
        }

        break
      case 'checkbox1':
        if (data[key] == false) {
          errors++;
          genererErrorMsg(key);
          console.log(data[key]);
        } else {
          supprErrorMsg(key);
        }

        break

      default:
        return 0
    }

  }
  return errors != 0 ? false : true;
}
// Récupération des données des champs du formulaire
function getFormData() {
  return {
    first: document.querySelector('#first').value,
    last: document.querySelector('#last').value,
    email: document.querySelector('#email').value,
    birthdate: document.querySelector('#birthdate').value,
    quantity: document.querySelector('#quantity').value,
    location: document.querySelector('.checkbox-input:checked')
      ? document.querySelector('.checkbox-input:checked').value
      : null,
    checkbox1: document.querySelector('#checkbox1').checked
  }
}