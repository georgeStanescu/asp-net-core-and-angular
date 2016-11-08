(function () {
    var el = document.getElementById("username");
    el.innerHTML = "Someone";

    var main = document.getElementById("main");
    main.onmouseenter = function () {
        main.style = "background-color: #888888;";
    };

    main.onmouseleave = function () {
        main.style = "background-color: none;";
    }
})();