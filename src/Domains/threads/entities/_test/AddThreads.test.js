const AddThreads = require('../AddThreads');

describe('a AddThreads entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    const payload = {
      title: 'Thread Title',
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    };

    expect(() => new AddThreads(payload)).toThrowError('ADD_THREADS.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload not meet data type specification', () => {
    const payload = {
      title: 'Thread Title',
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      user: 1234567890,
    };

    expect(() => new AddThreads(payload)).toThrowError('ADD_THREADS.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create new thread object correctly', () => {
    const payload = {
      title: 'Thread Title',
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      user: 'user-123',
    };

    const { title, body, user } = new AddThreads(payload);

    expect(title).toEqual(payload.title);
    expect(body).toEqual(payload.body);
    expect(user).toEqual(payload.user);
  });
});
