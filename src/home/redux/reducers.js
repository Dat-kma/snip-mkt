import {DataBase,DataBaseName,DataHistory} from "../../firebase/fireBase";

const noteInitialState = {

    editTime:{},
    editAdd:false

}
export const RotateReducer = (state = noteInitialState, action) => {
    switch (action.type) {
        case "OPEN_ROTATE":
            return {
                ...state,
                OpenRotate: action.OpenRotate
            };
        case "OPEN_ROTATE_CHECK":
            return {
                ...state,
                Rotate: action.Rotate
            };
        case "ROTATE_CHECK":
            return {
                ...state,
               check: action.check
            };
        case "CHANGE_EDIT_ADD":
            return {
                ...state,
                editAdd: !state.editAdd
            };
        case "ADD_ORDER":
            return DataBase.push(action.item);
        case "ADD_TIME":
            return DataBaseName.push(action.time);

        case "ADD_MEMBER":
            return DataBaseName.push(action.item);
        case "ADD_HISTORY":
            return DataHistory.push(action.history);
        case "DELETE_ORDER":
            DataBase.child(action.deleteId).remove();
            return state;
        case "DELETE_MEMBER":
            DataBaseName.child(action.member).remove();
            return state;
        case "DELETE_ALL":
            DataBase.remove();
            return state;

        case "GET_EDIT_DATA":
            return {
                ...state,
                editItem:action.editObject
            };
        case "GET_EDIT_TIME":
            return {
                ...state,
                editTime:action.editTime
            };
        case "EDIT":
            console.log("da cap nhat thanh cong" + JSON.stringify(action.getitem) + " thanh cong" );
            DataBase.child(action.getitem.id).update({
                orderName:action.getitem.orderName
            });
            return {...state,editItem:{}};
        case "EDIT_TIME":
            console.log("da cap nhat thanh cong" + JSON.stringify(action.gettime) + " thanh cong" );
            DataBaseName.child(action.gettime.id).update({
                time:action.gettime.time
            });
            return state   ;
        default:
            return state
    }
};