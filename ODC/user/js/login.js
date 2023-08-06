main = document.getElementById('main');






var main = document.querySelectorAll(".main");
var forgot_pass = document.querySelector(".forgot");
var forgot_slide = document.querySelector(".forgot_slide");
var login_main = document.querySelector(".login_main");
var close_forgot = document.querySelector(".close");
var login_click = document.querySelector(".login_click");
var all_inputs = document.querySelectorAll(".sigin_input input");
var log_eye = document.querySelector(".fa-eye-slash");
var log_in_pass = document.querySelector(".log_in_pass");
var logch_eye = document.querySelector(".log_eye");
var login_check = document.querySelector(".login_check");
var member_btn = document.querySelector(".member_btn");
var subscribe = document.querySelector(".subscribe");
var up_eye = document.querySelector(".up_eye");
var up_pass = document.querySelector(".up_pass");
var upch_eye = document.querySelector(".up_eye");

signin_page.addEventListener('click', function() {
main.forEach(function(pages) {
pages.classList.toggle('hidden');
});
});

forgot_pass.addEventListener('click', function() {
forgot_slide.classList.toggle('hidden');
login_main.classList.add('hidden');
});

close_forgot.addEventListener('click', function() {
forgot_slide.classList.toggle('hidden');
login_main.classList.remove('hidden');
});

login_click.onclick = function() {
all_inputs.forEach((e) => {
e.classList.remove('warning');
if (e.value.length < 1) { e.classList.add('warning'); } else { e.classList.remove('warning'); } }); }; all_inputs.forEach((e)=> {
    e.addEventListener('keyup', function() {
    if (e.value.length < 1) { e.classList.add('warning'); } else { e.classList.remove('warning'); } }); }); log_eye.onclick=function() { if (log_in_pass.type=="password" ) { log_in_pass.type="text" ; log_eye.classList.remove('fa-eye-slash'); logch_eye.classList.add('fa-eye'); } else { log_in_pass.type="password" ; log_eye.classList.add('fa-eye-slash'); logch_eye.classList.remove('fa-eye'); } }; login_check.onclick=function() { login_check.classList.toggle('green'); }; member_btn.onclick=function() { signup_main.forEach((i)=> {
        i.classList.remove('warning');
        if (i.value.length < 1) { i.classList.add('warning'); } }); }; signup_main.forEach((i)=> {
            i.addEventListener('keyup', function() {
            if (i.value.length > 0) {
            i.classList.remove('warning');
            }
            });
            });

            subscribe.onclick = function() {
            subscribe.classList.toggle('green');
            };

            up_eye.onclick = function() {

            if (up_pass.type == "password") {
            up_pass.type = "text";
            up_eye.classList.remove('fa-eye-slash');
            upch_eye.classList.add('fa-eye');
            } else {
            up_pass.type = "password";
            up_eye.classList.add('fa-eye-slash');
            upch_eye.classList.remove('fa-eye');
            }
            }