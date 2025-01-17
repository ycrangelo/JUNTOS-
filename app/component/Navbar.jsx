import {Button, User} from "@nextui-org/react";
import {auth, signOut} from "../../auth";
import Link from 'next/link'
import {Popover, PopoverTrigger, PopoverContent} from "@nextui-org/popover";
import ProfileButton from "./ProfileButton";

export default async function Navbar() {
    const session = await auth()
    const userAvatar = await String(session.user?.image);
    const userName = await session.user?.name
    console.log(userAvatar)
    return (
        <>
            <div className='w-auto sticky top-0 border-b lg:p-3 p-2 flex justify-between'>
                <User
                    name={userName}
                    avatarProps={{
                        src: userAvatar
                    }}

                />
                <div className="flex flex-row gap-4">
                    <div>
                        <ProfileButton/>
                    </div>
                    <div>
                        <form
                            action={async () => {
                                "use server"
                                await signOut("google")
                            }}
                        >
                            <Button type='submit' variant="flat" color="danger">
                                Logout
                            </Button>
                        </form>

                    </div>

                </div>
            </div>

        </>
    )
}