import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import gql from 'graphql-tag';
import { Mutation, Query } from 'react-apollo';
import Typography from '@material-ui/core/Typography';
import SendIcon from '@material-ui/icons/Send';
import Button from '@material-ui/core/Button';

const ADD_COMMENT = gql`
  mutation comment($comicid: String!, $comment: String!) {
    addComment(comicid: $comicid, comment: $comment) {
      comicid,
      comment
    }
  }
`;

const useStyles = makeStyles(({
  commentTitle: {
    borderTop: '1px solid #ddd',
    marginTop: 20,
    marginBottom: 20,
    paddingTop: 20,
  },
  comment: {
    borderTop: '1px solid #ddd',
    marginTop: 20,
    marginBottom: 20,
    paddingTop: 20,
    width: '100%',
    height: 100,
    border: 0,
    borderBottom: '1px solid #888',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: '12pt',
  },
  buttonSend: {
    float: 'right',
    marginTop: 10,
    marginBottom: 40,
  },
}));

const ComicComments = (props) => {
  const classes = useStyles();

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
      <Typography variant="h6" className={classes.commentTitle}>
        <strong>Comments</strong>
      </Typography>

      <Query pollInterval={1000} query={GET_COMMENTS} variables={{ comicid }} fetchPolicy="network-only">
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

      <Mutation mutation={ADD_COMMENT} onCompleted={() => console.log('Complete')} fetchPolicy="no-cache">
        {(addFavorite, { loading, error }) => (
          <React.Fragment>
            <form onSubmit={(e) => {
              e.preventDefault();
              addFavorite({ variables: { comicid, comment: comment.value } });
              comment.value = '';
            }}
            >
              <textarea
                className={classes.comment}
                ref={(node) => {
                  comment = node;
                }}
                placeholder="Comment"
              />
              <Button type="submit" variant="contained" color="primary" className={classes.buttonSend}>
                Send &nbsp;
                <SendIcon />
              </Button>
            </form>
            {loading && <p>Loading...</p>}
            {error && <p>Error :( Please try again</p>}
          </React.Fragment>
        )}
      </Mutation>

    </React.Fragment>
  );
};

export default ComicComments;
