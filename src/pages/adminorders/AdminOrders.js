import React, {useMemo, useEffect, useState} from 'react';
import './AdminOrders.css';
import AdminLayout from "../../components/adminlayout/AdminLayout";
import {Table} from '../../components/table/Table';

const AdminOrders = (props) => {
  const [data, setdata] = useState([]);
   const url = "https://safariwebstoreapp.herokuapp.com/orders/admin/status";
   const datas = [
    {
      firstName: "David",
      lastName: "Oparanti",
      email: "david@gmail.com",
     
      quantity: "2",
      totalCost: "2000",
      deliveryMethod: "debitcard",
      status: "DELIVERED"
       
    },
    {
      firstName: "Emmanuel",
      lastName: "Macauley",
      email: "emmanuelmac@gmail.com",
    
      quantity: "1",
      totalCost: "1000",
      deliveryMethod: "debitcard",
      status: "DELIVERED",
    
    }
  ];
   useEffect(() => {
    //  fetch(url)
    //  .then(response => response.json())
    //  .then(data => setdata(data))
    setdata(datas)
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