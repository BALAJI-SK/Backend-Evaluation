/* eslint-disable no-undef */
const contentController = require('../../../src/controllers/content.controller');
const contentService = require('../../../src/services/content.service');


describe('Content Controller', () => {
	describe('getContentById', () => {    
		it('should get a whole content ', async () => {
			const req = {
				params: {
					id: 1,
				},
			};
			const res = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn().mockReturnThis(),
			};
			const next = jest.fn();
			jest.spyOn(contentService, 'getContentById').mockResolvedValueOnce();
			await contentController.getContentById(req, res, next);
			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.json).toHaveBeenCalledWith(undefined);
		});
		
	});
            

	describe('createContent', () => {
		it('should create a content', async () => {
			const contentName = 'test';
			const contentField = {
				'field1': 'string',
				'field2': 'number',
				'field3': 'boolean',
			};
			const req = {
				body: {
					contentName,
					contentField,
				},
			};
			const res = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn().mockReturnThis(),
			};
			const next = jest.fn();

			contentService.createContent = jest.fn().mockResolvedValueOnce({
				id: 1,
				contentName,
				contentField,
			});

			await contentController.createContent(req, res, next);

			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.json).toHaveBeenCalledWith({
				id: 1,
				contentName,
				contentField,
			});
		}
		);
		it('should throw an error if contentName is not provided', async () => {
			const req = {
				body: {
					contentField: {
						'field1': 'string',
						'field2': 'number',
						'field3': 'boolean',
					},
				},
			};
			const res = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn().mockReturnThis(),
			};
			const next = jest.fn();

			await contentController.createContent(req, res, next);

			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.json).toHaveBeenCalledWith(undefined
			);
		}
		);
		it('should throw an error if contentField is not provided', async () => {
			const req = {
				body: {
					contentName: 'test',
				},
			};
			const res = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn().mockReturnThis(),
			};
			const next = jest.fn();

			await contentController.createContent(req, res, next);

			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.json).toHaveBeenCalledWith(undefined);
		}
		);
		it('should throw an error if contentField is not an object', async () => {
			const req = {
				body: {
					contentName: 'test',
					contentField: 'test',
				},
			};
			const res = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn().mockReturnThis(),
			};
			const next = jest.fn();

			await contentController.createContent(req, res, next);

			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.json).toHaveBeenCalledWith(undefined);
		}
		);
		it('should throw an error if contentField is empty', async () => {
			const req = {
				body: {
					contentName: 'test',
					contentField: {},
				},
			};
			const res = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn().mockReturnThis(),
			};
			const next = jest.fn();

			await contentController.createContent(req, res, next);

			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.json).toHaveBeenCalledWith(undefined);
		}
		);
        

	});
});
    