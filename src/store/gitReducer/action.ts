import { createAsyncThunk } from '@reduxjs/toolkit';
import { gql } from 'graphql-request';
import { endpoint, token } from '../../graphql';

export const fetchRepos = createAsyncThunk(
  'repositories/search',
  async (_text: string) => {
    const query = gql`
    
      query FetchRepos($text: String!) {
        search(query: $text, type: REPOSITORY, first: 100) {
          nodes {
            ... on Repository {
              id
              name
              url
              stargazers {
                totalCount
              }
              defaultBranchRef {
                target {
                  ... on Commit {
                    committedDate
                  }
                }
              }
            }
          }
        }
      }
    `;
    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query,
        variables: {
          text: _text,
        },
      }),
    };

   
      const response = await fetch(endpoint, options);
      const data = await response.json();

      const repositories = data.data.search.nodes.sort(
        (a: { stargazers: { totalCount: number; }; }, b: { stargazers: { totalCount: number; }; }) => b.stargazers.totalCount - a.stargazers.totalCount
      );


      console.log(repositories)
      return repositories;
      }
)