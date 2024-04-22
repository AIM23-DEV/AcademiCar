﻿using AcademiCar.Server.DAL.UnitOfWork;
using AcademiCar.Server.Services.ServiceImpl;

namespace AcademiCar.Server
{
    public class GlobalService : IGlobalService
    {
        public IUnitOfWork UnitOfWork { get; set; }

        public UserService UserService { get; set; }


        public GlobalService(IUnitOfWork uow)
        {
            UnitOfWork = uow;

            UserService = new UserService(UnitOfWork, UnitOfWork.Users, this);
        }
    }
}
