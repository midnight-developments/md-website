"use client";

import { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { WarningIcon } from "@/components/ui/dialog/header-icons/warning-icon";
import { Button } from "@/components/ui/button";
import DiscordIcon from "@/components/icons/DiscordIcon";

export default function DevNoticeModal() {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setOpen(true);
    }, []);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-sm items-center text-center gap-6">
                <WarningIcon />

                <DialogHeader>
                    <DialogTitle>
                        Under Active Development
                    </DialogTitle>
                    <DialogDescription>
                        Our website is currently undergoing active development and a refactor. Some features may not function as expected and are subject to change. If you need any assistance, feel free to join our Discord!
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter className="flex-col! w-full  mt-2">
                    <Button
                        variant="primary"
                        className="w-full"
                        asChild
                    >
                        <a
                            href="https://discord.gg/midnightdev"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setOpen(false)}
                        >
                            <DiscordIcon className="size-5 mr-1" />
                            Join Discord
                        </a>
                    </Button>
                    <Button
                        variant="secondary"
                        className="w-full"
                        onClick={() => setOpen(false)}
                    >
                        Continue to Website
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
