(function () {

    var $sidebarAndWrapper = $("#sidebar, #wrapper");
    var hideSidebarClass = "hide-sidebar";

    $("#sidebarToggle").click(function () {
        $sidebarAndWrapper.toggleClass(hideSidebarClass);

        if ($sidebarAndWrapper.hasClass(hideSidebarClass)) {
            $(this).text("Show Sidebar");
        }
        else {
            $(this).text("Hide Sidebar");
        }
    });

})();