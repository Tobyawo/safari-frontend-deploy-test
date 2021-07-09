import axios from 'axios'
import BaseUrl from './BaseUrl';
import setHeader from '../utilities/Header';

const OrderApi = {

    getOrderByUser: async () => {
      const { data: userOrders } = await axios.get(`${BaseUrl}/orders/user`, setHeader());
      
      return userOrders;
    },

    adminGetAllOrders: async () => {

        const { data: allOrders } = await axios.get(`${BaseUrl}/orders/admin`,
            setHeader()
        );
        
        return allOrders;
      },

}


export default OrderApi;
