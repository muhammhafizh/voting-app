import { PASLON_GET_VOTED, SUBSCRIBE_PASLON } from "../../apollo/Paslon"
import { useMutation, useQuery, useSubscription } from "@apollo/client"
import { Link } from "react-router-dom"
import NavbarUserPage from "../../components/NavbarUser";
import { GET_USER_BY_ID, USER_VOTING } from "../../apollo/User";
import { Auth } from "../../utils/Auth";

function HomeUsers() {
  const idUser = Auth.getUserID()
  const { data, loading } = useSubscription(SUBSCRIBE_PASLON)
  const { data: dataUser, loading: loadingUser, refetch } = useQuery(GET_USER_BY_ID, {
    variables: { idUser }}
  )
  const [ userVoted ] = useMutation(USER_VOTING)
  const [ paslonGetVoted ] =useMutation(PASLON_GET_VOTED)

  const handleSubmit = async (paslonID, totalVotePaslon) => {
    //mutation table paslon where id = paslon id, set vote + 1
    await paslonGetVoted({
      variables: {
        idPaslon: paslonID,
        total_voted: totalVotePaslon + 1
      }
    })

    //Mutation table user where id = idUser, set isVoted = true
    await userVoted({
      variables: {
        idUser: idUser
      }
    })

    refetch()
  }

  if (loading || loadingUser) {
    return <h1 className="text-orange-400">Please Wait</h1>
  }

  const vote = dataUser.results[0].isUserVoted
  const name = dataUser.results[0].username

  if (data?.mini_project_paslon.length === 0) {
    return <h1 className="text-red-400">Maaf Kandidat tidak tersedia</h1>
  }

  return (
    <> 
      <NavbarUserPage name={name} />
      <div className="block md:flex w-full">
        {data?.mini_project_paslon.map((paslon) => {
          return (
            <div key={paslon.id}>
              <div className="flex mb-10 mb-md:0 md:mr-10 m-10">
                <div className="rounded-lg shadow-xl bg-white max-w-sm" key={paslon.id}>
                  <img className="rounded-t-lg" src={paslon.imageUrl} alt={`${paslon.nama_ketua} dan ${paslon.nama_wakil}`} />
                  <div className="p-6" key={paslon.id}>
                    <div className="flex mt-3">
                        <Link to='/User/VisiMisi' state={{  
                          image: paslon.imageUrl,
                          visi: paslon.visi, 
                          misi: paslon.misi, 
                          ketua: paslon.nama_ketua, 
                          wakil: paslon.nama_wakil
                        }}>
                          <button type="button" className="inline-block text-white bg-blue-300 leading-normal shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out p-3">
                            Visi & Misi
                          </button>
                        </Link>
                      <button onClick={() => handleSubmit(paslon.id, paslon.total_voted)} type="button" className={` ${vote ? 'inline-block bg-gray-600 leading-normal p-3 ml-4 text-white' : 'inline-block bg-green-300 leading-normal shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out p-3 ml-4'} `} disabled={vote}>
                        {vote ? "voted" : "vote"}
                      </button> 
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default HomeUsers