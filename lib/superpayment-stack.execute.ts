exports.handler = async (event: any) => {
  const props = JSON.parse(event.body);

  if (!isvaliduuid(props.uuid)) {
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        message: 'failure',
      }),
    };
  }

  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({
      status: 'success',
    }),
  };
}

const isvaliduuid = (uuid: string) => {
  const regex = new RegExp('^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$');
  return regex.test(uuid);
}
