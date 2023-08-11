const body = document.querySelector('body'),
    sidebar = body.querySelector('nav'),
    toggle = body.querySelector(".toggle"),
    searchBtn = body.querySelector(".search-box"),
    modeSwitch = body.querySelector(".toggle-switch"),
    modeText = body.querySelector(".mode-text");


toggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");
})

searchBtn.addEventListener("click", () => {
    sidebar.classList.remove("close");
})

modeSwitch.addEventListener("click", () => {
    body.classList.toggle("dark");

    if (body.classList.contains("dark")) {
        modeText.innerText = "Light mode";
    } else {
        modeText.innerText = "Dark mode";

    }
});

// detect dark mode
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    modeSwitch.click();
}

function menu(id, menu) {
    element = document.getElementById('_dashboard-container');
    title_text = document.getElementById('title-text');
    view = document.getElementById(id);
    dash = document.getElementById("_dash");
    profile = document.getElementById("_profile");
    notif = document.getElementById("_doc");

    var delayInMilliseconds = 100; //1 second

    if (view.style.display != 'block') {
        element.classList.remove("show");
        element.classList.add("hide");

        setTimeout(function() {
            dash.style.display = 'none';
            profile.style.display = 'none';
            notif.style.display = 'none';

            view.style.display = 'block';
            title_text.innerHTML = menu;

            element.classList.remove("hide");
            element.classList.add("show");
        }, delayInMilliseconds);
      }
}

$(document).ready(function(){

    var multipleCancelButton = new Choices('#choices-multiple-remove-button', {
       removeItemButton: true,
       //maxItemCount:5,
       //searchResultLimit:5,
       //renderChoiceLimit:5
     });


});

function pickImage(){
    document.getElementById('imageInput').click()
}

function copy_link(){
    document.getElementById('social_input');
    social_input.select();
    document.execCommand('copy');
    swal(7,'Copied!');
}

function openModal() {
    document.getElementById("docView").style.display = "block";
  }

  function closeModal() {
    fadeInOut("docView", 0);
    setTimeout(function() {
        document.getElementById("docView").style.display = "none";
    }, 100);

  }

  var slideIndex = 1;
  showSlides(slideIndex);

  function plusSlides(n) {
    showSlides(slideIndex += n);
  }

  function currentSlide(n) {
    showSlides(slideIndex = n);
  }

  function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("docSlides");
    var dots = document.getElementsByClassName("demo");
    var captionText = document.getElementById("caption");
    var numText = document.getElementById("numText");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" _active", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " _active";
    captionText.innerHTML = dots[slideIndex-1].alt;
    numText.innerHTML = slideIndex+"/"+slides.length;
  }

  function fadeInOut(id, option){
    view = document.getElementById(id);

    if (option == 1){
        view.classList.remove("modal-hide");
        view.classList.add("modal-show");

    } else {
        view.classList.remove("modal-show");
        view.classList.add("modal-hide");
    }

  }

function lihat(cs){
    openModal();
    currentSlide(cs);
    fadeInOut('docView', 1);
}