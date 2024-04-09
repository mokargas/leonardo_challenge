import { gql } from '@apollo/client';

export const GET_ANIME = gql`
  query GetAnime($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      media {
        id
        description
        title {
          romaji
        }
        coverImage {
          large
        }
      }
      pageInfo {
        currentPage
        lastPage
      }
    }
  }
`;