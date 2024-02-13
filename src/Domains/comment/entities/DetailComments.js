class DetailComments {
  constructor(payload) {
    this._verifyPayload(payload);

    this.comments = this._remappingPayload(payload);
  }

  _verifyPayload({ comments }) {
    if (!comments) {
      throw new Error('DETAIL_COMMENTS.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (!Array.isArray(comments)) {
      throw new Error('DETAIL_COMMENTS.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }

  _remappingPayload({ comments }) {
    return comments.map((comment) => ({
      id: comment.id,
      username: comment.username,
      date: comment.date,
      content: comment.is_delete ? '**komentar telah dihapus**' : comment.content,
    }));
  }
}

module.exports = DetailComments;
