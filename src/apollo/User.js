import { gql } from "@apollo/client";

export const INSERT_USER = gql`
  mutation insertUsers(
    $username: String!
    $password: bpchar!
    $email: String!
    $nim: numeric!
    $Prodi: String!
  ) {
    insert_mini_project_users_one(
      object: {
        role: "user"
        username: $username
        password: $password
        email: $email
        nim: $nim
        Prodi: $Prodi
      }
    ) {
      username
      password
    }
  }
`;

export const GET_DATA_FOR_LOGIN = gql`
  query GetNimForLogin($nim: numeric!) {
    mini_project_users(where: { nim: { _eq: $nim } }) {
      id
      role
      password
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query getUserById($idUser: Int!) {
    results: mini_project_users(where: { id: { _eq: $idUser } }) {
      username
      role
      id
    }
  }
`;

export const GET_USER_USING_ID = gql`
  query getUserUsingId($idUser: Int!) {
    mini_project_voting(where: { user_id: { _eq: $idUser } }) {
      isUserVoted
      status_paslon
      voting_user {
        username
      }
      voting_paslon {
        id
        imageUrl
        jenis_paslon
        misi
        visi
        nama_ketua
        nama_wakil
        total_vote
      }
    }
  }
`;

export const USER_VOTING = gql`
  mutation userVote($user_id: Int!, $paslon_id: Int!) {
    update_mini_project_voting(
      where: { user_id: { _eq: $user_id }, paslon_id: { _eq: $paslon_id } }
      _set: { isUserVoted: true }
    ) {
      returning {
        isUserVoted
        voting_user {
          nim
          username
        }
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

export const CHANGE_PASSWORD = gql`
  query ChangePassword($nim: numeric!) {
    mini_project_users(where: { nim: { _eq: $nim } }) {
      id
      email
      password
      username
    }
  }
`;

export const UPDATE_PASSWORDS = gql`
  mutation UpdatePassword($id: Int!, $password: bpchar!) {
    update_mini_project_users(
      where: { id: { _eq: $id } }
      _set: { password: $password }
    ) {
      returning {
        id
        email
        username
      }
    }
  }
`;

export const MAHASISWA_ID = gql`
  subscription mahasiswaID($_is_null: Boolean = false) {
    mini_project_users(where: { Prodi: { _is_null: $_is_null } }) {
      id
    }
  }
`;

export const GET_MAHASISWA_IN_VOTING = gql`
  subscription getUserInVoting {
    mini_project_voting(where: { user_id: { _is_null: false } }) {
      user_id
    }
  }
`;

export const INSERT_USER_IN_VOTING = gql`
  mutation insertUserInVoting($objects: [mini_project_voting_insert_input!]!) {
    insert_mini_project_voting(objects: $objects) {
      returning {
        paslon_id
        user_id
        isUserVoted
      }
    }
  }
`;

export const GET_NIM_USERS = gql`
  subscription getNimUser($_is_null: Boolean = false) {
    mini_project_users(where: { nim: { _is_null: $_is_null } }) {
      nim
    }
  }
`;
