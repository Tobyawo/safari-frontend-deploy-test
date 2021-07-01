import React, {useMemo} from 'react';
import './AdminOrders.css';
import AdminLayout from "../../components/adminlayout/AdminLayout";
import {Table} from '../../components/table/Table';

const AdminOrders = (props) => {

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
            accessor: 'total cost',
          },
          {
            Header: 'Delivery Method',
            accessor: 'delivery method',
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

  const data = [];

  return (
     <AdminLayout>
      <div className="orders-wrapper">
        <Table columns={columns} data={data}/>
      </div>
     </AdminLayout>
  );
}

export default AdminOrders;