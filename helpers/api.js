import fetch  from 'isomorphic-fetch';
import { merge } from 'lodash';
import { GraphQLError } from 'graphql';
import logatim from 'logatim';


logatim.setLevel('info');

const headers = extraHeaders => ({
  'Content-Type': 'application/json',
  Accept: 'application/json',
  ...extraHeaders,
});

export default async (relativeUrl, options = {}) => {
  logatim.yellow.info(`options received`, options);
  options = merge({}, { headers: headers(), method: 'GET' }, options);
  const baseUrl = 'http://localhost:3000/api/';

  logatim.yellow.info(`executing API call: ${relativeUrl} with`, options);


  try {
    let response = await fetch(`${baseUrl}${relativeUrl}`, options);
    const parsedResponse = await response.json();

    if(!response.ok) {
      throw parsedResponse;
    }
    return { ...response };
  } catch(e) {
    logatim.red.error({ error: e });
    if (e instanceof GraphQLError) {
      throw e;
    }
    throw new GraphQLError(e.message, ...e);

  }

}
