$(document).ready(function(){
    apply_map();
});

function apply_map() {
    var coordinates = {
        latitude:136.670213,
        longitude:36.579160

    };

    show_google_map('map-canvas', coordinates.longitude, coordinates.latitude, zoom, title);
}

