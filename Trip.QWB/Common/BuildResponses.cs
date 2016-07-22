using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using Trip.Core;
using Trip.QWB.Model;

namespace Trip.QWB.Common
{
    public class BuildResponses
    {
        private static string hhlserver = System.Configuration.ConfigurationManager.AppSettings["hhlserver"];
        private static string adndoserver = System.Configuration.ConfigurationManager.AppSettings["adndoserver"];
        private static string testuser = System.Configuration.ConfigurationManager.AppSettings["testuser"];

        public static string buildCarlistResponse(string car_category_id, int locationid, string strparam2, string geturl)
        {
            var responseCarList = qwbApi.getCarsList(locationid);
            var resultCarList = JsonConvert.DeserializeObject<carListMod>(responseCarList);

            var response = "{\"list\": [";
            string strparam1 = "";
            string[] car_category_idArray = car_category_id.Split('|');
            for (int i = 0; i < car_category_idArray.Length; i++)
            {
                string url = hhlserver;
                strparam1 = "&car_category_id=" + Convert.ToInt32(car_category_idArray[i]) + "";
                url += "" + geturl + "?" + testuser + "" + strparam1 + "" + strparam2 + "";

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
                            if (result.total_price > 0)
                            {
                                resultCarList.car_categories[j].pickup_pricearr = new decimal?[2];
                                resultCarList.car_categories[j].pickup_pricearr[0] = Math.Ceiling(Convert.ToDecimal(result.total_price) * Convert.ToDecimal(1.09));
                                resultCarList.car_categories[j].pickup_pricearr[1] = Math.Ceiling(Convert.ToDecimal(result.total_price) * Convert.ToDecimal(1.161));
                            }
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
            return response;
        }
    }
}