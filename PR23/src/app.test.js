const request = require('supertest');
const app = require('./app');

describe('Task Manager API', () => {
    let createdTaskId;

    
    describe('POST /tasks', () => {
        it('should create a new task with valid data', async () => {
            const taskData = {
                title: 'Test Task',
                description: 'This is a test task'
            };

            const response = await request(app)
                .post('/tasks')
                .send(taskData)
                .expect(201);

            expect(response.body).toHaveProperty('id');
            expect(response.body.title).toBe(taskData.title);
            expect(response.body.description).toBe(taskData.description);
            expect(response.body.completed).toBe(false);
            expect(response.body).toHaveProperty('createdAt');

            createdTaskId = response.body.id;
        });

        it('should return 400 when title is missing', async () => {
            const taskData = {
                description: 'This is a test task'
            };

            const response = await request(app)
                .post('/tasks')
                .send(taskData)
                .expect(400);

            expect(response.body).toHaveProperty('error', 'Title is required');
        });
    });

    
    describe('GET /tasks', () => {
        it('should return all tasks', async () => {
            const response = await request(app)
                .get('/tasks')
                .expect(200);

            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBeGreaterThan(0);
        });
    });

 
    describe('PUT /tasks/:id', () => {
        it('should update an existing task', async () => {
            const updateData = {
                title: 'Updated Task',
                description: 'This is an updated task',
                completed: true
            };

            const response = await request(app)
                .put(`/tasks/${createdTaskId}`)
                .send(updateData)
                .expect(200);

            expect(response.body.title).toBe(updateData.title);
            expect(response.body.description).toBe(updateData.description);
            expect(response.body.completed).toBe(updateData.completed);
        });

        it('should return 404 for non-existent task', async () => {
            const updateData = {
                title: 'Updated Task'
            };

            const response = await request(app)
                .put('/tasks/999999')
                .send(updateData)
                .expect(404);

            expect(response.body).toHaveProperty('error', 'Task not found');
        });
    });

   
    describe('DELETE /tasks/:id', () => {
        it('should delete an existing task', async () => {
            await request(app)
                .delete(`/tasks/${createdTaskId}`)
                .expect(204);
        });

        it('should return 404 for non-existent task', async () => {
            const response = await request(app)
                .delete('/tasks/999999')
                .expect(404);

            expect(response.body).toHaveProperty('error', 'Task not found');
        });
    });
}); 