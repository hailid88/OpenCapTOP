<%@ WebHandler Language="C#" Class="getAVLxml" %>

using System;
using System.Web;
using System.Data.SqlClient;
using System.Collections.Generic;
using System.Xml;

public class getAVLxml : IHttpHandler {
    public struct AVL_info{
        public string DeviceID;
        public string TruckID;
        public string OperatingROP;
        public string TruckPlate;
    }
    public void ProcessRequest (HttpContext context) {
        context.Response.ContentType = "text/xml";
        context.Response.ContentEncoding = System.Text.Encoding.UTF8;

        // parse parameters
        DateTime time1 = DateTime.MinValue;
        if (context.Request.QueryString["st"] != null) { time1 = Convert.ToDateTime(context.Request.QueryString["st"]); }
        DateTime time2 = DateTime.MinValue; Convert.ToDateTime(context.Request.QueryString["ed"]);
        if (context.Request.QueryString["ed"] != null) { time2 = Convert.ToDateTime(context.Request.QueryString["ed"]); }

        bool showinactive = (context.Request.QueryString["showinactive"] == null || Convert.ToInt32(context.Request.QueryString["showinactive"]) == 1);

        // get meta data first
        Dictionary<string, AVL_info> deviceid2info = new Dictionary<string, AVL_info>();
        SqlConnection oSQLConn0 = new SqlConnection();
        //oSQLConn0.ConnectionString = "Server=10.40.62.167;Database=tirs;User Id=tirs;Password=keepsafe;";
        oSQLConn0.ConnectionString = LocalEnv.tirsConnString;
        oSQLConn0.Open();
        string sSQL0 = "select AVL_DeviceID, TruckID, Operating_ROP, TruckPlate from AVL_DeviceHash";
        SqlCommand oCmd0 = new SqlCommand(sSQL0, oSQLConn0);
        SqlDataReader oReader0 = oCmd0.ExecuteReader();
        while (oReader0.Read())
        {
            AVL_info ainfo = new AVL_info();
            ainfo.DeviceID = oReader0.GetString(0);
            if(!oReader0.IsDBNull(1)){ainfo.TruckID = oReader0.GetString(1);}
            else{ainfo.TruckID = "NA";}
            if (!oReader0.IsDBNull(2)) { ainfo.OperatingROP = oReader0.GetString(2);}
            else { ainfo.OperatingROP = "NA"; }
            if (!oReader0.IsDBNull(3)) { ainfo.TruckPlate = oReader0.GetString(3); }
            else { ainfo.TruckPlate = "NA"; }
            deviceid2info.Add(ainfo.DeviceID, ainfo);
        }
        oSQLConn0.Close();
        
        // query database
        SqlConnection oSQLConn = new SqlConnection();
        //oSQLConn.ConnectionString = "Server=10.40.16.106;Database=DCVehiclelog2011;User Id=sa;Password=cadds111!;";
        oSQLConn.ConnectionString = LocalEnv.AVLDBConnString;
        oSQLConn.Open();
        
        string sSQL = "";
        
        if (time1 == DateTime.MinValue && time2 == DateTime.MinValue)
        {
            if (showinactive)
            {
                sSQL = "select A.VehicleID, A.ReportTime, A.Latitude, A.Longitude from (select max(ReportTime) as mx, VehicleID from VehicleLog_ROP where Latitude != 5 group by VehicleID) as C inner join VehicleLog_ROP as A on A.ReportTime = C.mx and A.VehicleID = C.VehicleID";
            }
            else
            {
                sSQL = string.Format("select A.VehicleID, A.ReportTime, A.Latitude, A.Longitude from (select max(ReportTime) as mx, VehicleID from VehicleLog_ROP where Latitude != 5 group by VehicleID) as C inner join VehicleLog_ROP as A on A.ReportTime = C.mx and A.VehicleID = C.VehicleID where A.ReportTime >= '{0}'", DateTime.Now.AddMinutes(-15).ToString());
            }
        }
        else if (time1 != DateTime.MinValue && time2 == DateTime.MinValue)
        {
            if (showinactive)
            {
                sSQL = string.Format("select A.VehicleID, A.ReportTime, A.Latitude, A.Longitude from (select max(ReportTime) as mx, VehicleID from VehicleLog_ROP where ReportTime >= '{0}' and Latitude != 5 group by VehicleID) as C inner join VehicleLog_ROP as A on A.ReportTime = C.mx and A.VehicleID = C.VehicleID", time1.ToString());
            }
            else
            {
                sSQL = string.Format("select A.VehicleID, A.ReportTime, A.Latitude, A.Longitude from (select max(ReportTime) as mx, VehicleID from VehicleLog_ROP where ReportTime >= '{0}' and Latitude != 5 group by VehicleID) as C inner join VehicleLog_ROP as A on A.ReportTime = C.mx and A.VehicleID = C.VehicleID where ReportTime >= '{1}'", time1.ToString(), time1.AddMinutes(-15).ToString());
            }
        }
        SqlCommand oCmd = new SqlCommand(sSQL, oSQLConn);
        SqlDataReader oReader = oCmd.ExecuteReader();
        
        //Console.WriteLine(sSQL);
        //create xml
        //string xmltext = "";
        //XmlTextWriter xwriter = new XmlTextWriter(xmltext, System.Text.Encoding.UTF8);
        
        
        XmlWriterSettings settings = new XmlWriterSettings();
        settings.Indent = true;
        using (XmlWriter xwriter = XmlWriter.Create(context.Response.Output, settings))
        {
            xwriter.WriteStartDocument();
            xwriter.WriteStartElement("markers");
            //xwriter.WriteString(sSQL);
            while (oReader.Read())
            {
                string vehicleID = oReader.GetString(0);
                DateTime UpdateTime = oReader.IsDBNull(1) ? DateTime.Now : oReader.GetDateTime(1);
                double Latitude = oReader.IsDBNull(2) ? 0.0 : oReader.GetDouble(2);
                double Longitude = oReader.IsDBNull(3) ? 0.0 : oReader.GetDouble(3);

                xwriter.WriteStartElement("marker");
                xwriter.WriteAttributeString("id", vehicleID);
                xwriter.WriteAttributeString("plate", deviceid2info[vehicleID].TruckPlate);
                xwriter.WriteAttributeString("rop", deviceid2info[vehicleID].OperatingROP);
                xwriter.WriteAttributeString("truckid", deviceid2info[vehicleID].TruckID);
                xwriter.WriteAttributeString("time", UpdateTime.ToString());
                xwriter.WriteAttributeString("lat", Latitude.ToString());
                xwriter.WriteAttributeString("lng", Longitude.ToString());
                xwriter.WriteEndElement();
            }
            xwriter.WriteEndElement();
            xwriter.WriteEndDocument();
        }
        //xwriter.Close();
        //context.Response.Write(xmltext);

        oSQLConn.Close();
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }
    
}