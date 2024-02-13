const CommentsTableTestHelper = require('../../../../tests/CommentsTableTestHelper');
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const NotFoundError = require('../../../Commons/exceptions/NotFoundError');
const AuthorizationError = require('../../../Commons/exceptions/AuthorizationError');
const AddComments = require('../../../Domains/comment/entities/AddComments');
const AddedComments = require('../../../Domains/comment/entities/AddedComments');
const CommentRepositoryPostgres = require('../CommentRepositoryPostgres');
const pool = require('../../database/postgres/pool');

describe('CommentssRepositoryPostgres', () => {
  afterEach(async () => {
    await CommentsTableTestHelper.cleanTable();
    await ThreadsTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('addComments function', () => {
    it('should persist add comment and return added comment correctly', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({ username: 'qwerty' });
      await ThreadsTableTestHelper.addThread({ title: 'Thread Title' });
      const addComments = new AddComments({
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        user: 'user-123',
        thread: 'thread-123',
      });
      const fakeIdGenerator = () => '123'; // stub!
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator);

      // Action
      const addedComment = await commentRepositoryPostgres.addComments(addComments);

      // Assert
      const comments = await CommentsTableTestHelper.findCommentsById('comment-123');
      expect(addedComment).toStrictEqual(new AddedComments({
        id: 'comment-123',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        user_id: 'user-123',
      }));
      expect(comments).toHaveLength(1);
    });
  });

  describe('deleteCommentById function', () => {
    it('should not throw NotFoundError if comment is exist', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({ username: 'qwerty' });
      await ThreadsTableTestHelper.addThread({ title: 'Thread Title' });
      await CommentsTableTestHelper.addComments({ user_id: 'user-123' });
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {});

      // Action
      await commentRepositoryPostgres.deleteCommentById('comment-123');
      const comment = await CommentsTableTestHelper.checkIsDeletedCommentById('comment-123');

      // Assert
      await expect(comment).toEqual(true);
    });

    it('should throw NotFoundError if comment is not exist', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({ username: 'qwerty' });
      await ThreadsTableTestHelper.addThread({ title: 'Thread Title' });
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {});

      // Action & Assert
      await expect(commentRepositoryPostgres.checkExistingCommentById('comment-123')).rejects.toThrowError(NotFoundError);
    });

    it('should throw AuthorizationError when comment is not owned by user', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({ username: 'qwerty' });
      await ThreadsTableTestHelper.addThread({ title: 'Thread Title' });
      await CommentsTableTestHelper.addComments({ user_id: 'user-123' });
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {});

      // Assert
      await expect(commentRepositoryPostgres.verifyCommentOwnerById('comment-123', 'user-234')).rejects.toThrowError(AuthorizationError);
    });
  });

  describe('verifyCommentOwnerById function', () => {
    it('should throw AuthorizationError if comment not belong to owner', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({ id: 'user-123', username: 'qwerty' });
      await UsersTableTestHelper.addUser({ id: 'user-234', username: 'poiwu' });
      await ThreadsTableTestHelper.addThread({ title: 'Thread Title' });
      await CommentsTableTestHelper.addComments({ user_id: 'user-123' });

      // Action
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {});

      // Assert
      await expect(commentRepositoryPostgres.verifyCommentOwnerById('comment-123', 'user-234'))
        .rejects.toThrow(AuthorizationError);
    });

    it('should not throw AuthorizationError if comment belong to owner', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({ id: 'user-123' });
      await ThreadsTableTestHelper.addThread({ title: 'Thread Title' });
      await CommentsTableTestHelper.addComments({ user_id: 'user-123' });

      // Action
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {});

      // Assert
      await expect(commentRepositoryPostgres.verifyCommentOwnerById('comment-123', 'user-123'))
        .resolves.not.toThrow(AuthorizationError);
    });
  });

  describe('getDetailCommentById function', () => {
    it('should get comments of thread', async () => {
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {});

      await UsersTableTestHelper.addUser({ id: 'user-123' });
      await ThreadsTableTestHelper.addThread({ id: 'thread-123' });
      await CommentsTableTestHelper.addComments({ id: 'comment-123' });

      const comments = await commentRepositoryPostgres.getDetailCommentById('thread-123');

      expect(Array.isArray(comments)).toBe(true);
      expect(comments[0].id).toEqual('comment-123');
      expect(comments[0].username).toEqual('dicoding');
      expect(comments[0].body).toEqual('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.');
      expect(comments[0].date).toBeDefined();
      expect(comments[0].is_delete).toEqual(false);
    });
  });

  describe('checkExistingCommentById function', () => {
    it('should throw NotFoundError if comment not available', async () => {
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {});
      const id = 'comment-';

      await expect(commentRepositoryPostgres.checkExistingCommentById(id))
        .rejects.toThrow(NotFoundError);
    });

    it('should not throw NotFoundError if comment available', async () => {
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {});
      await UsersTableTestHelper.addUser({ id: 'user-123' });
      await ThreadsTableTestHelper.addThread({ id: 'thread-123' });
      await CommentsTableTestHelper.addComments({ id: 'comment-123' });

      await expect(commentRepositoryPostgres.checkExistingCommentById('comment-123'))
        .resolves.not.toThrow(NotFoundError);
    });
  });
});
