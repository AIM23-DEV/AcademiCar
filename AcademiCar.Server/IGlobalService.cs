﻿using AcademiCar.Server.DAL.UnitOfWork;
using AcademiCar.Server.Services.ServiceImpl;

namespace AcademiCar.Server
{
    public interface IGlobalService
    {
        public IUnitOfWork UnitOfWork { get; set; }

        public UserService UserService { get; set; }
    }
}
