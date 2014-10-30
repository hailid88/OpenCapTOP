SNAPsDownloadStore = new Ext.data.JsonStore({
    // Load data at once
    //autoLoad: true,
    // Override default http proxy settings
    storeId: 'test',
    proxy: new Ext.data.HttpProxy({
        // Call web service method using GET syntax
        url: 'DBAccess.asmx/getSNAPsData',
        // Ask for Json response                    
        headers: { 'Content-type': 'application/json' },
        reader: {
            type: 'json',
            root: 'd',
            idProperty: "IncID"
        }
    }),
    fields: ['SNAPsTime', 'SNAPsACISA', 'SNAPsLaneDir', 'SNAPsLaneNum', 'SNAPsVolume', 'SNAPsOccupancy', 'SNAPsSpeed'
    ],
    listeners: {
        beforeload: function (store, options) {
        },

        load: function (store, records) {
            var testStore = store;

            var labels = ['SNAPsTime', 'SNAPsACISA', 'SNAPsLaneDir', 'SNAPsLaneNum', 'SNAPsVolume', 'SNAPsOccupancy', 'SNAPsSpeed'
            ];

//            var A = [['Time', 'ACISA', 'LaneDir', 'LaneNum', 'Volume', 'Occupancy', 'Speed'
//            ]];  // initialize array of rows with header row as 1st item

            //colDelim = ",";
            var winTitle;
            //var rowRecord = new Array();
            Ext.each(records, function (record, index) {

                //winTitle = "ACISA: " + record.get(labels[1])+ ",    Time:" + record.get(labels[0]);

                winTitle = "ACISA: " + record.get(labels[1]);
//                for (var i = 0; i < labels.length; i++) {
//                    rowRecord[i] = record.get(labels[i]);
//                }
//                A.push(rowRecord.join(colDelim));
            });

            /* var csvRows = [];

            for (var j = 0; j < A.length; j++) {
            csvRows.push(A[j]);
            }*/

            //rowDelim = "\r\n";
            //var csvString = csvRows.join(rowDelim);

            //alert(csvString);

            var win;
//            var x11 = 20 / 1366 * screen.width;
//            var fieldwidth = 300 / 1366 * screen.width;



            try {
                Ext.require([
                    'Ext.grid.*'
                ]);
                var girdPanel = Ext.create('Ext.grid.Panel', {
                    store:testStore,
                    columns: [
                    { header: 'Time', dataIndex: 'SNAPsTime' },
                    //{ header: 'ACISA', dataIndex: 'SNAPsACISA', flex: 1 },
                    { header: 'LaneDir', dataIndex: 'SNAPsLaneDir'},
                    { header: 'LaneNum',  dataIndex: 'SNAPsLaneNum' },
                    { header: 'Volume', dataIndex: 'SNAPsVolume' },
                    { header: 'Occupancy', dataIndex: 'SNAPsOccupancy' },
                    { header: 'Speed', dataIndex: 'SNAPsSpeed'}],
                    //autoExpandColumn: 'Time',
                    height: 200,
                    width: 600,
                    renderTo: win
                });
                if (!girdPanel.isVisible()) {
                    //alert("try to be visible");
                    try {
                        girdPanel.show();
                    }
                    catch (Error)
                    { alert(Error); }

                }
            }
            catch (Error) { alert(Error); }
            try {
                Ext.require([
                                    'Ext.tab.*',
                                    'Ext.window.*',
                                    'Ext.tip.*',
                                    'Ext.layout.container.Border'
                                ]);

                if (!win) {
                    win = Ext.create('widget.window', {
                        title: winTitle,
                        closable: true,
                        closeAction: 'hide',
                        width: 600,
                        minWidth: 50,
                        height: 200,
                        autoScroll: true,
                        layout: 'absolute',
                        items: [girdPanel]
                    });
                }

                if (!win.isVisible()) {
                    win.show();
                }
            }
            catch (err) { alert(err); }



            


            //alert(csvString);
            //            try {
            //                var a = document.createElement('a');
            //                a.href = 'data:attachment/csv;charset=utf-8,' + encodeURIComponent(csvString);
            //                a.target = '_blank';
            //                a.download = 'snaps.csv';
            //                document.body.appendChild(a);
            //                a.click();
            //            }
            //            catch (Error) { alert(Error); }
        }
    }
});