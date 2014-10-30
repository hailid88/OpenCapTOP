<%@ WebHandler Language="C#" Class="getAVLTrackingxml_raw" %>

using System;
using System.Web;
using System.Data.SqlClient;
using System.Xml;

public class getAVLTrackingxml_raw : IHttpHandler {
    
    /// <summary>
    /// This process handles AJAX querying on AVL vehicles and returns the raw data in the specified time region for generating table.
    /// </summary>
    /// <param name="context"></param>
    public void ProcessRequest (HttpContext context) {
        context.Response.ContentType = "text/xml";
        context.Response.ContentEncoding = System.Text.Encoding.UTF8;
        // parse parameters
        if (context.Request.QueryString["did"] == null || context.Request.QueryString["date"] == null || context.Request.QueryString["st"] == null || context.Request.QueryString["ed"] == null) return;
        string deviceid = context.Request.QueryString["did"];
        DateTime date = Convert.ToDateTime(context.Request.QueryString["date"]);
        DateTime time1 = Convert.ToDateTime(context.Request.QueryString["st"]);
        DateTime time2 = Convert.ToDateTime(context.Request.QueryString["ed"]);
        DateTime dt1 = new DateTime(date.Year, date.Month, date.Day, time1.Hour, time1.Minute, time1.Second);
        DateTime dt2 = new DateTime(date.Year, date.Month, date.Day, time2.Hour, time2.Minute, time2.Second);

        // query database
        SqlConnection oSQLConn = new SqlConnection();

        oSQLConn.ConnectionString = LocalEnv.speedConnString;
        oSQLConn.Open();

        string sSQL = string.Format("exec AVLTrackingSample {0}, \'{1}\', \'{2}\', {3}", deviceid, dt1.ToString(), dt2.ToString(), 5);
        //string sSQL = string.Format("select ReportTime, Speed, Latitude, Longitude, StreetName from VehicleLog_ROP where ReportTime between \'{0}\' and \'{1}\' and VehicleID = \'{2}\' order by ReportTime ASC", dt1.ToString(), dt2.ToString(), deviceid);

        SqlCommand oCmd = new SqlCommand(sSQL, oSQLConn);
        SqlDataReader oReader = oCmd.ExecuteReader();
        Console.WriteLine(sSQL);

        XmlWriterSettings settings = new XmlWriterSettings();
        settings.Indent = true;
        using (XmlWriter xwriter = XmlWriter.Create(context.Response.Output, settings))
        {
            xwriter.WriteStartDocument();
            xwriter.WriteStartElement("stamps");
            //xwriter.WriteString(sSQL);

            while(oReader.Read())
            {
                xwriter.WriteStartElement("timesnap");
                //xwriter.WriteAttributeString("time", oReader.GetDateTime(0).ToString("MM/dd/yyyy H:mm:ss"));
                //xwriter.WriteAttributeString("speed", oReader.GetDouble(1).ToString());
                //xwriter.WriteAttributeString("lat", oReader.GetDouble(2).ToString());
                //xwriter.WriteAttributeString("lng", oReader.GetDouble(3).ToString());
                //xwriter.WriteAttributeString("locname", oReader.GetString(4));
                xwriter.WriteAttributeString("time", oReader.GetDateTime(0).ToString("MM/dd/yyyy H:mm:ss"));
                xwriter.WriteAttributeString("speed", oReader.GetInt32(4).ToString());
                xwriter.WriteAttributeString("lat", oReader.GetDouble(3).ToString());
                xwriter.WriteAttributeString("lng", oReader.GetDouble(2).ToString());
                xwriter.WriteAttributeString("locname", oReader.GetString(5));
                xwriter.WriteEndElement();
            }

            xwriter.WriteEndElement();
            xwriter.WriteEndDocument();
        }

        oSQLConn.Close();
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}