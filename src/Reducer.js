

var DefaultState  = {
    isLogin : false,
    ds_giang_day : [],
    mang_ca : [],
    ca : 0,
    danh_sach_sinh_vien : []
    
};

const Reducer = (state = DefaultState ,  action) => {
    switch (action.type) {
        case 'CHOOSE_CA_AND_GET_DS' : 
            state.ca = action.data.ca;
            return {...state,danh_sach_sinh_vien : action.data.danh_sach_sinh_vien};
        case 'isLogin':
            state.isLogin = true;
            return {...state};
        case 'AD_DS_GIANG_DAY_AND_CA' : 
            state.ds_giang_day = action.data.ds_giang_day;
            state.mang_ca = action.data.mang_ca;
            return {...state};
        default:
            break;
    }
    return {...state};
}
export default Reducer;
