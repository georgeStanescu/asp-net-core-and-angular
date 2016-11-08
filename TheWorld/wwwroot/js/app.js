(function () {

    var $sidebarAndWrapper = $("#sidebar, #wrapper");
    var hideSidebarClass = "hide-sidebar";
    var $icon = $("#sidebarToggle i.fa");

    $("#sidebarToggle").click(function () {
        $sidebarAndWrapper.toggleClass(hideSidebarClass);

        if ($sidebarAndWrapper.hasClass(hideSidebarClass)) {
            $icon.removeClass("fa-angle-left");
            $icon.addClass("fa-angle-right");
        }
        else {
            $icon.removeClass("fa-angle-right");
            $icon.addClass("fa-angle-left");
        }
    });

})();