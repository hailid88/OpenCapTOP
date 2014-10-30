$(function () {
    $("#dialog").dialog({
        autoOpen: false,
        width: "auto",
        height: "auto",
        buttons: [
				{
				    text: "Download",
				    click: function () {

				        var dateStart = $('#snapsDateStart').val();

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
				        //alert(dateStart);
				        var timeStart = $('#snapsTimeStart').val();
				        if (!timeStart.length) {
				            timeStart = '00:00';
				        }
				        var startDate = dateStart.split('/');
				        var startTime = timeStart.split(':');

				        var acisaNum = $('#acisaInput').val();
				        var isValid = true;
				        if (!acisaNum.length) {
				            acisaNum = '0';
				        }
				        else {
				            isValid = checkACISA(acisaNum);

				        }

				        sDT = new Date(startDate[2], startDate[0] - 1, startDate[1], startTime[0], startTime[1]);

				        try {
				            var dateEnd = $('#snapsDateEnd').val();
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
				            //alert('dateEnd:' + dateEnd);
				            var timeEnd = $('#snapsTimeEnd').val();
				            if (!timeEnd.length) {
				                timeEnd = '00:00';
				            }
				            var endDate = dateEnd.split('/');
				            var endTime = timeEnd.split(':');

				            eDT = new Date(endDate[2], endDate[0] - 1, endDate[1], endTime[0], endTime[1]);

				            var interval = (eDT - sDT) / 3600000;
				            //				            alert(interval);
				            //				            alert("acisa number is "+ acisaNum);
				            //revised code for writing file, speed up. 
				           
				            if (acisaNum == '0') {
				                secondInterval = interval / 10;
				            }
				            else {
				                
				                secondInterval = interval / 100;
				            }
				            var hourInterval = secondInterval / 3600;
				            var minuteInterval = secondInterval / 60;
				            //alert(isValid);
				            if (isValid) { 
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
				                    alert("Start downloading, need about " + secondInterval + " seconds");
				                }

				                Ext.apply(SNAPsDownloadAllStore.proxy.extraParams, { startTime: sDT, endTime: eDT, ACISA: acisaNum, downloadAble: 'true' });
				                SNAPsDownloadAllStore.load();

				                Ext.defer(function () {
				                    try {
				                        window.open("http://10.41.20.61:5566/download/snaps.csv");
				                    }
				                    catch (Error) {
				                        alert(Error);
				                    }
				                },
				                secondInterval * 1000, this)
				            }
				        }
				        catch (Error) {
				            alert(Error);
				        }
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
});






function checkACISA(acisa) {

    var acisaList = {};
    acisaList['1006'] = true;
    acisaList['1008'] = true;
    acisaList['1012'] = true;
    acisaList['1017'] = true;
    acisaList['1025'] = true;
    acisaList['1031'] = true;
    acisaList['1065'] = true;
    acisaList['1083'] = true;
    acisaList['1099'] = true;
    acisaList['1104'] = true;
    acisaList['1106'] = true;
    acisaList['1112'] = true;
    acisaList['1117'] = true;
    acisaList['1118'] = true;
    acisaList['1129'] = true;
    acisaList['1144'] = true;
    acisaList['1146'] = true;
    acisaList['1153'] = true;
    acisaList['1159'] = true;
    acisaList['1163'] = true;
    acisaList['1169'] = true;
    acisaList['1176'] = true;
    acisaList['1179'] = true;
    acisaList['1181'] = true;
    acisaList['1187'] = true;
    acisaList['1208'] = true;
    acisaList['1210'] = true;
    acisaList['1227'] = true;
    acisaList['1237'] = true;
    acisaList['2006'] = true;
    acisaList['2020'] = true;
    acisaList['2022'] = true;
    acisaList['2041'] = true;
    acisaList['2043'] = true;
    acisaList['2047'] = true;
    acisaList['2057'] = true;
    acisaList['2090'] = true;
    acisaList['2096'] = true;
    acisaList['2120'] = true;
    acisaList['2135'] = true;
    acisaList['2161'] = true;
    acisaList['2193'] = true;
    acisaList['2226'] = true;
    acisaList['2249'] = true;
    acisaList['2250'] = true;
    acisaList['3002'] = true;
    acisaList['3026'] = true;
    acisaList['3028'] = true;
    acisaList['3035'] = true;
    acisaList['3037'] = true;
    acisaList['3039'] = true;
    acisaList['3050'] = true;
    acisaList['3052'] = true;
    acisaList['3056'] = true;
    acisaList['3097'] = true;
    acisaList['3099'] = true;
    acisaList['3129'] = true;
    acisaList['3140'] = true;
    acisaList['3164'] = true;
    acisaList['3177'] = true;
    acisaList['3178'] = true;
    acisaList['3179'] = true;
    acisaList['3180'] = true;
    acisaList['3183'] = true;
    acisaList['3189'] = true;
    acisaList['3206'] = true;
    acisaList['3210'] = true;
    acisaList['3224'] = true;
    acisaList['3231'] = true;
    acisaList['4018'] = true;
    acisaList['4055'] = true;
    acisaList['4063'] = true;
    acisaList['4073'] = true;
    acisaList['4076'] = true;
    acisaList['4085'] = true;
    acisaList['4105'] = true;
    acisaList['4112'] = true;
    acisaList['4119'] = true;
    acisaList['4121'] = true;
    acisaList['4126'] = true;
    acisaList['4130'] = true;
    acisaList['4131'] = true;
    acisaList['4139'] = true;
    acisaList['4142'] = true;
    acisaList['4149'] = true;
    acisaList['4150'] = true;
    acisaList['4152'] = true;
    acisaList['4153'] = true;
    acisaList['4157'] = true;
    acisaList['4165'] = true;
    acisaList['4177'] = true;
    acisaList['4178'] = true;
    acisaList['4189'] = true;
    acisaList['4196'] = true;
    acisaList['4229'] = true;
    acisaList['5002'] = true;
    acisaList['5025'] = true;
    acisaList['5035'] = true;
    acisaList['5043'] = true;
    acisaList['5057'] = true;
    acisaList['5067'] = true;
    acisaList['5088'] = true;
    acisaList['5095'] = true;
    acisaList['5130'] = true;
    acisaList['5142'] = true;
    acisaList['5159'] = true;
    acisaList['5162'] = true;
    acisaList['5169'] = true;
    acisaList['5198'] = true;
    acisaList['6006'] = true;
    acisaList['6034'] = true;
    acisaList['6062'] = true;
    acisaList['6063'] = true;
    acisaList['6068'] = true;
    acisaList['6071'] = true;
    acisaList['6072'] = true;
    acisaList['6081'] = true;
    acisaList['6083'] = true;
    acisaList['6084'] = true;
    acisaList['6088'] = true;
    acisaList['6089'] = true;
    acisaList['6097'] = true;
    acisaList['6099'] = true;
    acisaList['6115'] = true;
    acisaList['6128'] = true;
    acisaList['6144'] = true;
    acisaList['6147'] = true;
    acisaList['6152'] = true;
    if (!acisaList[acisa]) {
        alert("Please enter a valid acisa number, e.g., 1006");
        return false;
    }
    else {
        return true;
    }
}
