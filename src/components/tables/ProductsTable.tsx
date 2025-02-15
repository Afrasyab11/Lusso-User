import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCookies } from '../../utils/utils';
import '../layout/layout.scss';
import ConfirmationModal from '../popups/ConfirmationPopUp';

interface AppData {
  name: string;
  price: string;
  activeInstalls: string;
  avgRating: string;
  errors: string;
  lastUpdate: string;
  status: string;
  productId: string;
}

interface AppDataTableProps {
  data: AppData[];
}

const ProductTable = () => {
  const navigate = useNavigate();
  const [appData, setAppData] = useState<AppData[]>();
  const [confirmAction, setConfirmAction]: any = useState(false);
  const [loading, setLoading]: any = useState(false);
  const [curretProductId, setCurrentProductId] = useState('');

  const GetProducts = () => {
    let token = getCookies('authToken');
    if (!token) {
      return
      // navigate('/auth');
    }
    let headers = {
      'Authorization': `Bearer ${token}`
    }

    axios.get('https://api.lusso.dev/api/v1/products?size=10000', { headers: headers })
      .then((response) => {
        console.log('response', response?.data?.products);
        let products = response?.data?.products;
        let tempProducts = products?.map((product: any) => {
          return {
            name: product?.name,
            price: '$4.99',
            activeInstalls: '10,000+',
            avgRating: '4.5',
            errors: '5',
            lastUpdate: product?.createdOn.substring(0, 10),
            status: 'Active',
            productId: product?.productId
          }
        })
        setAppData(tempProducts);
      })
      .catch((error) => {
        console.log('error', error);
      })
  }
  useEffect(() => {
    GetProducts()
  }, [])

  const onDelete = (event: React.MouseEvent) => {
    event.stopPropagation();
    setConfirmAction(true);
  }

  const Delete = () => {
    console.log('delete action');
    setLoading(true);

    const token = getCookies('authToken');
    const headers = {
      Authorization: `Bearer ${token}`
    };
    const data = {
      productIds: [curretProductId]
    };

    axios.delete('https://api.lusso.dev/api/v1/products', {
      headers: headers,
      data: data
    })
      .then((response) => {
        console.log('Deleted successfully');
        setLoading(false);
        setConfirmAction(false);
        GetProducts()
      })
      .catch((error) => {
        console.error('Error deleting product:', error);
        setLoading(false);
      });
  }


  const centeredStyle = { textAlign: 'center' };



  const AppDataTable = () => {

    const handleUpdate = (e: any, details: AppData) => {
      e.stopPropagation()
      navigate(`/dev/editproduct/${details.productId}`)
    }

    return (
      <div style={{ maxWidth: "100%", overflowX: "auto" }} className='data-table-wrapper custom-scrollbar'>
        <table>
          <thead className="header-row">
            <tr>
              <th style={{ color: '#FFFFFF80', fontWeight: 500, fontSize: '1rem', textTransform: 'uppercase', textAlign: 'center' }}>App Name</th>
              <th style={{ color: '#FFFFFF80', fontWeight: 500, fontSize: '1rem', textTransform: 'uppercase', textAlign: 'center' }}>Visits</th>
              <th style={{ color: '#FFFFFF80', fontWeight: 500, fontSize: '1rem', textTransform: 'uppercase', textAlign: 'center' }}>Avg Rating</th>
              <th style={{ color: '#FFFFFF80', fontWeight: 500, fontSize: '1rem', textTransform: 'uppercase', textAlign: 'center' }}>Last Update</th>
              <th style={{ color: '#FFFFFF80', fontWeight: 500, fontSize: '1rem', textTransform: 'uppercase', textAlign: 'center' }}>Boost</th>
              <th style={{ color: '#FFFFFF80', fontWeight: 500, fontSize: '1rem', textTransform: 'uppercase', textAlign: 'center' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {appData?.map((app, index) => (
              <tr
                onClick={() => { navigate(`/dev/dashboard/productdetails/${app.productId}`) }}
                key={index}
                className="prouduct-data-row">
                <td style={{ textAlign: "center" }}>{app.name}</td>
                <td style={{ textAlign: "center" }}>{app.activeInstalls}</td>
                <td style={{ textAlign: "center" }}>{app.avgRating}</td>
                <td style={{ textAlign: "center" }}>{app.lastUpdate}</td>
                <td style={{ textAlign: "center" }}>{app.status}</td>
                <td className='flex flex-row items-center justify-center' style={{ textAlign: "center" }}>
                  <div className='flex flex-row gap-2 items-center justify-center'>
                    <button
                      style={{
                        backgroundColor: '#025E86',
                        paddingTop: 6,
                        paddingBottom: 6,
                        paddingLeft: 12,
                        paddingRight: 12,
                        borderRadius: 8
                      }}
                      onClick={(e) => handleUpdate(e, app)}
                    >
                      Update
                    </button>
                    <button
                      onClick={(e) => {
                        onDelete(e);
                        console.log('app?.productId', app)
                        setCurrentProductId(app?.productId);
                      }}
                      style={{
                        backgroundColor: '#E73877',
                        paddingTop: 6,
                        paddingBottom: 6,
                        paddingLeft: 12,
                        paddingRight: 12,
                        borderRadius: 8
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };




  return (
    <div className="product-table">
      <div className='flex flex-row items-center justify-between'>
        <div>
          <input
            placeholder='Search'
            className='table-searchInput'
            style={{ color: "#FFF" }}
          />
        </div>
        <div>
          <button
            onClick={() => { navigate('/dev/addproduct') }}
            style={{ color: '#FFF', fontWeight: 600, paddingLeft: 16, paddingRight: 16 }}
            className='AddProductButton'
          >
            + <span className='noMobile'>Add New Product</span>
          </button>
        </div>
      </div>
      <div className='mt-4 flex-1' style={{ overflow: "auto" }}>
        <AppDataTable />
      </div>
      <div style={{ color: '#FFF', fontWeight: 400, fontSize: '0.7rem', paddingTop: 8 }}>
        <span>Result 10 of 20 records</span>
      </div>
      {
        <ConfirmationModal loading={loading} open={confirmAction} onClose={() => { setConfirmAction(false) }} onConfirm={Delete} />
      }
    </div>
  )
}

export default ProductTable;