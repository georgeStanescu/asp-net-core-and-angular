using System.Collections.Generic;
using System.Threading.Tasks;

namespace TheWorld.Models
{
    public interface IWorldRepository
    {
        IEnumerable<Trip> GetAllTrips();
        IEnumerable<Trip> GetTripsByUsername(string name);

        void AddTrip(Trip trip);
        void AddStop(string tripName, Stop newStop, string username);

        Task<bool> SaveChangesAsync();

        Trip GetTripsByName(string tripName);
        Trip GetUserTripByName(string tripName, string username);
    }
}