html_content = '<div class="container rounded bg p-3" style="overflow: hidden;">'+
'<div class="row d-flex justify-content-center align-content-center border-bottom mb-2 pb-1">'+
'<div class="col-6" style="width: auto;"><span class="font-weight-bold cntn" style="font-size: 20px;">Edit Akun</span></div>'+
'</div>'+
'<div class="d-flex flex-column align-items-center text-center">'+
'<div class="row mt-3">'+
'<div class="col-md-12"><label class="labels">Username</label><input type="text"'+
'class="form-control" placeholder="Masukkan Username"'+
'value="" id="edit_user"></div>'+
'<div class="col-md-12"><label class="labels">Password</label>'+
'<input type="password" class="form-control" placeholder="Masukkan Password"'+
'value="" id="edit_pass"></div>'+
'</div>'+
'<div class="row mt-2">'+
'<div class="col-md-6"><label class="labels">Role</label>'+
'<select class="form-control" placeholder="Pilih Role" id="edit_role">'+
'<option value="Siswa">Siswa</option>'+
'<option value="Admin">Admin</option>'+
'<option value="Industri">Industri</option>'+
'</select>'+
'</div>'+
'<div class="col-md-6"><label class="labels">Status</label>'+
'<select class="form-control" placeholder="Pilih Status" id="edit_status">'+
'<option value="Aktif">Aktif</option>'+
'<option value="Nonaktif">Nonaktif</option>'+
'</select>'+
'</div>'+
'</div>'+
'<div class="w-50 mt-5 d-flex justify-content-between">'+
'<button class="btn btn-primary profile-button" type="button" onclick="swal(7,'+"'Perubahan Telah Disimpan'"+');" id="save-profile">Simpan</button>'+
'<button class="btn btn-primary profile-button red-filter" type="button" onclick="Swal.close()">Batal</button>'+
'</div></div></div>';

$("#showDataBy").on("change", function() {
    var selectedValue = $(this).val();

    // Hide all content divs
    $("#data_siswa, #data_admin, #data_industri").hide();

    // Show the specific content based on the selected value
    if (selectedValue === "Siswa") {
        $("#data_siswa").show();
    } else if (selectedValue === "Admin") {
        $("#data_admin").show();
    } else if (selectedValue === "Industri") {
        $("#data_industri").show();
    }
});

function getDataFromRow(rowElement) {
    var tdValues = [];

    $(rowElement).find('td').each(function() {
        var tdValue = $(this).text().trim();
        tdValues.push(tdValue);
    });

    return tdValues;
}

function getCurrentIndex(buttonElement, option) {
    var rowElement = $(buttonElement).closest('tr')[0];
    var dataIndex = $(rowElement).index();

    var rowData = getDataFromRow(rowElement);

    if (option == "edit"){
        Swal.fire({
            background: 'transparent',
            customClass: 'swal-rmv-padding',
            html: html_content ,
            showDenyButton: false,
            showCancelButton: false,
            showConfirmButton: false,
          })
          $("#edit_user").val(rowData[1]);
          $("#edit_role").val(rowData[3]);
          $("#edit_status").val(rowData[4]);

    } else if (option == "alert"){
        alert(rowData);
    } else {
        return {
            index: dataIndex,
            data: rowData
        };
    }

}

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
    user = document.getElementById("_user");
    mail = document.getElementById("_mail");
    news = document.getElementById("_news");
    db = document.getElementById("_db");
    admsett = document.getElementById("_admin_setting");

    var delayInMilliseconds = 100; //1 second

    if (view.style.display != 'block') {
        element.classList.remove("show");
        element.classList.add("hide");

        setTimeout(function() {
            dash.style.display = 'none';
            user.style.display = 'none';
            mail.style.display = 'none';
            news.style.display = 'none';
            db.style.display = 'none';
            admsett.style.display = 'none';


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
    device();
}

