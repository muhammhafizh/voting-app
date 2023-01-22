import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GET_PASLON_BY_ID, UPDATE_PASLON } from "../../apollo/Paslon";
import { useMutation, useQuery } from "@apollo/client";
import swal from "sweetalert";
import { storage } from "../../firebase/Firebase";
import { ref, updateMetadata } from "firebase/storage";

function UpdateCandidatePage() {
  const { id } = useParams();
  const [updatePaslon] = useMutation(UPDATE_PASLON);
  const navigate = useNavigate();
  const { data, loading } = useQuery(GET_PASLON_BY_ID, {
    variables: { id },
  });
  const [showModal, setShowModal] = useState(false);

  const baseData = {
    newKetua: "",
    newWakil: "",
    newVisi: "",
    newMisi: "",
    imageCandidate: "",
  };

  const [newData, setNewData] = useState(baseData);

  useEffect(() => {
    setNewData({
      newKetua: data?.mini_project_paslon[0]?.nama_ketua,
      newWakil: data?.mini_project_paslon[0]?.nama_wakil,
      newVisi: data?.mini_project_paslon[0]?.visi,
      newMisi: data?.mini_project_paslon[0]?.misi,
      imageCandidate: data?.mini_project_paslon[0]?.imageUrl,
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
      },
    });

    swal("Success", "Data kandidat berhasil di update", "success");
    navigate("/Admin");
  };

  const editImage = (e) => {
    e.preventDefault();

    setShowModal(true);
  };

  if (loading || newData.newKetua === "") {
    return <h1>Please Wait</h1>;
  }

  return (
    <>
      <div
        className={`w-2/3 md:w-1/2 h-full mt-0 md:flex md:ml-40 md:mt-24 ${
          showModal ? "blur transition duration-300 ease-in-out absolute" : ""
        }`}
      >
        <div className="mb-5 md:mb-0 md:mr-40 flex md:block">
          <img
            src={newData.imageCandidate}
            className="md:w-60 md:h-60 w-20 h-20"
          />
          <button
            onClick={(e) => editImage(e)}
            className="md:mt-3 rounded-lg h-10 md:h-auto p-1 md:p-3 bg-sky-500 text-white hover:bg-sky-700 ml-7 md:ml-0"
          >
            Edit Image
          </button>
        </div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="block mb-3 md:flex md:mb-9">
            <div className="mb-4 md:mb-0">
              <label className="uppercase text-gray-400 font-bold mb-2 block">
                Nama Ketua
              </label>
              <input
                value={newData?.newKetua || ""}
                name="newKetua"
                onChange={handleChange}
                type="text"
                className="border border-gray-300 bg-gray-200 text-gray-400 focus:outline-none focus:border-sky-500 focus:bg-white focus:text-black px-3 py-2"
              />
            </div>
            <div className="md:ml-7">
              <label className="uppercase text-gray-400 font-bold mb-2 block">
                Nama wakil
              </label>
              <input
                value={newData?.newWakil || ""}
                name="newWakil"
                onChange={handleChange}
                type="text"
                className="border border-gray-300 bg-gray-200 text-gray-400 focus:outline-none focus:border-sky-500 focus:bg-white focus:text-black px-3 py-2"
                disabled={showModal ? "true" : "false"}
              />
            </div>
          </div>
          <div className="mb-3 md:mb-8">
            <label className="uppercase text-gray-400 font-bold mb-2 block">
              Masukan visi
            </label>
            <textarea
              value={newData?.newVisi || ""}
              name="newVisi"
              onChange={handleChange}
              className="border border-gray-300 focus:outline-none bg-gray-200 text-gray-400 focus:border-sky-500 focus:bg-white focus:text-black px-3 py-2"
              rows="3"
              cols="35"
              disabled={showModal ? "true" : "false"}
            />
          </div>
          <div className="mb-3 md:mb-4">
            <label className="uppercase text-gray-400 font-bold mb-2 block">
              Masukan misi
            </label>
            <textarea
              value={newData?.newMisi}
              name="newMisi"
              onChange={handleChange}
              className="border border-gray-300 focus:outline-none bg-gray-200 text-gray-400 focus:border-sky-500 px-3 py-2 focus:bg-white focus:text-black"
              rows="3"
              cols="35"
              disabled={showModal ? "true" : "false"}
            />
          </div>
          <button
            className="bg-violet-500 text-white px-3 py-2 hover:bg-violet-600"
            onClick={(e) => handleSubmit(e)}
          >
            Save changes
          </button>
        </form>
      </div>
      {showModal && (
        <div className="transition delay-700 duration-300 ease-in-out">
          <div className="mx-auto w-60 h-60 bg-slate-900">
            <h1 className="text-white">Update Image</h1>
          </div>
        </div>
      )}
    </>
  );
}

export default UpdateCandidatePage;
