import { toast } from "sonner";
interface Response {
    message: string
    success: boolean
}
export default function ShowSuccessToast(res: Response) {
    toast.error(res.message, {
        action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
        },
        position: 'top-center',
    })
}
