export const openRotate = (boleen) => ({
    type: "OPEN_ROTATE",
    OpenRotate: boleen
});
export const openRotateCheck = (boleen) => ({
    type: "OPEN_ROTATE_CHECK",
    Rotate: boleen
});
export const RotateCheck = (boleen) => ({
    type: "ROTATE_CHECK",
    check: boleen
});
export const addOrder = (item) => ({
    type: "ADD_ORDER",
    item
});
export const addHistory = (history) => ({
    type: "ADD_HISTORY",
    history
});
export const addTime = (time) => ({
    type: "ADD_TIME",
    time
});
export const addOrderMember = (item) => ({
    type: "ADD_MEMBER",
    item
});
export const deleteOrder = (deleteId) => ({
    type:"DELETE_ORDER",
    deleteId
});
export const deleteMember = (member) => ({
    type:"DELETE_MEMBER",
    member
});
export const deleteAllOrder = () => ({
    type:"DELETE_ALL"
});
export const  getEditData = (editObject) => ({
    type:"GET_EDIT_DATA",
    editObject
});
export const  getEditDataTime = (editTime) => ({
    type:"GET_EDIT_TIME",
    editTime
});
export const  editDataTime= (gettime) => ({
    type:"EDIT_TIME",
    gettime
});

export const  editDataStore= (getitem) => ({
    type:"EDIT",
    getitem
});
export const  changeNoteForm= () => ({
    type:"CHANGE_EDIT_ADD"
});



