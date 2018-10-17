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
  reviews(status: [APPROVED FLAGGED], page: 1, first: 3) {
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

{
  reviews(status: FLAGGED) {
    rating
    status
    user {
      firstName
      lastName
    }
  }
}