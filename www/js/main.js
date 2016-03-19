const overlay = document.getElementsByClassName('overlay')[0];
const popup = document.getElementsByClassName('popup')[0];
const closeBtn = document.getElementsByClassName('popup__close-button')[0];
const orderBtn = document.getElementsByClassName('order-button')[0];
const submit = document.getElementsByClassName('form__submit')[0];
const successmsg = document.getElementsByClassName('_successmsg')[0];
const popupSuccess = document.getElementsByClassName('popup__message')[0];
const popupError = document.getElementsByClassName('popup__error')[0];
const form = document.getElementById('sendMailForm');
const nameInput = document.getElementById('name');
const contactInput = document.getElementById('phone');
const messageImput = document.getElementById('message');
const is_open = ' _is-open';
function overlayShow() {
  overlay.className = overlay.className.replace(is_open, '');
  overlay.className = overlay.className + is_open;
}
function overlayHide() {
  overlay.className = overlay.className.replace(is_open, '');
}
function successmsgShow() {
  successmsg.style.display = 'flex';
}
function successmsgHide() {
  successmsg.style.display = 'none';
}
function errorShow() {
  popupSuccess.style.display = 'none';
  popupError.style.display = 'block';
}
function errorHide() {
  popupSuccess.style.display = 'block';
  popupError.style.display = 'none';
}
function popupShow() {
  popup.style.display = 'flex';
}
function popupHide() {
  popup.style.display = 'none';
}
function defaultSubmit() {
  submit.value = 'Мотор!';
  submit.className = submit.className.replace(' _error', '');
}
function submitError() {
  submit.className = submit.className.replace(' _error', '');
  submit.className = submit.className + ' _error';
}
function clearInputs() {
  nameInput.value = '';
  contactInput.value = '';
  messageImput.value = '';
}
overlay.addEventListener('click', function() {
  overlayHide();
  defaultSubmit();
});
closeBtn.addEventListener('click', function() {
  overlayHide();
  defaultSubmit();
});
orderBtn.addEventListener('click', overlayShow);
orderBtn.addEventListener('click', successmsgHide);
orderBtn.addEventListener('click', function() {
  popupShow();
  errorHide();
});
orderBtn.addEventListener('click', () => {
  popupShow();
  errorHide();
});
popup.addEventListener('click', e => e.stopPropagation());

form.addEventListener('submit', function(e) {
  e.preventDefault();
  var url = form.getAttribute('action');
  var method = form.getAttribute('method');

  var nameInputName = nameInput.getAttribute('name');
  var nameInputValue = nameInput.value;

  var contactInputName = contactInput.getAttribute('name');
  var contactInputValue = contactInput.value;

  var messageImputName = messageImput.getAttribute('name');
  var messageImputValue = messageImput.value;

  var data = {
    name: nameInputValue,
    phone: contactInputValue,
    message: messageImputValue
  };

  nameInput.addEventListener('click', defaultSubmit);
  contactInput.addEventListener('click', defaultSubmit);
  messageImput.addEventListener('click', defaultSubmit);

  if (nameInputValue === '' && 
      contactInputValue === '' && 
      messageImputValue === '') {
    submit.value = 'Заполните хотя бы одно поле';
    submitError();
    return false;
  }
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        popupHide();
        successmsgShow();
        setTimeout(overlayHide, 1000);
      } else {
        popupHide();
        successmsgShow();
        errorShow();
        setTimeout(overlayHide, 2000);
      };
    }
  };
  xhr.open(method, url, true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
  xhr.send(`name=${encodeURIComponent(data.name)}&phone=${encodeURIComponent(data.phone)}&message=${encodeURIComponent(data.message)}`);
  clearInputs();
});