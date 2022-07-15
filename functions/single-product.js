// .netlify/functions/single-product

require('dotenv').config();

const Airtable = require('airtable-node');

const airtable = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY,
})
  .base('appkX6isphcvD8Lyt')
  .table('products');

exports.handler = async (event, context, cb) => {
  const { id } = event.queryStringParameters;

  if (id) {
    try {
      const product = await airtable.retrieve(id);

      if (product.error) {
        return {
          statusCode: 404,
          body: `No product with id: ${id}`,
        };
      }
      return {
        statusCode: 200,
        body: JSON.stringify(product),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: `Server error`,
      };
    }
  }
  return {
    statusCode: 400,
    body: 'Please provide product id',
  };
};

//   const {
//     featured,
//     category,
//     description,
//     name,
//     price,
//     images,
//     company,
//     stock,
//     stars,
//   } = fields;
//   return {
//     featured,
//     category,
//     description,
//     name,
//     price,
//     images,
//     company,
//     stock,
//     stars,
//   };
