function distance(latlng1,latlng2){
    return Math.sqrt(Math.pow((latlng1[0] - latlng2[0]),2) + Math.pow((latlng1[1] - latlng2[1]),2));
}
function utcdate2hm(date){
    pdate = new Date(date);
    var mini = pdate.getMinutes();
    var hr = pdate.getHours();
    return (hr <= 9 ? '0' + hr : hr) + ":" + (mini <= 9 ? '0' + mini : mini);
}
function utcdate2DTstr(date) {
    pdate = new Date(date);
    var y = pdate.getFullYear();
    var m = pdate.getMonth() +1;
    var d = pdate.getDate();
    var mini = pdate.getMinutes();
    var hr = pdate.getHours();
    var s = pdate.getSeconds();
    return y + "-" + (m <= 9 ? '0' + m : m) + "-" + (d <= 9 ? '0' + d : d) + " " + (hr <= 9 ? '0' + hr : hr) + ":" + (mini <= 9 ? '0' + mini : mini) + ":" + (s <= 9 ? '0' + s : s);
}
function findroute(timesnapshots){
    var route = [];
    route.push(timesnapshots[0]);
    for (i = 1; i < timesnapshots.length; ++i) { 
        var latlng = [timesnapshots[i].lat, timesnapshots[i].lng];
        if(distance(latlng, [timesnapshots[i-1].lat, timesnapshots[i-1].lng]) > 0.001){
            route.push(timesnapshots[i]);
        }
    }
    return route;
}
function summarize(timesnapshots, intervalthreshold){
    var existedlatlng = [];
    var timespans = [];
    var spanstrs = [];
    var idxs = [];
    for (i = 0; i < timesnapshots.length; ++i) {        
        var latlng = [timesnapshots[i].lat, timesnapshots[i].lng];
        var flag = true;
        for(j =0; j< existedlatlng.length; ++j){
            if(distance(existedlatlng[j], latlng) < 0.001){
                flag = false;
                timespans[j].push(timesnapshots[i].time);
            }            
        }
        if(flag){
            existedlatlng.push(latlng);
            timespans.push([timesnapshots[i].time]);
            idxs.push(i);
        }
    }
    for(i =0; i< timespans.length; ++i){
        var spanstr;
        if(timespans[i].length > 2){
            spanstr = utcdate2hm(timespans[i][0]);
            var tmptime;
            flag = false;
            for(j=1;j < timespans[i].length; ++j){
                if(timespans[i][j] - timespans[i][j-1] <= intervalthreshold){
                    tmptime = timespans[i][j];
                    flag = true;
                }
                else{
                    if(flag){
                        spanstr += '-' + utcdate2hm(tmptime) + ', ' + utcdate2hm(timespans[i][j]);
                        flag = false;
                    }
                    else{
                        spanstr += ', ' + utcdate2hm(timespans[i][j]);
                    }
                    
                }
            }
            if(flag){
                spanstr += '-' + utcdate2hm(tmptime);
            }
        }
        else if (timespans[i].length == 2) {
            if (timespans[i][j] - timespans[i][j - 1] <= intervalthreshold) {
                spanstr = utcdate2hm(timespans[i][0]) + '-' + utcdate2hm(timespans[i][1]);
            }
            else {
                spanstr = utcdate2hm(timespans[i][0]) + ', ' + utcdate2hm(timespans[i][1]);
            }
        }
        else{
            spanstr = utcdate2hm(timespans[i][0]);
        }
        spanstrs.push(spanstr);
    }
    var newtimesnapshots = [];
    for(i=0; i<idxs.length;++i){
        var tmpsnap = timesnapshots[idxs[i]];
        var eachtimess = {
            time: tmpsnap.time,
            timestr: spanstrs[i],            
            lat: tmpsnap.lat,
            lng: tmpsnap.lng,
            locname: tmpsnap.locname
        };
        newtimesnapshots.push(eachtimess);
    }
    return newtimesnapshots;

}

var nodata = false;
$(function () {
    var query;
    var rawquery;
    $("#dialog").dialog({
        autoOpen: false,
        width: 400,

        buttons: [
				{
				    text: "Ok",
				    click: function () {
				        // show chart
				        var date = $('#picker1').val();
				        var timeStart = $('#picker2').val();
				        var timeEnd = $('#picker3').val();
				        var tmp_targetVehicle = $('#plate').val();
				        var targetVehicle = tmp_targetVehicle.substring(0, 4);

				        var locnames = {};

				        $("#dialog").dialog("close");
				        $("#chartplace").dialog("open");
				        query = 'getAVLTrackingxml.ashx?st=' + timeStart + '&ed=' + timeEnd + '&date=' + date + '&did=' + targetVehicle;
				        rawquery = 'getAVLTrackingxml_raw.ashx?st=' + timeStart + '&ed=' + timeEnd + '&date=' + date + '&did=' + targetVehicle;

				        Highcharts.setOptions({
				            global: {
				                useUTC: false
				            }
				        });
				        var options = {
				            chart: {
				                renderTo: 'chartplace',
				                type: 'line'
				            },
				            tooltip: {
				                useHTML: true,
				                formatter: function () {
				                    var pointtime = new Date(this.x);
				                    return pointtime.toTimeString() + '<br>Vehicle location:<b> ' + locnames[this.x] + '</b><br>Speed: <b>' + this.y + '</b>';
				                }
				            },
				            title: {
				                text: 'Vehicle ' + targetVehicle + ' in ' + date.toString()
				            },
				            xAxis: {
				                type: 'datetime',
				                tickWidth: 0,
				                gridLineWidth: 1,
				                labels: {
				                    align: 'left',
				                    x: 3,
				                    y: -3
				                }
				            },
				            yAxis: {
				                title: {
				                    text: 'Speed'
				                },
				                labels: {
				                    align: 'left',
				                    x: 3,
				                    y: 16,
				                    formatter: function () {
				                        return Highcharts.numberFormat(this.value, 0);
				                    }
				                }
				            },
				            series: []

				        };
				        nodata = false;
				        $.get(query, function (xml) {
				            var $xml = $(xml);
				            //<timesnap time="1:00 AM" speed="0" lat="-77.0077" lng="38.87656" locname="M STREET SE "/>
				            var seriesOptions = {
				                name: 'Speed',
				                type: 'line',
				                lineWidth: 5,
				                data: [],
				                pointInterval: null,
				                pointStart: null
				            };
				            var times = [];
				            $xml.find('timesnap').each(function (i, tstamp) {
				                times.push(Date.parse($(tstamp).attr('time')));
				                seriesOptions.data.push(parseFloat($(tstamp).attr('speed')));
				                locnames[Date.parse($(tstamp).attr('time'))] = $(tstamp).attr('locname');
				            });

				            if (times.length == 0) {
				                $('#chartplace').html("<br><br><br><br><br><br>No data found in this period.");
				                nodata = true;
				                $('#showOnMapButton').prop("disabled", true);
				                return;
				            }
				            seriesOptions.pointStart = times[0];
				            seriesOptions.pointInterval = times[1] - times[0];

				            options.series.push(seriesOptions);
				            //$('#chartplace').highcharts(options);
				            var chart = new Highcharts.Chart(options);
				            $('#showOnMapButton').prop("disabled", false);
				        });
				    }
				}
			]
    });
    var showOnMapButton = {
        id: 'showOnMapButton',
        text: "Show Route",
        click: function () {
            querymode = true;
            $("#chartplace").dialog("close");
            // query xml and show route on the map
            $.get(query, function (xml) {
                deleteOverlays();
                clearInterval(refreshinterval);
                var $xml = $(xml);
                //<timesnap time="1:00 AM" speed="0" lat="-77.0077" lng="38.87656" locname="M STREET SE "/>
                var timesnapshot = [];
                $xml.find('timesnap').each(function (i, tstamp) {
                    var eachtimess = {
                        time: Date.parse($(tstamp).attr('time')),
                        speed: parseFloat($(tstamp).attr('speed')),
                        lat: parseFloat($(tstamp).attr('lat')),
                        lng: parseFloat($(tstamp).attr('lng')),
                        locname: $(tstamp).attr('locname')
                    };
                    timesnapshot.push(eachtimess);
                });

                var newtimesnapshots = summarize(timesnapshot, timesnapshot[1].time - timesnapshot[0].time);
                var route = findroute(timesnapshot);
                for (i = 1; i < route.length; ++i) {

                    var arrow = {
                        path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                        fillColor: 'black',
                        strokeOpacity: 1,
                        strokeColor: 'red',
                        scale: 3
                    };
                    var linesymbol = {
                        path: 'M 0,-1 0,1',
                        strokeOpacity: 1,
                        strokeColor: 'red',
                        scale: 2
                    };

                    var lineCoordinates = [
                                        new google.maps.LatLng(route[i - 1].lat, route[i - 1].lng),
                                        new google.maps.LatLng(route[i].lat, route[i].lng)
                                    ];

                    var line = new google.maps.Polyline({
                        path: lineCoordinates,
                        geodesic: true,
                        strokeOpacity: 0,
                        icons: [{
                            icon: linesymbol,
                            offset: '10px',
                            repeat: '15px'
                        }, {
                            icon: arrow,
                            offset: '99%'
                        }],
                        map: map
                    });
                    markersArray.push(line);

                }
                for (i = 0; i < newtimesnapshots.length; ++i) {
                    var html = "<table style=\"width: 300px; height:70px\"><tr><td>Location:</td><td>" + newtimesnapshots[i].locname + "</td></tr><tr>" +
                                   "<td>Time:</td><td>" + newtimesnapshots[i].timestr + "</td></tr></table>";
                    var icon;
                    if (i == 0) { icon = customIcons.greencar || {}; }
                    else if (i == newtimesnapshots.length - 1) { icon = customIcons.redcar || {}; }
                    else { icon = customIcons.bluecar || {}; }

                    var point = new google.maps.LatLng(newtimesnapshots[i].lat, newtimesnapshots[i].lng);
                    var timestr = newtimesnapshots[i].timestr;
                    var marker = new MarkerWithLabel({
                        map: map,
                        position: point,
                        icon: icon.icon
                    });
                    markersArray.push(marker);
                    bindInfoWindow(marker, map, infoWindow, html);
                }
                $("#showrealtime").css("visibility", "visible");
                $("#completedata").css("visibility", "visible");
                $("#show_inactiveLabel").css("visibility", "hidden");
                $("#show_idLabel").css("visibility", "hidden");
            });

        }
    }

    $("#chartplace").dialog({
        autoOpen: false,
        width: $(window).width() * 0.6,
        height: $(window).height() * 0.6,
        show: { effect: 'fade', duration: 550 },
        buttons: [showOnMapButton
                    ,
				    {
				        text: "Close",
				        click: function () {
				            $("#chartplace").dialog("close");
				        }
				    }
			    ]
    });

	$("#tableplace").dialog({
		autoOpen: false,
		width: $(window).width() * 0.4,
		height: $(window).height(),
		show: { effect: 'fade', duration: 550 },
		position: [$(window).width() * 0.6, 0],
		buttons: [
		    {
			    text: "Close",
			    click: function () {
			        $("#tableplace").dialog("close");
			    }
		    }
	    ]
	});

    // Link to open the dialog
    $("#dialog-link").click(function (event) {
        $("#dialog").dialog("open");
        $('#picker1').datepicker({
            maxDate: new Date()
        });
        $('#picker2').timepicker();
        $('#picker3').timepicker();
        event.preventDefault();
    });

    // Hover states on the static widgets    
    $("#dialog-link, #icons li").hover(
			function () {
			    $(this).addClass("ui-state-hover");
			},
			function () {
			    $(this).removeClass("ui-state-hover");
			}
		);
    // Link to Clear Query
    $("#showrealtime").click(function (event) {
        querymode = false;
        refreshinterval = setInterval(function () { refresh() }, 15000);
        refresh();
        $("#showrealtime").css("visibility", "hidden");
        $("#completedata").css("visibility", "hidden");
        $("#show_inactiveLabel").css("visibility", "visible");
        $("#show_idLabel").css("visibility", "visible");
        event.preventDefault();
    });

    // Hover states on the static widgets
    $("#showrealtime, #icons li").hover(
	    function () {
	        $(this).addClass("ui-state-hover");
	    },
	    function () {
	        $(this).removeClass("ui-state-hover");
	    }
    );


	// Link to Complete Data
	$("#completedata").click(function (event) {
	    // show the raw AVL data table
	        $.get(rawquery, function (xml) {
	            htmlstr = "<table style=\" border: 1px solid black; border-collapse:collapse; width: 100% ;text-align:center\">";
	            var $xml = $(xml);
	            var timesnapshot = [];
	            htmlstr += "<tr style=\"background-color: #4b6c9e; color: white\">";
	            htmlstr += "<td style=\" border: 1px solid black;\"> Time </td>";
	            htmlstr += "<td style=\" border: 1px solid black;\"> Speed </td>";
	            htmlstr += "<td style=\" border: 1px solid black;\"> Latitude </td>";
	            htmlstr += "<td style=\" border: 1px solid black;\"> Longitude </td>";
	            htmlstr += "<td style=\" border: 1px solid black;\"> Location </td>";
	            htmlstr += "</tr>";
	            $xml.find('timesnap').each(function (i, tstamp) {
	                htmlstr += "<tr>";
	                htmlstr += "<td style=\" border: 1px solid black;\">" + utcdate2DTstr(Date.parse($(tstamp).attr('time'))) + "</td>";
	                htmlstr += "<td style=\" border: 1px solid black;\">" + $(tstamp).attr('speed') + "</td>";
	                htmlstr += "<td style=\" border: 1px solid black;\">" + $(tstamp).attr('lat') + "</td>";
	                htmlstr += "<td style=\" border: 1px solid black;\">" + $(tstamp).attr('lng') + "</td>";
	                htmlstr += "<td style=\" border: 1px solid black;\">" + $(tstamp).attr('locname') + "</td>";
	                htmlstr += "</tr>";
	            });
	            htmlstr += "</table>";

	            $("#tableplace").html(htmlstr);
	            $("#tableplace").dialog("open");
	        });
	    });

	// Hover states on the static widgets
	$("#completedata, #icons li").hover(
	    function () {
	        $(this).addClass("ui-state-hover");
	    },
	    function () {
	        $(this).removeClass("ui-state-hover");
	    }
    );
});