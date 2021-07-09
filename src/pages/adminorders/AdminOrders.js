import React, {useMemo, useEffect, useState} from 'react';
import './AdminOrders.css';
import AdminLayout from "../../components/adminlayout/AdminLayout";
import {Table, SelectColumnFilter} from '../../components/table/Table';
import OrderApi from '../../apis/OrderApi';

// const status = "pending"

const AdminOrders = (props) => {
  const [data, setdata] = useState([]);

   useEffect(() => {

    (async()=>{
      const result = await OrderApi.adminGetAllOrders();    
      setdata(result);
    })();
   }, [])

  const columns = useMemo(
    () => [
      {
        Header: 'Shipping Address',
        columns: [
          {
            Header: 'Name',
            accessor: 'shippingAddress.fullName',
          },
          {
            Header: 'Email',
            accessor: 'shippingAddress.email',
          },
          {
            Header: 'Address',
            accessor: 'shippingAddress.address',
          },
        ],
      },
      {
        Header: 'Order Information',
        columns: [
          {
            Header: 'Quantity',
            accessor: 'quantity',
          },
          {
            Header: 'Total Cost',
            accessor: 'totalCost',
          },
          {
            Header: 'Delivery Method',
            accessor: 'deliveryMethod',
          },
          {
            Header: 'Payment Type',
            accessor: 'paymentType',
          },
          {
            Header: 'Status',
            accessor: 'status',
            Filter: SelectColumnFilter,
            filter: 'includes',
          },
        ],
      },
    ],
    []
  )

  

  return (
     <AdminLayout>
      <div className="orders-wrapper">
        <Table columns={columns} data={data}/>
      </div>
     </AdminLayout>
  );
}

export default AdminOrders;