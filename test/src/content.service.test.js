/* eslint-disable no-undef */
const {createContent,getContentById} = require('../../src/services/content.service');
const {content} = require('../../database/models');
const HttpError = require('../../src/utils/errors/httpError');
describe('Content' , () => {
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
			jest.spyOn(content,'create').mockResolvedValue(req.body);
			const value = await createContent(contentName,contentField);

			expect(value).toBe(req.body);
		});
		

	});
	describe('getContentById', () => {
		it('should get a content', async () => {
			const contentId = 1;
			const req = {
				params: {
					id: contentId,
				},
			};
			jest.spyOn(content,'findAll').mockResolvedValue(req.params);
			const value = await getContentById();

			expect(value).toBe(req.params);
		}
		);

	});
} );    