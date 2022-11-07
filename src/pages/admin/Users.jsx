import { useSubscription } from "@apollo/client"
import { GET_USER_FOR_ADMIN } from "../../apollo/User"
import checklist from "../../assets/checklist.svg"

function UsersPage() {
  const { data, loading } = useSubscription(GET_USER_FOR_ADMIN)

  if (loading) {
    return <h1 className="text-orange-400">Please Wait</h1>
  }

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-4 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-center">
              <thead className="border-b bg-gray-800">
                <tr>
                  <th scope="col" className="text-sm font-medium text-white px-6 py-4">
                    username
                  </th>
                  <th scope="col" className="text-sm font-medium text-white px-6 py-4">
                    voted
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.mini_project_users.map((user) => {
                  return (
                    <tr className="bg-white border-b" key={user.id}> 
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {user.username}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {user.isUserVoted ? <img src={checklist} className="w-5" /> : " "}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UsersPage