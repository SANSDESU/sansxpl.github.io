function menu(id) {

    view = document.getElementById(id);
    main = document.getElementById("_main");
    forgot = document.getElementById("_forgot");

    main.style.display = 'none';
    forgot.style.display = 'none';

    view.style.display = 'block';

}


function showpw() {
    shpw = document.getElementById("showpw");

    var x = document.getElementById("pass");
    if (x.type === "password") {
        shpw.classList.remove('fa-eye-slash');
        shpw.classList.add('fa-eye');
        x.type = "text";
    } else {
        shpw.classList.remove('fa-eye');
        shpw.classList.add('fa-eye-slash');
        x.type = "password";
    }

}




function login(){
    const email = document.getElementById('email').value;
    const pass = document.getElementById('pass').value;

    if(email == 'admin@soji' && pass == 'admin'){
        window.location.href = "https://sansxpl.github.io/ODC/admin";
    }else if (email == 'siswa@soji' && pass == 'siswa') {
        window.location.href = "https://sansxpl.github.io/ODC/user";
    }else if (email == 'industri@soji' && pass == 'industri') {
        alert('industri');
    }else{
        document.getElementById('invalid').style.display = 'block';
    }
}
