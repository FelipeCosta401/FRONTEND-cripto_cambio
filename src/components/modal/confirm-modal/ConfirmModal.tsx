import { type Dispatch, type SetStateAction, useContext } from "react"

import { UserContext } from "@/context/UserContext"

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogHeader } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface ConfirmModalProps {
    description: string,
    open: boolean,
    onOpenChange: Dispatch<SetStateAction<boolean>>
    onConfirm: () => void
}

const ConfirmModal = ({ description, onOpenChange, open, onConfirm}: ConfirmModalProps) => {
    const { theme } = useContext(UserContext)

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className={`${theme}`}>
                <DialogHeader>
                    <DialogTitle>Tem certeza?</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant={"ghost"} type="button">Cancelar</Button>
                    </DialogClose>
                    <Button onClick={onConfirm} type="button" variant={"destructive"}>
                        Confirmar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ConfirmModal