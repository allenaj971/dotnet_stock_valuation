using Microsoft.AspNetCore.Mvc;
using Models.Object;
using Models.Dtos.Converters;
using Models.Dtos.DDMValuationModelDto;
using Microsoft.EntityFrameworkCore;

namespace Controllers
{
    [Route("api/ddm")]
    [ApiController]
    public class DDMValuationModelController : ControllerBase
    {
        private readonly AppDbContext dbContext;

        public DDMValuationModelController(AppDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
        [HttpGet("{DDMId}")]
        public IActionResult getDDMByDDMId([FromRoute] string DDMId)
        {
            var res = dbContext.DDMValuationModels.FirstOrDefault(x => x.Id == DDMId);
            if (res != null)
            {
                return Ok(res);
            }
            return NotFound();
        }

        [HttpGet]
        public IActionResult getDDMbyStockId([FromQuery(Name = "StockId")] string StockId)
        {
            var res = dbContext.Stocks.Where(x => x.Id == StockId).Join(dbContext.DDMValuationModels, stock => stock.Id, DDM => DDM.StockId, (stock, model) => new
            {
                CompanyName = stock.Name,
                ModelName = model.Name,
                ModelId = model.Id,
                Dividend = model.Dividend,
                RateReturn = model.RateReturn,
                Growth = model.Growth
            });
            if (res != null) return Ok(res);
            return NotFound();
        }

        [HttpPost]
        public IActionResult newDDM(CreateDDMValuationModelDto csd)
        {
            DDMValuationModel sm = csd.ToDDMFromCreateDDM();
            dbContext.DDMValuationModels.Add(sm);
            dbContext.SaveChanges();
            return Ok(sm);

        }
        [HttpPut("{id}")]
        public IActionResult updateDDM([FromRoute] string id, UpdateDDMValuationModelDto usd)
        {
            DDMValuationModel sm = usd.ToDDMFromUpdateDDM();
            var res = dbContext.DDMValuationModels.FirstOrDefault(x => x.Id == id);
            if (res != null)
            {
                res.Dividend = sm.Dividend == null ? res.Dividend : sm.Dividend;
                res.RateReturn = sm.RateReturn == null ? res.RateReturn : sm.RateReturn;
                res.Growth = sm.Growth == null ? res.Growth : sm.Growth;
                res.Name = sm.Name == null ? res.Name : sm.Name;
                dbContext.SaveChanges();
                return Ok();
            }
            return NotFound("id not found");
        }
        [HttpDelete("{id}")]
        public IActionResult removeDDM([FromRoute] string id)
        {
            var res = dbContext.DDMValuationModels.FirstOrDefault(x => x.Id == id);
            if (res != null)
            {
                dbContext.DDMValuationModels.Remove(res);
                dbContext.SaveChanges();
                return Ok();
            }
            return NotFound("id not found");
        }
    }
}