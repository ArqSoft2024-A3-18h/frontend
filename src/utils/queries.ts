import { gql } from "@apollo/client";

export const CREATE_QUESTIONS = gql`
  query CreateQuestions($content: String!, $numQuestions: Int!) {
    createQuestions(content: $content, numQuestions: $numQuestions) {
        text
        options {
            text
            isAnswer
        }
    }
  }
`;

export const CREATE_FORM = gql`
    mutation CreateForm($name: String!, $userId: String!, $questions: [QuestionInput!]!) {
        createForm(name: $name, userId: $userId, questions: $questions) {
            _id
            name
            userId
            questions {
                text
                options {
                    text
                    isAnswer
                }
            }
            createdAt
        }
    }
`;

export const GET_USER_FORMS = gql`
    query GetFormsByUserId($userId: String!) {
    getFormsByUserId(userId: $userId) {
        _id
        name
        userId
        questions {
        text
        options {
            text
            isAnswer
        }
        }
        createdAt
    }
    }
`;