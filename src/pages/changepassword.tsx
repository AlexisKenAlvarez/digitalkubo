import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { changeList } from "@/lib/list"
import { Button } from "@/components/ui/button"
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation'
import { TbLoaderQuarter } from 'react-icons/tb'
import { useFetchDebounce } from "@/components/handlers/fetchDebounce";
import { toast } from 'react-toastify';
import axios from "axios"

interface ChangePasswordParams {
    token: string,
    email: string
}

export async function getServerSideProps(context: { query: { token?: string, email?: string } }) {
    const { token, email } = context.query


    if (!token && !email) {
        return {
            redirect: {
                permanent: false,
                destination: "/auth/login"
            }
        }
    }


    if (email && token) {

        const { data } = await axios.post(`${process.env.NEXTAUTH_URL}/api/checkPassword`, {
            email,
            token
        })

        if (!data.valid) {
            return {
                redirect: {
                    permanent: false,
                    destination: "/auth/login"
                }
            }
        }
    }

    return {
        props: {
            email
        }
    }
}

const ChangePassword = ({ email }: { email: string }) => {

    const router = useRouter()
    const { data: fetchData, debounce, setDebounce } = useFetchDebounce()


    const signupSchema = z.object({

        password: z.string()
            .min(3, "Must contain at least 3 letters")
            .max(20, "Must not be more than 20 characters"),

        confirm: z.string()
            .min(3, "Must contain at least 3 letters")
            .max(20, "Must not be more than 20 characters"),

    })
        .refine((data) => data.password === data.confirm, {
            message: "Password does not match.",
            path: ['confirm']
        }
        )


    type userInput = z.infer<typeof signupSchema>
    const { register, setError, handleSubmit, formState: { errors } } = useForm<userInput>({ resolver: zodResolver(signupSchema) })

    const submit = async (data: userInput) => {
        if (!debounce) {
            setDebounce(true)
            const changePassword = await fetchData('changePassword', {
                email,
                password: data.password
            })

            if (changePassword.success) {
                toast.success("Password updated successfully!")
                router.push("/auth/login")
            } else {
                setDebounce(false)
            }
        }

    }

    return (
        <section className="w-full min-h-screen h-auto sm:py-4 py-7 relative">

            <div className="sm:w-fit w-full h-full sm:h-auto px-10 sm:py-7 sm:border-[1px] border-black/5 rounded-lg sm:mt-9 mt-4 drop-shadow-sm mx-auto">
                <div className="leading-loose text-center">
                    <h1 className="text-4xl sm:text-[48px] font-primary font-bold text-black">New Password</h1>
                    <p className="text-black/50 mt-2">Please create a new strong password.</p>
                </div>

                <div className="flex flex-col gap-y-3 mt-10">
                    {changeList.map((items, i) => {
                        return (
                            <div className="drop-shadow-sm flex flex-col gap-y-2" key={i}>
                                <Label htmlFor={items.label}>{items.label}</Label>
                                <Input
                                    type={items.type}
                                    {...register(`${items.id as keyof userInput}`)}
                                    id={items.label}
                                    placeholder={items.placeholder}
                                    autoComplete="false"
                                    autoFocus={items.id === 'password' ? true : false}
                                    className="outline-none" />

                                <div className="text-red-400 text-sm">
                                    {errors[items.id as keyof userInput]?.toString() ? <p>{errors[items.id as keyof userInput]?.message?.toString()}</p> : <p></p>}
                                </div>

                            </div>
                        )
                    })}

                    <Button className="mt-3 bg-button hover:bg-nav" onClick={handleSubmit(submit)} disabled={debounce}>
                        {debounce ? <TbLoaderQuarter className="animate-spin" /> :
                            <p className="">
                                Change password
                            </p>}
                    </Button>


                </div>

            </div>
        </section>
    )
}

export default ChangePassword;