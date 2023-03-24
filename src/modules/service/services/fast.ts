import axios from '@/modules/service/axios'

// 增加违规信息
export const chat = (question:any) => axios.post('/fastChat',question)