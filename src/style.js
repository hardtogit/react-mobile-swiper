/**
 * Created by xiangguo .
 * time:2017/12/22 0022.
 * email:413401168@qq.com.
 * use:auto...
 */
export const swiper_container ={
    margin: "0 auto",
    position: "relative",
    overflow: "hidden",
    listStyle: "none",
    padding: "0",
    zIndex: 1
    },
    swiper_wrapper={
    position: "relative",
    width: "100%",
    height: "100%",
    zIndex: "1",
    display: "-webkit-box",
    transitionProperty: "transform",
    boxSizing: "content-box"
    },
    swiper_slide ={
    textAlign: 'center',
    fontSize: '18px',
    background: "#fff",
    display: "-webkit-box",
    display: "flex",
    alignItems: "center"
    },
    img={
    width: "100%"
    },
    swiper_pagination={
         position: 'absolute',
         left: '50%',
         bottom: '12px',
         zIndex: 2,
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