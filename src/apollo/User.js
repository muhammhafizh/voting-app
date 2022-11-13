import { gql } from '@apollo/client';

export const INSERT_USER = gql`
    mutation insertUsers($username: String!, $password: bpchar!) {
        insert_mini_project_users_one(object: {isUserVoted: false, role: "user", username: $username, password: $password}) {
        username
        password
        }
    }
`

export const GET_DATA_FOR_LOGIN = gql`
    query getUserDataForLogin($username: String!) {
        mini_project_users(where: {username: {_eq: $username}}) {
        password
        role
        isUserVoted
        id
        }
    }
`

export const GET_USER_FOR_ADMIN = gql`
    subscription getUserForAdmin {
        mini_project_users(where: {role: {_eq: "user"}}) {
        username
        isUserVoted
        id
        }
    }
`

export const GET_USER_BY_ID = gql`
    query getUserById($idUser: Int!) {
        results: mini_project_users(where: {id: {_eq: $idUser}}) {
        username
        isUserVoted
        role
        id
        }
    }
`

export const USER_VOTING = gql`
    mutation userVote($idUser: Int!) {
        update_mini_project_users(where: {id: {_eq: $idUser}}, _set: {isUserVoted: true}) {
        returning {
            isUserVoted
            username
        }
        }
    }
`