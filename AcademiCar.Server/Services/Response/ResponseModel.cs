namespace AcademiCar.Server.Services.Response
{
    public class ResponseModel
    {
        public Dictionary<string, string> ErrorMessages { get; set; } = [];
        public Dictionary<string, string> WarningMessages { get; set; } = [];

        public bool HasError => ErrorMessages?.Count > 0;
        public bool HasWarning => WarningMessages?.Count > 0;


        public static ResponseModel CreateResponseError(string errormessage)
        {
            ResponseModel resp = new ResponseModel();
            resp.ErrorMessages.Add("Error", errormessage);

            return resp;
        }

        public static ResponseModel CreateResponseError(string errormessage, string errorkey)
        {
            ResponseModel resp = new ResponseModel();
            resp.ErrorMessages.Add(errorkey, errormessage);

            return resp;
        }


        public void AddWarningMessageRange(Dictionary<string, string> input)
        {
            foreach (KeyValuePair<string, string> inp in input)
            {
                if (WarningMessages.ContainsKey(inp.Key) == false)
                {
                    WarningMessages.Add(inp.Key, inp.Value);
                }
            }
        }

        public void AddErrorMessageRange(Dictionary<string, string> input)
        {
            foreach (KeyValuePair<string, string> inp in input)
            {
                if (ErrorMessages.ContainsKey(inp.Key) == false)
                {
                    ErrorMessages.Add(inp.Key, inp.Value);
                }
            }
        }
    }
}