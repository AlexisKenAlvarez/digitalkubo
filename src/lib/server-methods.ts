
import axios from "axios";

export async function checkReset(email: string, token: string) {

    const { data } = await axios.post(`/api/checkPassword`, {
        email,
        token
    })

    return data
}

export async function deletePdf(public_id: string) {
    const { data } = await axios.post(`/api/deletePdf`, {
        public_id
    })

    return data
}