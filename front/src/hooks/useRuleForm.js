import { reactive } from 'vue'
export default function(...rule) {
  const rules = reactive(
    {
      typeId: { required: true, message: '请选择类别', trigger: 'blur' },
      label: [
        { required: true, message: '请输入标题', trigger: 'blur' },
        { pattern: /^\S*$/, message: '请输入字符', trigger: 'blur' },
      ],
      description: { required: true, message: '请输入描述信息', trigger: 'blur' },
      link: [
        { required: true, message: '请输入链接', trigger: 'blur' },
        { pattern: /^http[s]?:\/\/[^\s]*/, message: '链接地址不正确', trigger: 'blur' },
      ],
      icon: { required: true, message: '请选择图标', trigger: 'blur' },
    }
  )
  const obj = reactive({})
  rule.forEach(item => {
    obj[item] = rules[item]
  })
  return obj
}
