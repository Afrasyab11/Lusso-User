import MembersTable from "../../components/tables/MembersTable";
import "../developer/dev.scss";
const AllMembers = () => {
    return (
        <div>
            <div className='text-white font-bold text-[24px] mb-8'>
                <span className="bg-gradient-to-r from-[#985FFF] to-[#FF99EF] bg-clip-text text-transparent">
                    Member Management
                </span>
            </div>
            <div className="flex-1">
                <MembersTable />
            </div>
        </div>
    )
}

export default AllMembers;