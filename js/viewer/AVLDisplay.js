//<![CDATA[

var customIcons = {    
    redcar:{
        icon: 'resource/images/car_red_big.png',
        icon_big: 'resource/images/car_red_big.png',
        icon_mid: 'resource/images/car_red.png',
        icon_small: 'resource/images/car_red_small.png'
    },
    bluecar: {
        icon: 'resource/images/car_blue.png'
    },
    greencar: {
        icon: 'resource/images/car_green_big.png'
    }

};
var map;
var infoWindow = new google.maps.InfoWindow;
var markersArray = [];
var querymode = false;
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();

function load() {
    directionsDisplay = new google.maps.DirectionsRenderer();

    map = new google.maps.Map(document.getElementById("map_canvas"), {
        center: new google.maps.LatLng(38.915079, -77.01416),
        zoom: 11,
        mapTypeId: 'roadmap'
    });

    directionsDisplay.setMap(map);
    google.maps.event.addListener(map, 'zoom_changed', function () {
        var i, prevZoomLevel;
        if (querymode == true) {
            return;
        }
        prevZoomLevel = zoomLevel;

        map.getZoom() < 15 ? zoomLevel = 1 : zoomLevel = 2;

        if (prevZoomLevel !== zoomLevel) {
            for (i = 0; i < markersArray.length; i++) {
                if (zoomLevel === 2) {
                    markersArray[i].setIcon(markersArray[i].iconLevel2);
                }
                else {
                    markersArray[i].setIcon(markersArray[i].iconLevel1);
                }
            }
        }
    });

    refresh();
}
function deleteOverlays() {

    if (markersArray) {
        for (i in markersArray) {
            markersArray[i].setMap(null);
        }
        markersArray.length = 0;
    }
}
function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

var zoomLevel = 1;



function refresh() {

    var showinactive = document.getElementById("show_inactive").checked;
    var showid = document.getElementById("show_id").checked;
    var appendix = "0";
    var url;
    var d = new Date();
    if (showinactive == true) {
        url = "getAVLxml.ashx?showinactive=1&ref=" + makeid();

    }
    else {
        url = "getAVLxml.ashx?showinactive=1&st=" + d.toDateString() + "&ref=" + makeid();

    }


    downloadUrl(url, function (data) {

        var xml = data.responseXML;
        var markers = xml.documentElement.getElementsByTagName("marker");

        deleteOverlays();
        map.getZoom() < 15 ? zoomLevel = 1 : zoomLevel = 2;
        for (var i = 0; i < markers.length; i++) {
            var id = markers[i].getAttribute("id");
            var timeu = markers[i].getAttribute("time");
            var plate = markers[i].getAttribute("plate");
            var rop = markers[i].getAttribute("rop");
            var truckid = markers[i].getAttribute("truckid");
            var point = new google.maps.LatLng(
                          parseFloat(markers[i].getAttribute("lat")),
                          parseFloat(markers[i].getAttribute("lng")));
            var html = "<table style=\"width: 300px; height: 140px\"> <tr><td>Plate:</td><td>" + plate + "</td></tr>" +
                                   "<tr><td>Truck ID:</td><td>" + truckid + "</td></tr>" +
                                   "<tr><td>Device ID:</td><td>" + id + "</td></tr>" +
                                   "<tr><td>ROP:</td><td>" + rop + "</td></tr>" +
                                   "<tr><td>Last update:</td><td>" + timeu + "</td></tr> </table>";

            var icon = customIcons.redcar;

            map.getZoom() < 15 ? zoomLevel = 1 : zoomLevel = 2;
            var displayico = zoomLevel == 1 ? icon.icon_small : icon.icon_big;
            if (showid == true) {
                var marker = new MarkerWithLabel({
                    map: map,
                    labelContent: plate, // the info show on the label
                    position: point,
                    icon: displayico,
                    labelClass: "labels",
                    labelAnchor: new google.maps.Point(22, 0)
                });
                marker.iconLevel1 = icon.icon_small;
                marker.iconLevel2 = icon.icon_big;
            }
            else {
                var marker = new google.maps.Marker({
                    position: point,
                    icon: displayico,
                    map: map
                });
                marker.iconLevel1 = icon.icon_small;
                marker.iconLevel2 = icon.icon_big;
            }

            markersArray.push(marker);
            bindInfoWindow(marker, map, infoWindow, html);
        }
    });
}

function bindInfoWindow(marker, map, infoWindow, html) {
    google.maps.event.addListener(marker, 'click', function () {
        infoWindow.setContent(html);
        infoWindow.open(map, marker);
    });
}

function downloadUrl(url, callback) {
    var request = window.ActiveXObject ?
                new ActiveXObject('Microsoft.XMLHTTP') :
                new XMLHttpRequest;

    request.onreadystatechange = function () {
        if (request.readyState == 4) {
            request.onreadystatechange = doNothing;
            callback(request, request.status);
        }
    };

    request.open('GET', url, true);
    request.send(null);
}

function doNothing() { }



google.maps.event.addDomListener(window, 'load', load);
var refreshinterval = setInterval(function () { refresh() }, 15000);


// code for displaying patroller route
var pathlines = [];
var oldpath;
var lastIndx = 0;
function gDirRequest(service, waypoints, userFunction, waypointIndex, path) {
    // set defaults

    waypointIndex = typeof waypointIndex !== 'undefined' ? waypointIndex : 0;
    path = typeof path !== 'undefined' ? path : [];

    // get next set of waypoints
    var s = gDirGetNextSet(waypoints, waypointIndex);
    // build request object
    var startl = s[0].shift()["location"];
    var endl = s[0].pop()["location"];
    var request = {
        origin: startl,
        destination: endl,
        waypoints: s[0],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC,
        optimizeWaypoints: false,
        provideRouteAlternatives: false,
        avoidHighways: false,
        avoidTolls: false
    };
    service.route(request, function (response, status) {

        if (status == google.maps.DirectionsStatus.OK) {
            path = path.concat(response.routes[0].overview_path);
            oldpath = path
            if (s[1] != null) {
                lastIndx = s[1]
                gDirRequest(service, waypoints, userFunction, s[1], path)
            } else {
                userFunction(path);
            }

        } else {
            path = oldpath;
            lastIndx = lastIndx + 1
            if (s[lastIndx] != null) {
                gDirRequest(service, waypoints, userFunction, lastIndx, path)
            }
            else {
                userFunction(path);
            }
        }

    });
}

function gDirGetNextSet(waypoints, startIndex) {
    var MAX_WAYPOINTS_PER_REQUEST = 8;

    var w = [];    // array of waypoints to return

    if (startIndex > waypoints.length - 1) { return [w, null]; } // no more waypoints to process

    var endIndex = startIndex + MAX_WAYPOINTS_PER_REQUEST;

    // adjust waypoints, because Google allows us to include the start and destination latlongs for free!
    endIndex += 2;

    if (endIndex > waypoints.length - 1) { endIndex = waypoints.length; }

    for (var i = startIndex; i < endIndex; i++) {
        w.push(waypoints[i]);
    }

    if (endIndex != waypoints.length) {
        return [w, endIndex -= 1];
    } else {
        return [w, null];
    }
}


// this version applies route direction
//function display_patroller_route(idx) {    
//    var waypts = [];
//    var bounds = new google.maps.LatLngBounds();
//    for (var i = 0; i < pa_routes[idx].length; i++) {

//        waypts.push({
//            location: new google.maps.LatLng(pa_routes[idx][i][0], pa_routes[idx][i][1]),
//            stopover: false
//        });
//        bounds.extend(new google.maps.LatLng(pa_routes[idx][i][0], pa_routes[idx][i][1]));
//    }

//    if (pathlines) {
//        for (i in pathlines) {
//            pathlines[i].setMap(null);
//        }
//        pathlines.length = 0;
//    }

//    gDirRequest(directionsService, waypts, function drawGDirLine(path) {
//        var line = new google.maps.Polyline({ clickable: false, map: map, path: path, strokeColor: '#336600', strokeWeight: 10
//        });
//        pathlines.push(line);

//    });

//    map.fitBounds(bounds);

//}

function clear_patroller_routes() {
    if (pathlines) {
        for (i in pathlines) {
            pathlines[i].setMap(null);
        }
        pathlines.length = 0;
    }
}

//this version draw lines on the map
function display_patroller_route(index) {
    var colormap = ['#931926', 'navy', 'blue', '#1C8816', 'mediumvioletred', 'indigo', 'orangered', 'steelblue'];

    clear_patroller_routes();
    var bounds = new google.maps.LatLngBounds();

    points = [];

    if (index == 0) {
        for (var i = 0; i < pa_routes.length; ++i) {
            var tmp = show_one_route(i, colormap[i]);
            points = points.concat(tmp);
        }
    }
    else {
        points = show_one_route(index - 1, colormap[index-1]);
    }
    for (var i = 0; i < points.length; ++i) {
        bounds.extend(points[i]);
    }

    //map.fitBounds(bounds);
    $("#clearpatrolroutes").css("visibility", "visible");
}

function show_one_route(idx, color) {
    var bounds = new google.maps.LatLngBounds();
    var points = [];
    for (var i = 0; i < pa_routes[idx].length - 1; i++) {
        var lineCoordinates = [new google.maps.LatLng(pa_routes[idx][i][0], pa_routes[idx][i][1]), new google.maps.LatLng(pa_routes[idx][i + 1][0], pa_routes[idx][i + 1][1])]
        var line = new google.maps.Polyline({
            path: lineCoordinates,
            geodesic: true,
            strokeColor: color,
            map: map
        });
        pathlines.push(line);
        bounds.extend(new google.maps.LatLng(pa_routes[idx][i][0], pa_routes[idx][i][1]));
        points.push(new google.maps.LatLng(pa_routes[idx][i][0], pa_routes[idx][i][1]));
    }

    return points;

}

$(function () {
    var query;
    var rawquery;
    $("#clearpatrolroutes").click(function (event) {
        clear_patroller_routes();
        $("#clearpatrolroutes").css("visibility", "hidden");
        event.preventDefault();
    });
});

//]]>


            