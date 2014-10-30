IMDetailStore = new Ext.data.JsonStore({
    // Load data at once
    //autoLoad: true,
    // Override default http proxy settings
    proxy: new Ext.data.HttpProxy({
        // Call web service method using GET syntax
        url: 'DBAccess.asmx/getIMDetailInfo',
        // Ask for Json response                    
        headers: { 'Content-type': 'application/json' },
        reader: {
            type: 'json',
            root: 'd',
            idProperty: "IncID"
        }
    }),
    fields: ['IncID', 'IncDate', 'IncTime', 'DetctSrc', 'OthSrc', 'Direction', 'OtherDir', 'ActLights', 'ActSirens', 'Quadrant',
    'Ward', 'IfTMCInformed', 'Street2', 'IncType', 'NumVeh', 'IfInjury', 'LanBlocked', 'Weather', 'TraffCond',
    'RopEnvelope', 'OthAgency', 'OthAgency1', 'OthAgency3', 'IncCom', 'UniCom', 'RegImpact', 'NotifiedMDOT', 'NotifiedVDOT',
    'NotifiedWMATA', 'NotifiedMont', 'NotifiedPG', 'NotifiedArlin', 'NotifiedAlex', 'AgencyReq', 'Description', 'RecWIN',
    'EndDate', 'OthAgency4', 'OthAgency5', 'Medianm', 'IfFatal', 'Status', 'OthIncType', 'Street1Num', 'Street1', 'LaneBlocked1',
    'OnSceneTime', 'TmcOP', 'VenNo', 'Patroller', 'Comments', 'SceneDTime', 'Longitude', 'Latitude', 'OthAgency2',
    'RNO', 'HansenCPC', 'HansenNo', 'HansenCRC', 'ContractorNo', 'ACISA', 'Loc', 'Loc2', 'DiscLoc', 'CallerName', 'CallerAddrs',
    'CallerCity', 'CallerState', 'DayTel', 'NightTel', 'CallerComment', 'OpComment', 'CallerDate', 'CallerTime', 'TechAssgn',
    'TimeGiven', 'TimeCompleted', 'ContrCommt'
],
    listeners: {
        beforeload: function (store, options) {
        },

        load: function (store, records) {

            Ext.each(records, function (record, index) {
               
                showDetail(index);

            });
        }
    }
});

function IMRCounter(num) {
    return (15 + 25 * (num - 1)) / 768 * screen.height;
}

function showDetail(d) {

    var markerInfo = IMDetailStore.getAt(d);
   


    var win;

    try {
        Ext.require([
            'Ext.tab.*',
            'Ext.window.*',
            'Ext.tip.*',
            'Ext.layout.container.Border'
        ]);

       
        var x11 = 20/1366 * screen.width;
        var x12 = 340/1366 * screen.width ;
        var x13 = 660/1366 * screen.width;
        var x21 = 20/1366 * screen.width;
        var x22 = 390/1366* screen.width;
        var fieldwidth = 300 / 1366 * screen.width;
        if(!win){
            win = Ext.create('widget.window', {
                title: 'Incident: '+ markerInfo.get('IncID'),
                closable: true,
                closeAction: 'hide',
                width: 320,
                minWidth: 320,
                height: 300,
                autoScroll: true,
                /*layout: {
                type: 'border',
                padding: 500
                 },*/
                layout: 'absolute',
                 items: [
                     {
                         xtype: 'form',
                         scrollHeight: true,
                         scrollWidth: true,
                         defaultType: 'textfield',
                         fieldDefaults: {
                             x: x11,
                             msgTarget: 'side',
                             labelAlign: 'left',
                             labelWidth: 120 / 1366 * screen.width,
                             readOnly: true,
                             width: fieldwidth

                         },
                         layout: 'absolute',
                         items: [
                             {               // Results grid specified as a config object with an xtype of 'grid'
                                 y: this.IMRCounter(1),
                                 fieldLabel: '1. Incident Type ',
                                 value: markerInfo.get('IncType')
                            },
                             {
                                 y: this.IMRCounter(2),
                                 fieldLabel: '2. Other Type ',
                                 value: markerInfo.get('OthIncType')
                             },
                             {
                                 y: this.IMRCounter(3),
                                 fieldLabel: '3. Start Date ',
                                 value: markerInfo.get('IncDate')
                             },
                             {
                                 y: this.IMRCounter(4),
                                 fieldLabel: '4. Incident Detection Time ',
                                 labelWidth: 180 / 1366 * screen.width,
                                 value: markerInfo.get('IncTime')
                             },
                             {
                                 y: this.IMRCounter(5),
                                 fieldLabel: '5. Status ',
                                 labelWidth: 180 / 1366 * screen.width,
                                 value: markerInfo.get('Status')
                             },
                             {
                                 y: this.IMRCounter(6),
                                 fieldLabel: '6. Detection Source + ',
                                 labelWidth: 180 / 1366 * screen.width,
                                 value: markerInfo.get('DetctSrc')
                             },
                             {
                                 y: this.IMRCounter(7),
                                 fieldLabel: '7. Light Activated ',
                                 labelWidth: fieldwidth - 40 / 1366 * screen.width,
                                 value: markerInfo.get('ActLights')
                             },
                             {
                                 y: this.IMRCounter(8),
                                 fieldLabel: '8. Siren Activated ',
                                 labelWidth: fieldwidth - 40 / 1366 * screen.width,
                                 value: markerInfo.get('ActSirens')
                             },
                             {
                                 y: this.IMRCounter(9),
                                 fieldLabel: '9. Incident Location/Street No. ',
                                 labelWidth: fieldwidth - 70 / 1366 * screen.width,
                                 value: markerInfo.get('Street1Num')
                             },
                             {
                                 y: this.IMRCounter(10),
                                 fieldLabel: '    Street Name ',
                                 labelWidth: fieldwidth - 150 / 1366 * screen.width,
                                 value: markerInfo.get('Street1')
                             },
                             {
                                 y: this.IMRCounter(11),
                                 fieldLabel: '    Second Street Name ',
                                 labelWidth: fieldwidth - 150 / 1366 * screen.width,
                                 value: markerInfo.get('Street2')
                             },
                             {
                                 y: this.IMRCounter(12),
                                 fieldLabel: '10. ROP on Scene Time ',
                                 labelWidth: fieldwidth - 100 / 1366 * screen.width,
                                 value: markerInfo.get('OnSceneTime')

                             },
                             {
                                 y: this.IMRCounter(13),
                                 fieldLabel: '11. Direction of Travel ',
                                 labelWidth: 160 / 1366 * screen.width,
                                 value: markerInfo.get('Direction')
                             },
                             {
                                 y: this.IMRCounter(14),
                                 fieldLabel: '12. Lanes Blocked ',
                                 labelWidth: fieldwidth - 150 / 1366 * screen.width,
                                 value: markerInfo.get('LanBlocked')
                             },
                             {
                                 y: this.IMRCounter(15),
                                 fieldLabel: '13. Other Direction of Travel ',
                                 labelWidth: fieldwidth - 100 / 1366 * screen.width,
                                 value: markerInfo.get('OtherDir')
                             },
                             {
                                 y: this.IMRCounter(16),
                                 fieldLabel: '14. Lanes Blocked(Other) ',
                                 labelWidth: fieldwidth - 100 / 1366 * screen.width,
                                 value: markerInfo.get('LaneBlocked1')
                             },
                             {
                                 y: this.IMRCounter(17),
                                 fieldLabel: '15. Quadrant ',
                                 labelWidth: fieldwidth - 100 / 1366 * screen.width,
                                 value: markerInfo.get('Quadrant')
                             },
                             {
                                 y: this.IMRCounter(18),
                                 fieldLabel: '16. Ward ',
                                 labelWidth: fieldwidth - 150 / 1366 * screen.width,
                                 value: markerInfo.get('Ward')
                             },
                             {
                                 y: this.IMRCounter(19),
                                 fieldLabel: '17. TMC informed ',
                                 labelWidth: fieldwidth - 150 / 1366 * screen.width,
                                 value: markerInfo.get('IfTMCInformed')
                             },
                             {
                                 y: this.IMRCounter(20),
                                 fieldLabel: '18. Number of Vehicle Involved ',
                                 labelWidth: 210 / 1366 * screen.width,
                                 value: markerInfo.get('NumVeh')
                             },
                             {
                                 y: this.IMRCounter(21),
                                 fieldLabel: '19. If Injuries ',
                                 labelWidth: 200 / 1366 * screen.width,
                                 value: markerInfo.get('IfInjury')
                             },
                             {
                                 y: this.IMRCounter(22),
                                 fieldLabel: '20. If Fatal ',
                                 labelWidth: 200 / 1366 * screen.width,
                                 value: markerInfo.get('IfFatal')
                             },
                             {
                                 y: this.IMRCounter(23),
                                 fieldLabel: '21. Weather Conditions ',
                                 labelWidth: 180 / 1366 * screen.width,
                                 value: markerInfo.get('Weather')
                             },
                             {
                                 x: x12,
                                 y: this.IMRCounter(1),
                                 fieldLabel: '22. Traffic Conditions ',
                                 labelWidth: 180 / 1366 * screen.width,
                                 value: markerInfo.get('TraffCond')
                             },
                             {
                                 x: x12,
                                 y: this.IMRCounter(2),
                                 fieldLabel: '23. If ROP Envelope Given ',
                                 labelWidth: 220 / 1366 * screen.width,
                                 value: markerInfo.get('RopEnvelope')
                             },
                             {
                                 x: x12,
                                 y: this.IMRCounter(3),
                                 fieldLabel: '24. Other Agency On Scene ',
                                 labelWidth: fieldwidth - 80 / 1366 * screen.width,
                                 value: markerInfo.get('OthAgency')
                             },
                             {
                                 x: x12,
                                 y: this.IMRCounter(4),
                                 fieldLabel: '25. Other Agency On Scene(2) ',
                                 labelWidth: fieldwidth - 80 / 1366 * screen.width,
                                 value: markerInfo.get('OthAgency2')
                             },
                             {
                                 x: x12,
                                 y: this.IMRCounter(5),
                                 fieldLabel: '26. Other Agency On Scene(3) ',
                                 labelWidth: fieldwidth - 80 / 1366 * screen.width,
                                 value: markerInfo.get('OthAgency3')
                             },
                             {
                                 x: x12,
                                 y: this.IMRCounter(6),
                                 fieldLabel: '27. Other Agency On Scene(4) ',
                                 labelWidth: fieldwidth - 80 / 1366 * screen.width,
                                 value: markerInfo.get('OthAgency4')
                             },
                             {
                                 x: x12,
                                 y: this.IMRCounter(7),
                                 fieldLabel: '28. Other Agency On Scene(5) ',
                                 labelWidth: fieldwidth - 80 / 1366 * screen.width,
                                 value: markerInfo.get('OthAgency5')
                             },
                             {
                                 x: x12,
                                 y: this.IMRCounter(8),
                                 fieldLabel: '29. Media Name if Any ',
                                 labelWidth: 160 / 1366 * screen.width,
                                 value: markerInfo.get('Medianm')
                             },
                             {
                                 x: x12,
                                 y: this.IMRCounter(9),
                                 fieldLabel: '30. Unified Command ',
                                 labelWidth: 180 / 1366 * screen.width,
                                 value: markerInfo.get('UniCom')
                             },
                             {
                                 x: x12,
                                 y: this.IMRCounter(10),
                                 fieldLabel: '31. Incident Commander ',
                                 labelWidth: fieldwidth - 80 / 1366 * screen.width,
                                 value: markerInfo.get('IncCom')
                             },
                             {
                                 x: x12,
                                 y: this.IMRCounter(11),
                                 xtype: 'label',
                                 text: '32. Agency or Assets Requested '
                             },
                             {
                                 x: x12,
                                 y: this.IMRCounter(12),
                                 fieldLabel: '',
                                 height: 95 / 768 * screen.height,
                                 width: fieldwidth,
                                 value: markerInfo.get('AgencyReq')
                             },
                             {
                                 x: x12,
                                 y: this.IMRCounter(16),
                                 xtype: 'label',
                                 text: '33. Description of Incident Location '
                             },
                             {
                                 x: x12,
                                 y: this.IMRCounter(17),
                                 fieldLabel: '',
                                 height: 95 / 768 * screen.height,
                                 width: fieldwidth,
                                 value: markerInfo.get('Description')
                             },
                             {
                                 x: x12,
                                 y: this.IMRCounter(22),
                                 fieldLabel: '34. Regional Impact ',
                                 labelWidth: 200 / 1366 * screen.width,
                                 value: markerInfo.get('RegImpact')
                             },
                             {
                                 x: x12,
                                 y: this.IMRCounter(23),
                                 fieldLabel: '35. If MDOT notified ',
                                 labelWidth: fieldwidth - 30 / 1366 * screen.width,
                                 value: markerInfo.get('NotifiedMDOT')
                             },
                             {
                                 x: x13,
                                 y: this.IMRCounter(1),
                                 fieldLabel: '36. If VDOT notified ',
                                 labelWidth: fieldwidth - 30 / 1366 * screen.width,
                                 value: markerInfo.get('NotifiedVDOT')
                             },
                             {
                                 x: x13,
                                 y: this.IMRCounter(2),
                                 fieldLabel: '37. If Montgomery County Notified ',
                                 labelWidth: fieldwidth - 30 / 1366 * screen.width,
                                 value: markerInfo.get('NotifiedMont')
                             },
                             {
                                 x: x13,
                                 y: this.IMRCounter(3),
                                 fieldLabel: '38. If PG County Notified ',
                                 labelWidth: fieldwidth - 30 / 1366 * screen.width,
                                 value: markerInfo.get('NotifiedPG')
                             },
                             {
                                 x: x13,
                                 y: this.IMRCounter(4),
                                 fieldLabel: '39. If Arlington County Notified ',
                                 labelWidth: fieldwidth - 30 / 1366 * screen.width,
                                 value: markerInfo.get('NotifiedArlin')
                             },
                             {
                                 x: x13,
                                 y: this.IMRCounter(5),
                                 fieldLabel: '40. If Alexandria County Notified ',
                                 labelWidth: fieldwidth - 30 / 1366 * screen.width,
                                 value: markerInfo.get('NotifiedAlex')
                             },
                             {
                                 x: x13,
                                 y: this.IMRCounter(6),
                                 fieldLabel: '41. If WMATA County Notified ',
                                 labelWidth: fieldwidth - 30 / 1366 * screen.width,
                                 value: markerInfo.get('NotifiedWMATA')
                             },
                             {
                                 x: x13,
                                 y: this.IMRCounter(7),
                                 fieldLabel: '42. Comments ',
                                 labelWidth: fieldwidth

                             },

                             {
                                 x: x13,
                                 y: this.IMRCounter(8),
                                 fieldLabel: '',
                                 height: 95 / 768 * screen.height,
                                 value: markerInfo.get('Comments')
                             },
                             {
                                 x: x13,
                                 y: this.IMRCounter(13),
                                 fieldLabel: '43. Recorded in CapWIN ',
                                 labelWidth: fieldwidth - 30 / 1366 * screen.width,
                                 value: markerInfo.get('RecWIN')
                             },
                             {
                                 x: x13,
                                 y: this.IMRCounter(14),
                                 fieldLabel: '44. Other Detection Source',
                                 labelWidth: fieldwidth - 80 / 1366 * screen.width,
                                 value: markerInfo.get('OthSrc')
                             },
                             {
                                 x: x13,
                                 y: this.IMRCounter(15),
                                 fieldLabel: '45. End Date ',
                                 labelWidth: fieldwidth - 80 / 1366 * screen.width,
                                 value: markerInfo.get('EndDate')
                             },
                             {
                                 x: x13,
                                 y: this.IMRCounter(16),
                                 fieldLabel: '46. TMC Operator ',
                                 labelWidth: fieldwidth - 120 / 1366 * screen.width,
                                 value: markerInfo.get('TmcOP')
                             },
                             {
                                 x: x13,
                                 y: this.IMRCounter(17),
                                 fieldLabel: '47. Patroller ',
                                 labelWidth: fieldwidth - 80 / 1366 * screen.width,
                                 value: markerInfo.get('Patroller')
                             },
                             {
                                 x: x13,
                                 y: this.IMRCounter(18),
                                 fieldLabel: '48. Vehicle Number ',
                                 labelWidth: fieldwidth - 70 / 1366 * screen.width,
                                 value: markerInfo.get('VenNo')
                             },
                             {
                                 x: x13,
                                 y: this.IMRCounter(19),
                                 fieldLabel: '49. Scene Departure Time ',
                                 labelWidth: fieldwidth - 80 / 1366 * screen.width,
                                 value: markerInfo.get('SceneDTime')
                             }
                         ]
                     }
                 ]

            });
        }
        if (!win.isVisible()) {
            win.show();
        }

    } catch (err) { alert(err); }

}



