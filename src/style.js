/**
 * Created by xiangguo .
 * time:2017/12/22 0022.
 * email:413401168@qq.com.
 * use:auto...
 */
export const swiper_container ={
    position: "relative",
    touchAction: 'none',
    overflow: "hidden",
    listStyle: "none",
    padding: "0",
    zIndex: 1,
    // height:'200px',
    },
    swiper_slide ={
    position:"absolute",
    left:0,
    top:0,
    width:'100%',
    height:'100%',
    textAlign: 'center',
    fontSize: '18px',
    background: "#fff",
    alignItems: "center"
    },
    swiper_pagination={
         position: 'absolute',
         left: '50%',
         bottom: '12px',
         zIndex: 10,
         WebkitTransform: "translate(-50%)",
         MozTransform: 'translate(-50%)',
         transform: "translate(-50%)",
         OTransform: "translate(-50%)",
     },
    pagination_item={
        display: "inline-block",
        width: "12px",
        height: "12px",
        borderRadius: "50%",
        backgroundColor: "#fff",
        marginLeft: "12px"
    },
    pagination_item_active={
        display: "inline-block",
        width: "12px",
        height: "12px",
        borderRadius: "50%",
        backgroundColor: "#de3031",
        marginLeft: "12px"
}