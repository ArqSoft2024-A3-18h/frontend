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

export const DELETE_USER_FORMS = gql`
    mutation DeleteFormById($id: ID!) {
    deleteFormById(_id: $id)
    }

`;

export const GET_GAME_ID_BY_PIN = gql`
query GetGameIdByPin($pin: String!) {
  getGameIdByPin(pin: $pin)
}
`;



export const UPDATE_GAME_BY_PIN = gql`
mutation Mutation($pin: String!, $nick: String!) {
  updateGameByPin(pin: $pin, nick: $nick) {
    player {
      score
      nick
      _id
    }
    game {
      title
      pin
      _id
      isRunning
      leaderboard {
        _id
        email
        nick
        score
        finish
        createdAt
        updatedAt
      }
      formId
    }
  }
}
`;

export const  SEND_ANSWER = gql`
mutation SendAnswer($gamePin: String!, $playerId: ID!, $answerIsCorrect: Boolean!, $points: Int!) {
  sendAnswer(gamePin: $gamePin, playerId: $playerId, answerIsCorrect: $answerIsCorrect, points: $points) {
    score
    nick
    _id
    finish
  }
}
`;