using Models.Object;
using Models.Dtos.DDMValuationModelDto;
using Models.Dtos.Stock;
using Microsoft.EntityFrameworkCore;

namespace Models.Dtos.Converters
{
    public static class DDMValuationModelConverters
    {
        public static DDMValuationModel ToDDMFromCreateDDM(this CreateDDMValuationModelDto csd)
        {
            return new DDMValuationModel
            {
                Id = Guid.NewGuid().ToString(),
                Name = csd.Name,
                StockId = csd.StockId,
                Dividend = csd.Dividend,
                RateReturn = csd.RateReturn,
                Growth = csd.Growth,
            };
        }

        public static DDMValuationModel ToDDMFromUpdateDDM(this UpdateDDMValuationModelDto usd)
        {
            return new DDMValuationModel
            {
                Name = usd.Name,
                Dividend = usd.Dividend,
                RateReturn = usd.RateReturn,
                Growth = usd.Growth
            };
        }
    }
}