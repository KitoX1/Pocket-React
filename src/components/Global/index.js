import './global.less'

const Global = ({ filterDate, global }) => {
    return(
        <div className="global">
            <div>
                <p className="global__title">Global</p>
                <div className="global__container">
                    <p className="global__date">{filterDate.date || 'Date'}</p>
                    <div className="global__income">
                        <span>Income</span>
                        <span>{+global.total_income}</span>
                    </div>
                    <div className="global__expense">
                        <span>Expense</span>
                        <span>{+global.total_expenses}</span>
                    </div>
                    <div className="global__overall">{global.total_income - global.total_expenses}</div>
                </div>
            </div>
        </div>
    )
}

export default Global;