import axios from '@/modules/service/axios'

export const chat = (question: any) => axios.post('/streamChat', question)