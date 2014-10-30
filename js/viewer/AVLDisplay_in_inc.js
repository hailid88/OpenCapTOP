//<![CDATA[

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
pathlines = [];
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

    incGmap.fitBounds(bounds);
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
            map: incGmap
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


            