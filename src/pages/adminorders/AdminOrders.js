import React, {useMemo, useEffect, useState} from 'react';
import './AdminOrders.css';
import AdminLayout from "../../components/adminlayout/AdminLayout";
import {Table} from '../../components/table/Table';
import OrderApi from '../../apis/OrderApi';

const status = "pending"

const AdminOrders = (props) => {
  const [data, setdata] = useState([]);

   useEffect(() => {

    (async()=>{
      const result = await OrderApi.adminGetOrderByStatus(status);
      console.log("result: " + result);
    })();
   }, [])

  const columns = useMemo(
    () => [
      {
        Header: 'Ordered By',
        columns: [
          {
            Header: 'First Name',
            accessor: 'firstName',
          },
          {
            Header: 'Last Name',
            accessor: 'lastName',
          },
          {
            Header: 'Email',
            accessor: 'email',
          },
        ],
      },
      {
        Header: 'Info',
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
            Header: 'Status',
            accessor: 'status',
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