import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  GET_PASLON_BY_ID,
  UPDATE_IMAGE_PASLON,
  UPDATE_PASLON,
} from "../../apollo/Paslon";
import { useMutation, useSubscription } from "@apollo/client";
import swal from "sweetalert";
import { storage } from "../../firebase/Firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

function UpdateCandidatePage() {
  const options = ["BEM", "HIMA", "DPM"];
  const { id } = useParams();
  const [updatePaslon] = useMutation(UPDATE_PASLON);
  const [updateImagePaslon] = useMutation(UPDATE_IMAGE_PASLON);
  const navigate = useNavigate();
  const { data, loading } = useSubscription(GET_PASLON_BY_ID, {
    variables: { id },
  });
  const [showModal, setShowModal] = useState(false);
  const imageUpdate = useRef(null);
  const jenisPaslon = useRef(null);
  const baseData = {
    newKetua: "",
    newWakil: "",
    newVisi: "",
    newMisi: "",
    imageCandidate: "",
    imageFileName: "",
    paslonJenis: "",
  };

  const [newData, setNewData] = useState(baseData);

  useEffect(() => {
    setNewData({
      newKetua: data?.mini_project_paslon[0]?.nama_ketua,
      newWakil: data?.mini_project_paslon[0]?.nama_wakil,
      newVisi: data?.mini_project_paslon[0]?.visi,
      newMisi: data?.mini_project_paslon[0]?.misi,
      imageCandidate: data?.mini_project_paslon[0]?.imageUrl,
      imageFileName: data?.mini_project_paslon[0]?.imageFileName,
      paslonJenis: data?.mini_project_paslon[0]?.jenis_paslon,
    });
  }, [data]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setNewData({
      ...newData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await updatePaslon({
      variables: {
        id: id,
        nama_ketua: newData.newKetua,
        nama_wakil: newData.newWakil,
        visi: newData.newVisi,
        misi: newData.newMisi,
        jenis_paslon: jenisPaslon?.current?.value,
      },
    });

    swal("Success", "Data kandidat berhasil di update", "success");
    navigate("/Admin");
  };

  const editImage = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    // Create a reference to the file whose metadata we want to change
    const getImageRef = ref(storage, newData.imageFileName);

    const newImage = imageUpdate.current?.files[0];

    // Create file metadata to update
    const metaData = {
      cacheControl: "public,max-age=300",
      contentType: imageUpdate.current?.files[0].type,
    };

    await uploadBytes(getImageRef, newImage, metaData).then(() => {
      getDownloadURL(getImageRef)
        .then((url) => {
          updateImagePaslon({
            variables: {
              id: id,
              imageUrl: url,
            },
          });
          swal("Success", "Gambar kandidat berhasil di update", "success");
        })
        .catch((err) => console.log(err));
    });

    setShowModal(false);
  };

  if (loading || newData.newKetua === "") {
    return <h1>Please Wait</h1>;
  }

  const fromIndex = options.indexOf(newData.paslonJenis);
  const toIndex = 0;

  const element = options.splice(fromIndex, 1)[0];

  options.splice(toIndex, 0, element);

  return (
    <>
      <div
        className={`w-2/3 md:w-1/2 h-full mt-0 md:flex md:ml-40 md:mt-24 ${
          showModal ? "blur transition duration-300 ease-in-out absolute " : ""
        }`}
      >
        <div className="mb-5 md:mb-0 md:mr-40 flex md:block">
          <img
            src={newData.imageCandidate}
            className={`md:w-60 md:h-60 w-20 h-20`}
          />
          {!showModal && (
            <button
              onClick={(e) => editImage(e)}
              className="md:mt-3 rounded-lg h-10 md:h-auto p-1 md:p-3 bg-sky-500 text-white hover:bg-sky-700 ml-7 md:ml-0"
            >
              Edit Image
            </button>
          )}
        </div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="block mb-3 md:flex md:mb-9">
            <div className="mb-4 md:mb-0">
              <label className="uppercase text-gray-400 font-bold mb-2 block">
                Nama Ketua
              </label>
              {!showModal && (
                <input
                  value={newData?.newKetua || ""}
                  name="newKetua"
                  onChange={handleChange}
                  type="text"
                  className="border border-gray-300 bg-gray-200 text-gray-400 focus:outline-none focus:border-sky-500 focus:bg-white focus:text-black px-3 py-2"
                />
              )}
            </div>
            <div className="md:ml-7">
              <label className="uppercase text-gray-400 font-bold mb-2 block">
                Nama wakil
              </label>
              {!showModal && (
                <input
                  value={newData?.newWakil || ""}
                  name="newWakil"
                  onChange={handleChange}
                  type="text"
                  className="border border-gray-300 bg-gray-200 text-gray-400 focus:outline-none focus:border-sky-500 focus:bg-white focus:text-black px-3 py-2"
                />
              )}
            </div>
          </div>
          <div className="mb-3 md:mb-8">
            <label className="uppercase text-gray-400 font-bold mb-2 block">
              Masukan visi
            </label>
            {!showModal && (
              <textarea
                value={newData?.newVisi || ""}
                name="newVisi"
                onChange={handleChange}
                className="border border-gray-300 focus:outline-none bg-gray-200 text-gray-400 focus:border-sky-500 focus:bg-white focus:text-black px-3 py-2"
                rows="3"
                cols="35"
              />
            )}
          </div>
          <div className="mb-3 md:mb-4">
            <label className="uppercase text-gray-400 font-bold mb-2 block">
              Masukan misi
            </label>
            {!showModal && (
              <textarea
                value={newData?.newMisi}
                name="newMisi"
                onChange={handleChange}
                className="border border-gray-300 focus:outline-none bg-gray-200 text-gray-400 focus:border-sky-500 px-3 py-2 focus:bg-white focus:text-black"
                rows="3"
                cols="35"
              />
            )}
          </div>
          <div className="mb-3 md:mb-4">
            <label className="uppercase text-gray-400 font-bold mb-2 block">
              Jenis Paslon
            </label>
            {!showModal && (
              <select
                className="border border-gray-300 bg-gray-200 text-gray-400 w-64 md:w-72 p-3"
                ref={jenisPaslon}
              >
                {options.map((optionValue, index) => {
                  return (
                    <option key={index} value={optionValue}>
                      {optionValue}
                    </option>
                  );
                })}
              </select>
            )}
          </div>
          {!showModal && (
            <button
              className="bg-violet-500 text-white px-3 py-2 hover:bg-violet-600"
              onClick={(e) => handleSubmit(e)}
            >
              Save changes
            </button>
          )}
        </form>
      </div>
      {showModal && (
        <div className="transition delay-700 duration-300 mx-auto ease-in-out sm:absolute md:relative">
          <div className="mx-auto w-96 py-5 px-5 bg-slate-300 mt-20">
            <h1 className="text-white uppercase font-bold mb-4">
              Update Image
            </h1>
            <hr />
            <label className="block my-5">
              <span className="sr-only">Choose profile photo</span>
              <input
                type="file"
                className="block w-full text-sm text-slate-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-violet-50 file:text-violet-700
                  hover:file:bg-violet-100
                "
                ref={imageUpdate}
              />
            </label>
            <div className="flex mt-4">
              <button
                className="mr-4 bg-green-500 text-white hover:bg-green-600 px-2 py-1 rounded-lg"
                onClick={(e) => handleUpdate(e)}
              >
                Save
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-red-500 text-white rounded-lg hover:bg-red-600 px-2 py-1"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default UpdateCandidatePage;
