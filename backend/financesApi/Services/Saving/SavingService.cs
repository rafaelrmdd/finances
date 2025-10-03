using System.ComponentModel.DataAnnotations;
using AutoMapper;
using backend.financesApi.DTOs;
using backend.financesApi.Enums;
using backend.financesApi.Models;
using backend.financesApi.Repository;


namespace backend.financesApi.Services;

public class SavingService : ISavingService
{
    private readonly ISavingRepository _repository;
    private readonly IMapper _mapper;

    public SavingService(ISavingRepository repository, IMapper mapper)
    {
        _repository = repository;
        _mapper = mapper;
    }

    public async Task<IEnumerable<SavingResponseDTO>> GetSavingsAsync()
    {
        var savings = await _repository.GetSavingsAsync();

        if (savings == null || !savings.Any())
        {
            return new List<SavingResponseDTO>();
        }

        return _mapper.Map<IEnumerable<SavingResponseDTO>>(savings);
    }

    public async Task<SavingResponseDTO> GetSavingByIdAsync(Guid id)
    {
        var saving = await _repository.GetSavingByIdAsync(id);

        if (saving == null)
        {
            throw new ValidationException($"Saving with id: {id} was not found.");
        }

        return _mapper.Map<SavingResponseDTO>(saving);
    }

    public async Task<IEnumerable<SavingResponseDTO>> GetSavingByUserIdAsync(Guid id)
    {
        var savings = await _repository.GetSavingByUserIdAsync(id);

        if (savings == null)
        {
            throw new ValidationException($"No saving with userid: {id} was found.");
        }

        return _mapper.Map<IEnumerable<SavingResponseDTO>>(savings);
    }

    public async Task<SavingResponseDTO> AddSavingAsync(AddSavingDTO addSavingDTO)
    {
        if (string.IsNullOrEmpty(addSavingDTO.Name))
        {
            throw new InvalidDataException("Field 'name' cannot be empty.");
        }

        if (string.IsNullOrEmpty(addSavingDTO.TargetAmount))
        {
            throw new InvalidDataException("Field 'target amount' cannot be empty.");
        }

        Saving Saving = _mapper.Map<Saving>(addSavingDTO);

        var SavingEntity = await _repository.AddSavingAsync(Saving);

        return _mapper.Map<SavingResponseDTO>(SavingEntity);
    }

    public async Task<SavingResponseDTO> EditSavingAsync(Guid id, EditSavingDTO editSavingDTO)
    {
        if (string.IsNullOrEmpty(editSavingDTO.Name))
        {
            throw new InvalidDataException("Field 'name' cannot be empty.");
        }

        if (string.IsNullOrEmpty(editSavingDTO.TargetAmount))
        {
            throw new InvalidDataException("Field 'target amount' cannot be empty.");
        }

        if (string.IsNullOrEmpty(editSavingDTO.Category))
        {
            throw new InvalidDataException("Field 'category' cannot be empty.");
        }

        // if (string.IsNullOrEmpty(editSavingDTO.TargetDate))
        // {
        //     throw new InvalidDataException("Field 'targetDate' cannot be empty.");
        // }

        Saving saving = _mapper.Map<Saving>(editSavingDTO);

        var entity = await _repository.EditSavingAsync(id, saving);

        return _mapper.Map<SavingResponseDTO>(entity);
    }

    public async Task RemoveSavingAsync(Guid id)
    {
        var wasRemoved = await _repository.RemoveSavingAsync(id);

        if (!wasRemoved)
        {
            throw new ValidationException($"Saving with id: {id} was not removed.");
        }
    }
}