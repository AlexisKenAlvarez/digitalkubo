
import axios from "axios";

export async function checkReset(email: string, token: string) {

    const { data } = await axios.post(`${process.env.NEXTAUTH_URL}/api/checkPassword`, {
        email,
        token
    })

    return data


}