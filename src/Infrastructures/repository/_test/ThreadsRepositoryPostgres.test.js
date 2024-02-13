const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const NotFoundError = require('../../../Commons/exceptions/NotFoundError');
const AddThreads = require('../../../Domains/threads/entities/AddThreads');
const AddedThreads = require('../../../Domains/threads/entities/AddedThreads');
const pool = require('../../database/postgres/pool');
const ThreadsRepositoryPostgres = require('../ThreadsRepositoryPostgres');

describe('ThreadsRepositoryPostgres', () => {
  afterEach(async () => {
    await ThreadsTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('addThread function', () => {
    it('should persist add thread and return added thread correctly', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({ username: 'qwerty' });
      const addThreads = new AddThreads({
        title: 'Thread Title',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        user: 'user-123',
      });
      const fakeIdGenerator = () => '123'; // stub!
      const threadsRepositoryPostgres = new ThreadsRepositoryPostgres(pool, fakeIdGenerator);

      // Action
      await threadsRepositoryPostgres.addThread(addThreads);

      // Assert
      const threads = await ThreadsTableTestHelper.findThreadsById('thread-123');
      expect(threads).toHaveLength(1);
    });

    it('should return added thread correctly', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({ username: 'qwerty' });
      const addThreads = new AddThreads({
        title: 'Thread Title',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        user: 'user-123',
      });
      const fakeIdGenerator = () => '123'; // stub!
      const threadsRepositoryPostgres = new ThreadsRepositoryPostgres(pool, fakeIdGenerator);

      // Action
      const addedThreads = await threadsRepositoryPostgres.addThread(addThreads);

      // Assert
      expect(addedThreads).toStrictEqual(new AddedThreads({
        id: 'thread-123',
        title: 'Thread Title',
        user_id: 'user-123',
      }));
    });
  });

  describe('checkExistingThreadById function', () => {
    it('should throw NotFoundError if thread is not exist', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({ username: 'qwerty' });
      const threadsRepositoryPostgres = new ThreadsRepositoryPostgres(pool, {});

      // Action & Assert
      await expect(threadsRepositoryPostgres.checkExistingThreadById('thread-123')).rejects.toThrow(NotFoundError);
    });
    it('should not throw NotFoundError if thread exist', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({ username: 'qwerty' });
      await ThreadsTableTestHelper.addThread({ title: 'Thread Title' });
      const threadsRepositoryPostgres = new ThreadsRepositoryPostgres(pool, {});

      // Action & Assert
      await expect(threadsRepositoryPostgres.checkExistingThreadById('thread-123')).resolves.not.toThrow(NotFoundError);
    });
  });

  describe('getDetailThreadById function', () => {
    it('should return detail thread correctly', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({ username: 'qwerty' });
      await ThreadsTableTestHelper.addThread({ title: 'Thread Title' });
      const threadsRepositoryPostgres = new ThreadsRepositoryPostgres(pool, {});

      // Action
      const detailThreads = await threadsRepositoryPostgres.getDetailThreadById('thread-123');

      // Assert
      expect(detailThreads).toEqual({
        id: 'thread-123',
        title: 'Thread Title',
        date: expect.anything(),
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        username: 'qwerty',
      });
    });
  });
});
