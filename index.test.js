const schemaControl = require('./index');

describe('Schema Controller', () => {
  it('should check primitive types', () => {
    const schema = 'string';
    const value = 'this is string';
    expect(schemaControl(schema, value)).toBe(true);
  });

  it('should check array items', () => {
    const schema = {
      name: 'string',
      mission: 'string',
      age: 'number',
      isOnline: 'boolean',
    };

    const data = [
      { name: 'john', mission: 'teacher', age: 30, isOnline: false },
      { name: 'mike', mission: 'driver', age: 35, isOnline: true },
    ];

    expect(schemaControl([schema], data)).toBe(true);
  });
});
