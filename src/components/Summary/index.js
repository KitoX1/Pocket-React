import './summary.less';

import { SummaryModal } from '../Modals/Modals';

import { useState } from 'react';
import { Button } from 'antd';
import { DeleteTwoTone, PlusCircleOutlined  } from '@ant-design/icons';



const Summary = ({ addCategory, categories, deleteCategory, loadingInProcess, summaryError }) => {
    const [modalState, setModalState] = useState(false);
    
    const closeModal = () => {
        setModalState(false)
    }

    return(
    <div className="summary">
        <div className="summary__header">
            <div className="summary__headerRow">
                <p className="summary__title">Summary</p>
                <Button
                onClick={() => setModalState(true)}
                type="link"
                icon={<PlusCircleOutlined />}
                >
                    Add category
                </Button>
            </div>
            <div className="summary__headerRow">
                <p className="summary__subtitle">Categories</p>
                <p className="summary__subtitle">Amount</p>
            </div>
        </div>
        
        <div className="summary__body">
            {categories.length
            ? categories.map((category) => { return(
                <div className={category.category_type === "income" ? "summary__row income" : "summary__row"} key={category.id}>
                    <div className="summary__field">
                        <p>{category.name}</p>
                    </div>
                    <div className="summary__field">
                        <p>{+category.transactions_sum}</p>
                    </div>
                    <div className="summary__delete">
                        <Button
                        onClick={() => deleteCategory(category.id, category.category_type, -category.transactions_sum)}
                        type="link"
                        icon={<DeleteTwoTone twoToneColor="#EB5757" />}
                        />
                    </div>
                </div> 
            )})
            : <div className="summary__row summary__empty">
                <p>Categories waiting room</p>
            </div>
            }
        </div>
        
        <SummaryModal 
        addCategory={addCategory}
        closeModal={closeModal}
        loadingInProcess={loadingInProcess}
        modalState={modalState} 
        summaryError={summaryError}
        />    
    </div>
    )
}

export default Summary;