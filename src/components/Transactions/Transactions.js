import { useState } from 'react';
import { Button } from 'antd';
import { PlusCircleOutlined, DeleteTwoTone, EditOutlined  } from '@ant-design/icons';

import './transactions.less';
import { TransactionsModal } from '../Modals/Modals';

export const Transactions = ({ addTransaction, categories, deleteTransaction, editTransaction, filterDate, loadingInProcess, transactions }) => {
    const [modalState, setModalState] = useState(false);
    const [modalType, setModalType] = useState('add');
    const [initialValues, setInitialValues] = useState({
        id: null,
        transaction_date: null,
        category: null,
        amount: null,
        category_type: null
    });
    
    const closeModal = () => {
        setModalState(false);
        setModalType('add');
    }

    const openUpdateModal = (values) => {
        setModalType('update');
        setInitialValues(values);
        setModalState(true);
    }

    return(
        <div className="transactions">
            <div className="transactions__header">
                <div className="transactions__field">
                    <p>Date</p>
                </div>

                <div className="transactions__field">
                    <p>Category</p>
                </div>

                <div className="transactions__field">
                    <p>Amount</p>
                </div>

                <div className="transactions__field">
                    <Button
                    onClick={() => setModalState(true)}
                    type="link"
                    icon={<PlusCircleOutlined />}
                    >
                        Add data
                    </Button>
                </div>
            </div>
            
            <div className="transactions__body">
                {transactions.length 
                ? transactions.map((transaction) => { return(
                    <div 
                    className={transaction.category.category_type === "income" ? "transactions__row income" : "transactions__row"}
                    key={transaction.id}
                    >
                        <div className="transactions__field">
                            <p>{transaction.transaction_date.replace(/-/gi, '.')}</p>
                        </div>

                        <div className="transactions__field">
                            <p>{transaction.category.name}</p>
                        </div>

                        <div className="transactions__field">
                            <p>{+transaction.amount}</p>
                        </div>

                        <div className="transactions__field">
                            <Button
                            onClick={() => openUpdateModal(
                                {
                                    id: transaction.id,
                                    transaction_date: transaction.transaction_date,
                                    category: transaction.category.id,
                                    amount: transaction.amount,
                                    category_type: transaction.category.category_type
                                }
                            )}
                            type="link"
                            icon={<EditOutlined/>}
                            />

                            <Button
                            onClick={() => deleteTransaction(
                                transaction.id, 
                                transaction.category.id, 
                                transaction.category.category_type,
                                -transaction.amount
                            )}
                            type="link"
                            icon={<DeleteTwoTone twoToneColor="#EB5757" />}
                            />
                        </div>
                    </div> 
                )})

                : <div className="transactions__row transactions__empty">
                    <p>Data waiting room</p>
                </div>
                }
            </div>
            
            <TransactionsModal 
            addTransaction={addTransaction}
            categories={categories} 
            closeModal={closeModal} 
            editTransaction={editTransaction} 
            filterDate={filterDate}
            initialValues={initialValues}
            loadingInProcess={loadingInProcess}
            modalType={modalType}
            modalState={modalState} 
            />
        </div>
    )
}