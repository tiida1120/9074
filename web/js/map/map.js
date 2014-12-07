$(document).ready(function(){
    apply_map();
});

function apply_map() {
    var coordinates = {
        latitude:135,
        longitude:35.65
    };

    show_google_map('map-canvas', coordinates.longitude, coordinates.latitude, 5);
}

