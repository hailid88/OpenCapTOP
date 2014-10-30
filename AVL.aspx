<%@ Page Title="CapTOP Open Web" Language="C#" MasterPageFile="~/Site.master" AutoEventWireup="true"
    CodeFile="AVL.aspx.cs" Inherits="_Default" %>

<asp:Content ID="HeaderContent" runat="server" ContentPlaceHolderID="HeadContent">    
    <link rel="stylesheet" media="all" type="text/css" href="Styles/dtp.css"  />
    <style type="text/css">
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
            #dialog-link, #showrealtime, #completedata, #clearpatrolroutes  {
		        padding: .4em 1em .4em 20px;
		        text-decoration: none;
		        position: relative;
	        }
	        #dialog-link span.ui-icon, #showrealtime span.ui-icon, #completedata span.ui-icon, #clearpatrolroutes span.ui-icon {
		        margin: 0 5px 0 0;
		        position: absolute;
		        left: .2em;
		        top: 50%;
		        margin-top: -8px;
	        }
	        #show_inactiveLabel.ui-state-active, #show_idLabel.ui-state-active, #show_patroller_routeLabel.ui-state-active { background: #4b6c9e;}
	        #show_inactiveLabel.ui-state-active span.ui-button-text, #show_idLabel.ui-state-active span.ui-button-text #show_patroller_routeLabel.ui-state-active span.ui-button-text{ color: white;}
    </style>
</asp:Content>
<asp:Content ID="BodyContent" runat="server" ContentPlaceHolderID="MainContent">  
    <script type="text/javascript" src="http://code.jquery.com/jquery-1.9.1.js"></script>
    <script type="text/javascript" src="lib/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.js"></script>  
	<script type="text/javascript" src="js/jquery-ui-timepicker-addon.js"></script>    
    <script type="text/javascript" src="http://maps.google.com/maps/api/js?key=AIzaSyC48Sb5DjiKGTJHS9_idZ4U8PrR-Sioza0&sensor=false"></script>  
    <script src="js/viewer/AVLQuery.js" type="text/javascript"></script> 
    <script src="Scripts/markerwithlabel.js" type="text/javascript"></script>
    <script src="js/viewer/AVLDisplay.js" type="text/javascript"></script>
    <script src="lib/Highcharts-3.0.9/js/highcharts.js" type="text/javascript"></script>
    <script src="lib/Highcharts-3.0.9/js/modules/exporting.js" type="text/javascript"></script>
    <h2>
        AVL: DDOT Patrol Vehicle Display
    </h2>
    <%  %>
    <div id="map_canvas" style="height:94%; width:100%; margin:0;"> </div>
    <br />
    <table style="width:100%;">
        <tr>
            <td style="width:50%;">
    <input type="checkbox" id="show_inactive" onchange="refresh()"/> <label for="show_inactive" id="show_inactiveLabel">Show parked vehicles</label> <input type="checkbox" id="show_id"  onchange="refresh()"/>  <label for="show_id" id="show_idLabel">Show vehicles IDs </label></td>
            <td style="text-align:right;">
                <div id="avlqueryfunc" runat="server">
                <a href="#" id="completedata" class="ui-state-default ui-corner-all" style="visibility:hidden"><span class="ui-icon ui-icon-note"></span>Show Complete Records</a> <a href="#" id="showrealtime" class="ui-state-default ui-corner-all" style="visibility:hidden"><span class="ui-icon ui-icon-close"></span>Clear Query</a> <a href="#" id="dialog-link" class="ui-state-default ui-corner-all"><span class="ui-icon ui-icon-search"></span>Query Vehicles</a>
                </div>
            </td>
        </tr>
        <tr>
            <td style="width:30%;">
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
            <td style="text-align:right;">
                <a href="#" id="clearpatrolroutes" class="ui-state-default ui-corner-all" style="visibility:hidden"><span class="ui-icon ui-icon-close"></span>Clear Patrol Routes</a>
            </td>
        </tr>
    </table>


    <script type="text/javascript">
        function display_patroller_route_trigger() {
            var proute_sel = document.getElementById("route_menu");
            display_patroller_route(proute_sel.selectedIndex);
        }
        $(function () {
            $("#show_inactive").button({
                icons: {
                    primary: "ui-icon-home"
                }
            });
            $("#show_id").button({
                icons: {
                    primary: "ui-icon-tag"
                }
            });
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
    </script>
    <!-- popup dialog div -->
    <div id="dialogdiv" runat="server">
    <div id="dialog" >
        <table style="width:100%;">
        <tr>
            <td style="text-align: right;">
                Query Vehicle: </td><td>
                <select id="plate" name="plate">
                    <% 
                        string[] plates = getVehicles_plates();
                        for(int i =0; i< plates.Length; i++){
                            Response.Write("<option>" + plates[i] + "</option>");
                        }
                    %>                    
                </select>
            </td>
        </tr>
        <tr>
            <td style="text-align: right;">
                Date:</td><td> <input type="text" name="picker1" id="picker1" value="" />
            </td>
        </tr>
        <tr>
            <td style="text-align: right;">
                From:</td><td> <input type="text" name="picker2" id="picker2" value="00:00" />
                </td>
           </tr>
        <tr>
        <td style="text-align: right;">
        To:</td><td>
                <input id="picker3" name="picker3" type="text" value="javascript:(new Date().getTime())" /></td>
        </tr>
        </table>
    </div>
    </div>
    <!-- chart div -->
    <div id="chartplace" style=" width:70%; height:40%; vertical-align:middle; text-align:center; font-weight:bold;"> </div>
    <!-- scripts -->
    <script type="text/javascript">
        var elem = document.getElementById("picker3");
        mini = new Date().getMinutes();
        hr = new Date().getHours();
        elem.value = (hr <= 9 ? '0' + hr : hr) + ":" + (mini <= 9 ? '0' + mini : mini);
        var elem = document.getElementById("picker1");
        y = new Date().getFullYear();
        m = new Date().getMonth() + 1;
        d = new Date().getDate();
        elem.value = '' + (m <= 9 ? '0' + m : m) + '/' + (d <= 9 ? '0' + d : d) + '/' + y;
    </script>
    <div id="tableplace"></div>

</asp:Content>