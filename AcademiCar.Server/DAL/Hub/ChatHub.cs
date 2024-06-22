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
        
        public async Task SendPersonalMessage(string user, string message, string chatId)
        {
            User? usr = await _globalService.UserService.Get(user);
            
            if (usr != null)
            {
                var chatMessage = new PersonalMessage
                {
                    FK_SenderUser = user,
                    FK_PersonalChat = int.Parse(chatId), 
                    Content = message,
                    SentAt = DateTime.UtcNow,
                };
                await _globalService.PersonalMessageService.Create(chatMessage);
            }
            
            await Clients.All.SendAsync("ReceiveMessage", user, message, chatId);
        }
        
        public async Task SendGroupMessage(string user, string message, string chatId)
        {
            User? usr = await _globalService.UserService.Get(user);
            
            Console.WriteLine("Drin");
            
            if (usr != null)
            {
                var chatMessage = new GroupMessage
                {
                    FK_SenderUser = user,
                    FK_GroupChat = int.Parse(chatId), 
                    Content = message,
                    SentAt = DateTime.UtcNow,
                };
                await _globalService.GroupMessageService.Create(chatMessage);
            }
            
            await Clients.All.SendAsync("ReceiveMessage", user, message, chatId);
        }
    }
}
