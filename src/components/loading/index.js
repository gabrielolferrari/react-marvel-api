import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';


const Loading = () => (
  <CircularProgress
    size={40}
    left={-20}
    top={40}
    status="loading"
    style={{ marginTop: '100px', marginLeft: '50%' }}
  />
);

export default Loading;
