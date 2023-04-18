import { gql } from "@apollo/client";

export const INSERT_USER = gql`
  mutation insertUsers($username: String!, $password: bpchar!) {
    insert_mini_project_users_one(
      object: {
        isUserVoted: false
        role: "user"
        username: $username
        password: $password
      }
    ) {
      username
      password
    }
  }
`;

export const GET_DATA_FOR_LOGIN = gql`
  query getUserDataForLogin($username: String!) {
    mini_project_users(where: { username: { _eq: $username } }) {
      password
      role
      isUserVoted
      id
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query getUserById($idUser: Int!) {
    results: mini_project_users(where: { id: { _eq: $idUser } }) {
      username
      isUserVoted
      role
      id
    }
  }
`;

export const USER_VOTING = gql`
  mutation userVote($idUser: Int!) {
    update_mini_project_users(
      where: { id: { _eq: $idUser } }
      _set: { isUserVoted: true }
    ) {
      returning {
        isUserVoted
        username
      }
    }
  }
`;

export const INPUT_MAHASISWA_DATA = gql`
  mutation insertMahasiswa($link: String!, $fileName: String!) {
    insert_mini_project_mahasiswa(
      objects: { link: $link, fileName: $fileName }
    ) {
      returning {
        link
        fileName
      }
    }
  }
`;

export const GET_DATA_MAHASISWA_FOR_ADMIN = gql`
  subscription subscribeMahasiswa {
    mini_project_mahasiswa {
      link
      fileName
    }
  }
`;

export const DELETE_MAHASISWA_DATA = gql`
  mutation deleteMahasiswa($link: String!) {
    delete_mini_project_mahasiswa(where: { link: { _eq: $link } }) {
      returning {
        link
      }
    }
  }
`;
