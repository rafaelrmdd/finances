using backend.financesApi.DTOs;
using backend.financesApi.Models;

namespace backend.financesApi.Services;

public interface ISavingService
{
    public Task<IEnumerable<Saving>> GetSavingsAsync();
    public Task<SavingResponseDTO> GetSavingByIdAsync(Guid SavingId);
    public Task<SavingResponseDTO> AddSavingAsync(AddSavingDTO addSavingDTO);
    public Task<SavingResponseDTO> EditSavingAsync(EditSavingDTO editSavingDTO);
    public Task RemoveSavingAsync(Guid id);
}