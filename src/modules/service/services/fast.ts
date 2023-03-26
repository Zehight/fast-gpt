import axios from "@/modules/service/axios";


export const chat = (question: any) => axios.post("/fastChat", question);