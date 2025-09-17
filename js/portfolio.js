const elements = document.querySelectorAll(".element");
let subject = document.getElementById("subject");
let email = document.getElementById("email");
let message = document.getElementById("message");
let sendMessage = document.getElementById("sendMessage");
let toggleMenu = document.getElementById("toggle-menu");
let menu = document.getElementById("menu");
let language = document.getElementById("website-language");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      } else {
        entry.target.classList.remove("show");
      }
    });
  },
  { threshold: 0.1 }
); //

elements.forEach((el) => observer.observe(el));
function sendMail() {
  var params = {
    MyMail: "mohamedyahiad8@gmail.com",
    email: email.value,
    subject: subject.value,
    message: message.value,
  };

  Swal.fire({
    title: "Sending message...",
    text: "Please wait",
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });

  emailjs
    .send("service_o6y3ouj", "template_xhljdun", params)
    .then(() => {
      clearMessage();
      Swal.close();
      Swal.fire({
        position: "center",
        icon: "success",
        title:
          "Your message has been sent \n and I'll contact you as soon as possible.",
        showConfirmButton: false,
        timer: 2000,
      });
    })
    .catch((err) => {
      Swal.close();
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong! Try again.",
      });
      console.error("EmailJS error:", err);
    });
}
function clearMessage() {
  subject.value = "";
  email.value = "";
  message.value = "";
}

toggleMenu.addEventListener("click", (e) => {
  e.stopPropagation();
  menu.classList.toggle("menu-list");
});

document.addEventListener("click", (e) => {
  if (!menu.contains(e.target) && e.target !== toggleMenu) {
    menu.classList.remove("menu-list");
  }
});

language.onchange = function changeLanguage() {
  if (language.value === "english") {
    window.location.href = "index.html";
  } else if (language.value === "arabic") {
    window.location.href = "indexAR.html";
  }
};

function checkAndSend() {
  var sub = /[A-Z]|[a-z]|\s/;
  var mail = /^(?!.*spam)\w+@\w+\.\w+$/;
  var mg = /^(?!.*spam).*$/i;
  if (
    sub.test(subject.value) != true ||
    mail.test(email.value) != true ||
    mg.test(message.value) != true
  ) {
    if (sub.test(subject.value) != true || subject.value.trim() === "") {
      subject.style.boxShadow = "0 0 5px 3px red";
      subject.style.borderColor = "red";
      subject.style.transition = "0.3s";
    } else {
      subject.style.boxShadow = "0 0 5px 3px var(--secondary-color)";
      subject.style.borderColor = "var(--main-color)";
      subject.style.transition = "0.3s";
    }
    if (mail.test(email.value) != true || email.value.trim() === "") {
      email.style.boxShadow = "0 0 5px 3px red";
      email.style.borderColor = "red";
      email.style.transition = "0.3s";
    } else {
      email.style.boxShadow = "0 0 5px 3px var(--secondary-color)";
      email.style.borderColor = "var(--main-color)";
      email.style.transition = "0.3s";
    }
    if (mg.test(message.value) != true || message.value.trim() === "") {
      message.style.boxShadow = "0 0 5px 3px red";
      message.style.borderColor = "red";
      message.style.transition = "0.3s";
    } else {
      message.style.boxShadow = "0 0 5px 3px var(--secondary-color)";
      message.style.borderColor = "var(--main-color)";
      message.style.transition = "0.3s";
    }
  } else {
    sendMail();
  }
}
