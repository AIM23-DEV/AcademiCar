using AcademiCar.Server.DAL.UnitOfWork;
using NUnit.Framework;

namespace AcademiCar.Server.Tests.BaseClasses
{
    [TestFixture]
    public class BaseUnitTest
    {
        protected ServiceCollection _services;
        protected ServiceProvider _serviceProvider;

        protected IUnitOfWork _unitOfWork;


        [SetUp]
        public virtual async Task Setup()
        {
            _services = new ServiceCollection();
            _CollectServices();
            _serviceProvider = _services.BuildServiceProvider();

            _unitOfWork = _serviceProvider.GetRequiredService<IUnitOfWork>();
        }

        [TearDown]
        public virtual async Task TearDown()
        {
            _serviceProvider.Dispose();
        }


        protected virtual void _CollectServices()
        {
            _services.AddSingleton<IUnitOfWork, UnitOfWork>();
        }
    }
}
