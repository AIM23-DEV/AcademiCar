using AcademiCar.Server.DAL.Entities;
using AcademiCar.Server.Tests.BaseClasses;
using NUnit.Framework;

namespace AcademiCar.Server.Tests.DAL
{
    public class UserRepositoryTest : BaseUnitTest
    {
        [Test]
        [TestCase(ExpectedResult = true)]
        public bool TestFilterBy()
        {
            try
            {
                if (!_unitOfWork.Users.FilterBy(u => u.Email == "postgre@repo.test").Any())
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
                User testUser = await _GetUserByEmail("postgre@repo.test");
                if (testUser?.Email != "postgre@repo.test")
                    throw new Exception("FindAsync Error!");

                string testId = testUser.Id;
                User compareUser = await _unitOfWork.Users.FindByIdAsync(testId);
                if (compareUser?.Id != "-999")
                    throw new Exception("FindById Error!");

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

                await _unitOfWork.Users.InsertAsync(new User()
                {
                    Id = "-998",
                    Email = "Insert@repo.test",
                    FirstName = "testFirstName",
                    LastName = "testLastName",
                    FK_Stats = -999
                });
                await _unitOfWork.Users.InsertAsync(new User()
                {
                    Id = "-997",
                    Email = "Delete@repo.test",
                    FirstName = "testFirstName",
                    LastName = "testLastName",
                    FK_Stats = -999
                });
                
                if (!(_GetCurrentUserCount() == initialUserCount + 2))
                    throw new Exception("InsertAsync Error!");

                User insertedUser = await _GetUserByEmail("Insert@repo.test");
                if (insertedUser.Email != "Insert@repo.test")
                    throw new Exception("FindAsync Error!");

                insertedUser.Email = "Update@repo.test";
                await _unitOfWork.Users.UpdateAsync(insertedUser);
                User updatedUser = await _GetUserByEmail("Update@repo.test");
                if (updatedUser?.Id != insertedUser.Id)
                    throw new Exception("UpdateAsync Error!");

                await _unitOfWork.Users.DeleteAsync(u => u.Email == "Delete@repo.test");
                if (!(_GetCurrentUserCount() == initialUserCount + 1))
                    throw new Exception("DeleteAsync Error!");

                await _unitOfWork.Users.DeleteByIdAsync(insertedUser.Id);
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

        private async Task<User?> _GetUserByEmail(string email)
            => await _unitOfWork.Users.FindAsync(u => u.Email == email);
        private int _GetCurrentUserCount()
            => _unitOfWork.Users.FilterBy(u => true).Count();
    }
    

}
