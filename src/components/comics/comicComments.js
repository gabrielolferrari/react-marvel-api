import React from 'react';
import gql from 'graphql-tag';
import { Mutation, Query } from 'react-apollo';

const ADD_COMMENT = gql`
  mutation comment($comicid: String!, $comment: String!) {
    addComment(comicid: $comicid, comment: $comment) {
      comicid,
      comment
    }
  }
`;

const ComicComments = (props) => {
  let comicid = props.commicid.toString();
  let comment;

  const GET_COMMENTS = gql`
    query comment($comicid: String!){
      comments(comicid: $comicid) {
        id,
        comment
      }
    }
  `;

  return (
    <React.Fragment>
      <Mutation mutation={ADD_COMMENT} onCompleted={() => console.log('Complete')}>
        {(addFavorite, { loading, error }) => (
          <React.Fragment>
            <form onSubmit={(e) => {
              e.preventDefault();
              addFavorite({ variables: { comicid: comicid.value, comment: comment.value } });
              comicid.value = '';
              comment.value = '';
            }}
            >
              <input
                type="hidden"
                name="comicid"
                ref={(node) => {
                  comicid = node;
                }}
                placeholder="ComicID"
                value={comicid}
              />

              <input
                type="text"
                ref={(node) => {
                  comment = node;
                }}
                placeholder="Comment"
              />

              <button type="submit" color="inherit">Submit</button>
            </form>
            {loading && <p>Loading...</p>}
            {error && <p>Error :( Please try again</p>}
          </React.Fragment>
        )}
      </Mutation>
      <Query pollInterval={500} query={GET_COMMENTS} variables={{ comicid }}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;

          return (
            data.comments.map(info => (
              <div key={info.id}>
                <p>{info.comment}</p>

              </div>
            ))
          );
        }}
      </Query>
    </React.Fragment>
  );
};

export default ComicComments;
