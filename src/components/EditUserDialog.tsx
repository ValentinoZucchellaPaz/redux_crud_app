
import { ReactNode, useState } from "react";
import UserForm from "./UserForm";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "../tremor/TemorDialog";
import { UserWithId } from "../types";
import Cancel from "../icons/Cancel";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Button } from "@tremor/react";

interface EditUserDialogProps {
    children: ReactNode,
    user: UserWithId
}

export default function EditUserDialog({ children, user }: EditUserDialogProps) {
    const [edit, setEdit] = useState(false)
    return (
        <div className="flex justify-center">
            <Dialog open={edit} onOpenChange={setEdit}>
                <DialogTrigger asChild>
                    {children}
                </DialogTrigger>
                <DialogContent>
                    <VisuallyHidden>
                        <DialogTitle>Editar usuario</DialogTitle>
                        <DialogDescription>Dialog que se abre para editar la informacion de usuario</DialogDescription>
                    </VisuallyHidden>
                    <DialogClose asChild>
                        <Button variant="light" className="absolute top-2 right-6"><Cancel /></Button>
                    </DialogClose>
                    <UserForm edit={{ ...user, setEdit }} />
                </DialogContent>

            </Dialog>
        </div>
    )
}