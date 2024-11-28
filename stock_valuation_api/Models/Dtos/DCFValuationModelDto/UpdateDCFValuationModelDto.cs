using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models.Dtos.DCFValuationModelDto
{
    public class UpdateDCFValuationModelDto
    {
        public string Name { get; set; } = string.Empty;
        public List<double> Cashflows { get; set; } = new List<double>();
        public float? RateReturn { get; set; }
        public float? Growth { get; set; }
        public int? Years { get; set; }
    }
}