import { PASLON_GET_VOTED, SUBSCRIBE_PASLON } from "../../apollo/Paslon";
import { useMutation, useQuery, useSubscription } from "@apollo/client";
import { Link } from "react-router-dom";
import NavbarUserPage from "../../components/NavbarUser";
import {
  GET_USER_BY_ID,
  USER_VOTING,
  GET_USER_USING_ID,
} from "../../apollo/User";
import { Auth } from "../../utils/Auth";
import swal from "sweetalert";

function HomeUsers() {
  const idUser = Auth.getUserID();
  const { data, loading } = useSubscription(SUBSCRIBE_PASLON);
  const { data: dataUser, loading: loadingUser } = useQuery(GET_USER_BY_ID, {
    variables: { idUser },
  });

  const {
    data: dataUserContoh,
    loading: loadingUserContoh,
    refetch,
  } = useQuery(GET_USER_USING_ID, {
    variables: { idUser },
  });

  const paslonVoted = [];

  const NewData = dataUserContoh?.mini_project_voting?.filter(
    (vote) => vote.isUserVoted === true
  );

  NewData?.map((dt) => paslonVoted.push(dt.status_paslon));

  const [userVoted] = useMutation(USER_VOTING);
  const [paslonGetVoted] = useMutation(PASLON_GET_VOTED);

  const handleSubmit = async (paslonID, totalVotePaslon) => {
    //mutation table paslon where id = paslon id, set vote + 1
    await paslonGetVoted({
      variables: {
        idPaslon: paslonID,
        total_voted: totalVotePaslon + 1,
      },
    });

    //Mutation table voting where user_id = idUser and set isVoted = true
    await userVoted({
      variables: {
        user_id: idUser,
        paslon_id: paslonID,
      },
    });

    swal("Success", "Selamat anda berhasil voting", "success");
    refetch();
  };

  if (loadingUserContoh == undefined || loadingUserContoh == true) {
    return <h1 className="text-orange-400">Please Wait</h1>;
  }

  const name = dataUserContoh?.mini_project_voting?.[0].voting_user.username;

  if (dataUserContoh?.mini_project_voting.length === 0) {
    return <h1 className="text-red-400">Maaf Kandidat tidak tersedia</h1>;
  }

  return (
    <>
      <NavbarUserPage name={name} />
      <div className="block md:flex w-full">
        {dataUserContoh?.mini_project_voting?.map((paslon) => {
          return (
            <div key={paslon.voting_paslon.id}>
              <div className="flex mb-10 mb-md:0 md:mr-10 m-10">
                <div
                  className="rounded-lg shadow-xl bg-white max-w-sm"
                  key={paslon.voting_paslon.id}
                >
                  <img
                    className="rounded-t-lg"
                    src={paslon.voting_paslon.imageUrl}
                    alt={`${paslon.voting_paslon.nama_ketua} dan ${paslon.voting_paslon.nama_wakil}`}
                  />
                  <div className="p-6" key={paslon.id}>
                    <div className="flex mt-3">
                      <Link
                        to="/User/VisiMisi"
                        state={{
                          image: paslon.voting_paslon.imageUrl,
                          visi: paslon.voting_paslon.visi,
                          misi: paslon.voting_paslon.misi,
                          ketua: paslon.voting_paslon.nama_ketua,
                          wakil: paslon.voting_paslon.nama_wakil,
                        }}
                      >
                        <button
                          type="button"
                          className="inline-block font-semibold text-white bg-blue-500 leading-normal shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out p-3"
                        >
                          Visi & Misi
                        </button>
                      </Link>
                      <button
                        onClick={() =>
                          handleSubmit(
                            paslon.voting_paslon.id,
                            paslon.voting_paslon.total_vote
                          )
                        }
                        type="button"
                        className={` ${
                          paslonVoted.includes(
                            paslon.voting_paslon.jenis_paslon
                          )
                            ? "inline-block bg-gray-600 leading-normal p-3 ml-4 text-white"
                            : "inline-block text-white font-semibold bg-green-500 leading-normal shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out p-3 ml-4"
                        } `}
                        disabled={
                          paslonVoted.includes(
                            paslon.voting_paslon.jenis_paslon
                          )
                            ? true
                            : false
                        }
                      >
                        {paslonVoted.includes(paslon.voting_paslon.jenis_paslon)
                          ? "voted"
                          : "vote"}
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

export default HomeUsers;
