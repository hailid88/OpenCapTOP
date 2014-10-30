<%@ Page Title="CapTOP Open Web" Language="C#" MasterPageFile="~/Site.master" AutoEventWireup="true"
    CodeFile="Incidents.aspx.cs" Inherits="Incidents" %>

<asp:Content ID="HeaderContent" runat="server" ContentPlaceHolderID="HeadContent">
    <link rel="stylesheet" media="all" type="text/css" href="Styles/dtp.css" />
    <%--<style type="text/css">
           .labels {
               color: red;
               background-color: white;
               font-family: "Lucida Grande", "Arial", sans-serif;
               font-size: 10px;
               font-weight: bold;
               text-align: center;
               width: 60px;     
               border: 1px solid black;
               white-space: nowrap;
             }
	        #hideLegendLabel.ui-state-active{ background: #4b6c9e;}
	        #hideLegendLabel.ui-state-active span.ui-button-text{ color: white;}
    </style>--%>
    <link href="css/MainPage.css" rel="stylesheet" type="text/css" />
    <link href="css/Viewer.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" type="text/css" href="css/Incident.css" />
    <!--The following is used to format the detail information form-->
    <link href="lib/extjs-4.1.0/resources/css/incidentDetail.css" rel="stylesheet" type="text/css" />
</asp:Content>
<asp:Content ID="BodyContent" runat="server" ContentPlaceHolderID="MainContent">
    <script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?key=AIzaSyAwhhxiaAndGUIXAa24SIvisNN9xuf2Zc4&sensor=false"></script>
    <script type="text/javascript" src="lib/extjs-4.1.0/ext-all.js"></script>
    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js">
        google.maps.event.trigger(map, 'resize');
        map.setZoom(map.getZoom());
    </script>
    <%-- <script type="text/javascript" src="lib/jquery-ui-1.10.3.custom/js/jquery-1.9.1.js"></script> --%>
    <script type="text/javascript" src="lib/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.js"></script>
    <script type="text/javascript" src="js/jquery-ui-timepicker-addon.js"></script>
    <%--<link rel="stylesheet" type="text/css" href"jquery-timepicker/jquery.timepicker.css"/>--%>
    <script type="text/javascript" src="js/data/IncidentMarkerStore.js"></script>
    <script type="text/javascript" src="js/data/IncidentSingleDetail.js"></script>
    <script type="text/javascript" src="js/data/IncidentDownloadStore.js"></script>
    <script type="text/javascript" src="js/viewer/MarkerOperation.js"></script>
    <script src="js/viewer/AVLDisplay_in_inc.js" type="text/javascript"></script>
    <script type="text/javascript">

        var incGmap;

        function load() {
            //createIncidentLegend();
            incGmap = new google.maps.Map(document.getElementById("map_canvas"), {
                center: new google.maps.LatLng(38.915079, -77.01416),
                zoom: 11,
                mapTypeId: 'roadmap'
            });
            try {
                refresh();
                //alert('refreshed');
            } catch (err) {
                alert('err=' + err);
            }
        }

        function refresh() {
            //var loadMask = new Ext.LoadMask(Ext.getBody(), { msg: "Loading Data..." });
            removeMarkers(IMCurMarkers, 1);
            try {
                //loadMask.show();
                //IMsStore.load({ params: { limit: 50} });
                IMsStore.load();
            }
            catch (err) {
                alert(err);
            }
            Ext.defer(function () {
                //createIncidentLegend();
                openAddMarkers(IMMarkerConfigs, 1);
                //alert('ok=' + IMMarkerConfigs.length);
                //loadMask.hide();     
            },
            800, this);

        }


        function hideLegend() {

            var hiddenLegend = document.getElementById("hide_legend").checked;
            if (hiddenLegend == true) {

                floatdiv.style.visibility = "hidden";

            }
            else {
                floatdiv.style.visibility = "visible";
            }
        }

        google.maps.event.addDomListener(window, 'load', load);
        //set the interval for update as 5 mins. 
        setInterval(function () { refresh() }, 300000);

    </script>
    <h2>
        Incidents: DDOT Incidents Management
    </h2>
    <%--<p><a href="#" id="dialog-link" class="ui-state-default ui-corner-all"><span class="ui-icon ui-icon-newwin"></span>Download Incidents</a></p>--%>
    <div id="map_canvas" style="height: 94%; width: 100%; margin: 0;">
    </div>
    <div id="floatdiv">
        <div class="legendImage">
            <img src="resource/legend/Major Crash.png" width="18" height="18"></div>
        <div class="lengendText">
            Major Crash</div>
        <div class="legendImage">
            <img src="resource/legend/Minor Crash.png" width="18" height="18"></div>
        <div class="lengendText">
            Minor Crash</div>
        <div class="legendImage">
            <img src="resource/legend/HAZMAT Spill.png" width="18" height="18"></div>
        <div class="lengendText">
            HAZMAT Spill</div>
        <div class="legendImage">
            <img src="resource/legend/Debris.png" width="18" height="18"></div>
        <div class="lengendText">
            Debris</div>
        <div class="legendImage">
            <img src="resource/legend/Suspicious Package.png" width="18" height="18"></div>
        <div class="lengendText">
            Suspicious Package</div>
        <div class="legendImage">
            <img src="resource/legend/Disabled Vehicles.png" width="18" height="18"></div>
        <div class="lengendText">
            Disabled Vehicles</div>
        <div class="legendImage">
            <img src="resource/legend/Fallen Tree.png" width="18" height="18"></div>
        <div class="lengendText">
            Fallen Tree</div>
        <div class="legendImage">
            <img src="resource/legend/Manhole Explosion.png" width="18" height="18"></div>
        <div class="lengendText">
            Manhole Explosion</div>
        <div class="legendImage">
            <img src="resource/legend/Water Break.png" width="18" height="18"></div>
        <div class="lengendText">
            Water Break</div>
        <div class="legendImage">
            <img src="resource/legend/Traffic Signal.png" width="18" height="18"></div>
        <div class="lengendText">
            Traffic Signal</div>
        <div class="legendImage">
            <img src="resource/legend/Street(Alley) Lights.png" width="18" height="18"></div>
        <div class="lengendText">
            Street/Alley Lights</div>
        <div class="legendImage">
            <img src="resource/legend/Sign.png" width="18" height="18"></div>
        <div class="lengendText">
            Sign</div>
        <div class="legendImage">
            <img src="resource/legend/Street Repair.png" width="18" height="18"></div>
        <div class="lengendText">
            Street/Alley Repair</div>
        <div class="legendImage">
            <img src="resource/legend/Others.png"></div>
        <div class="lengendText">
            Others</div>
    </div>
    <table style="width: 100%; padding: 5px 2px 2px 2px;">
        <tr style="height: 20px">
            <td style="width: 50%;">
                <input type="checkbox" id="hide_legend" onchange="hideLegend()" />
                Hide Incident Legend
                <%--<input type="checkbox" id="hide_legend" onchange="hideLegend()"/><label for="hide_legend" id="hideLegendLabel">Hide Incident Legend</label> --%>
            </td>
            <td style="text-align: right;">
                <a href="#" id="dialog-link" class="ui-state-default ui-corner-all"><span class="ui-icon ui-icon-newwin">
                </span>Query Incidents</a>
            </td>
        </tr>
<%-- this is commented 20140504 -- %>
<%--        <tr style="height: 40px">
            <td style="width: 50%;">
            <div id="show_patroller_div" runat="server">
                <a href="#" id="show_patroller_route" class="ui-state-default ui-corner-all">Show patroller route</a> <!--<input type="button" id="show_patroller_route" value="Show Patroller Route" onclick="display_patroller_route_trigger()"/>-->
                <select id="route_menu">
                <option value="AllRoutes">All Routes</option>
                <% 
                    List<route> proutes = this.loadroutes();
                    foreach(route rt in proutes){
                        //Response.Write("<li>" + rt.route_name + "</li>");
                        Response.Write("<option value=\"" + rt.route_name + "\">" + rt.route_name + "</option>");
                    }
                %>
                </select>
                </div>
            </td>
            <td style="text-align: right;">
                <a href="#" id="clearpatrolroutes" class="ui-state-default ui-corner-all" style="visibility:hidden"><span class="ui-icon ui-icon-close"></span>Clear Patrol Routes</a>
                <a href="#" id="pat-dialog-link" class="ui-state-default ui-corner-all"><span class="ui-icon ui-icon-newwin">
                </span>Query Patroller</a>
            </td>
        </tr>--%>
        <!--        <tr>
            <td style="width:30%;">
            </td>
            <td style="text-align:right;">
                
            </td>
        </tr>-->
    </table>
   
    <div id="dialog" title="Query Incident Data">
        <table style="width: 100%;">
            <tr>
                <td style="text-align: right; width: 30%">
                    Patroller ID:
                </td>
                <td>
                    <select id="patid">
                        <option value="ROP">All Patrollers</option>
                        <% 
                            String[] pats = this.loadPatrollerID();
                            foreach (string pat in pats)
                            {
                                //Response.Write("<li>" + rt.route_name + "</li>");
                                int idx = pat.IndexOf('(') -1;
                                Response.Write("<option value=\"" + pat.Substring(0, idx) + "\">" + pat + "</option>");
                            }
                        %>
                        
                    </select>
                </td>
            </tr>
            <tr>
                <td style="text-align: right; width: 30%">
                    Starting:
                </td>
                <td>
                    <input type="text" id="incDateStart" />
                </td>
            </tr>

            <tr>
                <td style="text-align: right; width: 30%">
                    Ending:
                </td>
                <td>
                    <input type="text" id="incDateEnd" />
                </td>
            </tr>
        </table>
        <%--<input type="text" id="incTimeEnd" class="time end" />--%>
    </div>
    <%--<br/><input type="checkbox" id="hide_legend" onchange="hideLegend()"/> Hide Incident Legend--%>
    <script>
        $('#incDateStart').datepicker();
        $('#incDateEnd').datepicker();
    </script>

    <%--<script type="text/javascript">
            function display_patroller_route_trigger() {
                var proute_sel = document.getElementById("route_menu");
                display_patroller_route(proute_sel.selectedIndex);
            }
            $(function () {
                $("#show_patroller_route").button({
                    icons: {
                        primary: "ui-icon-info"
                    }
                });
                $("#show_patroller_route").click(function (event) {
                    display_patroller_route_trigger();
                    event.preventDefault();
                });
            });
    </script>--%>
    <script type="text/javascript" src="js/viewer/FloatingMenu.js"></script>
    <script type="text/javascript" src="js/viewer/IncidentSearch.js"></script>
    <%--<script type="text/javascript" src="js/viewer/IncidentLegend.js"></script>--%>
</asp:Content>
