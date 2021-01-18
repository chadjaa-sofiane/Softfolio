import postsResolvers from "./posts"
import userResolvers from "./user"
import commentsResolver from "./comments"
export default {
    Query:{
        ...userResolvers.Query,
        ...postsResolvers.Query
    },
    Mutation:{
        ...userResolvers.Mutation,
        ...postsResolvers.Mutation,
        ...commentsResolver.Mutation
    },
    Subscription:{
        ...postsResolvers.Subscription
    },
    Post:{
        ...postsResolvers.Post
    },
    User:{
        ...userResolvers.User
    },
    Comment:{
        ...commentsResolver.Comment
    }
}