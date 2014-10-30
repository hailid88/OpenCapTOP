/**
 * @class FeedViewer.FeedPanel
 * @extends Ext.panel.Panel
 *
 * Shows a list of available feeds. Also has the ability to add/remove and load feeds.
 *
 * @constructor
 * Create a new Feed Panel
 * @param {Object} config The config object
 */

Ext.define('FeedViewer.FeedPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.feedpanel',
    //style: 'background-color: transparent',

    initComponent: function () {
        Ext.apply(this, {
            items: this.createView(),
            dockedItems: this.createToolbar()
        });
        this.callParent(arguments);
    },

    /**
    * Create the DataView to be used for the feed list.
    * @private
    * @return {Ext.view.View}
    */
    createView: function () {
//        if (screen.width == 1366);
//        {
//            var a = 'checkbox_apps_large';
//        }
        this.view = Ext.create('Ext.form.Panel', {
            bodyPadding: 10,
            id: 'panel_app',
            frame: false,
            border: false,

            //bodyStyle: 'background:transparent;',
            items: [
                {
                    xtype: 'fieldcontainer',
                    style: 'overflow:auto; background-image: url(resource/images/ddot_logo.jpg); background-color:transparent; filter:alpha(opacity=100);background-repeat: no-repeat; background-size:60px 30px; background-position: right top',
                    defaultType: 'checkboxfield',
                    //labelCls: a,
                    labelCls: 'checkbox_apps',
                    checkedCls: 'checkedbox_apps',
                    //overflow: auto,
                    items: [
                        {
                            boxLabel: 'Incident Management',
                            name: 'IM',
                            inputValue: '1',
                            //checked: true,

                            boxLabelCls: 'checkbox_apps_large',
                            id: 'cb_im',
                            checkChange: function () {
                                try {
                                    if (this.checked) {
                                        loadMask.show();
                                        Ext.apply(IMsStore.proxy.extraParams,
                                        {
                                            startTime: Ext.Date.add(new Date(), Ext.Date.DAY, -20),
                                            endTime: new Date()
                                        });
                                        IMsStore.load();
                                        Ext.defer(function () {
                                            addMarkers(IMMarkerConfigs, 1);
                                            loadMask.hide();
                                        },
                                        1000, this);
                                    }
                                    else {
                                        removeMarkers(IMCurMarkers, 1);
                                    }
                                } catch (err) { alert(err); }
                            }
                        }, {
                            boxLabel: 'Speed Detectors',
                            name: 'SD',
                            inputValue: '2',
                            boxLabelCls: 'checkbox_apps',
                            id: 'cb_sd',
                            checkChange: function () {
                                if (this.checked) {
                                    //alert('Speed Detectors');
                                }
                            }
                        }, {
                            boxLabel: 'CCTV',
                            name: 'CCTV',
                            inputValue: '3',
                            boxLabelCls: 'checkbox_apps',
                            id: 'cb_cctv',
                            checkChange: function () {
                                try {
                                    if (this.checked) {
                                        loadMask.show();
                                        CCTVsStore.load();
                                        Ext.defer(function () {
                                            addMarkers(CCTVMarkerConfigs, 3);
                                            loadMask.hide();
                                        },
                                    1000, this);
                                    }
                                    else {

                                        removeMarkers(CCTVCurMarkers, 3);
                                    }
                                }
                                catch (err) { alert(err); }
                            }
                        }, {
                            boxLabel: 'Signal Control Information',
                            name: 'SCI',
                            inputValue: '4',
                            boxLabelCls: 'checkbox_apps',
                            id: 'cb_sci',
                            checkChange: function () {
                                if (this.checked) {
                                    //alert('Signal Control Information');
                                }
                            }
                        }, {
                            boxLabel: 'Count Stations',
                            name: 'cs',
                            inputValue: '5',
                            boxLabelCls: 'checkbox_apps',
                            id: 'cb_cs',
                            checkChange: function () {
                                if (this.checked) {
                                    //alert('Count Stations');
                                }
                            }
                        }, {
                            boxLabel: 'Portable Dynamics Message Signs',
                            name: 'PDMS',
                            inputValue: '6',
                            boxLabelCls: 'checkbox_apps',
                            id: 'cb_pdms',
                            checkChange: function () {
                                if (this.checked) {
                                    //alert('Portable Dynamics Message Signs');
                                }
                            }
                        }, {
                            boxLabel: 'Alternative Routes',
                            name: 'AR',
                            inputValue: '7',
                            boxLabelCls: 'checkbox_apps',
                            id: 'cb_ar',
                            checkChange: function () {
                                if (this.checked) {
                                    //alert('Alternative Routes');
                                }
                            }
                        }, {
                            boxLabel: 'Traffic.com Detectors',
                            name: 'TD',
                            inputValue: '8',
                            boxLabelCls: 'checkbox_apps',
                            id: 'cb_td',
                            checkChange: function () {
                                if (this.checked) {
                                    //alert('Traffic.com Detectors');
                                }
                            }
                        }, {
                            boxLabel: 'SNAPs',
                            name: 'SNAPs',
                            inputValue: '9',
                            boxLabelCls: 'checkbox_apps',
                            id: 'cb_snaps',
                            checkChange: function () {
                                if (this.checked) {
                                    //alert('SNAPs');
                                }
                            }
                        }
                    ]
                },

            ],
            bbar: [
                {
                    text: 'Select All',
                    handler: function () {
                        if (Ext.getCmp('cb_im').valueOf(true)) {
                            Ext.getCmp('cb_im').setValue(false);
                        }
                        if (Ext.getCmp('cb_sd').valueOf(true)) {
                            Ext.getCmp('cb_sd').setValue(false);

                        }
                        if (Ext.getCmp('cb_cctv').valueOf(true)) {
                            Ext.getCmp('cb_cctv').setValue(false);
                        }
                        if (Ext.getCmp('cb_sci').valueOf(true)) {
                            Ext.getCmp('cb_sci').setValue(false);
                        }
                        if (Ext.getCmp('cb_sci').valueOf(true)) {
                            Ext.getCmp('cb_sci').setValue(false);
                        }
                        Ext.getCmp('cb_im').setValue(true);
                        Ext.getCmp('cb_sd').setValue(true);
                        Ext.getCmp('cb_cctv').setValue(true);
                        Ext.getCmp('cb_sci').setValue(true);
                        Ext.getCmp('cb_cs').setValue(true);
                        Ext.getCmp('cb_pdms').setValue(true);
                        Ext.getCmp('cb_ar').setValue(true);
                        Ext.getCmp('cb_td').setValue(true);
                        Ext.getCmp('cb_snaps').setValue(true);
                    }
                },
                {
                    text: 'Deselect All',
                    handler: function () {
                        Ext.getCmp('cb_im').setValue(false);
                        Ext.getCmp('cb_sd').setValue(false);
                        Ext.getCmp('cb_cctv').setValue(false);
                        Ext.getCmp('cb_sci').setValue(false);
                        Ext.getCmp('cb_cs').setValue(false);
                        Ext.getCmp('cb_pdms').setValue(false);
                        Ext.getCmp('cb_ar').setValue(false);
                        Ext.getCmp('cb_td').setValue(false);
                        Ext.getCmp('cb_snaps').setValue(false);
                    }
                }
            ]
        });

        return this.view;

    },
    /* onViewReady: function(){
    this.view.getSelectionModel().select(this.view.store.first());
    },*/

    /**
    * Creates the toolbar to be used for controlling feeds.
    * @private
    * @return {Ext.toolbar.Toolbar}
    */
    createToolbar: function () {
        this.toolbar = Ext.create('widget.toolbar', {
            padding: '0 0 0 20',
            items: [
                {
                    xtype: 'label',
                    padding: '0 0 0 0',  // clockwise. n e s w
                    text: 'Hello, '
                },
                {
                    xtype: 'label',
                    cls: 'useridLabel',
                    id: 'usernameLabel',
                    padding: '0 50 0 0',  // clockwise. n e s w
                    text: userName
                },
                {
                    xtype: 'button',
                    text: 'Log Out',
                    id: 'logout',
                    iconCls: 'feed-remove',
                    handler: this.onSignOut
                }
            ]
        });
        return this.toolbar;
    },

    /**
    * Sign Out
    */
    onSignOut: function () {
        window.location = "SignOut.aspx";
    }
});
