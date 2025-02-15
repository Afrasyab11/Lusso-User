import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import search from "../../assets/icons/search.png";
import threeDots from '../../assets/images/threeDots.png';
import { getCookies } from '../../utils/utils';
import '../layout/layout.scss';

interface AppData {
  fullName: string;
  email: string;
  joinedOn: string;
  role: string;
}

interface AppDataTableProps {
  data: AppData[];
}

const MembersTable = () => {
  const navigate = useNavigate();
  const [appData, setAppData] = useState<AppData[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const getMembersData = () => {
    const token = getCookies('authToken');
    axios
      .get('https://api.lusso.dev/api/v1/users?size=1000', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        setAppData(response?.data?.users);
      })
      .catch(() => {
      });
  };
  useEffect(() => {
    getMembersData();
  }, [])
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  const AppDataTable: React.FC<AppDataTableProps> = ({ data }) => {
    const userData = [
      {
        email: "ravipati@gmail.com",
        fullName: "Yesh",
        joinedOn: "12-09-2023",
        role: "Admin",
        userId: "43fe5dac687b92846d1f548daabdd4911f52fa66201e0797f38addf83d99d57a"
      },
      {
        email: "jeff@gmail.com",
        fullName: "Jeff",
        joinedOn: "12-09-2023",
        role: "Viewer",
        userId: "d3d1fa8a72e322cc7e40d78deb8790c0b065e12cd5f709451e333dcfdb81b589"
      },

      {
        email: "emma@gmail.com",
        fullName: "Emma Watson",
        joinedOn: "12-09-2023",
        role: "Editor",
        userId: "d44e5eae6af8d22390e057ef648573d7e13417e4cc99fb20d6ebf048d2446ef3"
      },
      {
        email: "sarah@gmail.com",
        fullName: "Sarah Johnson",
        joinedOn: "12-09-2023",
        role: "Viewer",
        userId: "f8d3f892b1d7cb5bfcf2a91251b5ecf029b8a8c9aa5fe6e5ac87296342e5e447"
      },
      {
        email: "michael@gmail.com",
        fullName: "Michael Brown",
        joinedOn: "12-09-2023",
        role: "Viewer",
        userId: "c8eab7bcab0c5b98b6cc84b942b8f5d2c0a4543dbe2f1cb9b1ffcb14567cabb8"
      },
      {
        email: "ravipati@gmail.com",
        fullName: "Yesh",
        joinedOn: "12-09-2023",
        role: "Admin",
        userId: "43fe5dac687b92846d1f548daabdd4911f52fa66201e0797f38addf83d99d57a"
      },
      {
        email: "jeff@gmail.com",
        fullName: "Jeff",
        joinedOn: "12-09-2023",
        role: "Viewer",
        userId: "d3d1fa8a72e322cc7e40d78deb8790c0b065e12cd5f709451e333dcfdb81b589"
      },

      {
        email: "emma@gmail.com",
        fullName: "Emma Watson",
        joinedOn: "12-09-2023",
        role: "Editor",
        userId: "d44e5eae6af8d22390e057ef648573d7e13417e4cc99fb20d6ebf048d2446ef3"
      },
      {
        email: "sarah@gmail.com",
        fullName: "Sarah Johnson",
        joinedOn: "12-09-2023",
        role: "Viewer",
        userId: "f8d3f892b1d7cb5bfcf2a91251b5ecf029b8a8c9aa5fe6e5ac87296342e5e447"
      },
      {
        email: "michael@gmail.com",
        fullName: "Michael Brown",
        joinedOn: "12-09-2023",
        role: "Viewer",
        userId: "c8eab7bcab0c5b98b6cc84b942b8f5d2c0a4543dbe2f1cb9b1ffcb14567cabb8"
      }
    ];

    const navigate = useNavigate();
    const filteredData = userData?.filter((item) =>
      item?.fullName?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      item?.email?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      item?.role?.toLowerCase()?.includes(searchQuery?.toLowerCase())
    );

    return (
      <div className='data-table-wrapper custom-scrollbar'>
        <table>
          <thead>
            <tr
              style={{
                background: "linear-gradient(125.12deg, #2D246C 6.52 %, #1A1442 34.28 %, #171232 53.59 %, #25204A 78.95 %)"
              }}
            >
              <th style={{ color: '#FFFFFF', padding: "40px 30px 10px 30px", fontWeight: 500, fontSize: '1rem', textTransform: 'uppercase', textAlign: 'center' }}>Full Name</th>
              <th style={{ color: '#FFFFFF', padding: "40px 30px 10px 30px", fontWeight: 500, fontSize: '1rem', textTransform: 'uppercase', textAlign: 'center' }}>Email Address</th>
              <th style={{ color: '#FFFFFF', padding: "40px 30px 10px 30px", fontWeight: 500, fontSize: '1rem', textTransform: 'uppercase', textAlign: 'center' }}>Joined</th>
              <th style={{ color: '#FFFFFF', padding: "40px 30px 10px 30px", fontWeight: 500, fontSize: '1rem', textTransform: 'uppercase', textAlign: 'center' }}>Permissions</th>
              <th style={{ color: '#FFFFFF', padding: "40px 30px 10px 30px", fontWeight: 500, fontSize: '1rem', textTransform: 'uppercase', textAlign: 'center' }}>Actions</th>
            </tr>
          </thead >

          <tbody className='bg-gradient-to-r from-[#2e246c] to-[#271f57]'>
            {filteredData?.map((app, index) => (
              <tr
                // onClick={() => { navigate('/dev/dashboard/productdetails') }}
                key={index}
                className="prouduct-data-row">
                <td style={{ textAlign: 'center' }}>{app.fullName}</td>
                <td style={{ textAlign: 'center' }}>{app.email}</td>
                <td style={{ textAlign: 'center' }}>{app.joinedOn}</td>
                <td className='flex flex-row items-center justify-center' style={{ textAlign: 'center' }}>
                  <div className='flex flex-row gap-2 items-center justify-center'>
                    <button
                      style={{
                        backgroundColor:
                          app.role === 'Editor' ? '#1F2124' :
                            app.role === 'Admin' ? '#E73877' :
                              app.role === 'Viewer' ? '#025E86' :
                                '',
                        paddingTop: 6,
                        paddingBottom: 6,
                        paddingLeft: 12,
                        paddingRight: 12,
                        borderRadius: 8
                      }}
                    >
                      {app.role}
                    </button>
                  </div>
                </td>
                <td style={{ textAlign: 'center' }}>
                  <img
                    src={threeDots}
                    alt='threeDots'
                    className='w-4 h-1 mx-auto'
                  />
                </td>

              </tr>
            ))}
          </tbody>
        </table >
      </div >
    );
  };



  return (
    <div className="members-table">
      <div className='flex flex-col sm:flex-row items-center justify-between mb-4 gap-4'>
        <div className="relative w-full sm:w-1/2 lg:w-1/3 rounded-full">
          <span className="absolute inset-y-0 left-5 flex items-center">
            <img src={search} alt="search" />
          </span>

          <input
            placeholder="Search Member"
            className="table-searchInput w-full pl-10 text-white rounded-md py-2 focus:outline-none"
            style={{
              paddingLeft: '3rem',
              borderRadius: "57px",
              border: "1px solid #464070",
              backgroundColor: "rgba(22, 19, 43, 0.5)",
              width: '100%',
              maxWidth: '400px',
            }}
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>

        <div className='flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto'>
          <select
            className='table-Dropdown bg-transparent text-white w-full sm:w-auto'
            style={{
              padding: '8px',
              minWidth: '400px',
              width: '100%',
              maxWidth: '100%',
              borderRadius: '6px',
              border: "1px solid #C49AF9"
            }}
          >
            <option value=''>Permissions All</option>
            <option value='admin'>Admin</option>
            <option value='user'>User</option>
            <option value='editor'>Editor</option>
          </select>

          <button
            onClick={() => navigate('/dev/addmember')}
            className='AddProductButton w-full sm:w-auto whitespace-nowrap'
            style={{
              color: '#FFF',
              fontWeight: 600,
              padding: '8px 16px',
              backgroundColor: '#1F2937',
              borderRadius: '8px',
              textAlign: 'center',
              minWidth: '120px',
            }}
          >
            + Add User
          </button>
        </div>
      </div>



      <div className='members-data-table'>
        <AppDataTable data={appData} />
      </div>
      {/* <div style={{ color: '#FFF', fontWeight: 400, fontSize: '0.7rem', paddingTop: 8 }}>
        <span>Result 10 of 20 records</span>
      </div> */}
    </div >
  )
}

export default MembersTable;