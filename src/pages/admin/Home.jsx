import { storage } from "../../firebase/Firebase";
import { ref, deleteObject } from "firebase/storage";
import { useMutation, useSubscription } from "@apollo/client";
import {
  GET_PASLON_FOR_ADMIN,
  DELETE_PASLON_DATA,
  SUBSCRIBE_PASLON,
} from "../../apollo/Paslon";
import updateIcon from "../../assets/update.svg";
import deleteIcon from "../../assets/delete.svg";
import { Link } from "react-router-dom";
import swal from "sweetalert";

function HomePage() {
  const { data, loading } = useSubscription(SUBSCRIBE_PASLON);
  const [deletePaslon, { loading: loadingDelete }] = useMutation(
    DELETE_PASLON_DATA,
    {
      refetchQueries: [GET_PASLON_FOR_ADMIN],
    }
  );

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
                      <span className="ml-2">{paslon.total_voted}</span>
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
