using backend.financesApi.DTOs;
using backend.financesApi.Models;

namespace backend.financesApi.Services;

public interface ISavingService
{
    public Task<IEnumerable<SavingResponseDTO>> GetSavingsAsync();
    public Task<SavingResponseDTO> GetSavingByIdAsync(Guid id);
    public Task<IEnumerable<SavingResponseDTO>> GetSavingByUserIdAsync(Guid id);
    public Task<SavingResponseDTO> AddSavingAsync(AddSavingDTO addSavingDTO);
    public Task<SavingResponseDTO> EditSavingAsync(Guid id, EditSavingDTO editSavingDTO);
    public Task RemoveSavingAsync(Guid id);
}