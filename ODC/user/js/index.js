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

function menu(id, menu) {
    element = document.getElementById('_dashboard-container');
    title_text = document.getElementById('title-text');
    view = document.getElementById(id);
    dash = document.getElementById("_dash");
    profile = document.getElementById("_profile");
    notif = document.getElementById("_pesan");

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
    swal(7,'Copied!');
}