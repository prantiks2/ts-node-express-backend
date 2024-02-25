import Joi from 'joi';

export const productListSchema = Joi.object({
    page: Joi.number().optional().label('Page'),
    limit: Joi.number().optional().label('Limit')
});