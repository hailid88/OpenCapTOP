
Ext.define('FeedViewer.MapWindow', {

    extend: 'Ext.tab.Panel',
    alias: 'widget.mapWindow',

    maxTabWidth: 230 / 1366 * screen.width,
    border: false,

    initComponent: function () {
        /*this.tabBar = {
        border: true
        };*/
        this.callParent(arguments);
        //this.creatMapWin();
        this.creatSearchWin();
    },
    /**
    * Creat Map Visualization
    *
    */
    creatMapWin: function () {
        var active = this.add({
            id: 'map-panel',
            name: 'map-panel',
            xtype: 'gmappanel',
            title: "Google Map",
            zoomLevel: 11,
            gmapType: 'map',
            mapConfOpts: ['enableScrollWheelZoom', 'enableDoubleClickZoom', 'enableDragging'],
            mapControls: ['GSmallMapControl', 'GMapTypeControl', 'NonExistantControl']
        });

        Ext.defer(function () {
            var latitude = 38.90, longitude = -77.03;   //center of washington DC. 
            var point = new google.maps.LatLng(latitude, longitude);
            var mapPanel = Ext.getCmp('map-panel');
            if (mapPanel) {
                mapPanel.gmap.setCenter(point);
            }
        },
        500, this);

        this.setActiveTab(active);
    },

    creatSearchWin: function () {
        searchActive = this.add(Ext.create('widget.searchPanel', {
            region: 'center',
            title: 'Traffic Map',
            minWidth: 300 / 1366 * screen.width
        }));
        this.setActiveTab(searchActive);
    },


    //    addCCTVInfoPanel: function (dataIdx) {

    //        var markerInfo = CCTVsStore.getAt(dataIdx);
    //        var name = markerInfo.get('CCTVIntersection');
    //        var filepath = markerInfo.get("CCTVFilepath");
    //        //popupWin = window.open('http://10.40.62.65:8080/showvideo.aspx?vdo='+filepath, 'open_window', 'menubar, toolbar, location, directories, status, scrollbars, resizable, dependent, width=640, height=480, left=0, top=0')
    //        var popupWin = window.open('http://10.40.62.65:8080/showvideo.aspx?vdo=' + filepath, 'open_window', 'location, directories, status, resizable, width=650, height=280, left=0, top=0');
    //        popupWin.focus();
    //    },

    /*
    btnCCTVclick: function(dataIdx)
    {
    var win = new Window 
    {
    ID = "Window1",
    Title = "Example",
    Height = 185,
    Width = 350,
    BodyPadding = 5,
    Modal = true,
    CloseAction = CloseAction.Destroy,
    Html = "A new Window  was created at: " + DateTime.Now.ToLongTimeString()
    };

    win.Render(this.Form);
    }*/
    /*
    * Add two reports when click on the detail info of the marker's info window
    */

    addIMInfoPanel: function (dataIdx) {
        var markerInfo = IMsStore.getAt(dataIdx);
        var fieldwidth = 270 / 1366 * screen.width;
        var fieldwidth2 = fieldwidth + 50 / 1366 * screen.width;
        var x11 = 20/1366 * screen.width;
        var x12 = 340/1366 * screen.width ;
        var x13 = 660/1366 * screen.width;
        var x21 = 20/1366 * screen.width;
        var x22 = 390/1366* screen.width;
        // for the filterPanel and filterPanel2 give out the forms of detail incident information and service request information. 
        var filterPanel = this.add({
            xtype: 'form',
            title: 'Incident-' + markerInfo.get('IncID'),
            closable: true,
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
            items: [{               // Results grid specified as a config object with an xtype of 'grid'
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
                fieldLabel: '5. Detection Source + ',
                labelWidth: 160 / 1366 * screen.width,
                value: markerInfo.get('DetctSrc')
            },
            {
                y: this.IMRCounter(6),
                fieldLabel: '6. Other Detection Source ',
                labelWidth: 160 / 1366 * screen.width,
                value: markerInfo.get('OthSrc')
            },
            {
                y: this.IMRCounter(7),
                fieldLabel: '7. Light Activated ',
                labelWidth: fieldwidth - 30 / 1366 * screen.width,
                value: markerInfo.get('ActLights')
            },
            {
                y: this.IMRCounter(8),
                fieldLabel: '8. Siren Activated ',
                labelWidth: fieldwidth - 30 / 1366 * screen.width,
                value: markerInfo.get('ActSirens')
            },
            {
                y: this.IMRCounter(9),
                fieldLabel: '9. Incident Location/Street No. ',
                labelWidth: 190 / 1366 * screen.width,
                value: markerInfo.get('Street1Num')
            },
            {
                y: this.IMRCounter(10),
                fieldLabel: '    Street Name ',
                labelWidth: 120 / 1366 * screen.width,
                value: markerInfo.get('Street1')
            },
            {
                y: this.IMRCounter(11),
                fieldLabel: '    Second Street Name ',
                labelWidth: 140 / 1366 * screen.width,
                value: markerInfo.get('Street2')
            },
            {
                y: this.IMRCounter(12),
                fieldLabel: '10. ROP on Scene Time ',
                labelWidth: 180 / 1366 * screen.width,
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
                value: markerInfo.get('LanBlocked')
            },
            {
                y: this.IMRCounter(15),
                fieldLabel: '13. Other Direction of Travel ',
                labelWidth: 180 / 1366 * screen.width,
                value: markerInfo.get('OtherDir')
            },
            {
                y: this.IMRCounter(16),
                fieldLabel: '14. Lanes Blocked(Other) ',
                labelWidth: 180 / 1366 * screen.width,
                value: markerInfo.get('LaneBlocked1')
            },
            {
                y: this.IMRCounter(17),
                fieldLabel: '15. Quadrant ',
                labelWidth: 200 / 1366 * screen.width,
                value: markerInfo.get('Quadrant')
            },
            {
                y: this.IMRCounter(18),
                fieldLabel: '16. Ward ',
                labelWidth: 220 / 1366 * screen.width,
                value: markerInfo.get('Ward')
            },
            {
                y: this.IMRCounter(19),
                fieldLabel: '17. TMC informed ',
                labelWidth: 220 / 1366 * screen.width,
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
                labelWidth: 180 / 1366 * screen.width,
                value: markerInfo.get('OthAgency')
            },
            {
                x: x12,
                y: this.IMRCounter(4),
                fieldLabel: '25. Other Agency On Scene(2) ',
                labelWidth: 200 / 1366 * screen.width,
                value: markerInfo.get('OthAgency2')
            },
            {
                x: x12,
                y: this.IMRCounter(5),
                fieldLabel: '26. Other Agency On Scene(3) ',
                labelWidth: 200 / 1366 * screen.width,
                value: markerInfo.get('OthAgency3')
            },
            {
                x: x12,
                y: this.IMRCounter(6),
                fieldLabel: '27. Other Agency On Scene(4) ',
                labelWidth: 200 / 1366 * screen.width,
                value: markerInfo.get('OthAgency4')
            },
            {
                x: x12,
                y: this.IMRCounter(7),
                fieldLabel: '28. Other Agency On Scene(5) ',
                labelWidth: 200 / 1366 * screen.width,
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
                labelWidth: 160 / 1366 * screen.width,
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
                value: ''
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
                    value: markerInfo.get('AgencyReq')
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
                    xtype: 'label',
                    text: '42. Comments '
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
                    fieldLabel: '44. Status ',
                    labelWidth: fieldwidth - 80 / 1366 * screen.width,
                    value: markerInfo.get('Status')
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
                    labelWidth: fieldwidth - 60 / 1366 * screen.width,
                    value: markerInfo.get('SceneDTime')
                }
            ]
        });

        var filterPanel2 = this.add({
            xtype: 'form',
            title: 'Service Request',
            closable: true,
            scrollHeight: true,
            scrollWidth: true,
            defaultType: 'textfield',
            fieldDefaults: {
                x: x21,
                msgTarget: 'side',
                labelAlign: 'left',
                labelWidth: fieldwidth2 * 4 / 9,
                readOnly: true,
                width: fieldwidth2

            },
            layout: 'absolute',
            items: [{               // Results grid specified as a config object with an xtype of 'grid'
                y: this.IMRCounter(1),
                fieldLabel: '1. DDOT Request #  ',
                value: markerInfo.get('RNO')
            },
            {
                y: this.IMRCounter(2),
                fieldLabel: '2. Hansen Current Problem Codes ',
                labelWidth: fieldwidth2 - 100 / 1366 * screen.width,
                value: markerInfo.get('HansenCPC')

            },
            {
                y: this.IMRCounter(3),
                fieldLabel: '3. Hansen Request # ',
                value: markerInfo.get('HansenNo')
            },
            {
                y: this.IMRCounter(4),
                fieldLabel: '4. Hansen Resolution Code ',
                labelWidth: fieldwidth2 - 100 / 1366 * screen.width,
                value: markerInfo.get('HansenCRC')
            },
            {
                y: this.IMRCounter(5),
                fieldLabel: '5. Contractor WO # ',
                value: markerInfo.get('ContractorNo')
            },
            {
                y: this.IMRCounter(6),
                fieldLabel: '6. ACISA# ',
                value: markerInfo.get('ACISA')
            },
            {
                x: x21,
                y: this.IMRCounter(7),
                xtype: 'label',
                text: '7. Signal Location (Street Name)'
            },

            {
                y: this.IMRCounter(8),
                fieldLabel: '',
                height: 20 / 768 * screen.height,
                value: markerInfo.get('Loc')
            },
            {
                y: this.IMRCounter(9),
                fieldLabel: '  Secondary Street Name ',
                value: markerInfo.get('Loc2')
            },
            {
                x: x21,
                y: this.IMRCounter(10),
                xtype: 'label',
                text: '8. Description of Location '
            },
            {
                y: this.IMRCounter(11),
                height: 95 / 768 * screen.height,
                value: markerInfo.get('DiscLoc')
            },
            {
                y: this.IMRCounter(15),
                fieldLabel: '9. Caller Information: Name ',
                labelWidth: fieldwidth2 - 130 / 1366 * screen.width,
                value: markerInfo.get('CallerName')
            },
            {
                y: this.IMRCounter(16),
                fieldLabel: '   Address ',
                value: markerInfo.get('CallerAddrs')
            },
            {
                y: this.IMRCounter(17),
                fieldLabel: '   City ',
                value: markerInfo.get('CallerCity')
            },
            {
                y: this.IMRCounter(18),
                fieldLabel: '    State ',
                value: markerInfo.get('CallerState')
            },
            {
                y: this.IMRCounter(19),
                fieldLabel: '    Daytime Phone # ',
                value: markerInfo.get('DayTel')
            },
            {
                y: this.IMRCounter(20),
                fieldLabel: '    Evening Phone # ',
                value: markerInfo.get('NightTel')
            },
            {
                x: x22,
                y: this.IMRCounter(1),
                xtype: 'label',
                text: '10. Caller Comments '
            },
            {
                x: x22,
                y: this.IMRCounter(2),
                height: 95 / 768 * screen.height,
                value: markerInfo.get('CallerComment')
            },
            {
                x: x22,
                y: this.IMRCounter(6),
                xtype: 'label',
                text: '11. Operator Comments '
            },
            {
                x: x22,
                y: this.IMRCounter(7),
                fieldLabel: '',
                height: 95 / 768 * screen.height,
                value: markerInfo.get('OpComment')
            },
            {
                x: x22,
                y: this.IMRCounter(11),
                fieldLabel: '12. Calling Date',
                value: markerInfo.get('CallDate')
            },
            {
                x: x22,
                y: this.IMRCounter(12),
                fieldLabel: '13. Calling Time',
                value: markerInfo.get('CallTime')
            },
            {
                x: x22,
                y: this.IMRCounter(13),
                fieldLabel: '14. Tech Assigned',
                value: markerInfo.get('TechAssgn')
            },
            {
                x: x22,
                y: this.IMRCounter(14),
                fieldLabel: '15. Time Given To MCDean',
                labelWidth: fieldwidth2 * 4 / 9 + 30 / 1366 * screen.width,
                value: markerInfo.get('TimeGiven')
            },
            {
                x: x22,
                y: this.IMRCounter(15),
                fieldLabel: '16. Time Completed by MCDean',
                labelWidth: fieldwidth2 * 4 / 9 + 60 / 1366 * screen.width,
                value: markerInfo.get('TimeCompleted')
            },
            {
                x: x22,
                y: this.IMRCounter(16),
                xtype: 'label',
                text: '17. Contractor Comments '
            },
            {
                x: x22,
                y: this.IMRCounter(17),
                fieldLabel: '',
                height: 95 / 768 * screen.height,
                value: markerInfo.get('ContrCommt')
            }

            ]
        });
        this.setActiveTab(filterPanel);
    },

    /**
    * this is a row counter for design the layout of the detail info form
    */
    IMRCounter: function (num) {
        return (15 + 25 * (num - 1)) / 768 * screen.height;
    },
    /**
    *
    * Listens for a new tab request
    * @private
    * @param {FeedViewer.FeedPost} The post
    * @param {Ext.data.Model} model The model
    */
    onTabOpen: function (post, rec) {
        var items = [],
            item,
            title;

        if (Ext.isArray(rec)) {
            Ext.each(rec, function (rec) {
                title = rec.get('title');
                if (!this.getTabByTitle(title)) {
                    items.push({
                        inTab: true,
                        xtype: 'feedpost',
                        title: title,
                        closable: true,
                        data: rec.data,
                        active: rec
                    });
                }
            }, this);
            this.add(items);
        }
        else {
            title = rec.get('title');
            item = this.getTabByTitle(title);
            if (!item) {
                item = this.add({
                    inTab: true,
                    xtype: 'feedpost',
                    title: title,
                    closable: true,
                    data: rec.data,
                    active: rec
                });
            }
            this.setActiveTab(item);
        }
    },

    /**
    * Find a tab by title
    * @param {String} title The title of the tab
    * @return {Ext.Component} The panel matching the title. null if not found.
    */
    getTabByTitle: function (title) {
        var index = this.items.findIndex('title', title);
        return (index < 0) ? null : this.items.getAt(index);
    }

});