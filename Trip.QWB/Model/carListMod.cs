using System;

namespace Trip.QWB.Model
{
    /// <summary>
    /// carPriceListMod:实体类(属性说明自动提取数据库字段的描述信息)
    /// 这是我一起存入并要前台展示的类,由 carPriceListMod 提供价格信息.
    /// </summary>
    [Serializable]
    public class carListMod
    {
        public carListMod()
        { }
        #region Model
        /// <summary>
        /// 状态码
        /// </summary>
        public int status
        { set; get; }
        /// <summary>
        /// 车型类型
        /// </summary>
        public car_categories[] car_categories
        { set; get; }
        #endregion Model

    }
}