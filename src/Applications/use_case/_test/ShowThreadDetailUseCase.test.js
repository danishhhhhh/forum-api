const CommentsRepository = require('../../../Domains/comment/CommentsRepository');
const ThreadsRepository = require('../../../Domains/threads/ThreadsRepository');
const ShowThreadDetailUseCase = require('../ShowThreadDetailUseCase');

describe('DetailThreadUseCase', () => {
  it('should get return detail thread correctly', async () => {
    const useCasePayload = {
      id: 'thread-123',
    };

    const mockThreadRepository = new ThreadsRepository();
    const mockCommentRepository = new CommentsRepository();

    mockThreadRepository.checkExistingThreadById = jest.fn(() => Promise.resolve());
    mockThreadRepository.getDetailThreadById = jest.fn(() => ({
      id: 'thread-123',
      title: 'Title Thread',
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      date: '2023-10-16 20.00',
      username: 'qwerty',
    }));
    mockCommentRepository.getDetailCommentById = jest.fn(() => ([
      {
        id: 'comment-123',
        username: 'qwerty',
        date: '2023-10-16 21.00',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        is_delete: 0,
      },
      {
        id: 'comment-124',
        username: 'poiwu',
        date: '2023-10-16 22.00',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        is_delete: 1,
      },
    ]));

    const showThreadDetailUseCase = new ShowThreadDetailUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
    });

    const detailThread = await showThreadDetailUseCase.execute(useCasePayload);

    expect(mockThreadRepository.checkExistingThreadById)
      .toBeCalledWith('thread-123');
    expect(mockThreadRepository.getDetailThreadById)
      .toHaveBeenCalledWith(useCasePayload.id);
    expect(mockCommentRepository.getDetailCommentById)
      .toHaveBeenCalledWith(useCasePayload.id);
    expect(detailThread).toStrictEqual({
      thread: {
        id: 'thread-123',
        title: 'Title Thread',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        date: '2023-10-16 20.00',
        username: 'qwerty',
        comments: [
          {
            id: 'comment-123',
            username: 'qwerty',
            date: '2023-10-16 21.00',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          },
          {
            id: 'comment-124',
            username: 'poiwu',
            date: '2023-10-16 22.00',
            content: '**komentar telah dihapus**',
          },
        ],
      },
    });
  });
});
