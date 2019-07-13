import React, { useRef } from 'react';
import renderHTML from 'react-render-html';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ComicInfo from './comicInfo';

const useStyles = {
    card: {
      maxWidth: 324,
    },
    media: {
      height: 216,
    },
  };

const getImage = url => {
  return `${url}/portrait_incredible.jpg`;
};



const CardComic = props => {
  const childRef = useRef();

  return (
    <React.Fragment>
      <Card style={useStyles.card}
        onClick={() => childRef.current.openModal()}>
        <CardActionArea>
          <CardMedia
            style={useStyles.media}
            image={getImage(props.info.thumbnail.path)}
            title={props.info.title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {props.info.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
            {props.info.description ? renderHTML(props.info.description) : ''}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Learn More
          </Button>
        </CardActions>
      </Card>
      <ComicInfo ref={childRef} />
    </React.Fragment>
  );
};

export default CardComic;