<%@ WebHandler Language="C#" Class="getAVLChart" %>

using System;
using System.Web;
using System.Data.SqlClient;
using System.Collections.Generic;
using System.Xml;

public class getAVLChart : IHttpHandler {
    public class tsnap{
			public DateTime timestamp;
			public int speed;
			public double lat;
			public double lng;
			public string locname;
		}
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
        int granularity = 10;
        TimeSpan difference = dt2 - dt1;

        if (difference.TotalMinutes > 300) { granularity = 10; }
        else if (difference.TotalMinutes > 100) { granularity = 5;  }
        else  { granularity = 1; }               
            
        // query database
        SqlConnection oSQLConn = new SqlConnection();

        oSQLConn.ConnectionString = LocalEnv.speedConnString;
        oSQLConn.Open();

        string sSQL = string.Format("exec AVLTrackingSample {0}, \'{1}\', \'{2}\', {3}", deviceid, dt1.ToString(), dt2.ToString(), granularity.ToString());

        SqlCommand oCmd = new SqlCommand(sSQL, oSQLConn);
        SqlDataReader oReader = oCmd.ExecuteReader();
        Console.WriteLine(sSQL);
		
		List<tsnap> tsnaplist = new List<tsnap>();
		DateTime sdt = dt1;
		TimeSpan tspan = new TimeSpan(0, granularity, 0);
		
		if (oReader.HasRows)
		{
            bool not_eof = true;
            oReader.Read();
			while (sdt <= dt2)
			{                   
				string vehicleID = deviceid;
				DateTime timestamp = oReader.GetDateTime(0);
				int speed = oReader.GetInt32(4);
				double Latitude = oReader.IsDBNull(3) ? 0.0 : oReader.GetDouble(3);
				double Longitude = oReader.IsDBNull(2) ? 0.0 : oReader.GetDouble(2);
				string Locname = oReader.GetString(5);
				tsnap ts0 = new tsnap();
				if (sdt != timestamp)
				{
					ts0.timestamp = sdt;
                    ts0.speed = 0;
				}
				else
				{
					ts0.timestamp = timestamp;
                    ts0.speed = speed;
					not_eof = oReader.Read();                  
				}
				sdt += tspan;					 
				ts0.lat = Latitude;
				ts0.lng = Longitude;
				ts0.locname= Locname;
				tsnaplist.Add(ts0);
                    
                // if missing data after the query end time
                if (!not_eof)
                {
                    while (sdt <= dt2){
                        tsnap ts1 = new tsnap();
                        ts1.timestamp = sdt;
                        ts1.speed = 0;
                        ts1.lat = Latitude;
                        ts1.lng = Longitude;
                        ts1.locname = Locname;
                        tsnaplist.Add(ts1);
                        sdt += tspan;
                    }
                    break;
                }
				
			}
		}
		
		for(int i=0; i<tsnaplist.Count-1; ++i){
			if(tsnaplist[i].lat != 5 && tsnaplist[i+1].lat == 5){
				tsnaplist[i+1].lat = tsnaplist[i].lat;
				tsnaplist[i+1].lng = tsnaplist[i].lng;
			}
		}
		
		for(int i=tsnaplist.Count-1; i>0; --i){
			if(tsnaplist[i].lat != 5 && tsnaplist[i-1].lat == 5){
				tsnaplist[i-1].lat = tsnaplist[i].lat;
				tsnaplist[i-1].lng = tsnaplist[i].lng;
			}
		}
		
        //create xml
        //XmlTextWriter xwriter = new XmlTextWriter(xmltext, System.Text.Encoding.UTF8);
        XmlWriterSettings settings = new XmlWriterSettings();
        settings.Indent = true;
        using (XmlWriter xwriter = XmlWriter.Create(context.Response.Output, settings))
        {
            xwriter.WriteStartDocument();
            xwriter.WriteStartElement("stamps");
            //xwriter.WriteString(sSQL);
			
			for(int i=0; i<tsnaplist.Count; ++i){
				xwriter.WriteStartElement("timesnap");
				xwriter.WriteAttributeString("time", tsnaplist[i].timestamp.ToString("MM/dd/yy H:mm:ss"));
				xwriter.WriteAttributeString("speed", tsnaplist[i].speed.ToString());
				xwriter.WriteAttributeString("lat", tsnaplist[i].lat.ToString());
				xwriter.WriteAttributeString("lng", tsnaplist[i].lng.ToString());
				xwriter.WriteAttributeString("locname", tsnaplist[i].locname);
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