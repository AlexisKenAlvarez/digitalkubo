'use client'

import { Button } from "@/components/ui/button";
import * as XLSX from 'xlsx'
import { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSession } from "next-auth/react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

const AdminCreate = () => {


    const [excelData, setData] = useState<unknown[]>([])
    const [selected, setSelected] = useState('')

    const [error, setError] = useState('')

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {

        if (e.target.files) {
            const reader = new FileReader();

            reader.readAsBinaryString(e.target.files[0])
            reader.onload = (e) => {
                const data = e?.target?.result
                const workbook = XLSX.read(data, { type: "binary" })

                const sheetName = workbook.SheetNames[0]
                console.log(sheetName)
                const sheet = workbook.Sheets[sheetName]
                const parsedData = XLSX.utils.sheet_to_json(sheet)

                setError('')
                setData(parsedData)
            }
        }
    }

    const nameSchema = z.object({
        acpName: z.string().min(3, "Must be atleast 3 characters long."),
        acpType: z.string().trim().min(1, "Pick a acp type"),
    })

    type nameType = z.infer<typeof nameSchema>

    const form = useForm<nameType>({
        resolver: zodResolver(nameSchema), defaultValues: {
            acpName: '',
            acpType: 'unlocked',
        }
    })

    const { control, formState: { errors }, watch } = form

    const createAcp = (data: nameType) => {
        console.log(data)
    }

    const getType = (e: string) => {
        setSelected(e)
    }

    const nameValue = watch('acpName')

    return (
        <div className="w-full h-full p-5">

            <div className="max-w-[600px] mx-auto mt-5">
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Create new ACP</CardTitle>
                        <CardDescription>Add new action plan in PDF format.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(createAcp)} className="flex flex-col gap-y-4">
                                {/* acp NAME */}

                                <FormField
                                    control={control}
                                    name="acpName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                <div className="flex sm:items-center gap-x-[5px] sm:flex-row flex-col">
                                                    <h1 className="">
                                                        Title
                                                    </h1>
                                                    <p className="text-sm text-red-400">{errors.acpName?.message ? `- ${errors.acpName?.message}` : null}</p>
                                                </div>
                                            </FormLabel>
                                            <FormControl className="relative">
                                                <div className="">
                                                    <Input
                                                        id="acpTitle"
                                                        placeholder="Title of action plan"
                                                        autoComplete="off"
                                                        autoFocus
                                                        maxLength={100}
                                                        className="pr-16" {...field} />
                                                    <p className="absolute right-3 top-0 bottom-0 my-auto h-fit text-sm opacity-50">{nameValue.length}/100</p>
                                                </div>

                                            </FormControl>
                                        </FormItem>
                                    )}
                                />



                                {/* acp TYPE */}
                                <FormField
                                    control={control}
                                    name="acpType"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                <div className="flex sm:items-center gap-x-[5px] sm:flex-row flex-col">
                                                    <h1 className="">
                                                        Action Plan Access
                                                    </h1>
                                                    <p className="text-sm text-red-400">{errors.acpType?.message ? `- ${errors.acpType?.message}` : null}</p>
                                                </div>
                                            </FormLabel>
                                            <Select onValueChange={e => {
                                                field.onChange(e)
                                                getType(e)
                                            }}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Unlocked" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent position="popper" defaultValue="unlocked">
                                                    <SelectItem value="unlocked" className="cursor-pointer">Unlocked</SelectItem>
                                                    <SelectItem value="locked" className="cursor-pointer">Locked</SelectItem>
                                                </SelectContent>
                                            </Select>

                                        </FormItem>
                                    )}
                                />


                                <Button type="submit" className="mt-4">
                                    Submit
                                </Button>
                            </form>
                        </Form>

                    </CardContent>
                </Card>
            </div>


        </div>
    );
}

export default AdminCreate;