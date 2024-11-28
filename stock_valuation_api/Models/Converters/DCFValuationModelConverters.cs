using Models.Object;
using Models.Dtos.DCFValuationModelDto;
using Models.Dtos.Stock;
using Microsoft.EntityFrameworkCore;

namespace Models.Dtos.Converters
{
    public static class DCFValuationModelConverters
    {
        public static DCFValuationModel ToDCFFromCreateDCF(this CreateDCFValuationModelDto csd)
        {
            return new DCFValuationModel
            {
                Id = Guid.NewGuid().ToString(),
                StockId = csd.StockId,
                Name = csd.Name,
                Cashflows = csd.Cashflows,
                RateReturn = csd.RateReturn,
                Growth = csd.Growth,
                Years = csd.Years
            };
        }

        public static DCFValuationModel ToDCFFromUpdateDCF(this UpdateDCFValuationModelDto usd)
        {
            return new DCFValuationModel
            {
                Name = usd.Name,
                Cashflows = usd.Cashflows,
                RateReturn = usd.RateReturn,
                Growth = usd.Growth,
                Years = usd.Years
            };
        }
    }
}