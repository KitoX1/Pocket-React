import moment from 'moment';
import { useState, useEffect } from 'react';
import { Modal,Form, Input, Button, Radio, DatePicker, InputNumber, Select } from 'antd';

import './modals.less';

export const TransactionsModal = ({ addTransaction, categories, closeModal, editTransaction, filterDate, initialValues, loadingInProcess, modalType, modalState  }) => {
    const { Option } = Select;

    const [form] = Form.useForm();
    const [options, setOptions] = useState(categories);
    const [requiredError, setRequiredError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    
    useEffect(() => {
        setIsLoading(loadingInProcess);
    }, [loadingInProcess]);

    useEffect(() => {
        setOptions(categories);
    }, [categories]);
    
    useEffect(() => {
        modalType === 'add' 
        ? form.resetFields()
        : form.setFieldsValue({
            'transaction_date': moment(initialValues.transaction_date,'YYYY-MM-DD'),
            'category': `${initialValues.category}`,
            'amount': initialValues.amount
        });
    }, [form, initialValues, modalType]);

    const onFinish = (data) => {
        let updateData = false;
        const values = {...data, 'transaction_date': data['transaction_date'].format('YYYY-MM-DD')}
        if (filterDate.date === moment(values.transaction_date).format(filterDate.format)) { updateData = true }
        modalType === 'add' ? addTransaction(values, updateData) : editTransaction(initialValues.id, values, updateData, initialValues);
        setRequiredError(false);
    }
    
    return(
        <Modal
        title={ modalType === 'add' ? "Add data" : "Update data"} 
        centered
        visible={modalState}
        footer={null}
        onCancel={closeModal}
        className="modal"
        initialValues={null}
        >
            <Form
            form={form}
            onFinish={onFinish}
            onFinishFailed={() => setRequiredError(true)}
            >   
                <div className="modal__inputsGroup">
                    <Form.Item
                    name="transaction_date"
                    rules={[
                        {
                        required: true,
                        },
                    ]}
                    noStyle={true}
                    >
                        <DatePicker 
                        placeholder="Date" 
                        format={'YYYY-MM-DD'}
                        suffixIcon={false} 
                        bordered={false} />
                    </Form.Item>
                    
                    <Form.Item
                    name="category"
                    rules={[
                        {
                        required: true,
                        },
                    ]}
                    noStyle={true}
                    >
                        <Select
                        placeholder="Category"
                        suffixIcon={false}
                        bordered={false}
                        >
                            {options.map(option => (
                            <Option 
                            className={option.category_type === "income" ? "income" : null} 
                            key={option.id}
                            >
                                {option.name}
                            </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    
                    <Form.Item
                    name="amount"
                    rules={[
                        {
                        required: true,
                        },
                    ]}
                    noStyle={true}
                    >
                        <InputNumber 
                        min={1} 
                        placeholder="Amount"
                        formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
                        bordered={false}
                        />
                    </Form.Item>
                </div>

                {requiredError && <p className="modal__error">Please fill in all fields</p>}
                
                <Button type="primary" htmlType="submit" loading={isLoading}>{ modalType === 'add' ? 'Add' : 'Update'}</Button>
            </Form>
        </Modal>
    )
}



export const SummaryModal = ({ addCategory, closeModal, loadingInProcess, modalState, summaryError }) => {
    const [requiredError, setRequiredError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(loadingInProcess);
    }, [loadingInProcess]);

    const onFinish = (values) => {
        addCategory(values);
        setRequiredError(false);
    }

    return(
        <Modal
        title="Add category"
        centered
        visible={modalState}
        footer={null}
        onCancel={closeModal}
        className="modal"
        >
            <Form
            onFinish={onFinish}
            onFinishFailed={() => setRequiredError(true)}
            >   
                <Form.Item
                name="category_type"
                rules={[{ required: true }]}
                initialValue={'income'}
                noStyle={true}
                >
                    <Radio.Group buttonStyle="solid" className="modal__type">
                        <Radio.Button value="income">Income</Radio.Button>
                        <Radio.Button value="expense">Expense</Radio.Button>
                    </Radio.Group>
                </Form.Item>

                <div className="modal__inputsGroup">
                    <Form.Item
                    name="name"
                    rules={[{ required: true }]}
                    noStyle={true}
                    >
                        <Input placeholder="Category name" bordered={false}/>
                    </Form.Item>
                </div>

                {requiredError && <p className="modal__error">Please fill in category name</p>}
                {summaryError !== null && requiredError === false && <p className="modal__error">{summaryError}</p>}
                
                <Button type="primary" htmlType="submit" loading={isLoading}>Add</Button>
            </Form>
        </Modal>
    )
}



export const WidgetsModal = ({ addWidget, categories, closeModal, loadingInProcess, modalState, }) => {
    const { Option } = Select;

    const [options, setOptions] = useState(categories);
    const [requiredError, setRequiredError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    
    useEffect(() => {
        setIsLoading(loadingInProcess);
        setOptions(categories);
    }, [loadingInProcess, categories]);
    
    const onFinish = (values) => {
        addWidget(values);
        setRequiredError(false);
    }
    return(
        <Modal
        title="Add widget"
        centered
        visible={modalState}
        footer={null}
        onCancel={closeModal}
        className="modal"
        >
            <Form
            onFinish={onFinish}
            onFinishFailed={() => setRequiredError(true)}
            >   
                <div className="modal__inputsGroup">
                    <Form.Item
                    name="validity"
                    rules={[
                        {
                        required: true,
                        },
                    ]}
                    noStyle={true}
                    >
                        <Select
                        placeholder="Validity"
                        suffixIcon={false}
                        bordered={false}
                        className="widgets__term"
                        >
                            <Option key='day'>day</Option>
                            <Option key='week'>week</Option>
                            <Option key='month'>month</Option>
                        </Select>
                    </Form.Item>
                    
                    <Form.Item
                    name="category"
                    rules={[
                        {
                        required: true,
                        },
                    ]}
                    noStyle={true}
                    >
                        <Select
                        placeholder="Category"
                        suffixIcon={false}
                        bordered={false}
                        >
                            {options.map(option => ( option.category_type === 'expense' &&
                            <Option key={option.id}>
                                {option.name}
                            </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    
                    <Form.Item
                    name="limit"
                    rules={[
                        {
                        required: true,
                        },
                    ]}
                    noStyle={true}
                    >
                        <InputNumber 
                        min={1} 
                        placeholder="Limit"
                        formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
                        bordered={false}
                        />
                    </Form.Item>
                </div>

                <Form.Item
                name="criterion"
                rules={[
                    {
                    required: true,
                    },
                ]}
                initialValue={'more'}
                noStyle={true}
                >
                    <Radio.Group className="modal__moreLess">
                        <Radio.Button value="more">More</Radio.Button>
                        <Radio.Button value="less">Less</Radio.Button>
                    </Radio.Group>
                </Form.Item>

                <Form.Item
                name="color"
                rules={[
                    {
                    required: true,
                    },
                ]}
                initialValue={'#28C76F'}
                noStyle={true}
                >
                    <Select
                    placeholder="Category"
                    suffixIcon={false}
                    bordered={false}
                    className="modal__colorSelect"
                    >
                        <Option key='#28C76F'>
                            <div className="modal__color" style={{background: '#28C76F46'}}/>
                        </Option>
                        <Option key='#2868C7'>
                            <div className="modal__color" style={{background: '#2868C746'}}/>
                        </Option>
                        <Option key='#FF9F43'>
                            <div className="modal__color" style={{background: '#FF9F4346'}}/>
                        </Option>
                        <Option key='#5D5FEF'>
                            <div className="modal__color" style={{background: '#5D5FEF46'}}/>
                        </Option>
                    </Select>
                </Form.Item>

                {requiredError && <p className="modal__error">Please fill in all fields</p>}
                
                <Button type="primary" htmlType="submit" loading={isLoading}>Add</Button>
            </Form>
        </Modal>
    )
}