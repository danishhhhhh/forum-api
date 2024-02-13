const DetailComments = require('../DetailComments');

describe('a DetailComments entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    const payload = {};

    expect(() => new DetailComments(payload)).toThrowError('DETAIL_COMMENTS.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload not meet data type specification', () => {
    const payload = { comments: {} };

    expect(() => new DetailComments(payload)).toThrowError('DETAIL_COMMENTS.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create new thread object correctly', () => {
    const payload = {
      comments: [
        {
          id: 'comment-123',
          username: 'qwerty',
          date: '2021-08-08T07:22:33.555Z',
          content: 'sebuah comment',
          is_delete: false,
        },
        {
          id: 'comment-456',
          username: 'poiu',
          date: '2021-08-08T07:26:21.338Z',
          content: '**komentar telah dihapus**',
          is_delete: true,
        },
      ],
    };

    const expectedComment = [
      {
        id: 'comment-123',
        username: 'qwerty',
        date: '2021-08-08T07:22:33.555Z',
        content: 'sebuah comment',
      },
      {
        id: 'comment-456',
        username: 'poiu',
        date: '2021-08-08T07:26:21.338Z',
        content: '**komentar telah dihapus**',
      },
    ];

    const { comments } = new DetailComments(payload);

    expect(comments).toEqual(expectedComment);
  });
});
