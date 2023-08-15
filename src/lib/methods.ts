
import axios from "axios";

export async function checkReset(email: string, token: string) {

    const { data } = await axios.post(`${process.env.NEXTAUTH_URL}/api/checkPassword`, {
        email,
        token
    })

    return data
}

export async function deletePdf(public_id: string) {
    const { data } = await axios.post(`${process.env.NEXTAUTH_URL}/api/deletePdf`, {
        public_id
    })

    return data
}