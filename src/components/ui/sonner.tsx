import { Toaster as Sonner } from "sonner"
import { AlertTriangle, CheckCircle, Info, Loader2, XCircle } from "lucide-react"

const Toaster = ({
    ...props
}) => {

    return (
        <Sonner
            style={{
                fontFamily: 'var(--font-outfit)',
                "--toast-icon-margin-end": "0",
                "--toast-icon-margin-start": "0",
            } as React.CSSProperties}
            className="toaster group"
            toastOptions={{
                classNames: {
                    toast:
                        "group toast group-[.toaster]:bg-popover-bg group-[.toaster]:text-foreground group-[.toaster]:border-popover group-[.toaster]:shadow-lg group-[.toaster]:border-2! items-start! gap-3!",
                    title: "text-[0.9rem] font-medium! text-primary-foreground!",
                    description: "group-[.toast]:text-muted-foreground!",
                    actionButton:
                        "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
                    cancelButton:
                        "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
                    success: "group-[.toaster]:bg-success/10! backdrop-blur-3xl  group-[.toaster]:border-success/20! group-[.toaster]:border-2 group-[.toaster]:shadow-success!",
                    error: "group-[.toaster]:bg-error/10! backdrop-blur-3xl group-[.toaster]:border-error/20! group-[.toaster]:border-2 group-[.toaster]:shadow-error!",
                    warning: "group-[.toaster]:bg-warning/10! backdrop-blur-3xl group-[.toaster]:border-warning/20! group-[.toaster]:border-2 group-[.toaster]:shadow-warning!",
                    info: "group-[.toaster]:bg-info/15! backdrop-blur-3xl group-[.toaster]:border-info/20! group-[.toaster]:border-2 group-[.toaster]:shadow-info!",
                    loading: "group-[.toaster]:bg-accent/15! backdrop-blur-3xl group-[.toaster]:border-accent/20! group-[.toaster]:border-2 group-[.toaster]:shadow-accent/10!",
                },
            }}
            icons={{
                success: <CheckCircle className="w-4 h-4 text-success-foreground mt-1" />,
                info: <Info className="w-4 h-4 text-info-foreground mt-1" />,
                warning: <AlertTriangle className="w-4 h-4 text-warning-foreground mt-1" />,
                error: <XCircle className="w-4 h-4 text-error-foreground mt-1" />,
                loading: <Loader2 className="w-4 h-4 text-accent-foreground mt-1 animate-spin" />,
            }}
            {...props} />
    );
}

export { Toaster }
