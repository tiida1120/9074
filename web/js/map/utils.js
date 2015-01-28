WARN_AREA_RADIUS = (5*1000.0);
ALERT_AREA_RADIUS = (2*1000.0);

function get_distance(location) {
    var currentLocation = get_item_from_storage('currentLocation');
    var spotlatlng = new google.maps.LatLng(location.latitude, location.longitude);
    var currentlatlng = new google.maps.LatLng(current_location.latitude, current_location.longitude);
    return google.maps.geometry.spherical.computeDistanceBetween(spotlatlng, currentlatlng);
}

function get_icon_name(level) {
    var icon_name = '';
    switch (level) {
        case 1:
            icon_name = '../../res/images/redmarker.png';
            break;
        case 2:
            icon_name = '../../res/images/yellowmarker.png';
            break;
        case 3:
            icon_name = '../../res/images/bluemarker.png';
            break;
        default:
            icon_name = '../../res/images/bluemarker.png';
            break;
    }
    return icon_name;
}
