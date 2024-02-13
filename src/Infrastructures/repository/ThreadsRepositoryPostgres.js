const InvariantError = require('../../Commons/exceptions/InvariantError');
const NotFoundError = require('../../Commons/exceptions/NotFoundError');
const ThreadsRepository = require('../../Domains/threads/ThreadsRepository');
const AddedThread = require('../../Domains/threads/entities/AddedThreads');

class ThreadsRepositoryPostgres extends ThreadsRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async addThread({ title, body, user }) {
    const id = `thread-${this._idGenerator()}`;
    const query = {
      text: 'INSERT INTO threads (id, title, body, user_id) VALUES($1, $2, $3, $4) RETURNING id, title, user_id',
      values: [id, title, body, user],
    };

    const { rows } = await this._pool.query(query);

    return new AddedThread({ ...rows[0] });
  }

  async checkExistingThreadById(id) {
    const query = {
      text: 'SELECT * FROM threads WHERE id = $1',
      values: [id],
    };

    const { rows } = await this._pool.query(query);

    if (rows.length === 0) {
      throw new NotFoundError(`thread dengan id: ${id}`);
    }
  }

  async getDetailThreadById(id) {
    const query = {
      text: 'SELECT threads.id, title, body, date, username FROM threads LEFT JOIN users ON users.id = threads.user_id WHERE threads.id = $1',
      values: [id],
    };

    const { rows } = await this._pool.query(query);

    return rows[0];
  }
}

module.exports = ThreadsRepositoryPostgres;
