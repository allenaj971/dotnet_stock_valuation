using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models.Dtos.DDMValuationModelDto
{
    public class CreateDDMValuationModelDto
    {
        [Key]
        public string Id { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        [Required]
        [ForeignKey("StockModel")]
        public string StockId { get; set; } = string.Empty;
        public double Dividend { get; set; }
        public float RateReturn { get; set; }
        public float Growth { get; set; }
    }
}