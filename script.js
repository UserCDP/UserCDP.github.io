window.onload = () => {

    var top_bar = document.querySelector(".top-bar");
    var content = document.querySelector("#content");

    content.style.marginTop =(top_bar.clientHeight + 10) + "px";
};