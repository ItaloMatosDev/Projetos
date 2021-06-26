// requisito button-login
const btnLogin = document.getElementById('button-login');
const inputEmailTel = document.querySelector('#user-email-phone');
function alertLogin() {
  alert(inputEmailTel.value);
}

btnLogin.addEventListener('click', alertLogin);

function validar() {
  const validInfoElem = document.querySelectorAll('.validInfo');
  let valor;
  for (let index = 0; index < validInfoElem.length; index += 1) {
    if (validInfoElem[index].value === '') {
      valor = false;
    } else valor = true;
  }
  return valor;
}
// requisito genero personalizado (18)
const newGenderElem = document.getElementById('form-container');
const newGenderInput = document.createElement('input');
const genderRadio = document.getElementById('generico');

genderRadio.addEventListener('click', () => {
  newGenderElem.appendChild(newGenderInput);
  newGenderInput.setAttribute('type', 'text');
  newGenderInput.setAttribute('name', 'gender-custom');
  newGenderInput.setAttribute('placeholder', 'Gênero (opcional)');
});

const rightContent = document.querySelector('.right-content');
// referencia: http://rozolin.blogspot.com/2013/07/como-pegar-o-valor-do-radio-selecionado.html
function getRadioValor() {
  const rads = document.getElementsByName('gender');
  for (let i = 0; i < rads.length; i += 1) {
    if (rads[i].checked) {
      return rads[i].value;
    }
  }
  return null;
}
// requisito 20 - mostrar informacoes cadastradas
function changeContent() {
  const information = document.querySelectorAll('.validInfo');
  const informationBirthDate = document.querySelector('#birthdate').value;
  const informationGen = getRadioValor();
  while (rightContent.firstChild) {
    rightContent.removeChild(rightContent.firstChild);
  }
  const createText = document.createElement('p');
  createText.innerText = `Olá, ${information[0].value} ${information[1].value}
  ${information[2].value}
  ${informationBirthDate}
  ${informationGen}`;
  rightContent.appendChild(createText);
}

// requisito facebook-register (18)
const buttonRegister = document.querySelector('#facebook-register');
buttonRegister.addEventListener('click', () => {
  const formCont = document.getElementById('form-container');
  const divElement = document.createElement('p');
  divElement.innerText = 'Campos inválidos';
  if (!validar()) {
    formCont.appendChild(divElement);
  } else changeContent();
});
