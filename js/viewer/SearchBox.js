

searchaction = function () {
    try {
        if (Ext.getCmp("cb_im") != null && Ext.getCmp("cb_im").getValue() == true) {
            var values = searchBox.getForm().getValues();
            removeMarkers(IMCurMarkers, 1);
            //alert(values.startTime);
            Ext.apply(IMsStore.proxy.extraParams, values);
            loadMask.show();

            IMsStore.load();
            Ext.defer(function () {
                
                addMarkers(IMMarkerConfigs, 1);
                //alert(IMMarkerConfigs.length);
                loadMask.hide();
            },
        1000, this);
        }
        else {
            alert("Please select One Optioin for Visualization");
        }
    } catch (err) { alert(err); } 

};

resetmbr=function(){
	Ext.getCmp('lat1').reset();
	Ext.getCmp('lng1').reset();
	Ext.getCmp('lat2').reset();
	Ext.getCmp('lng2').reset();	
}
resettime=function(){
	Ext.getCmp('starttime').reset();
	Ext.getCmp('endtime').reset();
}
var Long1={
    id:"lng1",
    xtype:"numberfield",
    fieldLabel: 'MBR1.longitude',
    name: 'lng1',
    labelSeparator: ':',
    decimalPrecision: 20,
    //value: -180
    value: -77.39606788635251
};
var Long2={
    id:"lng2",
    xtype:"numberfield",
    fieldLabel: 'MBR2.longitude',
    name: 'lng2',
    labelSeparator: ':',
    decimalPrecision: 20,
    value: -76.63251808166501//180
};
var Lat1={
    id:"lat1",
    xtype:"numberfield",
    fieldLabel: 'MBR1.latitude',
    name: 'lat1',
    labelSeparator: ':',
    decimalPrecision: 20,
    value: 38.73519928276707//-90
};
var Lat2={
    id:"lat2",
    xtype:"numberfield",
    fieldLabel: 'MBR2.latitude',
    name: 'lat2',
    labelSeparator: ':',
    decimalPrecision: 20,
    value: 39.15282096587628//90
};
var StartTime={ 
    id:"starttime",
    xtype:"datefield",
    //width:280,
    fieldLabel: 'Start Time',
    name: 'startTime',
    labelSeparator: ':', 
    format: 'Y-m-d 00:00:00',
    value: Ext.Date.add(new Date(), Ext.Date.DAY, -20)
};
var EndTime={ 
    id:"endtime",
    xtype:"datefield",
    //width:280,
    fieldLabel: 'End Time',
    name: 'endTime',
    labelSeparator: ':',
    format: 'Y-m-d 23:59:59',
    value: new Date()
};
var Geoparse={ 
	xtype : "checkbox",  
        padding: '0 0 0 105',
	boxLabel : "Check For Automatic Geo-Detect,Extract and Parse", 
	name : "geoparse", 
//	inputValue : "true" ,
	id : "geoparse",
    checked: true //false//true
};

var MiningResults={ 
	xtype : "checkbox",  
        padding: '0 0 0 76',
	boxLabel : "Check For Peforming Mining with Search Results", 
	name : "miningResutls", 
//	inputValue : "true" ,
	id : "miningResutls",
        checked: true//false//true
};

var SpatialWeight={
	id:"spatialweight",
	xtype:"numberfield",
	fieldLabel: 'Spatial Weight',
	name: 'spatialweight',
	value:1,
	labelSeparator: ':'
};
var TemporalWeight={
	id:"temporalweight",
	xtype:"numberfield",
	fieldLabel: 'Temporal Weight',
	name: 'temporalweight',
	value:1,
	labelSeparator: ':'
};
var TextualWeight={
	id:"textualweight",
	xtype:"numberfield",
	fieldLabel: 'Textual Weight',
	name: 'textualweight',
	value:1,
	labelSeparator: ':'
};

searchBox = new Ext.form.FormPanel({
    //autoHeight: true,
    height: window.innerHeight * 0.13,
    padding: '0 5 0 5',
    autoScroll: true,
    layout: {
        type: 'table',
        columns: 1
    },
    items:[
       {
            border: 0,
            bodyBorder: false,
            layout: {
                type: 'table',
                columns: 3
            },
            items:[
                {
                    width: window.innerWidth / 4,
                    labelWidth:50,
                    border: 0,
                    bodyBorder: false,
                    items:[StartTime,EndTime]
                },{
                    width: window.innerWidth / 4,
                    labelWidth:100,
                    border: 0,
                    bodyBorder: false,
                    items:[Lat1,Long1]
                },{
                    width: window.innerWidth / 4,
                    labelWidth:100,
                    border: 0,
                    bodyBorder: false,
                    items:[Lat2,Long2]
                }
            ]
        }
    ],
    buttons: [{
                text: "Search",
                handler:searchaction
        },{
                text: "ResetMBR",
                handler:resetmbr
        },{
                text: "ResetTimeWindow",
                handler:resettime	
        }
    ]
});

