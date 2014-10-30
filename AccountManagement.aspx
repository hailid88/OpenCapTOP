<%@ Page Title="CapTOP Open Web" Language="C#" MasterPageFile="~/Site.master" AutoEventWireup="true"
    CodeFile="AccountManagement.aspx.cs" Inherits="AccountManagement" %>

<asp:Content ID="HeaderContent" runat="server" ContentPlaceHolderID="HeadContent">
</asp:Content>
<asp:Content ID="BodyContent" runat="server" ContentPlaceHolderID="MainContent">
        
    <asp:DropDownList ID="Userlist" runat="server" AutoPostBack="true">
    </asp:DropDownList>
    <asp:DropDownList ID="Rolelist" runat="server" AutoPostBack="true">
    </asp:DropDownList>
    <asp:Button ID="Button1" runat="server" onclick="Button1_Click" Text="Add" />
        <asp:Label ID="displayresult" runat="server"></asp:Label>
</asp:Content>