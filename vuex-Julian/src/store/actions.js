export const changeMsg = ({commit},params) => {
  commit({
    type: 'mutationsMsg',     //对应mutation.js中的mutationsMsg方法
    msg: params.msg
  });
};
