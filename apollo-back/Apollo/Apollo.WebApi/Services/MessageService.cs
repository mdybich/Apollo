using Apollo.WebApi.Models;
using Apollo.WebApi.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Apollo.WebApi.Services
{
    public class MessageService : BaseService
    {
        public IEnumerable<MessageViewModel> GetMessages(string userId)
        {
            var messages =
                _db.Messages
                .Where(m => m.ReceiverUserId == userId)
                .OrderByDescending(m => m.SendingDate)
                .ToList()
                .Select(m => new MessageViewModel()
                {
                    Id = m.Id,
                    Topic = m.Topic,
                    Content = m.Content,
                    SenderUser = $"{m.SenderUser.FirstName} {m.SenderUser.LastName}",
                    SendingDate = m.SendingDate.ToShortDateString()
                });

            return messages;
        }

        public void SendMessage(NewMessageViewModel message)
        {
            var messageToDb = new Message()
            {
                Topic = message.Topic,
                Content = message.Content,
                SenderUserId = message.SenderId,
                ReceiverUserId = message.ReceiverId,
                SendingDate = DateTime.Now
            };

            _db.Messages.Add(messageToDb);

            _db.SaveChanges();
        }

        public IEnumerable<ReceiverViewModel> GetReceivers(string userId)
        {
            var receivers =
                _db.Users
                .Where(u => u.Id != userId)
                .ToList()
                .Select(u => new ReceiverViewModel()
                {
                    Id = u.Id,
                    Name = $"{u.FirstName} {u.LastName}"
                });

            return receivers;
        }
    }
}