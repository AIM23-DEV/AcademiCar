namespace Services.ModelState
{
    public interface IModelStateWrapper
    {
        Dictionary<string, string> Errors { get; }
        bool IsValid { get; }

        void AddError(string key, string errorMessage);
    }
}

