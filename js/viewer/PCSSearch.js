$(function () {
    $("#dialog").dialog({
        autoOpen: false,
        width: "auto",
        height: "auto",
        buttons: [
				{
				    text: "LoopsDownload",
				    click: function () {

				        var dateStart = $('#pcsDateStart').val();

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

				        var timeStart = $('#pcsTimeStart').val();
				        if (!timeStart.length) {
				            timeStart = '00:00';
				        }
				        var startDate = dateStart.split('/');
				        var startTime = timeStart.split(':');

				        sDT = new Date(startDate[2], startDate[0] - 1, startDate[1], startTime[0], startTime[1]);


				        var dateEnd = $('#pcsDateEnd').val();
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

				        var timeEnd = $('#pcsTimeEnd').val();
				        if (!timeEnd.length) {
				            timeEnd = '00:00';
				        }
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

				        Ext.apply(LoopsDownloadStore.proxy.extraParams, { startTime: sDT, endTime: eDT, downloadAble: 'true' });
				        LoopsDownloadStore.load();

				        Ext.defer(function () {
				            try {
				                window.open("http://10.41.20.61:5566/download/loops.csv");
				            }
				            catch (Error) {
				                alert(Error);
				            }
				        },
				        secondInterval * 1000, this)

				    }
				},
                {
                    text: "InfaredDownload",
                    click: function () {
                        var dateStart = $('#pcsDateStart').val();
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
                        var timeStart = $('#pcsTimeStart').val();
                        if (!timeStart.length) {
                            timeStart = '00:00';
                        }
                        var startDate = dateStart.split('/');
                        var startTime = timeStart.split(':');

                        sDT = new Date(startDate[2], startDate[0] - 1, startDate[1], startTime[0], startTime[1]);

                        var dateEnd = $('#pcsDateEnd').val();
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

                        var timeEnd = $('#pcsTimeEnd').val();
                        if (!timeEnd.length) {
                            timeEnd = '00:00';
                        }
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

                        Ext.apply(InfraredDownloadStore.proxy.extraParams, { startTime: sDT, endTime: eDT, downloadAble: 'true' });
                        InfraredDownloadStore.load();

                        Ext.defer(function () {
                            try {
                                window.open("http://10.41.20.61:5566/download/infrared.csv");
                            }
                            catch (Error) {
                                alert(Error);
                            }
                        },
                        secondInterval * 1000, this)

                    }
                },
                 {
                     text: "MicrowaveDownload",
                     click: function () {
                         var dateStart = $('#pcsDateStart').val();
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
                         var timeStart = $('#pcsTimeStart').val();
                         if (!timeStart.length) {
                             timeStart = '00:00';
                         }
                         var startDate = dateStart.split('/');
                         var startTime = timeStart.split(':');

                         sDT = new Date(startDate[2], startDate[0] - 1, startDate[1], startTime[0], startTime[1]);

                         var dateEnd = $('#pcsDateEnd').val();
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

                         var timeEnd = $('#pcsTimeEnd').val();
                         if (!timeEnd.length) {
                             timeEnd = '00:00';
                         }
                         var endDate = dateEnd.split('/');
                         var endTime = timeEnd.split(':');

                         eDT = new Date(endDate[2], endDate[0] - 1, endDate[1], endTime[0], endTime[1]);

                         var now = new Date();
                         if (eDT > now) {
                             eDT = now;

                         }

                         // how many hours for the data. 
                         var interval = (eDT - sDT) / 3600000;

                         var secondInterval = interval / 200 * 2;
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


                         Ext.apply(MicrowaveDownloadStore.proxy.extraParams, { startTime: sDT, endTime: eDT, downloadAble: 'true' });
                         MicrowaveDownloadStore.load();

                         Ext.defer(function () {
                             try {
                                 window.open("http://10.41.20.61:5566/download/microwave.csv");
                             }
                             catch (Error) {
                                 alert(Error);
                             }
                         },
                        secondInterval * 1000, this)

                     }
                 },
                  {
                      text: "VideoDownload",
                      click: function () {
                          var dateStart = $('#pcsDateStart').val();
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
                          var timeStart = $('#pcsTimeStart').val();
                          if (!timeStart.length) {
                              timeStart = '00:00';
                          }
                          var startDate = dateStart.split('/');
                          var startTime = timeStart.split(':');

                          sDT = new Date(startDate[2], startDate[0] - 1, startDate[1], startTime[0], startTime[1]);

                          var dateEnd = $('#pcsDateEnd').val();
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

                          var timeEnd = $('#pcsTimeEnd').val();
                          if (!timeEnd.length) {
                              timeEnd = '00:00';
                          }
                          var endDate = dateEnd.split('/');
                          var endTime = timeEnd.split(':');

                          eDT = new Date(endDate[2], endDate[0] - 1, endDate[1], endTime[0], endTime[1]);

                          var now = new Date();
                          if (eDT > now) {
                              eDT = now;

                          }

                          // how many hours for the data. 
                          var interval = (eDT - sDT) / 3600000;

                          var secondInterval = interval / 200 * 2;
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


                          Ext.apply(VideoDownloadStore.proxy.extraParams, { startTime: sDT, endTime: eDT, downloadAble: 'true' });
                          VideoDownloadStore.load();
                          Ext.defer(function () {
                              try {
                                  window.open("http://10.41.20.61:5566/download/video.csv");
                              }
                              catch (Error) {
                                  alert(Error);
                              }
                          },
                        secondInterval * 1000, this)

                      }
                  },
                   {
                       text: "AcousticDownload",
                       click: function () {

                           var dateStart = $('#pcsDateStart').val();
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
                           var timeStart = $('#pcsTimeStart').val();
                           if (!timeStart.length) {
                               timeStart = '00:00';
                           }
                           var startDate = dateStart.split('/');
                           var startTime = timeStart.split(':');

                           sDT = new Date(startDate[2], startDate[0] - 1, startDate[1], startTime[0], startTime[1]);

                           var dateEnd = $('#pcsDateEnd').val();
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

                           var timeEnd = $('#pcsTimeEnd').val();
                           if (!timeEnd.length) {
                               timeEnd = '00:00';
                           }
                           var endDate = dateEnd.split('/');
                           var endTime = timeEnd.split(':');

                           eDT = new Date(endDate[2], endDate[0] - 1, endDate[1], endTime[0], endTime[1]);

                           var now = new Date();
                           if (eDT > now) {
                               eDT = now;

                           }

                           // how many hours for the data. 
                           var interval = (eDT - sDT) / 3600000;

                           var secondInterval = interval / 200* 2;
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


                           Ext.apply(AcousticDownloadStore.proxy.extraParams, { startTime: sDT, endTime: eDT, downloadAble: 'true' });
                           AcousticDownloadStore.load();

                           Ext.defer(function () {
                               try {
                                   window.open("http://10.41.20.61:5566/download/acoustic.csv");
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
});
