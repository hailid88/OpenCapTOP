Ext.define('Viewer.SearchPanel', {
    //extend: 'Ext.tab.Panel',
    extend: 'Ext.panel.Panel',
    alias: 'widget.searchPanel',

    //maxTabWidth: 230,
    //border: false,
    border: '10 5 3 10',

    initComponent: function () {
        this.tabBar = {
            border: true
        };
        try {
            Ext.apply(this, {
                autoScroll: true,
                layout: {
                    type: 'vbox',
                    align: 'stretch',
                    pack: 'start'
                },
                items: [
                    /*searchBox,
                    {
                        xtype: 'splitter'
                    },*/
                    this.createMapWin()
                ]
            });
            this.callParent(arguments);
        } catch (err) { alert(err); }
    },

    /**
    * Creat Map Visualization
    *
    */
    createMapWin: function () {

        var mapWin = Ext.create('Ext.panel.Panel', {
            //region: 'south',
            minHeight: 100,
            //height: window.innerHeight * 0.87 - 40,
            height: window.innerHeight * 0.87 - 230,
            layout: 'fit',
            //collapsible: true,
            //split: true,
            items: [{
                id: 'map-panel',
                name: 'map-panel',
                xtype: 'gmappanel',
                title: "Google Map",
                zoomLevel: 11,
                gmapType: 'map',
                mapConfOpts: ['enableScrollWheelZoom', 'enableDoubleClickZoom', 'enableDragging'],
                mapControls: ['GSmallMapControl', 'GMapTypeControl', 'NonExistantControl']
            }]
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

        return mapWin;
    },

    createGridWin: function () {
        var distanceStore = Ext.create('Ext.data.Store', {
            fields: ['name', 'value'],
            data: [
                { 'name': "10 meters", 'value': "10" },
                { 'name': "100 meters", 'value': "100" },
                { 'name': "500 meters", 'value': "500" },
                { 'name': "1000 meters", 'value': "1000" },
                { 'name': "1500 meters", 'value': "1500" }
            ]
        });

        colocationGrid = Ext.create('Ext.panel.Panel', {
            //region: 'north',
            //collapsible: true,
            //split: true,
            height: 200,
            width: 400,
            minHeight: 100,
            //layout: 'border',
            layout: {
                type: 'vbox',
                align: 'stretch',
                pack: 'start'
            },
            items: [
                {
                    xtype: 'combobox',
                    id: 'disCmb',
                    fieldLabel: 'Choose Distance',
                    maxHeight: 10,
                    minHeight: 10,
                    maxWidth: 200,
                    padding: '0 0 0 0',
                    store: distanceStore,
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'value',
                    listeners: {
                        scope: this,
                        'select': function () {
                            //colocationInfoStore.load();
                            //alert(Ext.getCmp('disCmb').value);
                            Ext.apply(colocationInfoStore.proxy.extraParams, {
                                radius: Ext.getCmp('disCmb').value
                            });
                            colocationInfoStore.load();
                        }
                    }
                },
                {
                    xtype: 'grid',
                    padding: '10 0 10 0',
                    layout: 'fit',
                    columns: [
                        { header: 'Num.', dataIndex: 'NUM' },
                        { header: 'Participation Index', dataIndex: 'PI' },
                        { header: 'Crime Type', dataIndex: 'ID1' },
                        { header: 'Crime Type', dataIndex: 'ID2' },
                        { header: 'Crime Type', dataIndex: 'ID3' }
                    ],
                    store: colocationInfoStore,
                    flex: 1,
                    listeners: {
                        itemclick: function (store, records, item, index, e) {
                            var id1 = colocationInfoStore.getAt(index).get('ID1');
                            var id2 = colocationInfoStore.getAt(index).get('ID2');
                            var id3 = colocationInfoStore.getAt(index).get('ID3');
                            Ext.apply(colocationMapStore.proxy.extraParams, {
                                itemId1: id1,
                                itemId2: id2,
                                itemId3: id3
                            });
                            colocationMapStore.load();
                            Ext.defer(function () {
                                var latitude = 38.897529, longitude = -77.023966;   //center of washington DC.
                                var point = new google.maps.LatLng(latitude, longitude);
                                var mapPanel = Ext.getCmp('map-panel');
                                if (mapPanel) {
                                    mapPanel.gmap.setCenter(point);
                                    mapPanel.gmap.setZoom(16);
                                }
                            },
                            200, this);
                        }
                    }
                }
            ]
        });
        return colocationGrid;
    }
});