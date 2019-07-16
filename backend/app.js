const Express = require('express');
const cors = require('cors');
const ExpressGraphQL = require('express-graphql');
const Mongoose = require('mongoose');
const {
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
} = require('graphql');

const app = Express();

Mongoose.connect('mongodb://localhost/marvelapi', { useNewUrlParser: true });

const FavoriteModel = Mongoose.model('favorites', {
  comicid: String,
  title: String,
  image: String,
});

const CommentModel = Mongoose.model('comments', {
  comicid: String,
  comment: String,
  image: String,
});

const FavoriteType = new GraphQLObjectType({
  name: 'Favorite',
  fields: {
    id: { type: GraphQLID },
    comicid: { type: GraphQLString },
    title: { type: GraphQLString },
    image: { type: GraphQLString },
  },
});

const CommentType = new GraphQLObjectType({
  name: 'Comment',
  fields: {
    id: { type: GraphQLID },
    comicid: { type: GraphQLString },
    comment: { type: GraphQLString },
  },
});

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      favorites: {
        type: GraphQLList(FavoriteType),
        resolve: () => FavoriteModel.find().exec(),
      },
      favorite: {
        type: FavoriteType,
        args: {
          id: { type: GraphQLNonNull(GraphQLID) },
        },
        resolve: (root, args) => FavoriteModel.findById(args.id).exec(),
      },
      comments: {
        type: GraphQLList(CommentType),
        args: {
          comicid: { type: GraphQLNonNull(GraphQLString) },
        },
        resolve: (root, args) => CommentModel.find({ comicid: args.comicid }).exec(),
      },
    },
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      addFavorite: {
        type: FavoriteType,
        args: {
          comicid: { type: GraphQLNonNull(GraphQLString) },
          title: { type: GraphQLNonNull(GraphQLString) },
          image: { type: GraphQLNonNull(GraphQLString) },
        },
        resolve: (root, args) => {
          const favorite = new FavoriteModel(args);
          return favorite.save();
        },
      },
      addComment: {
        type: CommentType,
        args: {
          comicid: { type: GraphQLNonNull(GraphQLString) },
          comment: { type: GraphQLNonNull(GraphQLString) },
        },
        resolve: (root, args) => {
          const comment = new CommentModel(args);
          return comment.save();
        },
      },
    },
  }),
});

app.use(cors());

app.use('/graphql', ExpressGraphQL({
  schema,
  graphiql: true,
}));

app.listen(3001, () => {
  console.log('Listening at :3001...');
});
