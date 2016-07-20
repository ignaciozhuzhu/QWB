using Trip.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;
using Trip.QWB.Model;
using System.Web.Script.Serialization;
using Trip.Api.Models.QuWanBei;
using System.Web.Security;

namespace Trip.QWB
{
    /// <summary>
    /// 趣玩呗接口
    /// </summary>
    public class qwbApi
    {
        private static string hhlserver = System.Configuration.ConfigurationManager.AppSettings["hhlserver"];
        private static string adndoserver = System.Configuration.ConfigurationManager.AppSettings["adndoserver"];
        private const string testuser = "key=qwb_1467082083&sign=3b1b7113028cc5eeefa5cc61f4872827";

        /// <summary>
        /// 获取城市列表
        /// </summary>
        public static string getCitiesList()
        {
            string url = hhlserver;
            url += "/cities?"+ testuser + "";
            var response = HttpUtil.Get(url);
            if (response != null)
            {
                return response;
            }
            else
            {
                return null;
            }
        }

        /// <summary>
        /// 获取车型列表
        /// </summary>
        public static string getCarsList(int locationid)
        {
            string url = hhlserver;
            url += "/car_categories?" + testuser + "&location_id=" + locationid + "";
            var response = HttpUtil.Get(url);
            if (response != null)
            {
                return response;
            }
            else
            {
                return null;
            }
        }

        /// <summary>
        /// 获取机场列表
        /// </summary>
        public static string getairports(int city_id)
        {
            string url = hhlserver;
            url += "/airports?" + testuser + "&location_id=" + city_id + "";
            var response = HttpUtil.Get(url);
            if (response != null)
            {
                return response;
            }
            else
            {
                return null;
            }
        }

        /// <summary>
        /// 接送地址查询自动补全
        /// </summary>
        public static string getAirbookingsAddrs(string airport_code, string query)
        {
            string url = hhlserver;
            url += "/air_bookings/addrs?" + testuser + "&airport_code=" + airport_code + "&query=" + query + "";
            var response = HttpUtil.Get(url);
            if (response != null)
            {
                return response;
            }
            else
            {
                return null;
            }
        }

        /// <summary>
        /// 获取接送机价格, carlist 将显示包含价格的全部车型信息.
        /// </summary>
        public static string getair_bookingsnew(string car_category_id, string pickup_airport_code, string pickup_flight, string pickup_time, string pickup_addr, int locationid)
        {
            var responseCarList = getCarsList(locationid);
            var resultCarList = JsonConvert.DeserializeObject<carListMod>(responseCarList);

            var response = "{\"list\": [";
            string strparam1 = "";
            string strparam2 = "";
            strparam2 += "&pickup_airport_code=" + pickup_airport_code + "";
            strparam2 += "&pickup_flight=" + pickup_flight + "";
            strparam2 += "&pickup_time=" + pickup_time + "";
            strparam2 += "&pickup_addr=" + pickup_addr + "";
            string[] car_category_idArray = car_category_id.Split('|');
            for (int i = 0; i < car_category_idArray.Length; i++)
            {
                string url = hhlserver;
                strparam1 = "&car_category_id=" + Convert.ToInt32(car_category_idArray[i]) + "";
                url += "/air_bookings/new?" + testuser + "" + strparam1 + "" + strparam2 + "";

                var response0 = HttpUtil.Get(url);
                var result = JsonConvert.DeserializeObject<carPriceListMod>(response0);
                result.carid = Convert.ToInt32(car_category_idArray[i]);
                response0 = new JavaScriptSerializer().Serialize(result);
                if (result.status == 0)
                {
                    for (int j = 0; j < resultCarList.car_categories.Length; j++)
                    {
                        if (resultCarList.car_categories[j].id == result.carid)
                        {
                            resultCarList.car_categories[j].total_price = result.total_price;
                            resultCarList.car_categories[j].pickup_price = result.pickup_price;
                            resultCarList.car_categories[j].drop_off_price = result.drop_off_price;
                            resultCarList.car_categories[j].driver_category_name = result.driver_category_name;
                            responseCarList = new JavaScriptSerializer().Serialize(resultCarList.car_categories[j]);
                            response += responseCarList + ",";
                        }
                    }
                }
            }
            response = response.Substring(0, response.Length - 1);
            response = response + "]}";
            if (response.IndexOf("[") == -1)
            {
                response = response.Replace("]", "null");
            }
            if (response != null)
            {
                return response;
            }
            else
            {
                return null;
            }
        }

        /// <summary>
        /// 创建接送机订单(拓谷)
        /// </summary>
        public static string createordertg(string json)
        {
            var pickupObject = JsonConvert.DeserializeObject<PlaceOrderRequest>(json);
            string url = adndoserver;
            var response = HttpUtil.Post(json, url, contentType: "application/json");
            if (response != null)
            {
                return response;
            }
            else
            {
                return null;
            }
        }

    }
}