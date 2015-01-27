$(document).ready(function(){
    apply_map();
});

function apply_map() {
    var coordinates = {
        latitude:136.670213,
        longitude:36.579160

    };
    
    var zoom = 15
    var title = "test"

    show_google_map('map-canvas', coordinates.longitude, coordinates.latitude, zoom, title);
}

