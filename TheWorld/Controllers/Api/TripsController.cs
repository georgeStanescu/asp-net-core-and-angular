using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using TheWorld.Models;
using TheWorld.ViewModels;
using System.Collections.Generic;
using System;

namespace TheWorld.Controllers.Api
{
    [Route("api/trips")]
    public class TripsController : Controller
    {
        private IWorldRepository _repository;

        public TripsController(IWorldRepository repository)
        {
            _repository = repository;
        }

        [HttpGet("")]
        public IActionResult Get()
        {
            try
            {
                var results = _repository.GetAllTrips();

                return Ok(Mapper.Map<IEnumerable<TripViewModel>>(results));
            }
            catch (Exception ex)
            {
                return BadRequest("Error occured");
            }
        }

        [HttpPost("")]
        public IActionResult Post([FromBody]TripViewModel newTrip)
        {
            if (ModelState.IsValid)
            {
                var model = Mapper.Map<Trip>(newTrip);

                return Created($"api/trips/{newTrip.Name}", Mapper.Map<TripViewModel>(model));
            }

            return BadRequest(ModelState);
        }
    }
}
