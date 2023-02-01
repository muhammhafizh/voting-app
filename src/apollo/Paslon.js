import { gql } from "@apollo/client";

export const GET_PASLON_FOR_ADMIN = gql`
  query getPaslonForAdmin {
    mini_project_paslon {
      imageFileName
      imageUrl
      id
    }
  }
`;

export const INSERT_PASLON_DATA = gql`
  mutation insert_paslon(
    $nama_ketua: String
    $nama_wakil: String
    $visi: String
    $misi: String
    $imageFileName: bpchar
    $imageUrl: bpchar
  ) {
    insert_mini_project_paslon_one(
      object: {
        nama_ketua: $nama_ketua
        nama_wakil: $nama_wakil
        visi: $visi
        misi: $misi
        imageFileName: $imageFileName
        imageUrl: $imageUrl
        total_voted: 0
      }
    ) {
      nama_ketua
      nama_wakil
      visi
      misi
      imageUrl
      imageFileName
      total_voted
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
      total_voted
      misi
      visi
      nama_ketua
      nama_wakil
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
  ) {
    update_mini_project_paslon_by_pk(
      pk_columns: { id: $id }
      _set: {
        nama_ketua: $nama_ketua
        nama_wakil: $nama_wakil
        misi: $misi
        visi: $visi
      }
    ) {
      nama_ketua
      nama_wakil
      misi
      visi
    }
  }
`;

export const PASLON_GET_VOTED = gql`
  mutation paslonGetVote($idPaslon: Int!, $total_voted: Int!) {
    update_mini_project_paslon(
      where: { id: { _eq: $idPaslon } }
      _set: { total_voted: $total_voted }
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
