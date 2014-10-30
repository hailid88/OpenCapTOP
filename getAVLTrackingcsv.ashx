<%@ WebHandler Language="C#" Class="getAVLChart" %>

using System;
using System.Web;
using System.Data.SqlClient;
using System.Collections.Generic;
using System.Xml;
using System.IO;

public class getAVLChart : IHttpHandler {
    
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
        //http://localhost:50164/OpenCapTOP/getAVLTrackingxml.ashx?date=2014-02-01&st=1:00:00&ed=4:00:00&did=4328
        int granularity = 15;
        TimeSpan difference = dt2 - dt1;

        if (difference.TotalMinutes > 300) { granularity = 15; }
        else if (difference.TotalMinutes > 100) { granularity = 5;  }
        else  { granularity = 1; }               
            
        // query database
        SqlConnection oSQLConn = new SqlConnection();
//        oSQLConn.ConnectionString = "Server=10.40.16.106;Database=DCVehiclelog2011;User Id=sa;Password=cadds111!;";
        oSQLConn.ConnectionString = LocalEnv.AVLDBConnString;
        oSQLConn.Open();

        string sSQL = string.Format("exec AVLTrackingSample {0}, \'{1}\', \'{2}\', {3}", deviceid, dt1.ToString(), dt2.ToString(), granularity.ToString());

        SqlCommand oCmd = new SqlCommand(sSQL, oSQLConn);
        SqlDataReader oReader = oCmd.ExecuteReader();
        Console.WriteLine(sSQL);
        //create xml
        //XmlTextWriter xwriter = new XmlTextWriter(xmltext, System.Text.Encoding.UTF8);
        XmlWriterSettings settings = new XmlWriterSettings();
        settings.Indent = true;

        using (StreamWriter sw = new StreamWriter(context.Response.OutputStream))
        {
            context.Response.ContentType = "application/csv";
            context.Response.AddHeader("content-disposition", "attachment; filename=myfile.csv");
            string header = "time, speed, lat, lng, locname\n";
            byte[] tmp = System.Text.Encoding.UTF8.GetBytes(header);
            sw.Write(header);
            while (oReader.Read())
            {
                string vehicleID = deviceid;
                DateTime timestamp = oReader.GetDateTime(0);
                int speed = oReader.GetInt32(4);
                double Latitude = oReader.IsDBNull(3) ? 0.0 : oReader.GetDouble(3);
                double Longitude = oReader.IsDBNull(2) ? 0.0 : oReader.GetDouble(2);
                string Locname = oReader.GetString(5);
                string outputline = string.Format("{0},{1},{2},{3},{4}\n", timestamp.ToShortTimeString(), speed.ToString(), Latitude.ToString(), Longitude.ToString(), Locname);
                tmp = System.Text.Encoding.UTF8.GetBytes(outputline);
                sw.Write(outputline);
            }
        }
        oSQLConn.Close();
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}