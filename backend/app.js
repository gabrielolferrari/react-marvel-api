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

const FavoriteModel = Mongoose.model('favorite', {
  comicid: String,
});

const FavoriteType = new GraphQLObjectType({
  name: 'Favorite',
  fields: {
    id: { type: GraphQLID },
    comicid: { type: GraphQLString },
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
    },
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      addFavorite: {
        type: FavoriteType,
        args: {
          comicid: { type: GraphQLNonNull(GraphQLString) },
        },
        resolve: (root, args) => {
          const favorite = new FavoriteModel(args);
          return favorite.save();
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
