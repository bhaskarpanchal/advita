document.addEventListener("DOMContentLoaded", () => {
  let mobileBtn = document.querySelector(".mobile-responsive-btn");
  let overlay = document.querySelector("#overlay");
  let header = document.querySelector("header");

  const toggleNav = () => {
    header.classList.toggle("active");
    overlay.classList.toggle("active");
  };

  mobileBtn.addEventListener("click", toggleNav);

  const overlayToggle = () => {
    header.classList.toggle("active");
    overlay.classList.toggle("active");
  };
  overlay.addEventListener("click", overlayToggle);
});

// ===================== GSAP Animations =====================

const wrapper = document.getElementById("menuWrapper");
const dropdown = document.getElementById("dropdownMenu");
let hideTimeout;

const showDropdown = () => {
  clearTimeout(hideTimeout);
  gsap.to(dropdown, {
    duration: 0.3,
    opacity: 1,
    y: 0,
    pointerEvents: "auto",
    onStart: () => {
      dropdown.style.visibility = "visible";
    },
  });
};

const hideDropdown = () => {
  hideTimeout = setTimeout(() => {
    gsap.to(dropdown, {
      duration: 0.3,
      opacity: 0,
      y: -10,
      pointerEvents: "none",
      onComplete: () => {
        dropdown.style.visibility = "hidden";
      },
    });
  }, 250);
};

wrapper.addEventListener("mouseenter", showDropdown);
wrapper.addEventListener("mouseleave", hideDropdown);

// ======================= Drop Down ==========================
// document.querySelectorAll('.menu-wrapper').forEach(wrapper => {
//     const dropdown = wrapper.querySelector('.dropdown');
//     let isOpen = false;
//     let hideTimeout;

//     const showDropdown = () => {
//         clearTimeout(hideTimeout);
//         gsap.to(dropdown, {
//             // duration: 0.4,
//             opacity: 1,
//             y: 0,
//             pointerEvents: 'auto',
//             onStart: () => {
//                 dropdown.style.visibility = 'visible';
//                 dropdown.style.display = 'block';
//             }
//         });
//         isOpen = true;
//     };

//     const hideDropdown = () => {
//         clearTimeout(hideTimeout);
//         gsap.to(dropdown, {
//             // duration: 0.3,
//             opacity: 0,
//             y: -10,
//             pointerEvents: 'none',
//             onComplete: () => {
//                 dropdown.style.visibility = 'hidden';
//                 dropdown.style.display = 'none';
//             }
//         });
//         isOpen = true;
//     };

//     // ✅ Desktop Hover
//     wrapper.addEventListener('mouseenter', () => {
//         if (window.innerWidth > 768) {
//             showDropdown();
//         }
//     });

//     wrapper.addEventListener('mouseleave', () => {
//         if (window.innerWidth > 768) {
//             hideDropdown();
//         }
//     });

//     // ✅ Mobile Click Toggle
//     wrapper.addEventListener('click', (e) => {
//         if (window.innerWidth < 768) {
//             e.preventDefault();
//             if (!isOpen) {
//                 showDropdown();
//             } else {
//                 hideDropdown();
//             }
//         }
//     });

//     // Optional: Close on resize (reset state)
//     window.addEventListener("resize", () => {
//         if (window.innerWidth > 768) {
//             hideDropdown();
//         }
//     });
// });

// ======================= Drop Down End ==========================

// ======================== form Validation ==================
function setError(id, error) {
  const element = document.getElementById(id);
  element.querySelector(".formerror").innerText = error;
}

function clearErrors() {
  const errors = document.getElementsByClassName("formerror");
  for (let item of errors) {
    item.innerText = "";
  }
}

function validateForm() {
  clearErrors();
  let isValid = true;

  const fname = document.forms["myForm"]["fname"].value.trim();
  if (fname.length < 2) {
    setError("first-name", "Please enter a valid first name");
    isValid = false;
  }

  const lname = document.forms["myForm"]["lname"].value.trim();
  if (lname.length < 2) {
    setError("last-name", "Please enter a valid last name");
    isValid = false;
  }

  const email = document.forms["myForm"]["femail"].value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    setError("email", "Please enter a valid email");
    isValid = false;
  }

  const phone = document.forms["myForm"]["phone"].value.trim();
  const phoneRegex = /^[0-9]{10}$/;
  if (!phoneRegex.test(phone)) {
    setError("phone", "Please enter a valid 10-digit phone number");
    isValid = false;
  }

  return isValid;
}

document
  .getElementById("contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    if (!validateForm()) return;

    const form = this;
    const formData = new FormData(form);

    fetch(
      "https://script.google.com/macros/s/AKfycbyyl0FINYoomhul7qcUXXgEi8xrVtDJ3DPJZ5FFYY-VhCUvu3rErvOsbicPjXO6pVzX-w/exec",
      {
        method: "POST",
        body: formData,
      }
    )
      .then((response) => {
        if (response.ok) {
          form.reset();
          Swal.fire({
            icon: "success",
            title: "Message Sent!",
            text: "We will get back to you soon.",
            showConfirmButton: false,
            timer: 2500,
            customClass: {
              popup: "my-popup",
              title: "my-title",
              htmlContainer: "my-text",
              confirmButton: "my-button",
            },
          });
        } else {
          throw new Error("Network response was not ok");
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Could not send message. Please check connection or try again.",
        });
        console.error("Error submitting form:", error);
      });
  });
// ======================== form Validation End ==================

// ==================== cursor ================

