class AddedThreads {
  constructor(payload) {
    this._verifyPayload(payload);

    this.id = payload.id;
    this.title = payload.title;
    this.owner = payload.user_id;
  }

  _verifyPayload(payload) {
    const { id, title, user_id } = payload;

    if (!id || !title || !user_id) {
      throw new Error('ADDED_THREADS.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof id !== 'string' || typeof title !== 'string' || typeof user_id !== 'string') {
      throw new Error('ADDED_THREADS.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = AddedThreads;
