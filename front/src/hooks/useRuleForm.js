import { reactive } from 'vue'
export default function(...rule) {
  const rules = reactive(
    {
      typeId: { required: true, message: '请选择类别', trigger: 'blur' },
      label: { required: true, message: '请输入标题', trigger: 'blur' },
      description: { required: true, message: '请输入描述信息', trigger: 'blur' },
      link: { required: true, message: '请输入链接', trigger: 'blur' },
      icon: { required: true, message: '请选择图标', trigger: 'blur' },
    }
  )
  const obj = reactive({})
  rule.forEach(item => {
    obj[item] = rules[item]
  })
  return obj
}




