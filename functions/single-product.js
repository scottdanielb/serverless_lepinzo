// .netlify/functions/single-product?id=rec5l8zItlW3yj8Nz

// .netlify/functions/single-product?id=rec5l8zItlW3yj8Nz

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
      const singleProduct = { id: product.id, ...product.fields };

      if (product.error) {
        return {
          statusCode: 404,
          body: `No product with id: ${id}`,
        };
      }
      return {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        statusCode: 200,
        body: JSON.stringify(singleProduct),
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

// const product = await airtable.retrieve(id);
//       const { records } = await airtable.list();
//       const products = records.map((product) => {
//         const { id } = product;
//         const {
//           name,
//           price,
//           images,
//           featured,
//           description,
//           company,
//           category,
//           shipping,
//         } = product.fields;

//         return {
//           id,
//           name,
//           images,
//           price,
//           featured,
//           description,
//           company,
//           category,
//           shipping,
//         };
//       });

//       if (product.error) {
//         return {
//           statusCode: 404,
//           body: `No product with id: ${id}`,
//         };
//       }
