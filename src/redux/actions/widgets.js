import { widgetsAPI } from "../../api/api";
import { setLoading } from "./app";

export const addWidgetToStore = (widget) => {
    return {
        type: 'ADD_WIDGET',
        widget
    }
}

export const deleteWidgetFromStore = (widgetId) => {
    return {
        type: 'DELETE_WIDGET',
        widgetId
    }
}

export const setWidgetsToStore = (widgets) => {
    return {
        type: 'SET_WIDGETS',
        widgets
    }
}


export const addWidget = (values) => async (dispatch) => {
    dispatch(setLoading(true));
    const data = await widgetsAPI.addWidget(values)
    dispatch(addWidgetToStore(data));
    dispatch(setLoading(false));
}

export const deleteWidget = (widgetId) => (dispatch) => {
    dispatch(setLoading(true));
    widgetsAPI.deleteWidget(widgetId)
    dispatch(deleteWidgetFromStore(widgetId));
    dispatch(setLoading(false))
}

export const getWidgets = () => async (dispatch) => {
    const data = await widgetsAPI.getWidgets()
    dispatch(setWidgetsToStore(data));
}