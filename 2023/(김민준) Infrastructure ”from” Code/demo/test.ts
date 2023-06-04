import * as request from 'supertest';

const baseUrl =
  'https://lc2oxkzina.execute-api.ap-northeast-2.amazonaws.com/stage';

describe('Task API tests', () => {
  let _taskUuid: string;

  it('Create a task', async () => {
    // Given
    const task = {
      title: '발표 자료 만들기',
      description: '6월 3일까지 끝내기',
    };

    // When
    const res = await request(baseUrl).post('/tasks').send(task);

    // Then
    expect(res.status).toBe(201);
  }, 10000);

  it('Get all tasks', async () => {
    // Given

    // When
    const res = await request(baseUrl).get('/tasks');
    const tasks = Object.entries(res.body);

    // Then
    expect(res.status).toBe(200);
    expect(tasks.length).toBe(1);
    expect(tasks[0][0]).toStrictEqual(expect.any(String));
    expect(tasks[0][1]).toStrictEqual({
      title: '발표 자료 만들기',
      description: '6월 3일까지 끝내기',
    });

    _taskUuid = tasks[0][0];
  });

  it('Update a task', async () => {
    // Given
    const taskUuid = _taskUuid;
    const task = {
      title: '발표 자료 빨리 만들기',
      description: '6월 1일까지 끝내기',
    };

    // When
    const res = await request(baseUrl).patch(`/tasks/${taskUuid}`).send(task);

    // Then
    expect(res.status).toBe(200);
  });

  it('Get all tasks', async () => {
    // Given

    // When
    const res = await request(baseUrl).get('/tasks');
    const tasks = Object.entries(res.body);

    // Then
    expect(res.status).toBe(200);
    expect(tasks.length).toBe(1);
    expect(tasks[0][0]).toStrictEqual(expect.any(String));
    expect(tasks[0][1]).toStrictEqual({
      title: '발표 자료 빨리 만들기',
      description: '6월 1일까지 끝내기',
    });
  });

  it('Delete a task', async () => {
    // Given
    const taskUuid = _taskUuid;

    // When
    const res = await request(baseUrl).delete(`/tasks/${taskUuid}`);

    // Then
    expect(res.status).toBe(204);

    _taskUuid = undefined;
  });

  it('Get all tasks', async () => {
    // Given

    // When
    const res = await request(baseUrl).get('/tasks');
    const tasks = Object.entries(res.body);

    // Then
    expect(res.status).toBe(200);
    expect(tasks.length).toBe(0);
  });
});
