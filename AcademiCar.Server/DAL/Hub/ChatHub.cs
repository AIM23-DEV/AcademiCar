using AcademiCar.Server.DAL.Entities;
using Microsoft.AspNetCore.SignalR;

namespace AcademiCar.Server.DAL.Hub
{
    public class ChatHub : Microsoft.AspNetCore.SignalR.Hub
    {
        private readonly IGlobalService _globalService;
        
        public ChatHub(IGlobalService globals)
        {
            _globalService = globals;
        }
        
        public async Task SendMessage(string userId, int chatId, string message)
        {
            User? usr = await _globalService.UserService.Get(userId);

            if (usr != null)
            {
                var chatMessage = new PersonalMessage
                {
                    FK_SenderUser = userId,
                    FK_PersonalChat = chatId, 
                    Content = message,
                    SentAt = DateTime.Now,
                };
                
                await _globalService.PersonalMessageService.Create(chatMessage);

                await Clients.All.SendAsync("ReceiveMessage", userId, message);
            }
        }
        
        
    }
}
