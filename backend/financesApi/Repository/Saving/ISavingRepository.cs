

using backend.financesApi.Models;

namespace backend.financesApi.Repository;

public interface ISavingRepository
{
    public Task<IEnumerable<Saving>> GetSavingsAsync();
    public Task<Saving> GetSavingByIdAsync(Guid id);
    public Task<Saving> AddSavingAsync(Saving saving);
    public Task<Saving> EditSavingAsync(Guid id, Saving saving);
    public Task<bool> RemoveSavingAsync(Guid id);
}