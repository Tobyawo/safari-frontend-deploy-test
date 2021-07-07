import axios from 'axios'
import BaseUrl from './BaseUrl';
import setHeader from '../utilities/Header';

const OrderApi = {

    getOrderByUser: async () => {
      const { data: userOrders } = await axios.get(`${BaseUrl}/orders/user`, setHeader());
      
      return userOrders;
    },

    adminGetOrderByStatus: async (status) => {

        const { data: ordersByStatus } = await axios.get(`${BaseUrl}/orders/admin/status?status=${status}`, setHeader());
        
        return ordersByStatus;
      },

}


export default OrderApi;
