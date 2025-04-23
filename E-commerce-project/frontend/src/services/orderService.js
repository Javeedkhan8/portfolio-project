import API from "./api";

export const createOrder = async (orderData,token) => {
    const {data} = await API.post("/orders",orderData,{
        headers:{Authorization:`Bearer ${token}`},
    })
    return data;
} 

export const getOrderById = async (id, token) => {
    const { data } = await API.get(`/orders/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  };

  export const getAllOrders = async (token) => {
    const { data } = await API.get("/orders", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  };