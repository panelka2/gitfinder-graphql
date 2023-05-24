import { createAsyncThunk } from '@reduxjs/toolkit';
import { gql } from 'graphql-request';
import { endpoint, token } from '../../graphql';

export const getRepo = createAsyncThunk(
  'repositories/repository',
  async ({ owner, name }: { owner: string; name: string }) => {
    const query = gql`
    query FetchRepos($owner: String!, $name: String!) {
      repository(owner: $owner, name: $name) {
      name
      stargazerCount
      updatedAt
      url
      description
      languages(first:10) {
        nodes {
          name
        }
      }
      owner {
        login
        url
        avatarUrl
      }
    }
  }
    `;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query,
        variables: {
          owner: owner,
          name: name
        },
      }),
    };

    const response = await fetch(endpoint, options);
    const data = await response.json();

    return data.data.repository;
  }
)