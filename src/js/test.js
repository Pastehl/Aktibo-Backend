// Import our custom CSS
import '../scss/styles.scss';

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

const toastTrigger = document.getElementById('liveToastBtn')
const toastLiveExample = document.getElementById('liveToast')
if (toastTrigger) {
  toastTrigger.addEventListener('click', () => {
    const toast = new bootstrap.Toast(toastLiveExample)

    toast.show()
  })
}

document.querySelector('table').onclick = ({
  target
}) => {
  if (!target.classList.contains('more')) return
  document.querySelectorAll('.dropout.active').forEach(
    (d) => d !== target.parentElement && d.classList.remove('active')
  )
  target.parentElement.classList.toggle('active')
}

document.addEventListener("DOMContentLoaded", function () {
    const dropdownContainer = document.getElementById("dropdown-container");
    const dropdownContent = document.getElementById("dropdown-content");

    dropdownContainer.addEventListener("click", function (event) {
      console.log(dropdownContent)
        if (dropdownContent.style.display === "block") {
            dropdownContent.style.display = "none";
        } else {
            dropdownContent.style.display = "block";
        }
        
    });
});

