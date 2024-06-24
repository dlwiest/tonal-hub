'use client'

import { Button } from "@mantine/core";
import { signout } from "./actions";
import { redirect } from "next/navigation";

const SignoutButton = () => {
    const action: () => void = async () => {
        const { success } = await signout();
        if (success) {
            redirect('/');
        }
    }
    return (
        <form action={action}>
            <Button type="submit">Sign Out</Button>
        </form>
    )
}

export default SignoutButton;
