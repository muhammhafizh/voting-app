import { useSubscription, useMutation } from "@apollo/client";
import {
  GET_DATA_MAHASISWA_FOR_ADMIN,
  INPUT_MAHASISWA_DATA,
  DELETE_MAHASISWA_DATA,
} from "../../apollo/User";
import { uuidv4 } from "@firebase/util";
import { useRef } from "react";
import { storage } from "../../firebase/Firebase";
import {
  getDownloadURL,
  uploadBytes,
  ref,
  deleteObject,
} from "firebase/storage";
import swal from "sweetalert";

function UsersPage() {
  const { data, loading } = useSubscription(GET_DATA_MAHASISWA_FOR_ADMIN);
  const [insertData] = useMutation(INPUT_MAHASISWA_DATA);
  const [deleteData, { loading: loadingDelete }] = useMutation(
    DELETE_MAHASISWA_DATA
  );
  const pdfFile = useRef(null);

  if (loading || loadingDelete) {
    return <h1 className="text-orange-400">Please Wait</h1>;
  }

  const inputDataMahasiswa = async (e) => {
    e.preventDefault();
    if (pdfFile === null) alert("anda belum memasukan file");

    const metadata = {
      contentType: pdfFile.current?.files[0].type,
      firebaseStorageDownloadTokens: uuidv4(), //In this line you are adding the access token
    };

    const inputPdf = pdfFile.current?.files[0];
    const fileName = `images/${pdfFile.current?.files[0].name}`;
    const pdfRef = ref(storage, fileName);

    await uploadBytes(pdfRef, inputPdf, metadata)
      .then(() => {
        getDownloadURL(pdfRef)
          .then((url) => {
            insertData({
              variables: {
                link: url,
                fileName: fileName,
              },
            });
            swal("Success", "Data Mahasiswa berhasil ditambahkan", "success");
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  const deleteDataMahasiswa = async (e, url) => {
    e.preventDefault();
    swal({
      title: "Are you sure?",
      text: "Apakah anda yakin untuk menghapus kandidat ini",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const desertRef = ref(storage, url);

        // Delete the file
        deleteObject(desertRef)
          .then(() => {
            console.log("image deleted");
          })
          .catch((error) => {
            console.log(error);
          });

        deleteData({
          variables: {
            link: url,
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

  return (
    <div className="flex flex-col">
      <form>
        {data.mini_project_mahasiswa[0]?.link ? (
          <>
            <button
              className="px-3 py-1 bg-red-400 text-white rounded-md"
              onClick={(e) =>
                deleteDataMahasiswa(e, data?.mini_project_mahasiswa[0]?.link)
              }
            >
              Delete Mahasiswa Data
            </button>
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8 mt-3">
              <div className="py-4 inline-block min-w-full sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <object
                    data={data?.mini_project_mahasiswa[0]?.link}
                    width="50%"
                    height="400"
                  />
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <input type="file" ref={pdfFile} />
            <button
              className="px-3 py-1 bg-slate-400 text-white rounded-md mr-4"
              onClick={(e) => inputDataMahasiswa(e)}
            >
              Save
            </button>
          </>
        )}
      </form>
    </div>
  );
}

export default UsersPage;
