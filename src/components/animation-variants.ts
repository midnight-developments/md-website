export const itemVariants: any = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
}

export const containerVariants = {
    show: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.25
        },
    },
}