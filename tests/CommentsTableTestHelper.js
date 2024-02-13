/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const CommentsTableTestHelper = {
  async addComments({
    id = 'comment-123',
    content = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    user_id = 'user-123',
    thread_id = 'thread-123',
    is_delete = false,
  }) {
    const query = {
      text: 'INSERT INTO thread_comments (id, body, date, user_id, thread_id, is_delete) VALUES($1, $2, $3, $4, $5, $6)',
      values: [id, content, new Date().toISOString(), user_id, thread_id, is_delete],
    };

    await pool.query(query);
  },

  async findCommentsById(id) {
    const query = {
      text: 'SELECT * FROM thread_comments WHERE id = $1',
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async checkIsDeletedCommentById(id) {
    const query = {
      text: 'SELECT is_delete FROM thread_comments WHERE id = $1',
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows[0].is_delete;
  },

  async deleteCommentById(id) {
    const query = {
      text: 'UPDATE thread_comments SET is_deleted = 1 WHERE id = $1',
      values: [id],
    };
    await pool.query(query);
  },

  async cleanTable() {
    await pool.query('DELETE FROM thread_comments WHERE 1=1');
  },
};

module.exports = CommentsTableTestHelper;
