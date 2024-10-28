import { ApolloLink } from '@apollo/client/core';

export const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('authToken');

  if (token) {
    operation.setContext(({ headers }: Partial<Record<string, any>>) => ({
      headers: {
        Authorization: `Bearer ${token}`,
        ...headers,
      },
    }));
  }

  return forward(operation);
});
