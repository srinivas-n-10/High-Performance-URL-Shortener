const { registerUser, loginUser } = require('../../src/services/auth.service');

describe('auth.service', () => {
  const credentials = {
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123',
  };

  test('registerUser creates a user and returns a token', async () => {
    const result = await registerUser(credentials);

    expect(result.user.email).toBe(credentials.email);
    expect(result.user.password).toBeUndefined();
    expect(result.token).toBeDefined();
  });

  test('registerUser throws 409 if email already exists', async () => {
    await registerUser(credentials);

    await expect(registerUser(credentials)).rejects.toMatchObject({
      statusCode: 409,
    });
  });

  test('loginUser succeeds with correct credentials', async () => {
    await registerUser(credentials);

    const result = await loginUser({
      email: credentials.email,
      password: credentials.password,
    });

    expect(result.token).toBeDefined();
  });

  test('loginUser throws 401 with wrong password', async () => {
    await registerUser(credentials);

    await expect(
      loginUser({
        email: credentials.email,
        password: 'wrongpassword',
      })
    ).rejects.toMatchObject({
      statusCode: 401,
    });
  });
});