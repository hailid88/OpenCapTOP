using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Security;

public partial class AccountManagement : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!User.IsInRole("sysadmin"))
        {
            Response.Redirect("~/Account/Login.aspx?ReturnUrl=%2fAccountManagement.aspx");
        }
        if (!IsPostBack)
        {
            Userlist.Items.Clear();
            Rolelist.Items.Clear();
            string[] rolesArray;
            MembershipUserCollection muc = Membership.GetAllUsers();
            foreach (MembershipUser ee in muc)
            {
                Userlist.Items.Add(ee.UserName);
            }
            rolesArray = Roles.GetAllRoles();
            foreach (string role in rolesArray)
            {
                Rolelist.Items.Add(role);
            }

        }

        
    }
    protected void Button1_Click(object sender, EventArgs e)
    {
        Roles.AddUserToRole(Userlist.SelectedValue, Rolelist.SelectedValue);

        displayresult.Text = "Added " + Userlist.SelectedValue + " to group " + Rolelist.SelectedValue;
    }
}