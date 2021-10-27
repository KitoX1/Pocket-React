const initialState = { 
    widgets: [],
    widgetsError: ''
}

export const widgets = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_WIDGET': 
            return {
                ...state,
                widgets: [action.widget, ...state.widgets]
            }   
        case 'DELETE_WIDGET': 
            return {
                ...state,
                widgets: state.widgets.filter(widget => {return widget.id !== action.widgetId})
            }  
        case 'SET_WIDGETS':
            return {
                ...state,
                widgets: action.widgets
            }
        default:
            return state;
    }
}