// netlify/functions/data.js
exports.handler = async(event, context) => {
    const { name } = JSON.parse(event.body);
    return {
        statusCode: 200,
        body: JSON.stringify({ message: `Received data for ${name}` }),
    };
};