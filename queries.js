// # Challenge: create a graphql query the returns a response
// # in the following shape:
// # {
// #   "data": {
// #     "books": [
// #       {
// #         "title": "...",
// #         "reviews": [
// #           {
// #             "rating": 5,
// #             "user": {
// #               "firstName": "...",
// #               "lastName": "..."
// # 					}
// #         ]
// #       }
// #     ]
// #   }
// # }
// # Important: put a comment next to each field
// # with a description of it's data type
// # Answer: You can find the solution at http://knowthen.com/gql5A

{
  "status": ["APPROVED", "FLAGGED"]
}

query ModeratorReviewsVer1 ($status: [ReviewStatus!]){
  reviews(status: $status, page: 1, first: 3) {
    book {
      title
    }
    rating
    status
    user {
      firstName
      lastName
    }
  }
}

// # Challenge: create a graphql query the returns a response
// # in the following shape:
// # {
// #   "data": {
// #     "reviews": [
// #       {
// #         "rating": "...",
// #         "comment": "...",
// #         "status": "FLAGGED",
// #         "user": {
// #           "firstName": "...",
// #           "lastName": "...",
// #          }
// #       }
// #     ]
// #   }
// # }
// #
// # IMPORTANT: The results should only include reviews
// # that have been flagged for review
// #
// # ANSWER: http://knowthen.com/gql6A

query ModeratorReviewsVer2 ($status: [ReviewStatus!]){
  reviews(status: $status) {
    rating
    status
    user {
      firstName
      lastName
    }
  }
}

// # Challenge: Find the one interface used on this server
// # HINT: Ask yourself what object types would likely
// # have many common/shared fields
// # After you've found the interface, figure out where
// # it's used.

// # Answer: You can find the solution at http://knowthen.com/gql8A

interface Person {
  id: ID!
  firstName: String
  lastName: String
}

type Author implements Person {
  books: [Book!]
}

type User implements Person {
  reviews: [Review!]
}

// # Alias and fragments
// # Challenge: Create a fragment on the User type
// # that includes the user first and last names.
// # Then create a query for 2 seperate users (id's 1 and 2)
// # The 2 user queries should use the newly created
// # Fragment.
// #
// # Answer: You can find the solution at http://knowthen.com/gql9A
fragment BookFields on Book{
  title
  subtitle
  description
  pageCount
  rating
}

fragment UserFields on User{
  firstName
  lastName
}

query RunUsers{
  user1: user(id: "1"){
    ...UserFields
  }
  user2: user(id: "2"){
    ...UserFields
  }
}

query twoBooks{
  Book1: book(id: "1"){
  	...BookFields
	}
  Book2: book(id: "2"){
  	...BookFields
	}
}

// # Challenge: Add inline fragments for Author, User and Review types
// # For author results, include the authors: first and last name,
// # and the title of the authors books
// # For user results, include the user's first and last names,
// # and the title of any books the user has reviewed
// # For Review results, include the rating, comment and the books title
// # HINT: What your adding to this query, will look very similar to the
// # inline (conditional) fragment for the Book type you see below...
// # Answer: you can find the completed query at: http://knowthen.com/gql10A

query SearchQuery {
  search(term: "Dan"){
    __typename
    ... on Book {
      title
      subtitle
      authors {firstName lastName}
    }
    ... on Author {
      firstName
      lastName
      books{title}
    }
    ... on Review {
      book{title}
      comment
      rating
      user{firstName lastName}
    }
  }
}