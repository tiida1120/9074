 $(document).on("pageinit", function(){
    $("#popupPanel").on({
        popupbeforeposition: function() {
            var h = window.innerHeight;
            $( "#popupPanel" ).css( "height", h );
        }
    });
});