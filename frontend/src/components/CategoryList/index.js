import React, { useEffect, useState } from 'react';
import { toJS } from 'mobx';
import { inject, observer } from 'mobx-react';
import { Button, Table, Input } from 'antd';
import { PlusOutlined, DeleteOutlined, CloseOutlined } from '@ant-design/icons';
import CategoryCreationSection from '../CategoryCreationSection';
import './styles.css';

const Categories = (props) => {
  const {
    categoryStore: store,
    categoryStore: { categories },
    categoryStore: { gettingCategories, addingCategory, deletingCategory, updatingCategory },
  } = props;

  const [isCategoryCreationSectionOpen, setIsCategoryCreationSectionOpen] = useState(false);
  const [isNewKeywordInputFieldVisible, setIsNewKeywordInputFieldVisible] = useState(false);
  const [categoryId, setCategoryId] = useState(null);
  const [keyword, setKeyword] = useState(null);
  const [isValidate, setIsValidate] = useState(false);
  
  const onKeywordInputBlur = event => {
    const { value } = event.target;
    setKeyword(value);
  }
  
  const addKeywordClickHandler = (id) => {
    if (isNewKeywordInputFieldVisible) {
      
      if (!keyword) {
        setIsValidate(true);
        return;
      }
      
      const modifiedToJsCategories = toJS(categories);
      const index = modifiedToJsCategories.findIndex(category => category._id === id);
      let category = modifiedToJsCategories[index];
      
      if (category.keywords) {
        category.keywords.push({
          title: keyword,
        });
      } else {
        category = {
          ...category,
          keywords: {
            title: keyword,
          },
        };
      }
      store.updateCategory(category);
      setIsNewKeywordInputFieldVisible(false);
      setIsValidate(false);
      setKeyword(null);
    } else {
      setIsNewKeywordInputFieldVisible(true);
      setCategoryId(id);
    }
  };
  
  const closeAddKeywordSection = () => {
    setKeyword(null);
    setIsValidate(false);
    setIsNewKeywordInputFieldVisible(false);
  };
  
  const columns = [
    {
      title: 'categories',
      dataIndex: 'category',
      width: '20%',
    },
    {
      title: 'keywords',
      dataIndex: 'keywords',
      width: '55%',
      render: (keywords, row) => (
        <div className="keywords-container">
          {
            keywords.map((keyword, index) => (
              <div
                key={`${row.category}-keyword-${index + 1}`}
                className="keyword"
              >
                {keyword.title}
              </div>
            ))
          }
          {
            isNewKeywordInputFieldVisible && categoryId && categoryId === row._id && (
              <div>
                <Input
                  className={`new-keyword-input ${isValidate ? 'validation-error-input' : ''}`}
                  onBlur={onKeywordInputBlur}
                />
              </div>
            )
          }
          <Button
            className="add-table-keyword-button"
            onClick={() => addKeywordClickHandler(row._id)}
            htmlType="submit"
          >
            <PlusOutlined/>
          </Button>
          {
            isNewKeywordInputFieldVisible && categoryId && categoryId === row._id && (
              <Button className="cancel-adding-table-keyword-button">
                <CloseOutlined onClick={closeAddKeywordSection}/>
              </Button>
            )
          }
        </div>
      ),
    }, 
    {
      title: 'category actions',
      width: '25%',
      className: 'category-actions',
      render: (row) => {
        return (
          <DeleteOutlined onClick={() => store.deleteCategory(row._id)} />
        );
      },
    }
  ];
  
  useEffect(() => {
    store.loadCategories();
  }, [store]);
  
  const createCategoryHandler = (category) => {
    store.addCategory(category);
    closeSection();
  };
  
  const onCreateCategoryButtonClick = () => {
    setIsCategoryCreationSectionOpen(true);
  };
  
  const closeSection = () => {
    setIsCategoryCreationSectionOpen(false);
  };
  
  return (
    <div>
      <Table
        rowKey={row => row._id}
        columns={columns}
        dataSource={categories}
        loading={gettingCategories || addingCategory || deletingCategory || updatingCategory}
        pagination={false}
      />
      {
        !isCategoryCreationSectionOpen && (
          <Button
            className="add-button"
            onClick={onCreateCategoryButtonClick}
          >
            add category
          </Button>
        ) 
      }
      {
        isCategoryCreationSectionOpen &&
        <CategoryCreationSection
          closeSection={closeSection}
          categories={toJS(categories)}
          createCategoryHandler={createCategoryHandler}
        />
      }
    </div>
    
  );
};

export default inject('categoryStore')(observer(Categories));