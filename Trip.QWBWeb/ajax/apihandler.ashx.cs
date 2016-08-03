using System;
using System.IO;
using System.Net;
using System.Reflection;
using System.Web;
using System.Web.Security;
using System.Web.SessionState;
using Trip.QWB;

namespace Trip.QWBWeb.ajax
{
    /// <summary>
    /// apihandler 的摘要说明
    /// </summary>
    public class apihandler : IHttpHandler, IRequiresSessionState
    {
        public void ProcessRequest(HttpContext context)
        {
            try
            {
                Type type = this.GetType();
                string fn = context.Request["fn"].ToString();
                MethodInfo method = type.GetMethod(fn, BindingFlags.Public | BindingFlags.Instance | BindingFlags.NonPublic);
                method.Invoke(this, null);
            }
            catch (Exception e)
            {
                HttpContext.Current.Response.Write(e.InnerException.Message);
            }
        }

        private void ResponseWriteEnd(HttpContext context, string msg)
        {
            context.Response.Write(msg);
            context.Response.End();
        }

        /// <summary>
        /// 获取城市列表
        /// </summary>
        public void getcitieslist()
        {
            HttpContext.Current.Response.Write(Trip.QWB.qwbApi.getCitiesList());
        }

        /// <summary>
        /// 获取车型列表
        /// </summary>
        public void getcarslist()
        {
            int locationid = 0;
            try
            {
                locationid = Convert.ToInt32(HttpContext.Current.Request["locationid"]);
            }
            catch { }
            HttpContext.Current.Response.Write(Trip.QWB.qwbApi.getCarsList(locationid));
        }

        //以下接送机--------------------------------------------------------------------------------------------------------------------------------------------

        /// <summary>
        /// 获取机场列表
        /// </summary>
        public void getairports()
        {
            int city_id = 0;
            try
            {
                city_id = Convert.ToInt32(HttpContext.Current.Request["city_id"]);
            }
            catch { }
            HttpContext.Current.Response.Write(Trip.QWB.qwbApi.getairports(city_id));
        }

        /// <summary>
        /// 接送地址查询自动补全
        /// </summary>
        public void getairbookingsaddrs()
        {
            string airport_code = "";
            string query = "";
            try
            {
                airport_code = HttpContext.Current.Request["airport_code"];
                query = HttpContext.Current.Request["query"];
            }
            catch { }
            HttpContext.Current.Response.Write(Trip.QWB.qwbApi.getAirbookingsAddrs(airport_code, query));
        }
        /// <summary>
        /// 获取接送机价格
        /// </summary>
        public void getair_bookingsnew()
        {
            string car_category_id = "";
            string pickup_airport_code = "";
            string pickup_flight = "";
            string pickup_time = "";
            string pickup_addr = "";
            int locationid = 0;
            try
            {
                car_category_id = HttpContext.Current.Request["car_category_id"];
                pickup_airport_code = HttpContext.Current.Request["pickup_airport_code"];
                pickup_flight = HttpContext.Current.Request["pickup_flight"];
                pickup_time = HttpContext.Current.Request["pickup_time"];
                pickup_addr = HttpContext.Current.Request["pickup_addr"];
                locationid = Convert.ToInt32(HttpContext.Current.Request["locationid"]);
            }
            catch { }
            HttpContext.Current.Response.Write(Trip.QWB.qwbApi.getair_bookingsnew(car_category_id, pickup_airport_code, pickup_flight, pickup_time, pickup_addr, locationid));
        }

        /// <summary>
        /// 创建接送机订单(拓谷)
        /// </summary>
        public void createordertg()
        {
            int gid = 0;
            int cid = 0;
            var ticket = "";
            try
            {
                ticket = HttpContext.Current.Request.Cookies["guideid"].Value;
                gid = Convert.ToInt32(FormsAuthentication.Decrypt(ticket).Name);
            }
            catch { }
            try
            {
                ticket = HttpContext.Current.Request.Cookies["cusid"].Value;
                cid = Convert.ToInt32(FormsAuthentication.Decrypt(ticket).Name);
            }
            catch { }

            string json = "";
            try
            {
                json = HttpContext.Current.Request["json"];
            }
            catch { }
            if (gid > 0)
                json = json.Substring(0, json.Length - 1) + ",\"guide_id\":" + gid + "" + "}";
            else if (cid > 0)
                json = json.Substring(0, json.Length - 1) + ",\"customer_id\":" + cid + "" + "}";
            HttpContext.Current.Response.Write(Trip.QWB.qwbApi.createordertg(json));
        }

        //以下标准车--------------------------------------------------------------------------------------------------------------------------------------------

        /// <summary>
        /// 获取标准车价格(列表)
        /// </summary>
        public void getbookingsnew()
        {
            string car_category_id = "";
            string pickup_time1 = "";
            //多地用车的时候把日期存到pickup_time1,用|分隔开.
            string pickup_time2 = "";
            string locationid = "";
            try
            {
                car_category_id = HttpContext.Current.Request["car_category_id"];
                pickup_time1 = HttpContext.Current.Request["pickup_time1"];
                pickup_time2 = HttpContext.Current.Request["pickup_time2"];
                locationid = HttpContext.Current.Request["locationid"];
            }
            catch { }
            HttpContext.Current.Response.Write(Trip.QWB.qwbApi.getbookingsnew(car_category_id, pickup_time1, pickup_time2, locationid));
        }

        /// <summary>
        /// 获取标准车价格(单车)
        /// </summary>
        public void getbookingsnewp1()
        {
            string from_date = "";
            string from_location_id = "";
            string to_date = "";
            int car_category_id = 0;
            int driver_category_id = 0;
            int adults = 0;
            int kids = 0;
            int[] kids_age = new int[5]; ;
            try
            {
                from_date = HttpContext.Current.Request["from_date"];
                from_location_id = HttpContext.Current.Request["from_location_id"];
                to_date = HttpContext.Current.Request["to_date"];
                car_category_id = Convert.ToInt32(HttpContext.Current.Request["car_category_id"]);
                driver_category_id = Convert.ToInt32(HttpContext.Current.Request["driver_category_id"]);
                adults = Convert.ToInt32(HttpContext.Current.Request["adults"]);
                kids = Convert.ToInt32(HttpContext.Current.Request["kids"]);
                if (kids > 0)
                {
                    kids_age = new int[kids];
                    kids_age[0] = Convert.ToInt32(HttpContext.Current.Request["kids_age"]);
                }
            }
            catch (Exception e) { }
            HttpContext.Current.Response.Write(Trip.QWB.qwbApi.getbookingsnewP1(from_date, from_location_id, to_date, car_category_id, driver_category_id, adults, kids, kids_age));
        }

        /// <summary>
        /// 创建标准用车订单(一地用车拓谷)
        /// </summary>
        public void createcarordertg()
        {
            int gid = 0;
            int cid = 0;
            var ticket = "";
            try
            {
                ticket = HttpContext.Current.Request.Cookies["guideid"].Value;
                gid = Convert.ToInt32(FormsAuthentication.Decrypt(ticket).Name);
            }
            catch { }
            try
            {
                ticket = HttpContext.Current.Request.Cookies["cusid"].Value;
                cid = Convert.ToInt32(FormsAuthentication.Decrypt(ticket).Name);
            }
            catch { }

            string json = "";
            try
            {
                json = HttpContext.Current.Request["json"];
            }
            catch { }
            if (gid > 0)
                json = json.Substring(0, json.Length - 1) + ",\"guide_id\":" + gid + "" + "}";
            else if (cid > 0)
                json = json.Substring(0, json.Length - 1) + ",\"customer_id\":" + cid + "" + "}";

            HttpContext.Current.Response.Write(Trip.QWB.qwbApi.createcarordertg(json));
        }

        /// <summary>
        /// 获取城市间距离
        /// </summary>
        public void getdistances()
        {
            int from_location_id = 0;
            int to_location_id = 0;
            try
            {
                from_location_id = Convert.ToInt32(HttpContext.Current.Request["from_location_id"]);
                to_location_id = Convert.ToInt32(HttpContext.Current.Request["to_location_id"]);
            }
            catch { }
            HttpContext.Current.Response.Write(Trip.QWB.qwbApi.getdistances(from_location_id, to_location_id));
        }

        /// <summary>
        /// 判断是否已登录
        /// </summary>
        public void iflogin()
        {
            int gid = 0;
            int cid = 0;
            var ticket = "";
            try
            {
                ticket = HttpContext.Current.Request.Cookies["guideid"].Value;
                gid = Convert.ToInt32(FormsAuthentication.Decrypt(ticket).Name);
            }
            catch { }
            try
            {
                ticket = HttpContext.Current.Request.Cookies["cusid"].Value;
                cid = Convert.ToInt32(FormsAuthentication.Decrypt(ticket).Name);
            }
            catch { }
            if (gid > 0 || cid > 0)
                HttpContext.Current.Response.Write("true");
            else
                HttpContext.Current.Response.Write("false");
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}