const InvariantError = require('../../Commons/exceptions/InvariantError');
const NotFoundError = require('../../Commons/exceptions/NotFoundError');
const CommentsRepository = require('../../Domains/comment/CommentsRepository');
const AddedComment = require('../../Domains/comment/entities/AddedComments');
const AuthorizationError = require('../../Commons/exceptions/AuthorizationError');

class CommentRepositoryPostgres extends CommentsRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async addComments({ content, user, thread }) {
    const id = `comment-${this._idGenerator()}`;

    const query = {
      text: 'INSERT INTO thread_comments (id, body, user_id, thread_id) VALUES($1, $2, $3, $4) RETURNING id, body, user_id',
      values: [id, content, user, thread],
    };

    const { rows } = await this._pool.query(query);

    return new AddedComment({ ...rows[0] });
  }

  async deleteCommentById(id) {
    const query = {
      text: 'UPDATE thread_comments SET is_delete = TRUE WHERE id = $1',
      values: [id],
    };

    await this._pool.query(query);
  }

  async verifyCommentOwnerById(id, user) {
    const query = {
      text: 'SELECT * FROM thread_comments WHERE id = $1',
      values: [id],
    };

    const { rows } = await this._pool.query(query);

    const comment = rows[0];

    if (comment.user_id !== user) {
      throw new AuthorizationError('anda tidak memiliki akses menghapus comment');
    }
  }

  async getDetailCommentById(id) {
    const query = {
      text: 'SELECT thread_comments.id, users.username, thread_comments.date, thread_comments.body, thread_comments.is_delete FROM thread_comments LEFT JOIN users ON users.id = thread_comments.user_id WHERE thread_id = $1 ORDER BY thread_comments.date',
      values: [id],
    };

    const { rows } = await this._pool.query(query);
    return rows;
  }

  async checkExistingCommentById(id) {
    const query = {
      text: 'SELECT * FROM thread_comments WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (result.rowCount === 0) {
      throw new NotFoundError('comment tidak ditemukan');
    }
  }
}

module.exports = CommentRepositoryPostgres;
