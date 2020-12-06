const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = require('graphql')
const Movie = require('./models/Movie')
const Director = require('./models/Director')

const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: () => ({
    // we wrap the object in a function to have the DirectorType as we defined it later
    id: { type: GraphQLID },
    name: { type: new GraphQLNonNull(GraphQLString) },
    genre: { type: new GraphQLNonNull(GraphQLString) },
    directorId: { type: GraphQLString },
    director: {
      type: DirectorType,
      resolve(parent, args) {
        // return directors.find(director => director.id == parent.directorId)
        return Director.findById(parent.directorId)
      },
    },
  }),
})

const DirectorType = new GraphQLObjectType({
  name: 'Director',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: new GraphQLNonNull(GraphQLString) },
    age: { type: new GraphQLNonNull(GraphQLInt) },
    movies: {
      type: new GraphQLList(MovieType),
      resolve: (parent, args) => {
        // return movies.filter(movie => movie.directorId === parent.id)
        return Movie.find({ directorId: parent.id })
      },
    },
  }),
})

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    movie: {
      type: MovieType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parent, args) {
        // return movies.find(movie => movie.id == args.id)
        //! ==
        return Movie.findById(args.id)
      },
    },
    director: {
      type: DirectorType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parent, args) {
        // return directors.find(director => director.id == args.id)
        //! ==
        return Director.findById(args.id)
      },
    },
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
        // return movies
        return Movie.find()
      },
    },
    directors: {
      type: new GraphQLList(DirectorType),
      resolve(parent, args) {
        // return directors
        return Director.find()
      },
    },
  }),
})

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    addDirector: {
      type: DirectorType,
      args: {
        DName: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve(parent, { DName, age }) {
        const director = new Director({
          name: DName,
          age,
        })

        return director.save()
      },
    },
    addMovie: {
      type: MovieType,
      args: {
        MName: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        directorId: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, { MName, genre, directorId }) {
        const movie = new Movie({ name: MName, genre, directorId })

        return movie.save()
      },
    },
    removeDirector: {
      type: DirectorType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parent, args) {
        return Director.findByIdAndRemove(args.id)
      },
    },
    removeMovie: {
      type: MovieType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parent, args) {
        return Movie.findByIdAndRemove(args.id)
      },
    },
    updateDirector: {
      type: DirectorType,
      args: {
        id: { type: GraphQLID },
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve(parent, { id, name, age }) {
        return Director.findByIdAndUpdate(
          id,
          { $set: { name, age } },
          { new: true },
        )
      },
    },
    updateMovie: {
      type: MovieType,
      args: {
        id: { type: GraphQLID },
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        directorId: { type: GraphQLString },
      },
      resolve(parent, { id, name, genre, directorId }) {
        return Movie.findByIdAndUpdate(
          id,
          { $set: { name, genre, directorId } },
          { new: true },
        )
      },
    },
  }),
})

module.exports = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
})
