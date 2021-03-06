import * as api from '../utils/api';


async function getAllProducts() { 
    const options = {
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include'
    }
    return await api.httpRequest(`/menu/all-products`, options)
}

async function getProductsByMenuCategory(category , page) { 
    const options = {
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include'
    }
    return await api.httpRequest(`/menu/${category}?page=${page}`, options)
}

async function getProductByName(productName) { 
    const options = {
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include'
    }
    return await api.httpRequest(`/menu/product-name/${productName}`, options)
}



async function createProduct(data) { 
    const options = {
        method: 'POST',
        body: data,
        credentials: 'include'
    }
    return await api.httpRequest('/menu/create-product', options)
}

async function deleteProduct(id) { 
    const options = {
        method: 'POST',
        headers : { 
            'Content-Type' : 'application/json',
        },
        credentials: 'include'
    }
    return await api.httpRequest(`/menu/delete-product/${id}`, options)

}

async function getProductByID(id) { 
    const options = {
        headers : { 
            'Content-Type' : 'application/json',
        },
        credentials: 'include'
    }
    return await api.httpRequest(`/menu/product/${id}`, options)
}



async function editProduct(id , data) { 
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body : JSON.stringify(data),
        credentials: 'include'
    }
    return await api.httpRequest(`/menu/edit-product/${id}`, options)
}


async function deleteImage(imageID , productID) { 
    const options = {
        method: 'POST',
        credentials: 'include'
    }
    return await api.httpRequest(`/menu/delete-image/${imageID}/${productID}`, options)
}


async function update(id , imageID) { 
    const options = {
        method : 'PATCH',
        headers : { 
            'Content-Type' : 'application/json',
        },
        body : JSON.stringify([imageID]),
        credentials: 'include'
    }
    return await api.httpRequest(`/menu/update-product/${id}`, options)
}






export { 
    getAllProducts,
    getProductsByMenuCategory,
    getProductByName,
    createProduct,
    getProductByID,
    deleteProduct,
    editProduct,
    deleteImage,
    update
}