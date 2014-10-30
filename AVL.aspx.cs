using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data.SqlClient;
using System.IO;

public partial class _Default : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!(User.IsInRole("sysadmin") || User.IsInRole("manager") || User.IsInRole("patrol") || User.IsInRole("operator")))
        {
            Response.Redirect("~/Account/Login.aspx?ReturnUrl=%2fAVL.aspx");
        }
        if(!(User.IsInRole("sysadmin") || User.IsInRole("manager"))){
            dialogdiv.Visible = false;
            avlqueryfunc.Visible = false;
        }
        if (!(User.IsInRole("sysadmin") || User.IsInRole("manager") || User.IsInRole("patrol")))
        {
            show_patroller_div.Visible = false;
        }
        List<route> proutes = this.loadroutes();
        string script = "var pa_routes = [";
        for (int i = 0; i < proutes.Count; i++)
        {
            script += "[";
            for (int j = 0; j < proutes[i].route_points.Count; j++)
            {
                script += "[" + proutes[i].route_points[j].lat + "," + proutes[i].route_points[j].lng + "]";
                if (j < proutes[i].route_points.Count - 1)
                {
                    script += ",";
                }
            }
            script += "]";
            if (i < proutes.Count - 1)
            {
                script += ",";
            }
        }
        script += "];";
        if (!ClientScript.IsClientScriptBlockRegistered("clientScript"))
        {
            ClientScript.RegisterClientScriptBlock(this.GetType(), "clientScript", script, true);
        }
    }

    protected string[] getVehicles_plates()
    {
        List<string> plates = new List<string>();
        SqlConnection oSQLConn0 = new SqlConnection();
        oSQLConn0.ConnectionString = LocalEnv.tirsConnString;
        oSQLConn0.Open();
        //string sSQL0 = "select TruckPlate from AVL_DeviceHash";
        string sSQL0 = "select AVL_DeviceID, TruckPlate from AVL_DeviceHash";
        SqlCommand oCmd0 = new SqlCommand(sSQL0, oSQLConn0);
        SqlDataReader oReader0 = oCmd0.ExecuteReader();
        while (oReader0.Read())
        {
            if (!oReader0.GetString(1).Equals("x"))
            {
                plates.Add(string.Format("{0} ({1})", oReader0.GetString(1), oReader0.GetString(0)));
            }
        }
        oSQLConn0.Close();

        return plates.ToArray();
    }
    public class coordinates
    {
        public double lat;
        public double lng;
        public coordinates(double Lat, double Lng)
        {
            lat = Lat; lng = Lng;
        }
    }
    public class route
    {
        public string route_name;
        public List<coordinates> route_points;
        public route()
        {
            route_points = new List<coordinates>();
        }
    }

    protected List<route> loadroutes()
    {
        List<route> routes = new List<route>();
        List<List<coordinates>> coords = new List<List<coordinates>>();
        string line;
        try
        {
            using (StreamReader sr = new StreamReader("C:\\inetpub\\OpenCapTOP\\resource\\patroller_routes.txt"))
            //using (StreamReader sr = new StreamReader("D:\\DDOTProj\\OpenCapTOP\\resource\\patroller_routes.txt"))
            {
                route rt = new route();

                while ((line = sr.ReadLine()) != null)
                {
                    if (line.EndsWith(":"))
                    {
                        if (rt.route_points.Count > 0)
                        {
                            routes.Add(rt);
                            rt = new route();
                        }
                        rt.route_name = (line.Substring(0, line.Length - 1));
                    }
                    else
                    {
                        string tmp = line.Replace('(', ' ').Replace(')', ' ').Replace(" ", "");
                        string[] ctmp = tmp.Split(new char[] { ',' });
                        rt.route_points.Add(new coordinates(Convert.ToDouble(ctmp[0]), Convert.ToDouble(ctmp[1])));
                    }
                }
                routes.Add(rt);
            }
            return routes;
        }
        catch (Exception e)
        {
            Console.WriteLine("The file could not be read:");
            Console.WriteLine(e.Message);
            return null;
        }
    }

}
