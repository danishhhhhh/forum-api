const AddThreads = require('../../../Domains/threads/entities/AddThreads');
const AddedThreads = require('../../../Domains/threads/entities/AddedThreads');
const ThreadsRepository = require('../../../Domains/threads/ThreadsRepository');
const AddThreadUseCase = require('../AddThreadUseCase');

describe('AddThreadUseCase', () => {
  /**
     * Menguji apakah use case mampu mengoskestrasikan langkah demi langkah dengan benar.
     */
  it('should orchestrating the add user action correctly', async () => {
    // Arrange
    const useCasePayload = {
      title: 'Thread Title',
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      user: 'user-123',
    };

    const mockAddedThreads = new AddedThreads({
      id: 'thread-1234567890',
      title: useCasePayload.title,
      user_id: useCasePayload.user,
    });

    /** creating dependency of use case */
    const mockThreadsRepository = new ThreadsRepository();

    /** mocking needed function */
    mockThreadsRepository.addThread = jest.fn()
      .mockImplementation(() => Promise.resolve(mockAddedThreads));

    /** creating use case instance */
    const getThreadsUseCase = new AddThreadUseCase({
      threadRepository: mockThreadsRepository,
    });

    // Action
    const addedThreads = await getThreadsUseCase.execute(useCasePayload);

    // Assert
    expect(addedThreads).toStrictEqual(mockAddedThreads);
    expect(mockThreadsRepository.addThread).toBeCalledWith(new AddThreads(useCasePayload));
  });
});
