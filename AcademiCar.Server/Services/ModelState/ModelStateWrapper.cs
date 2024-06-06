using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace Services.ModelState
{
    public class ModelStateWrapper : IModelStateWrapper
    {
        public bool IsValid => _modelState.IsValid;
        public Dictionary<string, string> Errors => GetErrorsFromModelState();


        private ModelStateDictionary _modelState;


        public ModelStateWrapper(ModelStateDictionary modelState)
        {
            _modelState = modelState;
            Clear();
        }


        public void AddError(string key, string errorMessage)
        {
            _modelState.AddModelError(key, errorMessage);
        }

        public void Clear()
        {
            _modelState.Clear();
        }


        private Dictionary<string, string> GetErrorsFromModelState()
        {
            Dictionary<string, string> errors = [];
            foreach (KeyValuePair<string, ModelStateEntry> err in _modelState)
            {
                ModelStateEntry modelStateEntry = err.Value;
                string errormessage = "";
                ModelErrorCollection coll = modelStateEntry.Errors;

                foreach (ModelError error in coll)
                {
                    errormessage += error.ErrorMessage;
                }

                errors.Add(err.Key, errormessage);
            }

            return errors;
        }
    }
}
