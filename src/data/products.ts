export interface ProductFeature {
    title: string
    description: string
    imagePosition: "left" | "right"
}

export interface ProductRequirement {
    name: string
    type: "framework" | "onesync" | "server_version" | "resource"
    link?: string
}

export interface Product {
    id: string
    slug: string
    name: string
    price: number
    tags: string[]
    shortDescription: string
    description: string
    requirements: ProductRequirement[]
    features: ProductFeature[]
    category: "script" | "bundle"
}

export const scripts: Product[] = [
    {
        id: "1",
        slug: "midnight-hud",
        name: "Midnight HUD",
        price: 24.99,
        tags: ["QBCore", "ESX"],
        shortDescription: "A sleek, fully customizable heads-up display with glassmorphic design and smooth animations.",
        description: "Midnight HUD is a premium heads-up display designed for FiveM servers. It features a glassmorphic design language, real-time stat tracking, and buttery smooth animations. Fully compatible with QBCore, QBox, and ESX frameworks. Includes speedometer, health/armor bars, voice indicator, and minimap enhancements.",
        requirements: [
            { name: "QBCore / ESX / QBox", type: "framework" },
            { name: "ox_lib", type: "resource", link: "https://overextended.dev/ox_lib" },
            { name: "oxmysql", type: "resource", link: "https://overextended.dev/oxmysql" }
        ],
        features: [
            { title: "Glassmorphic Design", description: "Beautiful frosted glass UI elements that blend seamlessly with any server aesthetic. Every component is carefully crafted with attention to detail.", imagePosition: "left" },
            { title: "Real-Time Stats", description: "Track health, armor, hunger, thirst, stress, and more with silky smooth progress bars and dynamic color coding.", imagePosition: "right" },
            { title: "Integrated Speedometer", description: "A sleek vehicle speedometer with RPM gauge, fuel level, and seatbelt indicator built right into the HUD.", imagePosition: "left" },
            { title: "Fully Configurable", description: "Every element can be toggled, repositioned, and restyled through a simple config file. No code editing required.", imagePosition: "right" },
        ],
        category: "script",
    },
    {
        id: "2",
        slug: "midnight-phone",
        name: "Midnight Phone",
        price: 39.99,
        tags: ["QBCore", "Standalone"],
        shortDescription: "Feature-rich smartphone with modern UI, app ecosystem, and seamless framework integration.",
        description: "A fully featured smartphone resource for FiveM. Includes messaging, calls, camera, banking app, twitter clone, and more. Built with performance in mind and designed with a stunning dark-mode interface.",
        requirements: [
            { name: "QBCore / QBox", type: "framework" },
            { name: "ox_lib", type: "resource", link: "https://overextended.dev/ox_lib" },
            { name: "oxmysql", type: "resource", link: "https://overextended.dev/oxmysql" },
            { name: "screenshot-basic", type: "resource", link: "https://github.com/citizenfx/screenshot-basic" }
        ],
        features: [
            { title: "Modern App Ecosystem", description: "Comes loaded with essential apps: Messages, Phone, Camera, Bank, Twitter, Settings, Contacts, and more.", imagePosition: "left" },
            { title: "Real-Time Messaging", description: "Send and receive messages in real-time with read receipts, group chats, and media sharing support.", imagePosition: "right" },
            { title: "Built-in Camera", description: "Take in-game photos that save to an in-game gallery. Share photos through messages or social media.", imagePosition: "left" },
            { title: "Banking Integration", description: "Full banking app with transaction history, transfers, and balance tracking tied directly to your framework.", imagePosition: "right" },
        ],
        category: "script",
    },
    {
        id: "3",
        slug: "midnight-inventory",
        name: "Midnight Inventory",
        price: 29.99,
        tags: ["QBCore", "ESX", "QBox"],
        shortDescription: "Drag-and-drop inventory system with stunning visuals and weapon attachment support.",
        description: "A beautiful, performant inventory system featuring drag-and-drop functionality, weapon attachments, crafting integration, and shop support. Designed to look premium while being incredibly easy to use.",
        requirements: [
            { name: "QBCore / ESX", type: "framework" },
            { name: "ox_lib", type: "resource", link: "https://overextended.dev/ox_lib" },
            { name: "oxmysql", type: "resource", link: "https://overextended.dev/oxmysql" }
        ],
        features: [
            { title: "Drag & Drop", description: "Intuitive drag-and-drop interface that players love. Move items between slots, containers, and other players effortlessly.", imagePosition: "left" },
            { title: "Weapon Attachments", description: "Visual weapon attachment system with real-time preview. Attach scopes, suppressors, grips, and more.", imagePosition: "right" },
            { title: "Crafting System", description: "Built-in crafting table integration with recipe management and progress animations.", imagePosition: "left" },
            { title: "Shop Integration", description: "Beautiful shop UI with categories, search, and cart functionality. Easy to configure for any vendor.", imagePosition: "right" },
        ],
        category: "script",
    },
    {
        id: "4",
        slug: "midnight-garage",
        name: "Midnight Garage",
        price: 19.99,
        tags: ["QBCore"],
        shortDescription: "Modern vehicle garage with preview system, categories, and impound management.",
        description: "A premium garage system with vehicle categories, 3D preview, and integrated impound lot. Features a clean, modern UI with smooth transitions and responsive design.",
        requirements: [
            { name: "QBCore / QBox", type: "framework" },
            { name: "ox_lib", type: "resource", link: "https://overextended.dev/ox_lib" },
            { name: "oxmysql", type: "resource", link: "https://overextended.dev/oxmysql" }
        ],
        features: [
            { title: "3D Vehicle Preview", description: "Preview your vehicles in a clean 3D viewing environment before spawning them.", imagePosition: "left" },
            { title: "Smart Categories", description: "Automatic vehicle categorization based on class and type. Easy to navigate even with large collections.", imagePosition: "right" },
            { title: "Impound System", description: "Integrated impound lot with fee management, police impound support, and auto-impound timers.", imagePosition: "left" },
            { title: "Transfer System", description: "Transfer vehicle ownership between players with a bill of sale system and transfer history.", imagePosition: "right" },
        ],
        category: "script",
    },
    {
        id: "5",
        slug: "midnight-banking",
        name: "Midnight Banking",
        price: 22.99,
        tags: ["QBCore", "ESX"],
        shortDescription: "Full banking solution with account management, transfers, and transaction history.",
        description: "A comprehensive banking system with multiple account types, inter-player transfers, ATM support, and detailed transaction history. Premium UI with dark glass aesthetics.",
        requirements: [
            { name: "QBCore / ESX", type: "framework" },
            { name: "ox_lib", type: "resource", link: "https://overextended.dev/ox_lib" },
            { name: "oxmysql", type: "resource", link: "https://overextended.dev/oxmysql" }
        ],
        features: [
            { title: "Multiple Accounts", description: "Support for checking, savings, and shared accounts with individual balance tracking.", imagePosition: "left" },
            { title: "Transaction History", description: "Detailed transaction log with filtering, search, and export capabilities.", imagePosition: "right" },
            { title: "ATM & Bank Locations", description: "Support for both ATM interactions and full bank interiors with animated tellers.", imagePosition: "left" },
            { title: "Shared Accounts", description: "Create shared accounts for organizations, gangs, or businesses with role-based permissions.", imagePosition: "right" },
        ],
        category: "script",
    },
    {
        id: "6",
        slug: "midnight-notifications",
        name: "Midnight Notifications",
        price: 9.99,
        tags: ["Standalone"],
        shortDescription: "Beautiful notification system with multiple styles, sounds, and animation presets.",
        description: "A lightweight, beautiful notification system featuring multiple styles (toast, alert, info), custom sounds, and smooth Framer Motion animations. Drop-in replacement for any existing notification resource.",
        requirements: [
            { name: "Standalone", type: "framework" }
        ],
        features: [
            { title: "Multiple Styles", description: "Choose from toast, full-width, or minimal notification styles to match your server's aesthetic.", imagePosition: "left" },
            { title: "Sound Support", description: "Custom notification sounds with volume control and category-based audio profiles.", imagePosition: "right" },
        ],
        category: "script",
    },
]

export const bundles: Product[] = [
    {
        id: "b1",
        slug: "midnight-essentials",
        name: "Midnight Essentials Bundle",
        price: 89.99,
        tags: ["QBCore"],
        shortDescription: "HUD + Phone + Inventory — everything your server needs to get started with a premium feel.",
        description: "Get the three most essential scripts at a massive discount. Includes Midnight HUD, Midnight Phone, and Midnight Inventory. All scripts are designed to work together seamlessly.",
        requirements: [
            { name: "QBCore / QBox", type: "framework" },
            { name: "ox_lib", type: "resource", link: "https://overextended.dev/ox_lib" },
            { name: "oxmysql", type: "resource", link: "https://overextended.dev/oxmysql" }
        ],
        features: [
            { title: "Unified Design Language", description: "All three scripts share the same glassmorphic design language, creating a cohesive player experience.", imagePosition: "left" },
            { title: "Framework Integration", description: "Deep integration between inventory, phone, and HUD for a seamless gameplay experience.", imagePosition: "right" },
            { title: "Save 15%", description: "Get all three scripts at a significant discount compared to buying them individually.", imagePosition: "left" },
        ],
        category: "bundle",
    },
    {
        id: "b2",
        slug: "midnight-complete",
        name: "Midnight Complete Bundle",
        price: 129.99,
        tags: ["QBCore"],
        shortDescription: "Every Midnight Dev script in one package at the best possible price.",
        description: "The complete Midnight Dev experience. Includes every script we offer with free updates forever. The best value for serious server owners who want a premium, cohesive player experience.",
        requirements: [
            { name: "QBCore / ESX / QBox", type: "framework" },
            { name: "ox_lib", type: "resource", link: "https://overextended.dev/ox_lib" },
            { name: "oxmysql", type: "resource", link: "https://overextended.dev/oxmysql" }
        ],
        features: [
            { title: "Everything Included", description: "Every current and future Midnight Dev script included in one package.", imagePosition: "left" },
            { title: "Priority Support", description: "Get priority access to our Discord support channels with faster response times.", imagePosition: "right" },
            { title: "Save 30%+", description: "The biggest discount available. Save over 30% compared to individual pricing.", imagePosition: "left" },
        ],
        category: "bundle",
    },
]

export const featuredProducts: Product[] = [scripts[0], scripts[1], scripts[2], bundles[0]]

export function getProductBySlug(slug: string): Product | undefined {
    return [...scripts, ...bundles].find((p) => p.slug === slug)
}
