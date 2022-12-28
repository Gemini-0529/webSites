import { h, ref,  } from "vue";
import { ElMessageBox } from "element-plus";
import CountDown from "@components/countdown.vue";
let key = 1;
let second = ref(10);
// 自动跳转
const handleFinishCountdown = () => {
  second = ref(3)
  const btn = document.querySelector(
    ".el-message-box__btns .el-button--primary"
  );
  btn.click();
};
export default function () {
  return new Promise((resolve, reject) => {
    ElMessageBox({
      title: "title",
      message: h("p", null, [
        h("span", null, "即将跳转到目标地址，"),
        h(CountDown, {
          style: {
            margin: "0 10px 0 10px",
            color: "teal",
          },
          second: second, // props
          onFinish: handleFinishCountdown, // 自定义事件，以on开头
        }),
        h("span", null, "秒"),
      ]),
    })
    .then(()=>{
      resolve()
    })
    .catch(err => {
      reject(err)
    })
  })
}
