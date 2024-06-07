using AcademiCar.Server.DAL.Entities;
using AcademiCar.Server.Tests.BaseClasses;
using NUnit.Framework;

namespace AcademiCar.Server.Tests.DAL
{
    public class PostgresRepositoryTest : BaseUnitTest
    {
        const string TEST_EMAIL = "postgre@repo.test";


        public override async Task Setup()
        {
            await base.Setup();

            await _unitOfWork.Users.InsertAsync(new User() { Email = TEST_EMAIL });
        }
        public override async Task TearDown()
        {
            await base.TearDown();

            await _unitOfWork.Users.DeleteAsync(u => u.Email == TEST_EMAIL);
        }


        [Test]
        [TestCase(ExpectedResult = true)]
        public bool TestFilterBy()
        {
            try
            {
                if (!_unitOfWork.Users.FilterBy(u => u.Email == TEST_EMAIL).Any()
                || !_unitOfWork.Users.FilterBy(u => u.Email == TEST_EMAIL, a => (object)a).Any())
                    throw new Exception("FilterBy Error!");

                return true;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return false;
            }
        }

        [Test]
        [TestCase(ExpectedResult = true)]
        public async Task<bool> TestFind()
        {
            try
            {
                User testUser = await _GetUserByEmail(TEST_EMAIL);
                if (testUser.Email != TEST_EMAIL) throw new Exception("FindAsync Error!");

                User idTestUser = await _unitOfWork.Users.FindByIdAsync(((IEntity)testUser).ID);
                if (idTestUser.Email != TEST_EMAIL) throw new Exception("FindById Error!");

                return true;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return false;
            }
        }

        [Test]
        [TestCase(ExpectedResult = true)]
        public async Task<bool> TestCRUD()
        {
            try
            {
                int initialUserCount = _GetCurrentUserCount();

                await _unitOfWork.Users.InsertAsync(new User() { Email = "insert@crud.test" });
                await _unitOfWork.Users.InsertAsync(new User() { Email = "delete@crud.test" });
                
                if (!(_GetCurrentUserCount() == initialUserCount + 2))
                    throw new Exception("InsertAsync Error!");

                User insertedUser = await _GetUserByEmail("insert@crud.test");
                if (insertedUser.Email != "insert@crud.test")
                    throw new Exception("FindAsync Error!");

                insertedUser.Email = "update@crud.test";
                await _unitOfWork.Users.UpdateAsync(insertedUser);
                User updatedUser = await _GetUserByEmail("update@crud.test");
                if (((IEntity)updatedUser).ID != ((IEntity)insertedUser).ID)
                    throw new Exception("UpdateAsync Error!");

                await _unitOfWork.Users.DeleteAsync(u => u.Email == "delete@crud.test");
                if (!(_GetCurrentUserCount() == initialUserCount + 1))
                    throw new Exception("DeleteAsync Error!");

                await _unitOfWork.Users.DeleteByIdAsync(((IEntity)insertedUser).ID);
                if (!(_GetCurrentUserCount() == initialUserCount))
                    throw new Exception("DeleteById Error!");

                return true;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return false;
            }
        }

        private async Task<User> _GetUserByEmail(string email)
            => await _unitOfWork.Users.FindAsync(u => u.Email == email);
        private int _GetCurrentUserCount()
            => _unitOfWork.Users.FilterBy(u => u.Email.Contains("@crud.test")).Count();
    }
}
