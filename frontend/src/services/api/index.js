import axios from 'axios';

const Category = {
  getCategories: () => axios.get('/api/categories')
    .then(({ data: { categories } }) => categories),
  addCategory: category => axios.post('/api/add-category', { category: category })
    .then(({ data }) => data),
  deleteCategory: id => axios.post('/api/delete-category', { id: id })
    .then(({ data }) => data),
  updateCategory: (category) => axios.put('/api/update-category', { category: category })
    .then(({ data }) => data),
};

export default Category;