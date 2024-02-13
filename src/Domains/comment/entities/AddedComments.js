class AddedComments {
  constructor(payload) {
    this._verifyPayload(payload);

    this.id = payload.id;
    this.content = payload.body;
    this.owner = payload.user_id;
  }

  _verifyPayload(payload) {
    const { id, body, user_id } = payload;

    if (!id || !body || !user_id) {
      throw new Error('ADDED_COMMENTS.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof id !== 'string' || typeof body !== 'string' || typeof user_id !== 'string') {
      throw new Error('ADDED_COMMENTS.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = AddedComments;
