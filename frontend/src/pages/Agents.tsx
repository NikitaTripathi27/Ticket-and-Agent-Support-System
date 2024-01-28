import { IoMdAdd } from "react-icons/io";
import useCreateAgentModal from "../hooks/useCreateAgentModal";
import CreateAgentModal from "../components/modals/CreateAgentModal";
import { TAgent } from "../types";
import moment from "moment";
import { useAgents } from "../hooks/useAgents";

const Agents = () => {
  const createAgentModal = useCreateAgentModal();
  const {
    data: agents,
    isLoading,

  } = useAgents();


  return (
    <>
      <div>
        <button
          onClick={createAgentModal.onOpen}
          className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-3 font-medium cursor-pointer rounded-lg text-lg flex items-center justify-center gap-2"
        >
          Add Agent
          <IoMdAdd size={22} />
        </button>
        <div className="relative overflow-x-auto my-8">
          <table className="w-full rounded-lg ">
            <thead className="uppercase text-gray-700 bg-gray-100 h-12 rounded-t-lg text-nowrap text-center">
              <tr>
                <th scope="col" className="px-6 py-3">
                  id
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Phone
                </th>
                <th scope="col" className="px-6 py-3">
                  Created On
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
              </tr>
            </thead>
            {isLoading ? (
              "Loading"
            ) : agents.length > 0 ? (
              <tbody>
                {agents.map((agent: TAgent, index: number) => (
                  <tr
                    key={agent._id}
                    className="text-center border border-t-0 border-b-gray-300"
                  >
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4">{agent.name}</td>
                    <td className="px-6 py-4">{agent.email}</td>
                    <td className="px-6 py-4">{agent.phone}</td>
                    <td className="px-6 py-4">
                      {moment(agent.dateCreated).format("DD MMM, YYYY")}
                    </td>
                    <td className="px-6 py-4">
                      <div
                        className={`rounded px-3 py-1 text-sm inline-block border ${
                          agent.active
                            ? "boreder-green-600 text-green-600"
                            : "border-red-600 text-red-600"
                        }`}
                      >
                        {agent.active ? "Active" : "In Active"}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <div className="flex justify-center items-center text-xl font-semibold opacity-70 text-center border border-gray-300 border-top-0 h-[200px] w-full">
                No Data
              </div>
            )}
          </table>
        </div>
      </div>
      <CreateAgentModal />
    </>
  );
};

export default Agents;
