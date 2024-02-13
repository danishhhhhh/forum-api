const AddComments = require('../../../Domains/comment/entities/AddComments');
const AddedComments = require('../../../Domains/comment/entities/AddedComments');
const CommentsRepository = require('../../../Domains/comment/CommentsRepository');
const ThreadsRepository = require('../../../Domains/threads/ThreadsRepository');
const AddCommentUseCase = require('../AddCommentUseCase');

describe('AddCommentUseCase', () => {
  /**
     * Menguji apakah use case mampu mengoskestrasikan langkah demi langkah dengan benar.
     */
  it('should orchestrating the add user action correctly', async () => {
    // Arrange
    const useCasePayload = {
      id: 'thread-123',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      user: 'user-123',
      thread: 'thread-123',
    };

    const mockAddedComments = new AddedComments({
      id: 'comment-123',
      body: useCasePayload.content,
      user_id: 'user-123',
    });

    /** creating dependency of use case */
    const mockCommentsRepository = new CommentsRepository();
    const mockThreadsRepository = new ThreadsRepository();

    /** mocking needed function */
    mockThreadsRepository.checkExistingThreadById = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockCommentsRepository.addComments = jest.fn()
      .mockImplementation(() => Promise.resolve(mockAddedComments));

    /** creating use case instance */
    const getCommentsUseCase = new AddCommentUseCase({
      threadRepository: mockThreadsRepository,
      commentRepository: mockCommentsRepository,
    });

    // Action
    const addedComments = await getCommentsUseCase.execute(useCasePayload);

    // Assert
    expect(addedComments).toStrictEqual(mockAddedComments);
    expect(mockCommentsRepository.addComments).toBeCalledWith(new AddComments(useCasePayload));
  });
});
