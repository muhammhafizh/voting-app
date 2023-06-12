import { storage } from "../../firebase/Firebase";
import { ref, deleteObject } from "firebase/storage";
import { useMutation, useSubscription } from "@apollo/client";
import {
  DELETE_PASLON_DATA,
  GET_PASLON_IN_VOTING,
  INSERT_PASLON_IN_VOTING,
  SUBSCRIBE_PASLON,
} from "../../apollo/Paslon";
import updateIcon from "../../assets/update.svg";
import deleteIcon from "../../assets/delete.svg";
import checkListIcon from "../../assets/Checkmark.svg";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { MAHASISWA_ID } from "../../apollo/User";

function HomePage() {
  const { data, loading } = useSubscription(SUBSCRIBE_PASLON);
  const [deletePaslon, { loading: loadingDelete }] =
    useMutation(DELETE_PASLON_DATA);
  const [insertInVoting] = useMutation(INSERT_PASLON_IN_VOTING);
  const { data: dataMahasiswa } = useSubscription(MAHASISWA_ID);
  const { data: dataPaslonInVoting } = useSubscription(GET_PASLON_IN_VOTING);

  const dataPaslon = [];
  dataPaslonInVoting?.mini_project_voting?.map((dt) => {
    dataPaslon.push(dt.paslon_id);
  });

  const handleSave = async (idPsln, jnspsln) => {
    const newData = [];

    dataMahasiswa?.mini_project_users?.map((dt) => {
      newData.push({
        isUserVoted: false,
        paslon_id: idPsln,
        user_id: dt.id,
        status_paslon: jnspsln,
      });
    });

    const objectsData = {
      newData,
    };

    insertInVoting({
      variables: {
        objects: objectsData.newData,
      },
    });
  };

  const handleDelete = async (deleteImage, deleteID) => {
    swal({
      title: "Are you sure?",
      text: "Apakah anda yakin untuk menghapus kandidat ini",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const desertRef = ref(storage, deleteImage);

        // Delete the file
        deleteObject(desertRef)
          .then(() => {
            console.log("image deleted");
          })
          .catch((error) => {
            console.log(error);
          });

        deletePaslon({
          variables: {
            idDelete: deleteID,
          },
        });

        swal("Kandidat berhasil dihapus", {
          icon: "success",
        });
      } else {
        swal("Kandidat masih tersimpan");
      }
    });
  };

  if (loading || loadingDelete) {
    return <h1 className="text-orange-400">Please Wait</h1>;
  }

  if (data?.mini_project_paslon.length === 0) {
    return <h1 className="text-red-400">Please Input candidate</h1>;
  }

  return (
    <>
      <div className="block md:flex w-full">
        {data?.mini_project_paslon.map((paslon) => {
          return (
            <div key={paslon.id}>
              <div className="flex mb-10 mb-md:0 md:mr-10">
                <div className="rounded-lg shadow-xl bg-white max-w-sm">
                  <img
                    className="rounded-t-lg"
                    src={paslon.imageUrl}
                    alt={`${paslon.nama_ketua} dan ${paslon.nama_wakil}`}
                  />
                  <div className="p-6" key={paslon.id}>
                    <span className="py-1 uppercase text-gray-500 font-bold">
                      total voting{" "}
                      <span className="ml-2">{paslon.total_vote}</span>
                    </span>
                    <div className="flex mt-3">
                      <Link to={`/Admin/UpdateCandidate/${paslon.id}`}>
                        <button
                          type="button"
                          className="inline-block rounded-full bg-blue-300 leading-normal shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-9 h-9"
                        >
                          <img src={updateIcon} className="m-auto" />
                        </button>
                      </Link>
                      <button
                        onClick={() =>
                          handleDelete(paslon.imageFileName, paslon.id)
                        }
                        type="button"
                        className="inline-block rounded-full bg-red-300 leading-normal shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out w-9 h-9 ml-4"
                      >
                        <img src={deleteIcon} className="mx-auto" />
                      </button>
                      {dataPaslon.includes(paslon.id) === false && (
                        <button
                          onClick={() =>
                            handleSave(paslon.id, paslon.jenis_paslon)
                          }
                          type="button"
                          className="inline-block rounded-full bg-green-300 leading-normal shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out w-9 h-9 ml-4"
                        >
                          <img src={checkListIcon} className="mx-auto p-2" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default HomePage;
