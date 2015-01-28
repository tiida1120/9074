// 注意レベルの距離
WARN_DISTANCE = (5*1000.0);

// 警戒レベルの距離
ALERT_DISTANCE = (2*1000.0);

// 危険度レベルの列挙型
var DANGER_LEVEL = {
    ALERT: 1,
    WARN: 2,
    NORMAL: 3
};

function get_distance(currentLocation, targetLocation) {
    var spotlatlng = new google.maps.LatLng(location.latitude, location.longitude);
    var currentlatlng = new google.maps.LatLng(current_location.latitude, current_location.longitude);
    return google.maps.geometry.spherical.computeDistanceBetween(spotlatlng, currentlatlng);
}

function get_icon_name(level) {
    var iconName = '';
    switch (parseInt(level, 10)) {
        case DANGER_LEVEL.ALERT:
            icon_name = '../../res/images/redmarker.png';
            break;
        case DANGER_LEVEL.WARN:
            icon_name = '../../res/images/yellowmarker.png';
            break;
        case DANGER_LEVEL.NORMAL:
            icon_name = '../../res/images/bluemarker.png';
            break;
        default:
            icon_name = '../../res/images/bluemarker.png';
            break;
    }
    return icon_name;
}
