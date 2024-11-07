import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailField = form.elements.email;
const messageField = form.elements.message;
const LOCAL_STORAGE_KEY = 'feedback-form-state';

// Save form data to local storage with throttling
function onFormInput() {
  const formData = {
    email: emailField.value,
    message: messageField.value,
  };
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData));
}

// Restore form data from local storage if available
function populateForm() {
  const savedFormData = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (savedFormData) {
    const { email, message } = JSON.parse(savedFormData);
    emailField.value = email || '';
    messageField.value = message || '';
  }
}

// Handle form submission: log data, clear storage, and reset form
function onFormSubmit(event) {
  event.preventDefault();
  const formData = {
    email: emailField.value,
    message: messageField.value,
  };
  console.log(formData);
  localStorage.removeItem(LOCAL_STORAGE_KEY);
  form.reset();
}

// Event listeners
form.addEventListener('input', throttle(onFormInput, 500));
form.addEventListener('submit', onFormSubmit);

// Populate form on page load
populateForm();
