using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Configuration;
using System.Web.Services;
using System.Web.Script.Services;
using System.Xml;
using System.Data.SqlClient;
using System.Data;
using System.Collections;
using System.IO;


[Serializable]
public class Agents
{
    public int Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
}

/// <summary>
/// Summary description for DBAccess
/// </summary>
//[WebService(Namespace = "http://tempuri.org/")]
//[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
// [System.Web.Script.Services.ScriptService]
[ScriptService]
public class DBAccess : System.Web.Services.WebService
{
    Hashtable typeHashtable = new Hashtable();
    Hashtable iconHashtable = new Hashtable();
    Hashtable directionHashtable = new Hashtable();
    Hashtable quadrantHashtable = new Hashtable();

    public DBAccess()
    {
        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
        #region Build Hash Tables
        typeHashtable.Add(-1, "Unspecified");
        typeHashtable.Add(1, "Major Crash");
        typeHashtable.Add(2, "Minor Crash");
        typeHashtable.Add(3, "HAZMAT Spill");
        typeHashtable.Add(4, "Debris on RoadWay");
        typeHashtable.Add(5, "Suspicious Package");
        typeHashtable.Add(6, "Disabled Vehicles");
        typeHashtable.Add(7, "Fallen Tree");
        typeHashtable.Add(8, "Manhole Explosion");
        typeHashtable.Add(9, "Water Main Break");
        typeHashtable.Add(10, "Traffic Signal System");
        typeHashtable.Add(11, "Street(Alley) Lights");
        typeHashtable.Add(12, "Sign");
        typeHashtable.Add(13, "Street Repair");
        typeHashtable.Add(14, "Alley Repair");
        typeHashtable.Add(15, "Sidewalk Repair");
        typeHashtable.Add(16, "Grass and Weeds");
        typeHashtable.Add(17, "Abandoned Vehicle");
        typeHashtable.Add(21, "Building Fire");
        typeHashtable.Add(22, "Disable ROP Vehicle");
        typeHashtable.Add(23, "Evacuation");
        typeHashtable.Add(24, "Flash Flood");
        typeHashtable.Add(25, "Heat Wave");
        typeHashtable.Add(26, "Icy Roads");
        typeHashtable.Add(27, "Infrastructure Damage");
        typeHashtable.Add(28, "Motorcade");
        typeHashtable.Add(29, "Parade");
        typeHashtable.Add(30, "Pedestrian Struck");
        typeHashtable.Add(31, "Police Activity");
        typeHashtable.Add(32, "Power Outage");
        typeHashtable.Add(33, "Protest/March");
        typeHashtable.Add(34, "Sink Hole");
        typeHashtable.Add(35, "Traffic Control");
        typeHashtable.Add(36, "Vehicle Fire");
        typeHashtable.Add(37, "Work Zone");
        typeHashtable.Add(40, "Stop Sign");
        typeHashtable.Add(41, "Pothole");
        typeHashtable.Add(42, "Road Closure");
        typeHashtable.Add(43, "Snow Assignment");
        typeHashtable.Add(50, "Special Event");
        typeHashtable.Add(88, "Other");


        iconHashtable.Add(-1, "Others");
        iconHashtable.Add(1, "Major Crash");
        iconHashtable.Add(2, "Minor Crash");
        iconHashtable.Add(3, "HAZMAT Spill");
        iconHashtable.Add(4, "Debris");
        iconHashtable.Add(5, "Suspicious Package");
        iconHashtable.Add(6, "Disabled Vehicles");
        iconHashtable.Add(7, "Fallen Tree");
        iconHashtable.Add(8, "Manhole Explosion");
        iconHashtable.Add(9, "Water Break");
        iconHashtable.Add(10, "Traffic Signal");
        iconHashtable.Add(11, "Street(Alley) Lights");
        iconHashtable.Add(12, "Sign");
        iconHashtable.Add(13, "Street Repair");
        iconHashtable.Add(14, "Alley Repair");
        iconHashtable.Add(15, "Sidewalk Repair");
        iconHashtable.Add(16, "Grass and Weeds");
        iconHashtable.Add(17, "Abandoned Vehicle");
        iconHashtable.Add(21, "Others");
        iconHashtable.Add(22, "Disable Vehicles");
        iconHashtable.Add(23, "Others");
        iconHashtable.Add(24, "Others");
        iconHashtable.Add(25, "Others");
        iconHashtable.Add(26, "Others");
        iconHashtable.Add(27, "Others");
        iconHashtable.Add(28, "Others");
        iconHashtable.Add(29, "Others");
        iconHashtable.Add(30, "Others");
        iconHashtable.Add(31, "Others");
        iconHashtable.Add(32, "Others");
        iconHashtable.Add(33, "Others");
        iconHashtable.Add(34, "Others");
        iconHashtable.Add(35, "Others");
        iconHashtable.Add(36, "Disabled Vehicles");
        iconHashtable.Add(37, "Others");
        iconHashtable.Add(40, "Sign");
        iconHashtable.Add(41, "Others");
        iconHashtable.Add(42, "Others");
        iconHashtable.Add(43, "Others");
        iconHashtable.Add(50, "Others");
        iconHashtable.Add(88, "Others");

        directionHashtable.Add(0, "Not Available");
        directionHashtable.Add(1, "1-NB");
        directionHashtable.Add(2, "2-SB");
        directionHashtable.Add(3, "3-EB");
        directionHashtable.Add(4, "4-WB");
        directionHashtable.Add(5, "5-Both Directions");

        quadrantHashtable.Add(0, "Not available");
        quadrantHashtable.Add(1, "1-NE");
        quadrantHashtable.Add(2, "2-NW");
        quadrantHashtable.Add(3, "3-SE");
        quadrantHashtable.Add(4, "4-SW");
        quadrantHashtable.Add(5, "5-MD");
        quadrantHashtable.Add(6, "6-VA");
        #endregion
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json, UseHttpGet = true, XmlSerializeString = false)]
    public List<CCTVInfo> getCCTVmarkerInfo()
    {
        string dbConn = ConfigurationManager.AppSettings["Tirsconn"];
        string CCTVdbQuery = @"SELECT * FROM [tirs].[dbo].[CCTVList] where LATITUDE is not null and LONGITUDE is not null";

        // Connect to the database and run the query
        SqlConnection conn = new SqlConnection(dbConn);
        SqlCommand cmd = new SqlCommand(CCTVdbQuery, conn);
        SqlDataAdapter da = new SqlDataAdapter();
        DataSet ds = new DataSet();
        ds.DataSetName = "cctvmarkinfo";
        da.SelectCommand = cmd;
        da.Fill(ds, "CCTVList");

        List<CCTVInfo> cctvList = new List<CCTVInfo>();
        double cctvLat = 0;
        double cctvLng = 0;
        string cctvIntersection;
        string cctvFilepath;
        string cctvType;
        foreach (DataRow dataRow in ds.Tables["CCTVList"].Rows)
        {
            cctvLat = Convert.ToDouble(dataRow["Latitude"].ToString());
            cctvLng = Convert.ToDouble(dataRow["LONGITUDE"].ToString());
            cctvIntersection = dataRow["NAME"].ToString();
            cctvFilepath = dataRow["FILEPATH"].ToString();
            cctvType = dataRow["TYPE"].ToString();
            cctvList.Add(new CCTVInfo(cctvIntersection, cctvFilepath, cctvLat, cctvLng, cctvType));
        }
        return cctvList;
    }

    public class CCTVInfo
    {
        private string _cctvIntersection;
        private string _cctvType;
        //private string _cctvServer;
        //private string _cctvApplication;
        private string _cctvFilepath;
        private double _cctvLat;
        private double _cctvLng;

        public CCTVInfo() { }
        //public CCTVInfo(string cctvIntersection,  string cctvType, string cctvServer, string cctvApplication, string cctvFilepath, double cctvLat, double cctvLng)
        public CCTVInfo(string cctvIntersection, string cctvFilepath, double cctvLat, double cctvLng, string cctvType)
        {
            this.CCTVIntersection = cctvIntersection;
            this.CCTVType = cctvType;
            //this.CCTVServer = cctvServer;
            //this.CCTVApplication = cctvApplication;
            this.CCTVFilepath = cctvFilepath;
            this.CCTVLat = cctvLat;
            this.CCTVLng = cctvLng;
           
        }
        public string CCTVIntersection
        {
            get { return this._cctvIntersection; }
            set { this._cctvIntersection = value; }
        }
        public string CCTVType
        {
            get { return this._cctvType; }
            set { this._cctvType = value; }
        }
        //public string CCTVServer
        //{
        //    get { return this._cctvServer; }
        //    set { this._cctvServer = value; }
        //}
        //public string CCTVApplication
        //{
        //    get { return this._cctvApplication; }
        //    set { this._cctvApplication = value; }
        //}
        public string CCTVFilepath
        {
            get { return this._cctvFilepath; }
            set { this._cctvFilepath = value; }
        }
        public double CCTVLat
        {
            get { return this._cctvLat; }
            set { this._cctvLat = value; }
        }
        public double CCTVLng
        {
            get { return this._cctvLng; }
            set { this._cctvLng = value; }
        }
    }



    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json, UseHttpGet = true, XmlSerializeString = false)]
    public List<IMMarkerInfo> getIMmarkerInfo()
    {
        DateTime startTime, endTime;
        string Patroller_id = null;

        if(this.Context.Request.Params["startTime"] != null)
            startTime = DateTime.Parse(this.Context.Request.Params["startTime"].ToString());
        else 
            startTime =DateTime.Now.AddDays(-20);
        if(this.Context.Request.Params["endTime"] != null)
            endTime = DateTime.Parse(this.Context.Request.Params["endTime"].ToString());
        else
            endTime = DateTime.Now;
        
        if (this.Context.Request.Params["patrolID"] != null)    
            Patroller_id = this.Context.Request.Params["patrolID"].ToString();
        
        if (startTime == null || startTime.ToString().Length <= 0)
            startTime = DateTime.Now.AddDays(-20);
        if (endTime == null || endTime.ToString().Length <= 0)
            endTime = DateTime.Now;

        string dbConn = ConfigurationManager.AppSettings["Tirsconn"];

        //debug purpose
        startTime=DateTime.Parse("2007-03-21");
        endTime=DateTime.Parse("2007-08-01");

        //history data show, both cleared and uncleared. 
        string dbQuery = @"SELECT top 650 IncID, ddot_incType, ddot_longitude,ddot_latitude from [tirs].[dbo].[Incident_ddot] where ddot_longitude is not null and ddot_latitude is not null and ddot_StartDate >= '" + startTime.Date + "' and " +  "ddot_StartDate <= '" + endTime.Date + "'";

        //testing, comment follows:
        
        ////realtime data show, only get the incidents that are not cleared. 
        //try
        //{
        //    if (string.IsNullOrEmpty(this.Context.Request.Params["startTime"]))
        //    {
        //        dbQuery = @"SELECT top 650 IncID, ddot_incType, ddot_longitude,ddot_latitude from [tirs].[dbo].[Incident_ddot] where ddot_status=1 and ddot_longitude is not null and ddot_latitude is not null and ddot_StartDate >= '" + startTime.Date + "' and " + "ddot_StartDate <= '" + endTime.Date + "'";
        //    }
        //}
        //catch (Exception e)
        //{
        //    Console.WriteLine(e.Message);
        //}
                
        if(Patroller_id != null){ //temporary addededd
            dbQuery += string.Format(" and ddot_patroller like '%{0}%'", Patroller_id.ToString());   
        }
        // Connect to the database and run the query
        SqlConnection conn = new SqlConnection(dbConn);
        SqlCommand cmd = new SqlCommand(dbQuery, conn);
        SqlDataAdapter da = new SqlDataAdapter();
        DataSet ds = new DataSet();
        ds.DataSetName = "immarkinfo";
        da.SelectCommand = cmd;
        da.Fill(ds, "Incident_ddot");

        double lng = 0;
        
        int incidentTypeInt = 1;
        string imageAddress = "";
        //string incDate = "";
       
        List<IMMarkerInfo> obList = new List<IMMarkerInfo>();
        
        foreach (DataRow dataRow in ds.Tables["Incident_ddot"].Rows)
        {
            lng = Convert.ToDouble(dataRow["ddot_longitude"].ToString());
            lng = -Math.Abs(lng);   // since the table for longtitude is plus(wrong), to change it to minus.
            incidentTypeInt = Convert.ToInt32(dataRow["ddot_incType"].ToString());
            imageAddress = "resource/legend/" + iconHashtable[incidentTypeInt].ToString();
            
            obList.Add(new IMMarkerInfo(
                    Convert.ToInt32(dataRow["IncID"].ToString()),
                    lng,
                    Convert.ToDouble(dataRow["ddot_latitude"].ToString()),
                    imageAddress        
                  )
            );
        }
        return obList;
    }


    public class IMMarkerInfo
    {
        private int _incID;
        private double _longitude;
        private double _latitude;
        private string _imageAddress;
       
        
        public IMMarkerInfo() { }

        public IMMarkerInfo(int incID, double longitude, double latitude, string imageAddress)
        {
            this.IncID = incID;
            this.Longitude = longitude;
            this.Latitude = latitude;
            this.ImageAddress = imageAddress;
           
        }

        public int IncID
        {
            get { return this._incID; }
            set { this._incID = value; }
        }
        
      
       
        public double Latitude
        {
            get { return this._latitude; }
            set { this._latitude = value; }
        }
        public double Longitude
        {
            get { return this._longitude; }
            set { this._longitude = value; }
        }
        public string ImageAddress
        {
            get { return this._imageAddress; }
            set { this._imageAddress = value; }
        }
    }

    #region Change DateTime format
    public string timeFormat(string forDateTime)
    {
        string strreturn = "";
        if (forDateTime.Length < 5)
        { strreturn = ""; }
        else
        {
            strreturn = Convert.ToDateTime(forDateTime).ToShortTimeString();
        }
        return strreturn;
    }

    public string dateFormat(string forDateTime)
    {
        string strreturn = "";
        if (forDateTime.Length < 5)
        { strreturn = ""; }
        else
        {
            strreturn = Convert.ToDateTime(forDateTime).ToShortDateString();
        }
        return strreturn;
    }
    #endregion
    //this is for single incident detail download
    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json, UseHttpGet = true, XmlSerializeString = false)]
    public List<IMDetailInfo> getIMdetailInfo()
    {
        string dbConn = ConfigurationManager.AppSettings["Tirsconn"];
        int incID = 0;
        try
        {
            incID = int.Parse(this.Context.Request.Params["IncID"].ToString());
        }
        catch (Exception e)
        {
            Console.Write(e.Message);
        }
        if (incID != 0)
        {
            string dbQuery = @"SELECT * from [tirs].[dbo].[Incident_ddot] as a LEFT OUTER JOIN [tirs].[dbo].[Service_ddot] as b 
        on a.IncID = b.incid where a.IncID="+incID;
            SqlConnection conn = new SqlConnection(dbConn);
            SqlCommand cmd = new SqlCommand(dbQuery, conn);
            SqlDataAdapter da = new SqlDataAdapter();
            DataSet ds = new DataSet();
            ds.DataSetName = "imdetailinfo";
            da.SelectCommand = cmd;
            da.Fill(ds, "Incident_detail");
            double lng = 0;
            string incidentType = "Major Crash";
            int incidentTypeInt = 1;

            string incidentStatus = "Not Cleared";
            int incidentStatusInt = 1; // not cleared

            string incDirection = "1-NB";
            int incDirectionInt = 1;

            string quadrantStr = "1-NE";
            int quadrantInt = 1;

            
            //string incDate = "";
            string incTime = "";
            string actLights = "";
            string actSirens = "";
            string onscenetime = "";
            string endDate = "";
            string sceneDTime = "";
            List<IMDetailInfo> obList = new List<IMDetailInfo>();

            foreach (DataRow dataRow in ds.Tables["Incident_detail"].Rows)
            {
                lng = Convert.ToDouble(dataRow["ddot_longitude"].ToString());
                lng = -Math.Abs(lng);   // since the table for longtitude is plus(wrong), to change it to minus.
                incidentTypeInt = Convert.ToInt32(dataRow["ddot_incType"].ToString());
                incidentType = typeHashtable[incidentTypeInt].ToString();
                if (dataRow["ddot_direction"].ToString().Trim() == "")
                { incDirectionInt = 0; }
                else
                {
                    incDirectionInt = Convert.ToInt32(dataRow["ddot_direction"].ToString().Trim());
                    if (incDirectionInt > 5 || incDirectionInt < 1)
                    { incDirectionInt = 0; }
                }
                incDirection = directionHashtable[incDirectionInt].ToString();

                
                incidentStatusInt = Convert.ToInt32(dataRow["ddot_status"].ToString());
                actLights = dataRow["ddot_ActLights"].ToString();
                if (dataRow["ddot_actSirens"].ToString().Trim() == "1") { actSirens = "Y"; }

                if (dataRow["ddot_Quadrant"].ToString().Trim() == "")
                { quadrantStr = ""; }
                else
                {
                    quadrantInt = Convert.ToInt32(dataRow["ddot_Quadrant"].ToString());
                    if (quadrantInt > 6 || quadrantInt < 1)
                    { quadrantInt = 0; }
                    quadrantStr = quadrantHashtable[quadrantInt].ToString();
                }
                if (dataRow["ddot_ActLights"].ToString().Trim() == "1")
                { actLights = "Y"; }
                else if (dataRow["ddot_ActLights"].ToString().Trim() == "0")
                { actLights = "N"; }

                if (incidentStatusInt == 2)
                { incidentStatus = "Cleared"; }

                //change the ddot_DetctTime format to only have Time
                incTime = timeFormat(dataRow["ddot_DetctTime"].ToString());

                //change the ddot_onscenetime format to only have Time
                onscenetime = timeFormat(dataRow["ddot_onscenetime"].ToString());

                //change the ddot_enddate format to only have Date
                endDate = dateFormat(dataRow["ddot_enddate"].ToString());

                //change the ddot_sceneDTime format to only have Time
                sceneDTime = timeFormat(dataRow["ddot_sceneDTime"].ToString());


                obList.Add(new IMDetailInfo(
                # region assign values
                        Convert.ToInt32(dataRow["IncID"].ToString()),
                        Convert.ToDateTime(dataRow["ddot_StartDate"]).ToShortDateString(),
                        incTime,
                        dataRow["ddot_detctSrc"].ToString(),
                        dataRow["ddot_othsrc"].ToString(),
                        incDirection,
                        dataRow["ddot_otherdir"].ToString(),
                        actLights,
                        actSirens,
                        quadrantStr,
                        dataRow["ddot_ward"].ToString(),
                        dataRow["ddot_ifTMCinformed"].ToString(),
                        dataRow["ddot_street2"].ToString(),
                        incidentType,
                        dataRow["ddot_numVeh"].ToString(),
                        dataRow["ddot_ifinjury"].ToString(),
                        dataRow["ddot_laneBlocked"].ToString(),
                        dataRow["ddot_weather"].ToString(),
                        dataRow["ddot_traffCond"].ToString(),
                        dataRow["ddot_ropEnvelope"].ToString(),
                        dataRow["ddot_othAgency"].ToString(),
                        dataRow["ddot_othAgency1"].ToString(),
                        dataRow["ddot_othAgency3"].ToString(),
                        dataRow["ddot_incCom"].ToString(),
                        dataRow["ddot_uniCom"].ToString(),
                        dataRow["ddot_RegImpact"].ToString(),
                        dataRow["ddot_notifiedMDOT"].ToString(),
                        dataRow["ddot_notifiedVDOT"].ToString(),
                        dataRow["ddot_notifiedWMATA"].ToString(),
                        dataRow["ddot_notifiedMont"].ToString(),
                        dataRow["ddot_notifiedPG"].ToString(),
                        dataRow["ddot_notifiedArlin"].ToString(),
                        dataRow["ddot_notifiedAlex"].ToString(),
                        dataRow["ddot_agencyReq"].ToString(),
                        dataRow["ddot_description"].ToString(),
                        dataRow["ddot_recWIN"].ToString(),
                        endDate,
                        dataRow["ddot_othAgency4"].ToString(),
                        dataRow["ddot_othAgency5"].ToString(),
                        dataRow["ddot_medianm"].ToString(),
                        dataRow["ddot_ifFatal"].ToString(),
                        incidentStatus,
                        dataRow["ddot_OthIncType"].ToString(),
                        dataRow["ddot_street1num"].ToString(),
                        dataRow["ddot_street1"].ToString(),
                        dataRow["ddot_LaneBlocked1"].ToString(),
                        onscenetime,
                        dataRow["ddot_tmcOP"].ToString(),
                        dataRow["ddot_VenNo"].ToString(),
                        dataRow["ddot_patroller"].ToString(),
                        dataRow["ddot_Comments"].ToString(),
                        sceneDTime,
                        lng,
                        Convert.ToDouble(dataRow["ddot_latitude"].ToString()),
                        dataRow["ddot_othAgency2"].ToString(),
                       

                        //service table attributes.
                        dataRow["ddot_RNO"].ToString(),
                        dataRow["ddot_HansenCPC"].ToString(),
                        dataRow["ddot_hansenNo"].ToString(),
                        dataRow["ddot_hansenCRC"].ToString(),
                        dataRow["ddot_ContractorNo"].ToString(),
                        dataRow["ddot_ACISA"].ToString(),
                        dataRow["ddot_loc"].ToString(),
                        dataRow["ddot_loc2"].ToString(),
                        dataRow["ddot_DiscLoc"].ToString(),
                        dataRow["ddot_CallerName"].ToString(),
                        dataRow["ddot_CallerAddrs"].ToString(),
                        dataRow["ddot_CallerCity"].ToString(),
                        dataRow["ddot_CallerState"].ToString(),
                        dataRow["ddot_dayTel"].ToString(),
                        dataRow["ddot_nightTel"].ToString(),
                        dataRow["ddot_CallerComment"].ToString(),
                        dataRow["ddot_opComment"].ToString(),
                        dataRow["ddot_CallDate"].ToString(),
                        dataRow["ddot_CallTime"].ToString(),
                        dataRow["ddot_TechAssgn"].ToString(),
                        dataRow["ddot_timeGiven"].ToString(),
                        dataRow["ddot_timeCompleted"].ToString(),
                        dataRow["ddot_ContrCommt"].ToString()
                #endregion
)
                );
            }
            return obList;
        }
        else
        {
            return null;
        }

    }

    public class IMDetailInfo
    {
        #region class variables
        //incident table variables
        private int _incID;
        private string _date;
        private string _time;
        private string _detctSrc;
        private string _othsrc;
        private string _direction;
        private string _otherdir;
        private string _actLights;
        private string _actSirens;
        private string _quadrant;
        private string _ward;
        private string _ifTMCinformed;
        private string _street2;
        private string _incType;
        private string _numVeh;
        private string _ifinjury;
        private string _laneBlocked;
        private string _weather;
        private string _traffCond;
        private string _ropEnvelope;
        private string _othAgency;
        private string _othAgency1;
        private string _othAgency3;
        private string _incCom;
        private string _uniCom;
        private string _regImpact;
        private string _notifiedMDOT;
        private string _notifiedVDOT;
        private string _notifiedWMATA;
        private string _notifiedMont;
        private string _notifiedPG;
        private string _notifiedArlin;
        private string _notifiedAlex;
        private string _agencyReq;
        private string _description;
        private string _recWIN;
        private string _enddate;
        private string _othAgency4;
        private string _othAgency5;
        private string _medianm;
        private string _ifFatal;
        private string _status;
        private string _othIncType;
        private string _street1num;
        private string _street1;
        private string _laneBlocked1;
        private string _onscenetime;
        private string _tmcOP;
        private string _venNo;
        private string _patroller;
        private string _comments;
        private string _sceneDTime;
        private double _longitude;
        private double _latitude;
        private string _othAgency2;
        private string _imageAddress;

        //service table variables
        private string _rNo;
        private string _hansenCPC;
        private string _hansenNo;
        private string _hansenCRC;
        private string _contractorNo;
        private string _acisa;
        private string _loc;
        private string _loc2;
        private string _discLoc;
        private string _callerName;
        private string _callerAddrs;
        private string _callerCity;
        private string _callerState;
        private string _dayTel;
        private string _nightTel;
        private string _callerComment;
        private string _opComment;
        private string _callDate;
        private string _callTime;
        private string _techAssgn;
        private string _timeGiven;
        private string _timeCompleted;
        private string _contrCommt;
        #endregion
        public IMDetailInfo() { }

        public IMDetailInfo(int incID, string date, string time, string detctSrc, string othsrc, string direction, string otherdir, string actLights, string actSirens, string quadrant,
            string ward, string ifTMCinformed, string street2, string incidentType, string numVeh, string ifinjury, string lanBlocked, string weather, string traffCond,
            string ropEnvelope, string othAgency, string othAgency1, string othAgency3, string incCom, string uniCom, string regImpact, string notifiedMDOT,
            string notifiedVDOT, string notifiedWMATA, string notifiedMont, string notifiedPG, string notifiedArlin, string notifiedAlex, string agencyReq,
            string description, string recWIN, string endDate, string othAgency4, string othAgency5, string medianm, string ifFatal, string status,
            string othIncType, string street1num, string street1, string laneBlocked1, string onSceneTime, string tmcOP, string venNo, string patroller, string comments,
            string sceneDTime, double longitude, double latitude, string othAgency2, string rNo, string hansenCPC, string hansenNo, string hansenCRC,
            string contractorNo, string acisa, string loc, string loc2, string discLoc, string callerName, string callerAddrs, string callerCity, string callerState,
            string dayTel, string nightTel, string callerComment, string opComment, string callDate, string callTime, string techAssgn, string timeGiven, string timeCompleted,
            string contrCommt)
        #region assign values to parameters
        {
            this.IncID = incID;
            this.IncDate = date;
            this.IncTime = time;
            this.DetctSrc = detctSrc;
            this.OthSrc = othsrc;
            this.Direction = direction;
            this.OtherDir = otherdir;
            this.ActLights = actLights;
            this.ActSirens = actSirens;
            this.Quadrant = quadrant;
            this.Ward = ward;
            this.IfTMCInformed = ifTMCinformed;
            this.Street2 = street2;
            this.IncType = incidentType;
            this.NumVeh = numVeh;
            this.IfInjury = ifinjury;
            this.LanBlocked = lanBlocked;
            this.Weather = weather;
            this.TraffCond = traffCond;
            this.RopEnvelope = ropEnvelope;
            this.OthAgency = othAgency;
            this.OthAgency1 = othAgency1;
            this.OthAgency3 = othAgency3;
            this.IncCom = incCom;
            this.UniCom = uniCom;
            this.RegImpact = regImpact;
            this.NotifiedMDOT = notifiedMDOT;
            this.NotifiedVDOT = notifiedVDOT;
            this.NotifiedWMATA = notifiedWMATA;
            this.NotifiedMont = notifiedMont;
            this.NotifiedPG = notifiedPG;
            this.NotifiedArlin = notifiedArlin;
            this.NotifiedAlex = notifiedAlex;
            this.AgencyReq = agencyReq;
            this.Description = description;
            this.RecWIN = recWIN;
            this.EndDate = endDate;
            this.OthAgency4 = othAgency4;
            this.OthAgency5 = othAgency5;
            this.Medianm = medianm;
            this.IfFatal = ifFatal;
            this.Status = status;
            this.OthIncType = othIncType;
            this.Street1Num = street1num;
            this.Street1 = street1;
            this.LaneBlocked1 = laneBlocked1;
            this.OnSceneTime = onSceneTime;
            this.TmcOP = tmcOP;
            this.VenNo = venNo;
            this.Patroller = patroller;
            this.Comments = comments;
            this.SceneDTime = sceneDTime;
            this.Longitude = longitude;
            this.Latitude = latitude;
            this.OthAgency2 = othAgency2;
            
            // service table
            this.RNO = rNo;
            this.HansenCPC = hansenCPC;
            this.HansenNo = hansenNo;
            this.HansenCRC = hansenCRC;
            this.ContractorNo = contractorNo;
            this.ACISA = acisa;
            this.Loc = loc;
            this.Loc2 = loc2;
            this.DiscLoc = discLoc;
            this.CallerName = callerName;
            this.CallerAddrs = callerAddrs;
            this.CallerCity = callerCity;
            this.CallerState = callerState;
            this.DayTel = dayTel;
            this.NightTel = nightTel;
            this.CallerComment = callerComment;
            this.OpComment = opComment;
            this.CallDate = callDate;
            this.CallTime = callTime;
            this.TechAssgn = techAssgn;
            this.TimeGiven = timeGiven;
            this.TimeCompleted = timeCompleted;
            this.ContrCommt = contrCommt;
        }

        public int IncID
        {
            get { return this._incID; }
            set { this._incID = value; }
        }
        public string IncDate
        {
            get { return this._date; }
            set { this._date = value; }
        }
        public string IncTime
        {
            get { return this._time; }
            set { this._time = value; }
        }
        public string DetctSrc
        {
            get { return this._detctSrc; }
            set { this._detctSrc = value; }
        }
        public string OthSrc
        {
            get { return this._othsrc; }
            set { this._othsrc = value; }
        }
        public string Direction
        {
            get { return this._direction; }
            set { this._direction = value; }
        }
        public string OtherDir
        {
            get { return this._otherdir; }
            set { this._otherdir = value; }
        }
        public string ActLights
        {
            get { return this._actLights; }
            set { this._actLights = value; }
        }
        public string ActSirens
        {
            get { return this._actSirens; }
            set { this._actSirens = value; }
        }
        public string Quadrant
        {
            get { return this._quadrant; }
            set { this._quadrant = value; }
        }
        public string Ward
        {
            get { return this._ward; }
            set { this._ward = value; }
        }
        public string IfTMCInformed
        {
            get { return this._ifTMCinformed; }
            set { this._ifTMCinformed = value; }
        }
        public string Street2
        {
            get { return this._street2; }
            set { this._street2 = value; }
        }
        public string IncType
        {
            get { return this._incType; }
            set { this._incType = value; }
        }
        public string NumVeh
        {
            get { return this._numVeh; }
            set { this._numVeh = value; }
        }
        public string IfInjury
        {
            get { return this._ifinjury; }
            set { this._ifinjury = value; }
        }
        public string LanBlocked
        {
            get { return this._laneBlocked; }
            set { this._laneBlocked = value; }
        }
        public string Weather
        {
            get { return this._weather; }
            set { this._weather = value; }
        }
        public string TraffCond
        {
            get { return this._traffCond; }
            set { this._traffCond = value; }
        }
        public string RopEnvelope
        {
            get { return this._ropEnvelope; }
            set { this._ropEnvelope = value; }
        }
        public string OthAgency
        {
            get { return this._othAgency; }
            set { this._othAgency = value; }
        }
        public string OthAgency1
        {
            get { return this._othAgency1; }
            set { this._othAgency1 = value; }
        }
        public string OthAgency3
        {
            get { return this._othAgency3; }
            set { this._othAgency3 = value; }
        }
        public string IncCom
        {
            get { return this._incCom; }
            set { this._incCom = value; }
        }
        public string UniCom
        {
            get { return this._uniCom; }
            set { this._uniCom = value; }
        }
        public string RegImpact
        {
            get { return this._regImpact; }
            set { this._regImpact = value; }
        }
        public string NotifiedMDOT
        {
            get { return this._notifiedMDOT; }
            set { this._notifiedMDOT = value; }
        }
        public string NotifiedVDOT
        {
            get { return this._notifiedVDOT; }
            set { this._notifiedVDOT = value; }
        }
        public string NotifiedWMATA
        {
            get { return this._notifiedWMATA; }
            set { this._notifiedWMATA = value; }
        }
        public string NotifiedMont
        {
            get { return this._notifiedMont; }
            set { this._notifiedMont = value; }
        }
        public string NotifiedPG
        {
            get { return this._notifiedPG; }
            set { this._notifiedPG = value; }
        }
        public string NotifiedArlin
        {
            get { return this._notifiedArlin; }
            set { this._notifiedArlin = value; }
        }
        public string NotifiedAlex
        {
            get { return this._notifiedAlex; }
            set { this._notifiedAlex = value; }
        }
        public string AgencyReq
        {
            get { return this._agencyReq; }
            set { this._agencyReq = value; }
        }
        public string Description
        {
            get { return this._description; }
            set { this._description = value; }
        }
        public string RecWIN
        {
            get { return this._recWIN; }
            set { this._recWIN = value; }
        }
        public string EndDate
        {
            get { return this._enddate; }
            set { this._enddate = value; }
        }
        public string OthAgency4
        {
            get { return this._othAgency4; }
            set { this._othAgency4 = value; }
        }
        public string OthAgency5
        {
            get { return this._othAgency5; }
            set { this._othAgency5 = value; }
        }
        public string Medianm
        {
            get { return this._medianm; }
            set { this._medianm = value; }
        }
        public string IfFatal
        {
            get { return this._ifFatal; }
            set { this._ifFatal = value; }
        }
        public string Status
        {
            get { return this._status; }
            set { this._status = value; }
        }
        public string OthIncType
        {
            get { return this._othIncType; }
            set { this._othIncType = value; }
        }
        public string Street1Num
        {
            get { return this._street1num; }
            set { this._street1num = value; }
        }
        public string Street1
        {
            get { return this._street1; }
            set { this._street1 = value; }
        }
        public string LaneBlocked1
        {
            get { return this._laneBlocked1; }
            set { this._laneBlocked1 = value; }
        }
        public string OnSceneTime
        {
            get { return this._onscenetime; }
            set { this._onscenetime = value; }
        }
        public string TmcOP
        {
            get { return this._tmcOP; }
            set { this._tmcOP = value; }
        }
        public string VenNo
        {
            get { return this._venNo; }
            set { this._venNo = value; }
        }
        public string Patroller
        {
            get { return this._patroller; }
            set { this._patroller = value; }
        }
        public string Comments
        {
            get { return this._comments; }
            set { this._comments = value; }
        }
        public string SceneDTime
        {
            get { return this._sceneDTime; }
            set { this._sceneDTime = value; }
        }
        public double Latitude
        {
            get { return this._latitude; }
            set { this._latitude = value; }
        }
        public double Longitude
        {
            get { return this._longitude; }
            set { this._longitude = value; }
        }
        public string OthAgency2
        {
            get { return this._othAgency2; }
            set { this._othAgency2 = value; }
        }
        public string RNO
        {
            get { return this._rNo; }
            set { this._rNo = value; }
        }
        public string HansenCPC
        {
            get { return this._hansenCPC; }
            set { this._hansenCPC = value; }
        }
        public string HansenNo
        {
            get { return this._hansenNo; }
            set { this._hansenNo = value; }
        }
        public string HansenCRC
        {
            get { return this._hansenCRC; }
            set { this._hansenCRC = value; }
        }
        public string ContractorNo
        {
            get { return this._contractorNo; }
            set { this._contractorNo = value; }
        }
        public string ACISA
        {
            get { return this._acisa; }
            set { this._acisa = value; }
        }
        public string Loc
        {
            get { return this._loc; }
            set { this._loc = value; }
        }
        public string Loc2
        {
            get { return this._loc2; }
            set { this._loc2 = value; }
        }
        public string DiscLoc
        {
            get { return this._discLoc; }
            set { this._discLoc = value; }
        }
        public string CallerName
        {
            get { return this._callerName; }
            set { this._callerName = value; }
        }
        public string CallerAddrs
        {
            get { return this._callerAddrs; }
            set { this._callerAddrs = value; }
        }
        public string CallerCity
        {
            get { return this._callerCity; }
            set { this._callerCity = value; }
        }
        public string CallerState
        {
            get { return this._callerState; }
            set { this._callerState = value; }
        }
        public string DayTel
        {
            get { return this._dayTel; }
            set { this._dayTel = value; }
        }
        public string NightTel
        {
            get { return this._nightTel; }
            set { this._nightTel = value; }
        }
        public string CallerComment
        {
            get { return this._callerComment; }
            set { this._callerComment = value; }
        }
        public string OpComment
        {
            get { return this._opComment; }
            set { this._opComment = value; }
        }
        public string CallDate
        {
            get { return this._callDate; }
            set { this._callDate = value; }
        }
        public string CallTime
        {
            get { return this._callTime; }
            set { this._callTime = value; }
        }
        public string TechAssgn
        {
            get { return this._techAssgn; }
            set { this._techAssgn = value; }
        }
        public string TimeGiven
        {
            get { return this._timeGiven; }
            set { this._timeGiven = value; }
        }
        public string TimeCompleted
        {
            get { return this._timeCompleted; }
            set { this._timeCompleted = value; }
        }
        public string ContrCommt
        {
            get { return this._contrCommt; }
            set { this._contrCommt = value; }
        }
        #endregion
    }

    //this is for incidents data download
    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json, UseHttpGet = true, XmlSerializeString = false)]
    public void getIncidents()
    {
        DateTime startTime, endTime;
        
        if (this.Context.Request.Params["startTime"] != null)
            startTime = DateTime.Parse(this.Context.Request.Params["startTime"].ToString());
        else
            startTime = DateTime.Now.AddDays(-20);
        if (this.Context.Request.Params["endTime"] != null)
            endTime = DateTime.Parse(this.Context.Request.Params["endTime"].ToString());
        else
            endTime = DateTime.Now;
       
        // Create vars out of connection string and query string
        string dbConn = ConfigurationManager.AppSettings["Tirsconn"];
        
        string dbQuery = @"SELECT * from [tirs].[dbo].[Incident_ddot] as a LEFT OUTER JOIN [tirs].[dbo].[Service_ddot] as b 
        on a.IncID = b.incid where a.ddot_longitude is not null and a.ddot_latitude is not null and a.ddot_StartDate >= '" + startTime.Date + "' and " +
                                                          "a.ddot_StartDate <= '" + endTime.Date + "'";
       // string dbQuery = @"SELECT * from [tirs].[dbo].[Incident_ddot] as a LEFT OUTER JOIN [tirs].[dbo].[Service_ddot] as b 
       // on a.IncID = b.incid where a.ddot_StartDate >= '" + startTime.Date + "' and " + "a.ddot_StartDate <= '" + endTime.Date + "'";
        // Connect to the database and run the query
        SqlConnection conn = new SqlConnection(dbConn);
        SqlCommand cmd = new SqlCommand(dbQuery, conn);
        SqlDataAdapter da = new SqlDataAdapter();
        DataSet ds = new DataSet();
        ds.DataSetName = "imincidents";
        da.SelectCommand = cmd;
        da.Fill(ds, "Incident_ddot");

        
        string incidentType = "Major Crash";
        int incidentTypeInt = 1;

        string incidentStatus = "Not Cleared";
        int incidentStatusInt = 1; // not cleared

        string incDirection = "1-NB";
        int incDirectionInt = 1;

        string quadrantStr = "1-NE";
        int quadrantInt = 1;

        string incTime = "";
        string actLights = "";
        string actSirens = "";
        string onscenetime = "";
        string endDate = "";
        string sceneDTime = "";
        
        
        string newLine = "";
        string csvfile = @"C:/inetpub/OpenCapTOP/download/incidents.csv";
        string header = "IncID,IncDate,IncTime,DetctSrc,OthSrc,Direction,OtherDir,ActLights,ActSirens,Quadrant,Ward,IfTMCInformed,Street2,IncType,NumVeh,IfInjury,LanBlocked,Weather,TraffCond,RopEnvelope,OthAgency,OthAgency1,OthAgency3,IncCom,UniCom,RegImpact,NotifiedMDOT,NotifiedVDOT,NotifiedWMATA,NotifiedMont,NotifiedPG,NotifiedArlin,NotifiedAlex,AgencyReq,Description,RecWIN,EndDate,OthAgency4,OthAgency5,Medianm,IfFatal,Status,OthIncType,Street1Num,Street1,LaneBlocked1,OnSceneTime,TmcOP,VenNo,Patroller,Comments,SceneDTime,Longitude,Latitude,OthAgency2,RNO,HansenCPC,HansenNo,HansenCRC,ContractorNo,ACISA,Loc,Loc2,DiscLoc,CallerName,CallerAddrs,CallerCity,CallerState,DayTel,NightTel,CallerComment,OpComment,CallerDate,CallerTime,TechAssgn,TimeGiven,TimeCompleted,ContrCommt";
        using (StreamWriter sw = File.CreateText(csvfile))
        {
            //sw.WriteLine(DateTime.Now.Second);
            sw.WriteLine(header);
            try
            {
                foreach (DataRow dataRow in ds.Tables["Incident_ddot"].Rows)
                {
                    incidentTypeInt = Convert.ToInt32(dataRow["ddot_incType"].ToString());
                    incidentType = typeHashtable[incidentTypeInt].ToString();
                    if (dataRow["ddot_direction"].ToString().Trim() == "")
                    { incDirectionInt = 0; }
                    else
                    {
                        incDirectionInt = Convert.ToInt32(dataRow["ddot_direction"].ToString().Trim());
                        if (incDirectionInt > 5 || incDirectionInt < 1)
                        { incDirectionInt = 0; }
                    }
                    incDirection = directionHashtable[incDirectionInt].ToString();

                    incidentStatusInt = Convert.ToInt32(dataRow["ddot_status"].ToString());
                    actLights = dataRow["ddot_ActLights"].ToString();
                    if (dataRow["ddot_actSirens"].ToString().Trim() == "1") { actSirens = "Y"; }

                    if (dataRow["ddot_Quadrant"].ToString().Trim() == "")
                    { quadrantStr = ""; }
                    else
                    {
                        quadrantInt = Convert.ToInt32(dataRow["ddot_Quadrant"].ToString());
                        if (quadrantInt > 6 || quadrantInt < 1)
                        { quadrantInt = 0; }
                        quadrantStr = quadrantHashtable[quadrantInt].ToString();
                    }
                    if (dataRow["ddot_ActLights"].ToString().Trim() == "1")
                    { actLights = "Y"; }
                    else if (dataRow["ddot_ActLights"].ToString().Trim() == "0")
                    { actLights = "N"; }

                    if (incidentStatusInt == 2)
                    { incidentStatus = "Cleared"; }

                    //change the ddot_DetctTime format to only have Time
                    incTime = timeFormat(dataRow["ddot_DetctTime"].ToString());

                    //change the ddot_onscenetime format to only have Time
                    onscenetime = timeFormat(dataRow["ddot_onscenetime"].ToString());

                    //change the ddot_enddate format to only have Date
                    endDate = dateFormat(dataRow["ddot_enddate"].ToString());

                    //change the ddot_sceneDTime format to only have Time
                    sceneDTime = timeFormat(dataRow["ddot_sceneDTime"].ToString());

                    //newLine = string.Format("'{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','{9}','{10}','{11}','{12}','{13}','{14}','{15}','{16}','{17}','{18}','{19}','{20}','{21}','{22}','{23}','{24}','{25}','{26}','{27}','{28}','{29}','{30}','{31}','{32}','{33}','{34}','{35}','{36}','{37}','{38}','{39}','{40}','{41}','{42}','{43}','{44}','{45}','{46}','{47}','{48}','{49}','{50}','{51}','{52}','{53}','{54}','{55}','{56}','{57}','{58}','{59}','{60}','{61}','{62}','{63}','{64}','{65}','{66}','{67}','{68}','{69}','{70}','{71}','{72}','{73}','{74}','{75}','{76}'"
                    newLine = string.Format("{0},{1},{2},{3},{4},{5},{6},{7},{8},{9},{10},{11},{12},{13},{14},{15},{16},{17},{18},{19},{20},{21},{22},{23},{24},{25},{26},{27},{28},{29},{30},{31},{32},{33},'{34}',{35},{36},{37},{38},{39},{40},{41},{42},{43},{44},{45},{46},{47},{48},{49},{50},{51},{52},{53},{54},{55},{56},{57},{58},{59},{60},{61},{62},{63},{64},{65},{66},{67},{68},{69},{70},{71},{72},{73},{74},{75}, {76}"
                        , Convert.ToInt32(dataRow["IncID"].ToString()),
                            Convert.ToDateTime(dataRow["ddot_StartDate"]).ToShortDateString(),
                            incTime,
                            dataRow["ddot_detctSrc"].ToString(),
                            dataRow["ddot_othsrc"].ToString(),
                            incDirection,
                            dataRow["ddot_otherdir"].ToString(),
                            actLights,
                            actSirens,
                            quadrantStr,
                            dataRow["ddot_ward"].ToString(),
                            dataRow["ddot_ifTMCinformed"].ToString(),
                            dataRow["ddot_street2"].ToString(),
                            incidentType,
                            dataRow["ddot_numVeh"].ToString(),
                            dataRow["ddot_ifinjury"].ToString(),
                            dataRow["ddot_laneBlocked"].ToString(),
                            dataRow["ddot_weather"].ToString(),
                            dataRow["ddot_traffCond"].ToString(),
                            dataRow["ddot_ropEnvelope"].ToString(),
                            dataRow["ddot_othAgency"].ToString(),
                            dataRow["ddot_othAgency1"].ToString(),
                            dataRow["ddot_othAgency3"].ToString(),
                            dataRow["ddot_incCom"].ToString(),
                            dataRow["ddot_uniCom"].ToString(),
                            dataRow["ddot_RegImpact"].ToString(),
                            dataRow["ddot_notifiedMDOT"].ToString(),
                            dataRow["ddot_notifiedVDOT"].ToString(),
                            dataRow["ddot_notifiedWMATA"].ToString(),
                            dataRow["ddot_notifiedMont"].ToString(),
                            dataRow["ddot_notifiedPG"].ToString(),
                            dataRow["ddot_notifiedArlin"].ToString(),
                            dataRow["ddot_notifiedAlex"].ToString(),
                            dataRow["ddot_agencyReq"].ToString(),
                           
                            dataRow["ddot_description"].ToString(),
                            dataRow["ddot_recWIN"].ToString(),
                            endDate,
                            dataRow["ddot_othAgency4"].ToString(),
                            dataRow["ddot_othAgency5"].ToString(),
                            dataRow["ddot_medianm"].ToString(),
                            dataRow["ddot_ifFatal"].ToString(),
                            incidentStatus,
                            dataRow["ddot_OthIncType"].ToString(),
                            dataRow["ddot_street1num"].ToString(),
                            dataRow["ddot_street1"].ToString(),
                            dataRow["ddot_LaneBlocked1"].ToString(),
                            onscenetime,
                            dataRow["ddot_tmcOP"].ToString(),
                            dataRow["ddot_VenNo"].ToString(),
                            dataRow["ddot_patroller"].ToString(),
                            dataRow["ddot_Comments"].ToString(),
                            sceneDTime,
                            dataRow["ddot_longitude"].ToString(),
                            Convert.ToDouble(dataRow["ddot_latitude"].ToString()),
                            dataRow["ddot_othAgency2"].ToString(),

                            //service table attributes.
                            dataRow["ddot_RNO"].ToString(),
                            dataRow["ddot_HansenCPC"].ToString(),
                            dataRow["ddot_hansenNo"].ToString(),
                            dataRow["ddot_hansenCRC"].ToString(),
                            dataRow["ddot_ContractorNo"].ToString(),
                            dataRow["ddot_ACISA"].ToString(),
                            dataRow["ddot_loc"].ToString(),
                            dataRow["ddot_loc2"].ToString(),
                            dataRow["ddot_DiscLoc"].ToString(),
                            dataRow["ddot_CallerName"].ToString(),
                            dataRow["ddot_CallerAddrs"].ToString(),
                            dataRow["ddot_CallerCity"].ToString(),
                            dataRow["ddot_CallerState"].ToString(),
                            dataRow["ddot_dayTel"].ToString(),
                            dataRow["ddot_nightTel"].ToString(),
                            dataRow["ddot_CallerComment"].ToString(),
                            dataRow["ddot_opComment"].ToString(),
                            dataRow["ddot_CallDate"].ToString(),
                            dataRow["ddot_CallTime"].ToString(),
                            dataRow["ddot_TechAssgn"].ToString(),
                            dataRow["ddot_timeGiven"].ToString(),
                            dataRow["ddot_timeCompleted"].ToString(),
                            dataRow["ddot_ContrCommt"].ToString());

                    if (newLine.Contains("\r\n") || newLine.Contains("\n"))
                    {
                        newLine = newLine.Replace("\r\n", " ");
                        newLine = newLine.Replace("\n", "");
                    }

                    sw.WriteLine(newLine);
                }
            }
            catch (Exception err)
            {
                Console.WriteLine(err.Message);
            }
            
        }
        
    }


  


    //this is for SNAPsMarker show. 
    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json, UseHttpGet = true, XmlSerializeString = false)]
    public List<SNAPsInfo> getSNAPsMarkerInfo()
    {
        string dbConn = ConfigurationManager.AppSettings["Tirsconn"];
        string SNAPsdbQuery = @"SELECT  * FROM [snaps].[dbo].[SNAPsLocation] where LATITUDE is not null and LONGITUDE is not null";

        // Connect to the database and run the query
        SqlConnection conn = new SqlConnection(dbConn);
        SqlCommand cmd = new SqlCommand(SNAPsdbQuery, conn);
        SqlDataAdapter da = new SqlDataAdapter();
        DataSet ds = new DataSet();
        ds.DataSetName = "snapsmarkinfo";
        da.SelectCommand = cmd;
        da.Fill(ds, "SNAPsList");

        List<SNAPsInfo> snapsList = new List<SNAPsInfo>();
        int snapsACISA = 0;
        double snapsLat = 0;
        double snapsLng = 0;
        //string cctvIntersection;
        //string cctvFilepath;
        foreach (DataRow dataRow in ds.Tables["SNAPsList"].Rows)
        {
            snapsACISA = Convert.ToInt32(dataRow["ACISA"].ToString());
            snapsLat = Convert.ToDouble(dataRow["Latitude"].ToString());
            snapsLng = Convert.ToDouble(dataRow["Longitude"].ToString());
            //cctvIntersection = dataRow["NAME"].ToString();
            //cctvFilepath = dataRow["FILEPATH"].ToString();
            snapsList.Add(new SNAPsInfo(snapsACISA, snapsLat, snapsLng));
        }
        return snapsList;
    }

    public class SNAPsInfo
    {
        private int _snapsACISA;
      
       
        private double _snapsLat;
        private double _snapsLng;

        public SNAPsInfo() { }
        //public CCTVInfo(string cctvIntersection,  string cctvType, string cctvServer, string cctvApplication, string cctvFilepath, double cctvLat, double cctvLng)
        public SNAPsInfo(int snapsACISA, double snapsLat, double snapsLng)
        {
            
            this.SNAPsACISA = snapsACISA;
            this.SNAPsLat = snapsLat;
            this.SNAPsLng = snapsLng;
        }
      
        public int SNAPsACISA
        {
            get { return this._snapsACISA; }
            set { this._snapsACISA = value; }
        }
        public double SNAPsLat
        {
            get { return this._snapsLat; }
            set { this._snapsLat = value; }
        }
        public double SNAPsLng
        {
            get { return this._snapsLng; }
            set { this._snapsLng = value; }
        }
    }


    //this is for SNAPsDataDownload

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json, UseHttpGet = true, XmlSerializeString = false)]
    public List<SNAPsData> getSNAPsData()
    {

        Boolean downloadData = false;


        try
        {
            downloadData = Boolean.Parse(this.Context.Request.Params["downloadAble"].ToString());
            
        }
        catch (Exception e)
        {
        }

        //realtime = true;
        string acisaSearch = "";
        string dbConn = ConfigurationManager.AppSettings["Tirsconn"];
        string SNAPsdbQuery = "";


        if (downloadData == false)
        {
            
            try
            {
                acisaSearch = this.Context.Request.Params["ACISA"].ToString().Trim();
                SNAPsdbQuery = @"SELECT * FROM [snaps].[dbo].[SNAPs_realtime] where ACISA=" + acisaSearch;

            }
            catch (Exception e)
            {
                
                SNAPsdbQuery = @"SELECT top 150 * FROM [snaps].[dbo].[SNAPs_history] where Time>='2013-04-16'and Time<'2013-04-20'";
            }

        }
        else
        {
            try
            {
                DateTime startTime = DateTime.Parse(this.Context.Request.Params["startTime"].ToString());
                DateTime endTime = DateTime.Parse(this.Context.Request.Params["endTime"].ToString());
                string acisaInput = this.Context.Request.Params["ACISA"].ToString().Trim();
                if (acisaInput.Equals("0"))
                {
                    SNAPsdbQuery = @"SELECT * FROM [snaps].[dbo].[SNAPs_history] where Time>='" + startTime + "'and Time<'" + endTime + "'";
                }
                else
                {
                    SNAPsdbQuery = @"SELECT * FROM [snaps].[dbo].[SNAPs_history] where Time>='" + startTime + "'and Time<'" + endTime + "'" + "and ACISA=" + acisaInput;
                }
            }

            catch (Exception e)
            {
                SNAPsdbQuery = @"SELECT top 400 * FROM [snaps].[dbo].[SNAPs_realtime]";
            }
        }

        
       
        // Connect to the database and run the query
        SqlConnection conn = new SqlConnection(dbConn);
        SqlCommand cmd = new SqlCommand(SNAPsdbQuery, conn);
        SqlDataAdapter da = new SqlDataAdapter();
        DataSet ds = new DataSet();
        ds.DataSetName = "snapsdatainfo";
        da.SelectCommand = cmd;
        da.Fill(ds, "SNAPsDataList");

        List<SNAPsData> snapsDataList = new List<SNAPsData>();
        string snapsTime="";
        int snapsACISA = 0;
        string snapsLaneDir="";
        int snapsLaneNum=0;
        int snapsVolume=0;
        double snapsOccupancy;
        double snapsSpeed;
        string newLine = "";
        

        string csvfile = @"C:/inetpub/OpenCapTOP/download/snaps.csv"; ;
        //File.WriteAllText(csvfile, string.Empty);

        string header = "snapsTime, snapsACISA, snapsLaneDir, snapsLaneNum, snapsVolume, snapsOccupancy, snapsSpeed";
        using (StreamWriter sw = File.CreateText(csvfile))
        {
            //sw.WriteLine(DateTime.Now.Second);
            sw.WriteLine(header);
            
            foreach (DataRow dataRow in ds.Tables["SNAPsDataList"].Rows)
            {
                snapsTime = dataRow["Time"].ToString();
                snapsACISA = Convert.ToInt32(dataRow["ACISA"].ToString());
                snapsLaneDir = dataRow["laneDir"].ToString().Trim();
                snapsLaneNum = Convert.ToInt32(dataRow["laneNum"].ToString().Trim());
                snapsVolume = Convert.ToInt32(dataRow["volume"].ToString());
                snapsOccupancy = Convert.ToDouble(dataRow["occupancy"].ToString());
                snapsSpeed = Convert.ToDouble(dataRow["speed"].ToString());


                newLine = string.Format("{0},{1}, {2}, {3}, {4}, {5}, {6}", snapsTime, snapsACISA, snapsLaneDir, snapsLaneNum, snapsVolume, snapsOccupancy, snapsSpeed);
                //File.AppendAllText(csvfile, newLine);
                sw.WriteLine(newLine);

                snapsDataList.Add(new SNAPsData(snapsTime, snapsACISA, snapsLaneDir, snapsLaneNum, snapsVolume, snapsOccupancy, snapsSpeed));
            }
            //sw.WriteLine(DateTime.Now.Second);
        }
        return snapsDataList;
    }


    public class SNAPsData
    {
        private int _snapsACISA;
        private string _snapsTime;
        private string _snapsLaneDir;
        private int _snapsLaneNum;
        private int _snapsVolume;
        private double _snapsOccupancy;
        private double _snapsSpeed;
        

        public SNAPsData() { }
        //public CCTVInfo(string cctvIntersection,  string cctvType, string cctvServer, string cctvApplication, string cctvFilepath, double cctvLat, double cctvLng)
        public SNAPsData(string snapsTime, int snapsACISA, string snapsLaneDir, int snapsLaneNum, int snapsVolume, double snapsOccupancy, double snapsSpeed)
        {
            this.SNAPsTime = snapsTime;
            this.SNAPsACISA = snapsACISA;
            this.SNAPsLaneDir = snapsLaneDir;
            this.SNAPsLaneNum = snapsLaneNum;
            this.SNAPsVolume = snapsVolume;
            this.SNAPsOccupancy = snapsOccupancy;
            this.SNAPsSpeed = snapsSpeed;

        }
        public string SNAPsTime
        {
            get { return this._snapsTime; }
            set { this._snapsTime = value; }
        }

        public int SNAPsACISA
        {
            get { return this._snapsACISA; }
            set { this._snapsACISA = value; }
        }

        public string SNAPsLaneDir
        {
            get { return this._snapsLaneDir; }
            set { this._snapsLaneDir = value; }
        }

        public int SNAPsLaneNum
        {
            get { return this._snapsLaneNum; }
            set { this._snapsLaneNum = value; }
        }


        public int SNAPsVolume
        {
            get { return this._snapsVolume; }
            set { this._snapsVolume = value; }
        }


        public double SNAPsOccupancy
        {
            get { return this._snapsOccupancy; }
            set { this._snapsOccupancy = value; }
        }

        public double SNAPsSpeed
        {
            get { return this._snapsSpeed; }
            set { this._snapsSpeed = value; }
        }
    }








    //this is for LoopsDataDownload

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json, UseHttpGet = true, XmlSerializeString = false)]
    public List<LoopsData> getLoopsData()
    {

        Boolean downloadData = false;

        try
        {
            downloadData = Boolean.Parse(this.Context.Request.Params["downloadAble"].ToString());

        }
        catch (Exception e)
        {
        }

        
        
        string dbConn = ConfigurationManager.AppSettings["Tirsconn"];
        string LoopsdbQuery = "";


        if (downloadData == false)
        {

            try
            {
                
                LoopsdbQuery = @"SELECT top 20 * FROM [speed].[dbo].[LoopsClass]";

            }
            catch (Exception e)
            {

                LoopsdbQuery = @"SELECT top 20 * FROM [speed].[dbo].[LoopsClass]";
            }

        }
        else
        {
            //downloadData = Boolean.Parse(this.Context.Request.Params["downloadAble"].ToString());
            try
            {
                DateTime startTime = DateTime.Parse(this.Context.Request.Params["startTime"].ToString());
                DateTime endTime = DateTime.Parse(this.Context.Request.Params["endTime"].ToString());
                LoopsdbQuery = @"SELECT * FROM [speed].[dbo].[LoopsClass] where DateTime>='" + startTime + "'and DateTime<'" + endTime + "'";
            }

            catch (Exception e)
            {
                LoopsdbQuery = @"SELECT top 400 * FROM [speed].[dbo].[LoopsClass]";
            }
        }



        // Connect to the database and run the query
        SqlConnection conn = new SqlConnection(dbConn);
        SqlCommand cmd = new SqlCommand(LoopsdbQuery, conn);
        SqlDataAdapter da = new SqlDataAdapter();
        DataSet ds = new DataSet();
        ds.DataSetName = "loopsdatainfo";
        da.SelectCommand = cmd;
        da.Fill(ds, "LoopsDataList");

        List<LoopsData> loopsDataList = new List<LoopsData>();
        string loopsStation = "";
        string loopsDT = "";
        int loopsChannel = 0;
        int loopsClass = 0;
        int loopsCount = 0;
        string newLine = "";

        string csvfile = @"C:/inetpub/OpenCapTOP/download/loops.csv";
        //File.WriteAllText(csvfile, string.Empty);

        string header = "StationID, DateTime, Channel, Class, Count";
        //File.AppendAllText(csvfile, header);

        using (StreamWriter sw = File.CreateText(csvfile))
        {
            
            sw.WriteLine(header);
            foreach (DataRow dataRow in ds.Tables["LoopsDataList"].Rows)
            {
                loopsStation = dataRow["StationID"].ToString();
                loopsDT = dataRow["DateTime"].ToString();
                loopsChannel = Convert.ToInt32(dataRow["Channel"].ToString().Trim());
                loopsClass = Convert.ToInt32(dataRow["Class"].ToString().Trim());
                loopsCount = Convert.ToInt32(dataRow["Count"].ToString().Trim());

                newLine = string.Format("{0},{1}, {2}, {3}, {4}", loopsStation, loopsDT, loopsChannel, loopsClass, loopsCount);
                //File.AppendAllText(csvfile, newLine);
                sw.WriteLine(newLine);
                loopsDataList.Add(new LoopsData(loopsStation, loopsDT, loopsChannel, loopsClass, loopsCount));
            }
            
        }
        
        return loopsDataList;

    }


    public class LoopsData
    {
        private string _loopsStation;
        private string _loopsDT;
        private int _loopsChannel;
        private int _loopsClass;
        private int _loopsCount;
        

        public LoopsData() { }
        public LoopsData(string loopsStation, string loopsDT, int loopsChannel, int loopsClass, int loopsCount)
        {
            this.LoopsStation = loopsStation;
            this.LoopsDT = loopsDT;
            this.LoopsChannel = loopsChannel;
            this.LoopsClass = loopsClass;
            this.LoopsCount = loopsCount;

        }
        public string LoopsStation
        {
            get { return this._loopsStation; }
            set { this._loopsStation = value; }
        }

        public string LoopsDT
        {
            get { return this._loopsDT; }
            set { this._loopsDT = value; }
        }

        public int LoopsChannel
        {
            get { return this._loopsChannel; }
            set { this._loopsChannel = value; }
        }

        public int LoopsClass
        {
            get { return this._loopsClass; }
            set { this._loopsClass = value; }
        }


        public int LoopsCount
        {
            get { return this._loopsCount; }
            set { this._loopsCount = value; }
        }
    
    }


    //this is for InfraredDataDownload

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json, UseHttpGet = true, XmlSerializeString = false)]
    public void getInfraredData()
    {

        string dbConn = ConfigurationManager.AppSettings["Tirsconn"];
        string InfareddbQuery = "";


        try
        {
            DateTime startTime = DateTime.Parse(this.Context.Request.Params["startTime"].ToString());
            DateTime endTime = DateTime.Parse(this.Context.Request.Params["endTime"].ToString());
            InfareddbQuery = @"SELECT * FROM [mcdean].[dbo].[infrared] where DateTime>='" + startTime + "'and DateTime<'" + endTime + "'";
        }

        catch (Exception e)
        {
            InfareddbQuery = @"SELECT top 400 * FROM [mcdean].[dbo].[infrared]";
        }



        // Connect to the database and run the query
        SqlConnection conn = new SqlConnection(dbConn);
        SqlCommand cmd = new SqlCommand(InfareddbQuery, conn);
        SqlDataAdapter da = new SqlDataAdapter();
        DataSet ds = new DataSet();
        ds.DataSetName = "infrareddatainfo";
        da.SelectCommand = cmd;
        da.Fill(ds, "InfraredDataList");

        string infaredDT = "";
        string siteID = "";
        double AvSpeed = 0;
        int Class = 0;
        int ClassCount = 0;
        string newLine="";

        string csvfile = @"C:/inetpub/OpenCapTOP/download/infrared.csv"; ;
        //File.WriteAllText(csvfile, string.Empty);

        string header =  "infaredDT, siteID, AvSpeed, Class, ClassCount";
        //File.AppendAllText(csvfile, header);
        using (StreamWriter sw = File.CreateText(csvfile))
        {
            sw.WriteLine(header);
            foreach (DataRow dataRow in ds.Tables["InfraredDataList"].Rows)
            {
                infaredDT = dataRow["DateTime"].ToString();
                siteID = dataRow["siteID"].ToString();
                AvSpeed = Convert.ToDouble(dataRow["AvSpeed"].ToString().Trim());
                Class = Convert.ToInt32(dataRow["Class"].ToString().Trim());
                ClassCount = Convert.ToInt32(dataRow["ClassCount"].ToString().Trim());

                newLine = string.Format("{0},{1}, {2}, {3}, {4}", infaredDT, siteID, AvSpeed, Class, ClassCount);
                //File.AppendAllText(csvfile, newLine);
                sw.WriteLine(newLine);
            }
        }

    }


    ////this is for AcousticDataDownload

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json, UseHttpGet = true, XmlSerializeString = false)]
    public void getAcousticData()
    {

        string dbConn = ConfigurationManager.AppSettings["Tirsconn"];
        string AcousticdbQuery = "";


        try
        {
            DateTime startTime = DateTime.Parse(this.Context.Request.Params["startTime"].ToString());
            DateTime endTime = DateTime.Parse(this.Context.Request.Params["endTime"].ToString());
            AcousticdbQuery = @"SELECT * FROM [mcdean].[dbo].[acoustic] where Date>='" + startTime + "'and Date<'" + endTime + "'";
        }

        catch (Exception e)
        {
            AcousticdbQuery = @"SELECT top 400 * FROM [mcdean].[dbo].[acoustic]";
        }



        // Connect to the database and run the query
        SqlConnection conn = new SqlConnection(dbConn);
        SqlCommand cmd = new SqlCommand(AcousticdbQuery, conn);
        SqlDataAdapter da = new SqlDataAdapter();
        DataSet ds = new DataSet();
        ds.DataSetName = "acousticdatainfo";
        da.SelectCommand = cmd;
        da.Fill(ds, "AcousticDataList");

        string Date = "";
        string Time = "";
        string LaneNum ="";
        string Cnt_All = "";
        string Cnt_CT="";
        string Cnt_TT="";
        string Occ="";
        string Avg_spd="";
        string LaneNum1="";
        string Cnt_All1="";
        string Cnt_CT1="";
        string Cnt_TT1="";
        string Occ1="";
        string Avg_spd1="";
        string LaneNum2="";
        string Cnt_All2="";
        string Cnt_CT2="";
        string Cnt_TT2="";
        string Occ2="";
        string Avg_spd2="";
        string LaneNum3="";
        string Cnt_All3="";
        string Cnt_CT3="";
        string Cnt_TT3="";
        string Occ3="";
        string Avg_spd3="";
        string LaneNum4="";
        string Cnt_All4="";
        string Cnt_CT4="";
        string Cnt_TT4="";
        string Occ4="";
        string Avg_spd4="";
        string newLine = "";
        string csvfile = @"C:/inetpub/OpenCapTOP/download/acoustic.csv"; ;
        //File.WriteAllText(csvfile, string.Empty);

        string header="Date,Time,Lane#,Cnt-All,Cnt-CT,Cnt-TT,Occ(%),Avg-Spd,Lane#1,Cnt-All1,Cnt-CT1,Cnt-TT1,Occ(%)1,Avg-Spd1,Lane#2,Cnt-All2,Cnt-CT2,Cnt-TT2,Occ(%)2,Avg-Spd2,Lane#3,Cnt-All3,Cnt-CT3,Cnt-TT3,Occ(%)3,Avg-Spd3,Lane#4,Cnt-All4,Cnt-CT4,Cnt-TT4,Occ(%)4,Avg-Spd4";
        //File.AppendAllText(csvfile, header);    
        using (StreamWriter sw = File.CreateText(csvfile))
        {
            sw.WriteLine(header);
            foreach (DataRow dataRow in ds.Tables["AcousticDataList"].Rows)
            {
                Date = dataRow["Date"].ToString();
                Time = dataRow["Time"].ToString();
                LaneNum = dataRow["Lane#"].ToString();
                Cnt_All = dataRow["Cnt-All"].ToString();
                Cnt_CT = dataRow["Cnt-CT"].ToString();
                Cnt_TT = dataRow["Cnt-TT"].ToString();
                Occ = dataRow["Occ(%)"].ToString();
                Avg_spd = dataRow["Avg-Spd"].ToString();
                LaneNum1 = dataRow["Lane#1"].ToString();
                Cnt_All1 = dataRow["Cnt-All1"].ToString();
                Cnt_CT1 = dataRow["Cnt-CT1"].ToString();
                Cnt_TT1 = dataRow["Cnt-TT1"].ToString();
                Occ1 = dataRow["Occ(%)1"].ToString();
                Avg_spd1 = dataRow["Avg-Spd1"].ToString();
                LaneNum2 = dataRow["Lane#2"].ToString();
                Cnt_All2 = dataRow["Cnt-All2"].ToString();
                Cnt_CT2 = dataRow["Cnt-CT2"].ToString();
                Cnt_TT2 = dataRow["Cnt-TT2"].ToString();
                Occ2 = dataRow["Occ(%)2"].ToString();
                Avg_spd2 = dataRow["Avg-Spd2"].ToString();
                LaneNum3 = dataRow["Lane#3"].ToString();
                Cnt_All3 = dataRow["Cnt-All3"].ToString();
                Cnt_CT3 = dataRow["Cnt-CT3"].ToString();
                Cnt_TT3 = dataRow["Cnt-TT3"].ToString();
                Occ3 = dataRow["Occ(%)3"].ToString();
                Avg_spd3 = dataRow["Avg-Spd3"].ToString();
                LaneNum4 = dataRow["Lane#4"].ToString();
                Cnt_All4 = dataRow["Cnt-All4"].ToString();
                Cnt_CT4 = dataRow["Cnt-CT4"].ToString();
                Cnt_TT4 = dataRow["Cnt-TT4"].ToString();
                Occ4 = dataRow["Occ(%)4"].ToString();
                Avg_spd4 = dataRow["Avg-Spd4"].ToString();

                newLine = string.Format("{0},{1}, {2}, {3}, {4}, {5},{6}, {7}, {8}, {9}, {10},{11}, {12}, {13}, {14},{15},{16}, {17}, {18}, {19}, {20}, {21},{22},{23}, {24}, {25}, {26}, {27}, {28}, {29}, {30}, {31}", Date, Time, LaneNum, Cnt_All, Cnt_CT, Cnt_TT, Occ, Avg_spd, LaneNum1, Cnt_All1, Cnt_CT1, Cnt_TT1, Occ1, Avg_spd1, LaneNum2, Cnt_All2, Cnt_CT2, Cnt_TT2, Occ2, Avg_spd2, LaneNum3, Cnt_All3, Cnt_CT3, Cnt_TT3, Occ3, Avg_spd3, LaneNum4, Cnt_All4, Cnt_CT4, Cnt_TT4, Occ4, Avg_spd4);
                //File.AppendAllText(csvfile, newLine);
                sw.WriteLine(newLine);
            }
        }

    }



    ////this is for MicrowaveDataDownload

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json, UseHttpGet = true, XmlSerializeString = false)]
    public void getMicrowaveData()
    {

        string dbConn = LocalEnv.microwaveConnString;
        string MicrowavedbQuery = "";


        try
        {
            DateTime startTime = DateTime.Parse(this.Context.Request.Params["startTime"].ToString());
            DateTime endTime = DateTime.Parse(this.Context.Request.Params["endTime"].ToString());
            MicrowavedbQuery = @"SELECT * FROM [RTMSData].[dbo].[tblRtmsHistory] where DateTimeStamp>='" + startTime + "'and DateTimeStamp<'" + endTime + "'";
        }

        catch (Exception e)
        {
            MicrowavedbQuery = @"SELECT top 200 * FROM [RTMSData].[dbo].[tblRtmsHistory]";
        }



        // Connect to the database and run the query
        SqlConnection conn = new SqlConnection(dbConn);
        SqlCommand cmd = new SqlCommand(MicrowavedbQuery, conn);
        SqlDataAdapter da = new SqlDataAdapter();
        DataSet ds = new DataSet();
        ds.DataSetName = "microwavedatainfo";
        da.SelectCommand = cmd;
        da.Fill(ds, "MicrowaveDataList");

        string DateTimeStamp = "";
        string RTMS_NETWORK_ID = "";
        string RTMS_NAME = "";
        string Zone = "";
        string Speed = "";
        string FWDLK_Speed = "";
        string Volume = "";
        string Vol_Mid = "";
        string Vol_Long = "";
        string Vol_Extra_Long = "";
        string Occupancy = "";
        string MsgNumber = "";
        string SensorErrRate = "";
        string HealthByte = "";
        string SpeedUnits = "";
        string Vol_Mid2 = "";
        string Vol_Long2 = "";
        string newLine = "";

        string csvfile = @"C:/inetpub/OpenCapTOP/download/microwave.csv"; ;
        //File.WriteAllText(csvfile, string.Empty);
        string header = "DateTimeStamp,RTMS_NETWORK_ID,RTMS_NAME,Zone,Speed,FWDLK_Speed,Volume,Vol_Mid,Vol_Long,Vol_Extra_Long,Occupancy,MsgNumber,SensorErrRate,HealthByte,SpeedUnits,Vol_Mid2,Vol_Long2";
        //File.AppendAllText(csvfile, header);
        using (StreamWriter sw = File.CreateText(csvfile))
        {
            sw.WriteLine(header);
            foreach (DataRow dataRow in ds.Tables["MicrowaveDataList"].Rows)
            {
                DateTimeStamp = dataRow["DateTimeStamp"].ToString();
                RTMS_NETWORK_ID = dataRow["RTMS_NETWORK_ID"].ToString();
                RTMS_NAME = dataRow["RTMS_NAME"].ToString();
                Zone = dataRow["Zone"].ToString();
                Speed = dataRow["Speed"].ToString();
                FWDLK_Speed = dataRow["FWDLK_Speed"].ToString();
                Volume = dataRow["Volume"].ToString();
                Vol_Mid = dataRow["Vol_Mid"].ToString();
                Vol_Long = dataRow["Vol_Long"].ToString();
                Vol_Extra_Long = dataRow["Vol_Extra_Long"].ToString();
                Occupancy = dataRow["Occupancy"].ToString();
                MsgNumber = dataRow["MsgNumber"].ToString();
                SensorErrRate = dataRow["SensorErrRate"].ToString();
                HealthByte = dataRow["HealthByte"].ToString();
                SpeedUnits = dataRow["SpeedUnits"].ToString();
                Vol_Mid2 = dataRow["Vol_Mid2"].ToString();
                Vol_Long2 = dataRow["Vol_Long2"].ToString();


                newLine = string.Format("{0},{1}, {2}, {3}, {4}, {5},{6}, {7}, {8}, {9}, {10},{11}, {12}, {13}, {14},{15},{16}", DateTimeStamp, RTMS_NETWORK_ID, RTMS_NAME, Zone, Speed, FWDLK_Speed, Volume, Vol_Mid, Vol_Long, Vol_Extra_Long, Occupancy, MsgNumber, SensorErrRate, HealthByte, SpeedUnits, Vol_Mid2, Vol_Long2);
                //File.AppendAllText(csvfile, newLine);
                sw.WriteLine(newLine);
            }
        }

    }


    ////this is for VideoDataDownload

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json, UseHttpGet = true, XmlSerializeString = false)]
    public void getVideoData()
    {

        string dbConn = ConfigurationManager.AppSettings["Tirsconn"];
        string VideodbQuery = "";


        try
        {
            DateTime startTime = DateTime.Parse(this.Context.Request.Params["startTime"].ToString());
            DateTime endTime = DateTime.Parse(this.Context.Request.Params["endTime"].ToString());
            VideodbQuery = @"SELECT * FROM [mcdean].[dbo].[tzonedata] where TimeStamp>='" + startTime + "'and TimeStamp<'" + endTime + "'";
        }

        catch (Exception e)
        {
            VideodbQuery = @"SELECT top 200 * FROM [mcdean].[dbo].[tzonedata]";
        }



        // Connect to the database and run the query
        SqlConnection conn = new SqlConnection(dbConn);
        SqlCommand cmd = new SqlCommand(VideodbQuery, conn);
        SqlDataAdapter da = new SqlDataAdapter();
        DataSet ds = new DataSet();
        ds.DataSetName = "videodatainfo";
        da.SelectCommand = cmd;
        da.Fill(ds, "VideoDataList");

        string TimeStamp = "";
        string ZoneID = "";
        string Occupancy = "";
        string Density = "";
        string NumClasses = "";
        string nVehicles1 = "";
        string Speed1 = "";
        string Gaptime1 = "";
        string nVehicles2 = "";
        string Speed2 = "";
        string Gaptime2 = "";
        string nVehicles3 = "";
        string Speed3 = "";
        string Gaptime3 = "";
        string nVehicles4 = "";
        string Speed4 = "";
        string Gaptime4 = "";
        string nVehicles5 = "";
        string Speed5 = "";
        string Gaptime5 = "";
        string newLine = "";

        string csvfile = @"C:/inetpub/OpenCapTOP/download/video.csv"; ;
        //File.WriteAllText(csvfile, string.Empty);
        string header = "TimeStamp,ZoneID,Occupancy,Density,NumClasses,nVehicles1,Speed1,Gaptime1,nVehicles2,Speed2,Gaptime2,nVehicles3,Speed3,Gaptime3,nVehicles4,Speed4,Gaptime4,nVehicles5,Speed5,Gaptime5";
        //File.AppendAllText(csvfile, header);

        using (StreamWriter sw = File.CreateText(csvfile))
        {
            sw.WriteLine(header);
            foreach (DataRow dataRow in ds.Tables["VideoDataList"].Rows)
            {
                TimeStamp = dataRow["TimeStamp"].ToString();
                ZoneID = dataRow["ZoneID"].ToString();
                Occupancy = dataRow["Occupancy"].ToString();
                Density = dataRow["Density"].ToString();
                NumClasses = dataRow["NumClasses"].ToString();
                nVehicles1 = dataRow["nVehicles1"].ToString();
                Speed1 = dataRow["Speed1"].ToString();
                Gaptime1 = dataRow["Gaptime1"].ToString();
                nVehicles2 = dataRow["nVehicles2"].ToString();
                Speed2 = dataRow["Speed2"].ToString();
                Gaptime2 = dataRow["Gaptime2"].ToString();
                nVehicles3 = dataRow["nVehicles3"].ToString();
                Speed3 = dataRow["Speed3"].ToString();
                Gaptime3 = dataRow["Gaptime3"].ToString();
                nVehicles4 = dataRow["nVehicles4"].ToString();
                Speed4 = dataRow["Speed4"].ToString();
                Gaptime4 = dataRow["Gaptime4"].ToString();
                nVehicles5 = dataRow["nVehicles5"].ToString();
                Speed5 = dataRow["Speed5"].ToString();
                Gaptime5 = dataRow["Gaptime5"].ToString();


                newLine = string.Format("{0},{1}, {2}, {3}, {4}, {5},{6}, {7}, {8}, {9}, {10},{11}, {12}, {13}, {14},{15},{16},{17},{18},{19}", TimeStamp, ZoneID, Occupancy, Density, NumClasses, nVehicles1, Speed1, Gaptime1, nVehicles2, Speed2, Gaptime2, nVehicles3, Speed3, Gaptime3, nVehicles4, Speed4, Gaptime4, nVehicles5, Speed5, Gaptime5);
                //File.AppendAllText(csvfile, newLine);
                sw.WriteLine(newLine);
            }
        }

    }

    //this is for PCSMarker show. 
    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json, UseHttpGet = true, XmlSerializeString = false)]
    public List<PCSInfo> getPCSMarkerInfo()
    {
        string dbConn = ConfigurationManager.AppSettings["Tirsconn"];
        string PCSdbQuery = @"SELECT  * FROM [speed].[dbo].[pcsLocation] where latitude is not null and longitude is not null";

        // Connect to the database and run the query
        SqlConnection conn = new SqlConnection(dbConn);
        SqlCommand cmd = new SqlCommand(PCSdbQuery, conn);
        SqlDataAdapter da = new SqlDataAdapter();
        DataSet ds = new DataSet();
        ds.DataSetName = "pcsmarkinfo";
        da.SelectCommand = cmd;
        da.Fill(ds, "PCSList");

        List<PCSInfo> pcsList = new List<PCSInfo>();
        string pcsLocation = "";
        string pcsTechnology = "";
        int pcsSiteID = 0;
        double pcsLat = 0;
        double pcsLng = 0;
        //string cctvIntersection;
        //string cctvFilepath;
        foreach (DataRow dataRow in ds.Tables["PCSList"].Rows)
        {
            pcsLocation = dataRow["location"].ToString().Trim();
            pcsSiteID = Convert.ToInt32(dataRow["siteID"].ToString().Trim());
            pcsTechnology = dataRow["technology"].ToString().Trim();
            pcsTechnology = pcsTechnology.Replace("/", "-");
            pcsLat = Convert.ToDouble(dataRow["latitude"].ToString().Trim());
            pcsLng = Convert.ToDouble(dataRow["longitude"].ToString().Trim());

            pcsList.Add(new PCSInfo(pcsLocation, pcsSiteID, pcsTechnology, pcsLat, pcsLng));
        }
        return pcsList;
    }

    public class PCSInfo
    {
        private string _pcsLocation;
        private int _pcsSiteID;
        private string _pcsTechnology;
        private double _pcsLat;
        private double _pcsLng;

        public PCSInfo() { }
        public PCSInfo(string pcsLocation, int pcsSiteID, string pcsTechnology, double pcsLat, double pcsLng)
        {

            this.PCSLocation = pcsLocation;
            this.PCSSiteID = pcsSiteID;
            this.PCSTechnology=pcsTechnology;
            this.PCSLat = pcsLat;
            this.PCSLng = pcsLng;
        }

        public string PCSLocation
        {
            get { return this._pcsLocation; }
            set { this._pcsLocation = value; }
        }

        public int PCSSiteID
        {
            get { return this._pcsSiteID; }
            set { this._pcsSiteID = value; }
        }


        public string PCSTechnology
        {
            get { return this._pcsTechnology; }
            set { this._pcsTechnology = value; }
        }

        public double PCSLat
        {
            get { return this._pcsLat; }
            set { this._pcsLat = value; }
        }
        public double PCSLng
        {
            get { return this._pcsLng; }
            set { this._pcsLng = value; }
        }
    }

}




