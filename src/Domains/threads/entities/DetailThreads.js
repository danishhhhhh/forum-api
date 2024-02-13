class DetailThreads {
  constructor(payload) {
    this._verifyPayload(payload);

    this.id = payload.id;
  }

  _verifyPayload(payload) {
    const { id } = payload;

    if (!id) {
      throw new Error('DETAIL_THREADS.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof id !== 'string') {
      throw new Error('DETAIL_THREADS.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = DetailThreads;
