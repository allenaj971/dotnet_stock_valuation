using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Models.Object
{
    [PrimaryKey(nameof(Id))]
    public class DDMValuationModel
    {
        [Key]
        public string Id { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        [Required]
        [ForeignKey("StockModel")]
        public string StockId { get; set; } = string.Empty;
        public StockModel? Stock { get; set; }
        public double? Dividend { get; set; }
        public float? RateReturn { get; set; }
        public float? Growth { get; set; }
    }
}