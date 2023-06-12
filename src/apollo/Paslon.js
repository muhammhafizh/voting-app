import { gql } from "@apollo/client";

export const INSERT_PASLON_DATA = gql`
  mutation insert_paslon(
    $nama_ketua: String
    $nama_wakil: String
    $visi: String
    $misi: String
    $imageFileName: bpchar
    $imageUrl: bpchar
    $jenis_paslon: String
  ) {
    insert_mini_project_paslon_one(
      object: {
        nama_ketua: $nama_ketua
        nama_wakil: $nama_wakil
        visi: $visi
        misi: $misi
        imageFileName: $imageFileName
        imageUrl: $imageUrl
        total_vote: 0
        jenis_paslon: $jenis_paslon
      }
    ) {
      id
      nama_ketua
      nama_wakil
      visi
      misi
      imageUrl
      imageFileName
      total_vote
      jenis_paslon
    }
  }
`;

export const DELETE_PASLON_DATA = gql`
  mutation deletePaslon($idDelete: Int) {
    delete_mini_project_paslon(where: { id: { _eq: $idDelete } }) {
      returning {
        nama_ketua
        nama_wakil
      }
    }
  }
`;

export const SUBSCRIBE_PASLON = gql`
  subscription subscribePaslon {
    mini_project_paslon {
      imageUrl
      imageFileName
      id
      total_vote
      misi
      visi
      nama_ketua
      nama_wakil
      jenis_paslon
    }
  }
`;

export const UPDATE_PASLON = gql`
  mutation updatePaslon(
    $id: Int!
    $nama_ketua: String
    $nama_wakil: String
    $misi: String
    $visi: String
    $jenis_paslon: String
  ) {
    update_mini_project_paslon_by_pk(
      pk_columns: { id: $id }
      _set: {
        nama_ketua: $nama_ketua
        nama_wakil: $nama_wakil
        misi: $misi
        visi: $visi
        jenis_paslon: $jenis_paslon
      }
    ) {
      nama_ketua
      nama_wakil
      misi
      visi
      jenis_paslon
    }
  }
`;

export const PASLON_GET_VOTED = gql`
  mutation paslonGetVote($idPaslon: Int!, $total_voted: Int!) {
    update_mini_project_paslon(
      where: { id: { _eq: $idPaslon } }
      _set: { total_vote: $total_voted }
    ) {
      returning {
        nama_ketua
        nama_wakil
      }
    }
  }
`;

export const GET_PASLON_BY_ID = gql`
  subscription getPaslonById($id: Int!) {
    mini_project_paslon(where: { id: { _eq: $id } }) {
      imageFileName
      imageUrl
      misi
      nama_ketua
      nama_wakil
      visi
      jenis_paslon
    }
  }
`;

export const UPDATE_IMAGE_PASLON = gql`
  mutation updateImagePaslon($id: Int, $imageUrl: bpchar) {
    update_mini_project_paslon(
      where: { id: { _eq: $id } }
      _set: { imageUrl: $imageUrl }
    ) {
      returning {
        imageUrl
      }
    }
  }
`;

export const PASLON_ID = gql`
  subscription getPaslonID {
    mini_project_paslon(order_by: { id: desc }) {
      id
      jenis_paslon
    }
  }
`;

export const GET_PASLON_IN_VOTING = gql`
  subscription getPaslonInVoting {
    mini_project_voting(where: { paslon_id: { _is_null: false } }) {
      paslon_id
    }
  }
`;

export const INSERT_PASLON_IN_VOTING = gql`
  mutation insertPaslonInVoting(
    $objects: [mini_project_voting_insert_input!]!
  ) {
    insert_mini_project_voting(objects: $objects) {
      returning {
        paslon_id
        user_id
        isUserVoted
        status_paslon
      }
    }
  }
`;

export const GET_PASLON_FROM_NAME = gql`
  query getPaslonFromID($id: order_by = desc) {
    mini_project_paslon(order_by: { id: $id }) {
      id
    }
  }
`;
