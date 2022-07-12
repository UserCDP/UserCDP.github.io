window.onload = () => {

    var top_bar = document.querySelector(".top-bar");
    var about = document.querySelector("#about");

    about.style.marginTop =(top_bar.clientHeight + 10) + "px";

    var projects_btn = document.querySelectorAll(".more");
    projects_btn.forEach(element => {
        element.onclick = () => {
            console.log(element.parentNode);
            element.classList.add('rotation');
        }
    });
};