using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models.Dtos.DDMValuationModelDto
{
    public class FindAllDDMByStockDto
    {
        public string StockId { get; set; } = string.Empty;
        public string DDMId { get; set; } = string.Empty;
    }
}