import * as React from "react";
import { HexColorPicker } from "react-colorful";
import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import { ChevronDownIcon } from "lucide-react";

import { PopoverTrigger } from "@/components/ui/popover";

import { cn } from "@/lib/utils";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
    InputGroupText,
} from "@/components/ui/input-group";
import { FieldLabel } from "@/components/ui/field";
import { InputShell } from "@/components/ui/input-shell";

function hexToRgb(hex: string) {
    const raw = hex.replace("#", "");
    const full = raw.length === 3 ? raw.split("").map((c) => c + c).join("") : raw;
    const num = parseInt(full, 16);
    if (isNaN(num) || (full.length !== 6 && full.length !== 3)) {
        return { r: 0, g: 0, b: 0 };
    }
    return {
        r: (num >> 16) & 255,
        g: (num >> 8) & 255,
        b: num & 255,
    };
}

function rgbToHex(r: number, g: number, b: number) {
    const clamp = (v: number) => Math.max(0, Math.min(255, Math.round(v) || 0));
    return `#${((1 << 24) + (clamp(r) << 16) + (clamp(g) << 8) + clamp(b)).toString(16).slice(1)}`;
}

const DEFAULT_SWATCHES = [
    "#000000",
    "#ffffff",
    "#f43f5e",
    "#f97316",
    "#eab308",
    "#22c55e",
    "#06b6d4",
    "#3b82f6",
    "#6366f1",
    "#a855f7",
    "#ec4899",
    "#7869e6",
];

export interface ColourPickerProps extends Omit<React.ComponentProps<"div">, "onChange"> {
    color: string;
    onChange: (color: string) => void;
    swatches?: string[];
}

function ColourPicker({
    color,
    onChange,
    swatches = DEFAULT_SWATCHES,
    className,
    ...props
}: ColourPickerProps) {
    const rgb = React.useMemo(() => hexToRgb(color), [color]);
    const [hexInput, setHexInput] = React.useState(() => color.replace("#", "").toUpperCase());

    React.useEffect(() => {
        setHexInput(color.replace("#", "").toUpperCase());
    }, [color]);

    const handleChannelChange = (channel: "r" | "g" | "b", valStr: string) => {
        const parsed = parseInt(valStr, 10);
        const next = { ...rgb, [channel]: isNaN(parsed) ? 0 : Math.max(0, Math.min(255, parsed)) };
        onChange(rgbToHex(next.r, next.g, next.b));
    };

    const handleHexChange = (valStr: string) => {
        const cleaned = valStr.replace(/[^0-9A-Fa-f]/g, "").slice(0, 6).toUpperCase();
        setHexInput(cleaned);
        if (cleaned.length === 3 || cleaned.length === 6) {
            onChange(`#${cleaned}`);
        }
    };

    return (
        <div className={cn("flex flex-col gap-3 w-full", className)} {...props}>
            <div className="flex flex-row items-center gap-2 w-full">
                <HexColorPicker
                    color={color}
                    onChange={onChange}
                    className="w-64! h-42! shrink-0"
                />

                <div className="flex flex-col gap-2 flex-1 min-w-0">
                    {(["r", "g", "b"] as const).map((channel) => (
                        <InputGroup key={channel} className="h-9 gap-0 flex items-center justify-between overflow-hidden">
                            <InputGroupAddon
                                align="inline-start"
                                className="order-0 p-0 shrink-0 flex items-center"
                            >
                                <InputGroupText className="text-base uppercase text-muted">
                                    {channel}
                                </InputGroupText>
                            </InputGroupAddon>
                            <InputGroupInput
                                type="number"
                                min={0}
                                max={255}
                                aria-label={channel === "r" ? "Red channel (0-255)" : channel === "g" ? "Green channel (0-255)" : "Blue channel (0-255)"}
                                value={rgb[channel]}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChannelChange(channel, e.target.value)}
                                className="flex-1 h-full text-right text-base px-0 py-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-inner-spin-button]:m-0"
                            />
                        </InputGroup>
                    ))}

                    <InputGroup className="h-9 gap-0 flex items-center justify-between overflow-hidden">
                        <InputGroupAddon
                            align="inline-start"
                            className="order-0 p-0 shrink-0 flex items-center"
                        >
                            <InputGroupText className="text-base uppercase text-muted">
                                HEX
                            </InputGroupText>
                        </InputGroupAddon>
                        <InputGroupInput
                            type="text"
                            maxLength={6}
                            aria-label="Hex color code"
                            value={hexInput}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleHexChange(e.target.value)}
                            className="flex-1 h-full text-right text-base uppercase px-0 py-0"
                        />
                    </InputGroup>
                </div>
            </div>

            {swatches.length > 0 && (
                <div className="flex flex-col gap-2.5 w-full pt-1">
                    <FieldLabel>Colour Presets</FieldLabel>
                    <div className="flex w-full items-center gap-1.5" role="toolbar" aria-label="Colour Presets">
                        {swatches.map((s) => {
                            const isSelected = color.toLowerCase() === s.toLowerCase();
                            return (
                                <button
                                    key={s}
                                    type="button"
                                    onClick={() => onChange(s)}
                                    className={cn(
                                        "flex-1 h-7 rounded-xs ring-1 ring-border cursor-pointer transition-all duration-150 hover:-translate-y-0.75 outline-none focus-visible:ring-2 focus-visible:ring-border-active",
                                        isSelected ? "ring-2 ring-white -translate-y-0.5" : ""
                                    )}
                                    style={{ backgroundColor: s }}
                                    title={s}
                                    aria-label={`Select swatch ${s}`}
                                    aria-pressed={isSelected}
                                />
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}

export interface ColourPickerTriggerProps extends PopoverPrimitive.Trigger.Props {
    color?: string;
}

function ColourPickerTrigger({
    className,
    children,
    color,
    ...props
}: ColourPickerTriggerProps) {
    const swatch = color && (
        <span
            aria-hidden="true"
            className="size-4.5 rounded-xs ring-1 ring-border shrink-0"
            style={{ backgroundColor: color }}
        />
    );

    const label = children
        ? <span className="truncate">{children}</span>
        : color
            ? <span className="text-sm uppercase text-foreground">{color}</span>
            : <span className="text-muted text-base">Select colour...</span>;

    return (
        <PopoverTrigger
            data-slot="colour-picker-trigger"
            render={
                <InputShell
                    className={cn(
                        "group/trigger justify-between cursor-pointer",
                        className
                    )}
                />
            }
            {...props}
        >
            <span className="flex items-center gap-2 min-w-0">
                {swatch}
                {label}
            </span>
            <ChevronDownIcon aria-hidden="true" className="-mr-1 opacity-50 pointer-events-none size-4 text-muted-foreground transition-snappy group-data-[popup-open]/trigger:rotate-180 group-data-[state=open]/trigger:rotate-180" />
        </PopoverTrigger>
    );
}

export {
    ColourPicker,
    ColourPickerTrigger,
};
