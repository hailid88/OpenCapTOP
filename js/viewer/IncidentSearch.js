$(function () {


    $("#dialog").dialog({
        autoOpen: false,
        width: 400,

        buttons: [
                {
                    text: "MapShow",
                    click: function () {
                        //alert("Hello");
                        var dateStart = $('#incDateStart').val();
                        var dateEnd = $('#incDateEnd').val();
                        var patID = $('#patid').val();
                        Ext.apply(IMsStore.proxy.extraParams, { startTime: dateStart, endTime: dateEnd, patrolID: patID });
                        IMsStore.load();
                        $(this).dialog("close");
                        refresh();
                    }
                },
				{
				    text: "Download",
				    click: function () {
				        //alert("Hello");
				        var dateStart = $('#incDateStart').val();
				        if (!dateStart.length) {
				            var today = new Date();
				            var dd = today.getDate();
				            var mm = today.getMonth() + 1; //January is 0!
				            var yyyy = today.getFullYear();
				            if (dd < 10) {
				                dd = '0' + dd
				            }
				            if (mm < 10) {
				                mm = '0' + mm
				            }

				            dateStart = mm + '/' + dd + '/' + yyyy;
				        }
				        var timeStart = timeStart = '00:00';

				        var startDate = dateStart.split('/');
				        var startTime = timeStart.split(':');

				        sDT = new Date(startDate[2], startDate[0] - 1, startDate[1], startTime[0], startTime[1]);


				        var dateEnd = $('#incDateEnd').val();

				        if (!dateEnd.length) {
				            var tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
				            var dd = tomorrow.getDate()
				            var mm = tomorrow.getMonth() + 1
				            var yyyy = tomorrow.getFullYear()
				            if (dd < 10) {
				                dd = '0' + dd
				            }

				            if (mm < 10) {
				                mm = '0' + mm
				            }

				            dateEnd = mm + '/' + dd + '/' + yyyy;
				        }

				        var timeEnd = '00:00';

				        var endDate = dateEnd.split('/');
				        var endTime = timeEnd.split(':');

				        eDT = new Date(endDate[2], endDate[0] - 1, endDate[1], endTime[0], endTime[1]);

				        var now = new Date();
				        if (eDT > now) {
				            eDT = now;
				        }
				        // how many hours for the data. 
				        var interval = (eDT - sDT) / 3600000;

				        var secondInterval = interval / 80 * 2;

				        var hourInterval = secondInterval / 3600;
				        var minuteInterval = secondInterval / 60;

				        if (secondInterval < 0) {
				            alert("End DateTime must be larger than Start DateTime");
				        }
				        else if (hourInterval > 1) {
				            alert("Start downloading, need about " + hourInterval.toFixed(2) + " hours");
				        }
				        else if (minuteInterval > 1) {
				            alert("Start downloading, need about " + minuteInterval.toFixed(1) + " minutes");
				        }
				        else if (secondInterval > 5) {
				            alert("Start downloading, need about " + secondInterval.toFixed(1) + " seconds");
				        }



				        Ext.apply(IMsDownloadStore.proxy.extraParams, { startTime: dateStart, endTime: dateEnd });

				        IMsDownloadStore.load();
				        Ext.defer(function () {
				            try {
				                window.open("http://10.41.20.61:5566/download/incidents.csv");
				            }
				            catch (Error) {
				                alert(Error);
				            }
				        },
				        secondInterval * 1000, this)


				    }
				}
			]
    });

    // Link to open the dialog
    $("#dialog-link").click(function (event) {
        $("#dialog").dialog("open");
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

    //patroller function
    $("#patrol-dialog").dialog({
        autoOpen: false,
        width: 400,
        buttons: [
				{
				    text: "Show",
				    click: function () {
				        //alert("Hello");
				        var dateStart = $('#pat_st').val();
				        //var timeStart = $('#incTimeStart').val();
				        var dateEnd = $('#pat_ed').val();
				        //var timeEnd = $('#incTimeEnd').val();
				        //IMsDownloadStore.proxy.extraParams = { startTime: dateStart, endTime: dateEnd };
				        var patID = $('#patid').val();
				        Ext.apply(IMsStore.proxy.extraParams, { startTime: dateStart, endTime: dateEnd, patrolID: patID });
				        IMsStore.load();
				        //alert("End");

				        //IMsStore.load({ params: { limit: 100, disableCaching : false} });
				        $(this).dialog("close");
				        refresh();
				    }
				}
			]
    });

    // Link to open the dialog
    $("#pat-dialog-link").click(function (event) {
        $("#patrol-dialog").dialog("open");
        event.preventDefault();
    });

    // Hover states on the static widgets
    $("#pat-dialog-link, #icons li").hover(
		function () {
		    $(this).addClass("ui-state-hover");
		},
		function () {
		    $(this).removeClass("ui-state-hover");
		}
	);

});
