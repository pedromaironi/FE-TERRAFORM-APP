
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProductForm from '../../components/Product/ProductForm';
import {
  fetchProducts,
  addProduct,
  editProduct,
  deleteProduct,
} from '../../actions/product.actions';
import { login } from '../../actions/auth.actions';

const Dashboard = () => {
  const dispatch = useDispatch();
  const {products} = useSelector((state) => state.products);
  const { token, isAuthenticated } = useSelector((state) => state.auth);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    
      dispatch(login("pedro", "12345678"));
    
      dispatch(fetchProducts(token));
    
  }, [dispatch, isAuthenticated, token]);
  
  const handleAddProduct = (product) => {
    dispatch(addProduct(product, token));
    setIsModalOpen(false);
  };

  const handleEditProduct = (product) => {
    dispatch(editProduct(product, token));
    setIsModalOpen(false);
  };

  const handleDeleteProduct = (productId) => {
    dispatch(deleteProduct(productId, token));
  };

  const handleOpenModal = (product = null) => {
    setCurrentProduct(product);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-gray-100 p-8 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-center">
          Gestión de Productos
        </h1>

        <div className="mb-4 text-right">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => handleOpenModal()}
          >
            Agregar Producto
          </button>
        </div>

        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2">Product ID</th>
              <th className="py-2">Nombre</th>
              <th className="py-2">Categoría</th>
              <th className="py-2">Precio</th>
              <th className="py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td className="py-2 text-center">{product._id}</td>
                <td className="py-2 text-center">{product.name}</td>
                <td className="py-2 text-center">{product.category}</td>
                <td className="py-2 text-center">{product.price}</td>
                <td className="py-2 text-center">
                  <button
                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-700 mr-2"
                    onClick={() => handleOpenModal(product)}
                  >
                    Editar
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
                    onClick={() => handleDeleteProduct(product._id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <ProductForm
          product={currentProduct}
          onSave={currentProduct ? handleEditProduct : handleAddProduct}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;