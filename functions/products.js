require('dotenv').config();

const Airtable = require('airtable-node');

const airtable = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY,
})
  .base('appkX6isphcvD8Lyt')
  .table('products');

exports.handler = async (event, context, cb) => {
  try {
    const { records } = await airtable.list();
    const products = records.map((product) => {
      const { id } = product;
      const {
        name,
        price,
        images,
        featured,
        description,
        company,
        category,
        shipping,
      } = product.fields;
      const image = images[0].url;
      return {
        id,
        name,
        image,
        price,
        featured,
        description,
        company,
        category,
        shipping,
      };
    });
    return {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      statusCode: 200,
      body: JSON.stringify(products),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: 'Server error',
    };
  }
};
