import { action, makeObservable, observable } from 'mobx';
import CategoryService from '../services/api';

class CategoryStore {
  categories = [];
  
  loading = {
    gettingCategories: false,
    addingCategory: false,
    deletingCategory: false,
    updatingCategory: false,
  };
  
  constructor() {
    makeObservable(this, {
      categories: observable,
      loading: observable,
      loadCategories: action, 
    });
  }
  
  loadCategories() {
    this.loading.gettingCategories = true;
    CategoryService.getCategories()
      .then(data => this.categories = data)
      .catch(error => console.log(`Error: ${error}`))
      .finally(() => this.loading.gettingCategories = false);
  }
  
  addCategory(category) {
    this.loading.addingCategory = true;
    CategoryService.addCategory(category)
      .then(data => {
        this.loadCategories();
        console.log(data.message);
      })
      .catch(error => console.log(`Error: ${error}`))
      .finally(() => this.loading.addingCategory = false)
  }
  
  deleteCategory(id) {
    this.loading.deletingCategory = true;
    CategoryService.deleteCategory(id)
      .then(data => {
        this.loadCategories();
        console.log(data.message);
      })
      .catch(error => console.log(`Error: ${error}`))
      .finally(() => this.loading.deletingCategory = false)
  }
  
  updateCategory(category) {
    this.loading.updatingCategory = true;
    CategoryService.updateCategory(category)
      .then(data => {
        this.loadCategories();
        console.log(data.message);
      })
      .catch(error => console.log(`Error: ${error}`))
      .finally(() => this.loading.updatingCategory = false)
  }
}

const categoryStore = new CategoryStore();

export default categoryStore; 