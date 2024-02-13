class DeleteComments {
  constructor(payload) {
    this._verifyPayload(payload);

    this.thread = payload.thread_id;
    this.comment = payload.comment_id;
    this.user = payload.user_id;
  }

  _verifyPayload(payload) {
    const { thread_id, comment_id, user_id } = payload;

    if (!thread_id || !comment_id || !user_id) {
      throw new Error('DELETE_COMMENTS.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof thread_id !== 'string' || typeof comment_id !== 'string' || typeof user_id !== 'string') {
      throw new Error('DELETE_COMMENTS.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = DeleteComments;
