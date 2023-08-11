

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";

import { BsUnlockFill, BsFillLockFill, BsLockFill } from 'react-icons/bs'

import {
    Card,
    CardContent,
    CardDescription,
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
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { Label } from "../ui/label";
import { useFetchDebounce } from "../handlers/fetchDebounce";
import axios from "axios";

const AdminCreate = () => {

    const [file, setFile] = useState<File>()
    const [dataArr, setData] = useState<FormData[]>([])
    const formData = new FormData()

    const [error, setError] = useState('')

    const formDataArray = [
        { id: 'formData1', formData: new FormData() },
        // Add more FormData objects as needed
    ];

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {


        if (e.target.files && e.target.files.length > 0) {
            const uploadedFile = e.target.files[0]
            setFile(uploadedFile)
            setError('')

            if (uploadedFile.type !== 'application/pdf') {
                setError('File must be a type of pdf.')
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
        if (!file) {
            setError("Please upload a file.")
        } else {

            formData.append('title', data.acpName)
            formData.append('access', data.acpType)
            formData.append('file', file as Blob)
            formData.append('fileName', file.name)
            formData.append('upload_preset', 'digitalkubo')


            setData(items => [...items, formData]);
        }
    }

    const nameValue = watch('acpName')

    const uploadData = async () => {

        async function sendMultipleRequests(formDataArray: FormData[]) {
            const requests = formDataArray.map((formData) =>
                axios.post('/api/addPdf', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
            );

            try {
                const responses = await Promise.all(requests);
                console.log('All requests completed:', responses);

                // Perform your action here after all requests are done
            } catch (error) {
                console.error('Error:', error);
            }
        }

        const upload = await sendMultipleRequests(dataArr)

    }

    return (
        <div className="w-full h-full p-5">

            <div className="max-w-[1400px] w-full mx-auto">
                <div className="max-w-[600px] mx-auto mt-5">

                    {/* CARD COMPONENT */}
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
                                                }}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Unlocked" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent position="popper" defaultValue="unlocked">
                                                        <SelectItem value="unlocked" className="cursor-pointer">
                                                            <div className="flex items-center gap-x-[5px] py-2">
                                                                <BsUnlockFill />
                                                                <p className="">Unlocked</p>
                                                            </div>
                                                        </SelectItem>
                                                        <SelectItem value="locked" className="cursor-pointer">
                                                            <div className="flex items-center gap-x-[5px] py-2">
                                                                <BsLockFill />
                                                                <p className="">Locked</p>
                                                            </div>
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>

                                            </FormItem>
                                        )}
                                    />

                                    <div className="mt-3">
                                        <div className="relative w-full">
                                            <Label htmlFor="uploadedFile" className="w-full h-auto absolute top-0 left-0 grid place-items-center cursor-pointer">
                                                <Button variant="secondary" className="w-full pointer-events-none h-full">
                                                    <p className="">Upload Action Plan File</p>
                                                </Button>
                                            </Label>
                                            <p className="opacity-0 pointer-events-none">Upload Action Plan</p>
                                            <Input type="file" id="uploadedFile" className="hidden" onChange={handleUpload} accept="application/pdf" />
                                        </div>
                                        {file &&
                                            <p className="text-black/70 mt-5 text-center text-sm font-secondary">{file.name}</p>}

                                        {error &&
                                            <p className="text-red-400 mt-5 text-center text-sm font-secondary ">{error}</p>}

                                    </div>


                                    <Button type="submit" className="mt-4">
                                        Add to list
                                    </Button>
                                </form>
                            </Form>

                        </CardContent>
                    </Card>

                </div>

                <Table className="mt-20">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Access</TableHead>
                            <TableHead>File</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {dataArr.map((items, i) => {
                            return (
                                <TableRow key={i}>
                                    <TableCell className="text-black">{items.get('title')?.toString()}</TableCell>
                                    <TableCell className="text-black capitalize">{items.get('access')?.toString()}</TableCell>
                                    <TableCell className="text-black">{items.get('fileName')?.toString()}</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>

                <Button className="mt-10" onClick={uploadData}>
                    Upload
                </Button>

            </div>



        </div>
    );
}

export default AdminCreate;