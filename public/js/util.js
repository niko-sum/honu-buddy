//JQuery for smooth scrolling after button click to section

$(document).ready(function () {
    $("#viewSnorkelingSpots").click(function () {
      $("html, body").animate(
        {
          scrollTop: $("#snorkelingCards").offset().top,
        },
        "slow" // Adjust the speed: 'slow', 'fast', or a number in milliseconds
      );
    });
  });
  
//Modal Behavior for Alpine.js directives
const hasSeenModal = localStorage.getItem('modalSeen');
function checkFirstVisit(modal) { //'modal' is used to explicitly handle Alpine component context
  if (!hasSeenModal) {
      modal.isOpen = true; //Using 'this.isOpen' is not explicit enough, therefore 'modal' is used
      document.body.classList.add('overflow-hidden');
  }
}

function closeModal() {
  if (!hasSeenModal){
    localStorage.setItem('modalSeen', 'true');
  }

  document.body.classList.remove('overflow-hidden');
  window.modalState.isOpen = false;
}

function toggleModal(modal){
  modal.isOpen = true
  document.body.classList.add('overflow-hidden');
}

// Make functions globally available
window.modalFunctions = {
  checkFirstVisit,
  closeModal,
  toggleModal,
};