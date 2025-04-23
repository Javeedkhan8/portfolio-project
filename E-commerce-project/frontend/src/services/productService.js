import API from "./api";

export const getProducts = async () => {
    const {data} = await API.get("/products");
    return data;
}

export const getProductById = async (id) => {
    const {data} = await API.get(`/products/${id}`);
    return data;
}

export const createProduct = async (productData,token) => {
    const {data} = await API.post("/products",productData,{
        headers:{Authorization:`Bearer ${token}`},
    });
    return data;
}

export const updateProduct = async (id,productData,token) => {
    const {data} = await API.put(`/products/${id}`,productData,{
        headers:{Authorization:`Bearer ${token}`},
    });
    return data;
}

export const deleteProduct = async (id, token) => {
    const { data } = await API.delete(`/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  };