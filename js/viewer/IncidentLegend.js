
//function createIncidentLegend() {

    Ext.define('Image', {
        extend: 'Ext.data.Model',
        fields: [
        { name: 'src', type: 'string' },
        { name: 'text', type: 'string' }
    ]
    });

    Ext.create('Ext.data.Store', {
        id: 'incidentLegendStore',
        model: 'Image',
        data: [{
            src: 'resource/legend/Major Crash.png',
            text: 'Major Crash'
        }, {
            src: 'resource/legend/Minor Crash.png',
            text: 'Minor Crash'
        }, {
            src: 'resource/legend/HAZMAT Spill.png',
            text: 'HAZMAT Spill'
        }, {
            src: 'resource/legend/Debris.png',
            text: 'Debris'
        }, {
            src: 'resource/legend/Suspicious Package.png',
            text: 'Suspicious Package'
        }, {
            src: 'resource/legend/Disabled Vehicles.png',
            text: 'Disabled/Abandoned Vehicle'
        }, {
            src: 'resource/legend/Fallen Tree.png',
            text: 'Fallen Tree/Grass and Weeds'
        }, {
            src: 'resource/legend/Manhole Explosion.png',
            text: 'Manhole Explosion'
        }, {
            src: 'resource/legend/Water Break.png',
            text: 'Water Break',
            height: 24,
            width: 24
        }, {
            src: 'resource/legend/Traffic Signal.png',
            text: 'Traffic Signal'
        }, {
            src: 'resource/legend/Street(Alley) Lights.png',
            text: 'Street/Alley Light'
        }, {
            src: 'resource/legend/Sign.png',
            text: 'Sign'
        }, {
            src: 'resource/legend/Street Repair.png',
            text: 'Street/Alley Repair'
        }, {
            src: 'resource/legend/Others.png',
            text: 'Others',
            height: '18',
            width: '5'
        }, {
            src: 'resource/legend/CCTV.png',
            text: 'CCTV'
        }]
    });

    var incidentLegendTpl = new Ext.XTemplate(
            '<tpl for="."><div><img src="{src}"height="22" width="22"/><font>{text}</font></div></tpl>'
        );

    Ext.create('Ext.view.View', {
    //Ext.create('Ext.window.Component', {
        store: Ext.data.StoreManager.lookup('incidentLegendStore'),
        tpl: incidentLegendTpl,
    //itemSelector: 'div.thumb-wrap',
    //emptyText: 'No images available', 
        // renderTo: Ext.getBody()
        renderTo: document.getElementById("floatdiv")
        //applyTo: Ext.getBody()
            
    });
    
//}