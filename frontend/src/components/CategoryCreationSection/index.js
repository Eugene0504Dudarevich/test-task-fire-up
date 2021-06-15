import { Button, Form, Input } from 'antd';
import './styles.css';

const CategoryCreationSection = (props) => {
  const {
    closeSection,
    createCategoryHandler,
  } = props;
  
  const [form] = Form.useForm();
  
  const createCategoryClickHandler = values => {
    const category = {
      category: values.category,
      keywords: values.keywords ? values.keywords
        .map((keyword, index) => ({
          title: keyword 
        })) : [],
    };
    
    if (createCategoryHandler) {
      createCategoryHandler(category);
    }
  };
  
  const cancelCategoryCreationHandler = () => {
    if (closeSection) {
      closeSection();
    }
  };
  
  return (
    <div>
      <Form
        form={form}
        onFinish={createCategoryClickHandler}
      >
        <Form.Item
          name="category"
          label="Category"
          rules={[
            {
              required: true,
              whitespace: true,
              message: 'Category field is required',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.List name="keywords">
          {
            (fields, {add, remove}) => (
              <>
                {
                  fields.map(field => (
                    <Form.Item
                      label="Keywords"
                      required={false}
                      key={field.key}
                    >
                      <Form.Item
                        {...field}
                        rules={[
                          {
                            required: true,
                            whitespace: true,
                            message: 'Keyword field is required',
                          }
                        ]}
                      >
                        <Input/>
                      </Form.Item>
                      {
                        fields.length > 1 ? (
                          <Button
                            className="remove-keyword-button"
                            onClick={() => remove(field.name)}>
                            <div className="minus" />
                          </Button>
                        ) : null
                      }
                    </Form.Item>
                  ))
                }
                <Form.Item>
                  <Button
                    className="add-keyword-button"
                    onClick={() => add()}>
                    Add Keyword
                  </Button>
                </Form.Item>
              </>
            )}
        </Form.List>
        <div className="buttons-block">
          <Form.Item>
            <Button
              htmlType="submit"
              className="add-category-button"
            >
              Add Category
            </Button>
          </Form.Item>
          <Button
            className="close-section-button"
            onClick={cancelCategoryCreationHandler}
          >
            Cancel
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CategoryCreationSection;