/* eslint-disable max-lines */

import {
  ChevronDownIcon,
  ChevronUpIcon
} from "@radix-ui/react-icons";
import { type FC, useEffect, useRef, useState } from "react";
import { FiCalendar } from "react-icons/fi";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
// import { cn } from '@/lib/utils'
export interface DateRangePickerProps {
  /** Click handler for applying the updates from DateRangePicker. */
  onUpdate?: (values: { range: DateRange }) => void;
  /** Initial value for start date */
  initialDateFrom?: Date | string;
  /** Initial value for end date */
  initialDateTo?: Date | string;
  /** Initial value for start date for compare */
  initialCompareFrom?: Date | string;
  /** Initial value for end date for compare */
  initialCompareTo?: Date | string;
  /** Alignment of popover */
  align?: "start" | "center" | "end";
  /** Option for locale */
  locale?: string;
  /** Option for showing compare feature */
  showCompare?: boolean;
}

const formatDate = (date: Date, locale: string = "en-us"): string => {
  return date.toLocaleDateString(locale, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const getDateAdjustedForTimezone = (dateInput: Date | string): Date => {
  if (typeof dateInput === "string") {
    // Split the date string to get year, month, and day parts
    const parts = dateInput.split("-").map((part) => parseInt(part, 10));
    // Create a new Date object using the local timezone
    // Note: Month is 0-indexed, so subtract 1 from the month part
    const date = new Date(parts[0], parts[1] - 1, parts[2]);
    return date;
  } else {
    // If dateInput is already a Date object, return it directly
    return dateInput;
  }
};

interface DateRange {
  from: Date;
  to: Date | undefined;
}

interface Preset {
  name: string;
  label: string;
}

// Define presets
const PRESETS: Preset[] = [
  { name: "today", label: "Today" },
  { name: "yesterday", label: "Yesterday" },
  { name: "lastWeek", label: "Last Week" },
  { name: "last7", label: "Last 7 days" },
  { name: "thisMonth", label: "This Month" },
  { name: "last30", label: "Last 30 days" },
  { name: "customRange", label: "Custom range" },
];

/** The DateRangePicker component allows a user to select a range of dates */
export const DateRangePicker: FC<DateRangePickerProps> & {
  filePath: string;
} = ({
  initialDateFrom = new Date(new Date().setHours(0, 0, 0, 0)),
  initialDateTo,
  initialCompareFrom,
  initialCompareTo,
  onUpdate,
  align = "end",
  locale = "en-US",
}): JSX.Element => {
    const [isOpen, setIsOpen] = useState(false);

    const [range, setRange] = useState<DateRange>({
      from: getDateAdjustedForTimezone(initialDateFrom),
      to: initialDateTo
        ? getDateAdjustedForTimezone(initialDateTo)
        : getDateAdjustedForTimezone(initialDateFrom),
    });
    const [rangeCompare, setRangeCompare] = useState<DateRange | undefined>(
      initialCompareFrom
        ? {
          from: new Date(new Date(initialCompareFrom).setHours(0, 0, 0, 0)),
          to: initialCompareTo
            ? new Date(new Date(initialCompareTo).setHours(0, 0, 0, 0))
            : new Date(new Date(initialCompareFrom).setHours(0, 0, 0, 0)),
        }
        : undefined
    );

    // Refs to store the values of range and rangeCompare when the date picker is opened
    const openedRangeRef = useRef<DateRange | undefined>();
    const openedRangeCompareRef = useRef<DateRange | undefined>();

    const [selectedPreset, setSelectedPreset] = useState<string | undefined>(
      undefined
    );

    const [isSmallScreen, setIsSmallScreen] = useState(
      typeof window !== "undefined" ? window.innerWidth < 760 : false
    );

    useEffect(() => {
      const handleResize = (): void => {
        setIsSmallScreen(window.innerWidth < 760);
      };

      window.addEventListener("resize", handleResize);

      // Clean up event listener on unmount
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);

    const getPresetRange = (presetName: string): DateRange => {
      const preset = PRESETS.find(({ name }) => name === presetName);
      if (!preset) throw new Error(`Unknown date range preset: ${presetName}`);
      const from = new Date();
      const to = new Date();
      const first = from.getDate() - from.getDay();

      switch (preset.name) {
        case "today":
          from.setHours(0, 0, 0, 0);
          to.setHours(23, 59, 59, 999);
          break;
        case "yesterday":
          from.setDate(from.getDate() - 1);
          from.setHours(0, 0, 0, 0);
          to.setDate(to.getDate() - 1);
          to.setHours(23, 59, 59, 999);
          break;
        case "lastWeek":
          from.setDate(from.getDate() - 7 - from.getDay());
          to.setDate(to.getDate() - to.getDay() - 1);
          from.setHours(0, 0, 0, 0);
          to.setHours(23, 59, 59, 999);
          break;
        case "last7":
          from.setDate(from.getDate() - 6);
          from.setHours(0, 0, 0, 0);
          to.setHours(23, 59, 59, 999);
          break;
        case "thisMonth":
          from.setDate(1);
          from.setHours(0, 0, 0, 0);
          to.setHours(23, 59, 59, 999);
          break;

        case "last30":
          from.setDate(from.getDate() - 29);
          from.setHours(0, 0, 0, 0);
          to.setHours(23, 59, 59, 999);
          break;
        case "customRange":
          from.setDate(from.getDate() - 29);
          from.setHours(0, 0, 0, 0);
          to.setHours(23, 59, 59, 999);
          break;
      }

      return { from, to };
    };

    const setPreset = (preset: string): void => {
      const range = getPresetRange(preset);
      setRange(range);
      if (rangeCompare) {
        const rangeCompare = {
          from: new Date(
            range.from.getFullYear() - 1,
            range.from.getMonth(),
            range.from.getDate()
          ),
          to: range.to
            ? new Date(
              range.to.getFullYear() - 1,
              range.to.getMonth(),
              range.to.getDate()
            )
            : undefined,
        };
        setRangeCompare(rangeCompare);
      }
    };

    const checkPreset = (): void => {
      for (const preset of PRESETS) {
        const presetRange = getPresetRange(preset.name);

        const normalizedRangeFrom = new Date(range.from);
        normalizedRangeFrom.setHours(0, 0, 0, 0);
        const normalizedPresetFrom = new Date(
          presetRange.from.setHours(0, 0, 0, 0)
        );

        const normalizedRangeTo = new Date(range.to ?? 0);
        normalizedRangeTo.setHours(0, 0, 0, 0);
        const normalizedPresetTo = new Date(
          presetRange.to?.setHours(0, 0, 0, 0) ?? 0
        );

        if (
          normalizedRangeFrom.getTime() === normalizedPresetFrom.getTime() &&
          normalizedRangeTo.getTime() === normalizedPresetTo.getTime()
        ) {
          setSelectedPreset(preset.name);
          return;
        }
      }

      setSelectedPreset('customRange');
    };

    const resetValues = (): void => {
      setRange({
        from:
          typeof initialDateFrom === "string"
            ? getDateAdjustedForTimezone(initialDateFrom)
            : initialDateFrom,
        to: initialDateTo
          ? typeof initialDateTo === "string"
            ? getDateAdjustedForTimezone(initialDateTo)
            : initialDateTo
          : typeof initialDateFrom === "string"
            ? getDateAdjustedForTimezone(initialDateFrom)
            : initialDateFrom,
      });
      setRangeCompare(
        initialCompareFrom
          ? {
            from:
              typeof initialCompareFrom === "string"
                ? getDateAdjustedForTimezone(initialCompareFrom)
                : initialCompareFrom,
            to: initialCompareTo
              ? typeof initialCompareTo === "string"
                ? getDateAdjustedForTimezone(initialCompareTo)
                : initialCompareTo
              : typeof initialCompareFrom === "string"
                ? getDateAdjustedForTimezone(initialCompareFrom)
                : initialCompareFrom,
          }
          : undefined
      );
    };

    useEffect(() => {
      checkPreset();
    }, [range]);

    const PresetButton = ({
      preset,
      label,
      isSelected,
    }: {
      preset: string;
      label: string;
      isSelected: boolean;
    }): JSX.Element => (
      <Button
        className={`${isSelected
          ? "bg-[#6C8CFF8A] pointer-events-none min-w-[150px] text-start border-none rounded-xl"
          : " rounded-xl bg-[#BCC0C01F]  min-w-[150px] text-start"
          }`}

        variant="ghost"
        onClick={() => {
          setPreset(preset);
        }}
      >
        <>
          {/* <span className={`pr-2 opacity-0 ${isSelected ? "opacity-70" : ""}`}>
            <CheckIcon width={18} height={18} />
          </span> */}
          {label}
        </>
      </Button>
    );

    // Helper function to check if two date ranges are equal
    const areRangesEqual = (a?: DateRange, b?: DateRange): boolean => {
      if (!a || !b) return a === b; // If either is undefined, return true if both are undefined
      return (
        a.from.getTime() === b.from.getTime() &&
        (!a.to || !b.to || a.to.getTime() === b.to.getTime())
      );
    };

    useEffect(() => {
      if (isOpen) {
        openedRangeRef.current = range;
        openedRangeCompareRef.current = rangeCompare;
      }
    }, [isOpen]);

    return (
      <Popover
        modal={true}
        open={isOpen}
        onOpenChange={(open: boolean) => {
          if (!open) {
            resetValues();
          }
          setIsOpen(open);
        }}
      >
        <PopoverTrigger asChild>
          <Button size={"lg"} variant="outline" className="bg-[#2F2386] hover:bg-[#2F2386] rounded-lg border-none">
            <div className="text-right">
              <div className="py-1 flex gap-x-4">
                <FiCalendar color="#00FFFF" size={22} /><div>{`${formatDate(range.from, locale)}${range.to != null ? " - " + formatDate(range.to, locale) : ""
                  }`}</div>
              </div>
              {rangeCompare != null && (
                <div className="opacity-60 text-xs -mt-1">
                  <>
                    vs. {formatDate(rangeCompare.from, locale)}
                    {rangeCompare.to != null
                      ? ` - ${formatDate(rangeCompare.to, locale)}`
                      : ""}
                  </>
                </div>
              )}
            </div>
            <div className="pl-1 opacity-60 -mr-2 scale-125">
              {isOpen ? (
                <ChevronUpIcon width={24} />
              ) : (
                <ChevronDownIcon width={24} />
              )}
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align={align}
          className="w-auto text-white border-[#6C8CFF42] bg-[#18142D]"
          style={{
            width: "auto",
            backgroundColor: '#18142D',
            borderColor: "#6C8CFF42"
          }}

        >
          <div className="flex py-2 w-auto text-white">
            <div className="flex">
              <div className="flex flex-col">
                {isSmallScreen && (
                  <Select

                    defaultValue={selectedPreset}
                    onValueChange={(value) => {
                      setPreset(value);
                    }}
                  >
                    <SelectTrigger style={{ borderColor: "none" }} className="w-auto mx-auto mb-2">
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent style={{ backgroundColor: "#18142D", color: "white", }} className="">
                      {PRESETS?.map((preset) => (
                        <SelectItem className="hover:bg-[#18142D]" key={preset.name} value={preset.name}>
                          {preset.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
                <div>
                  <Calendar
                    mode="range"
                    onSelect={(value: { from?: Date; to?: Date } | undefined) => {
                      if (value?.from != null) {
                        setRange({ from: value.from, to: value?.to });
                      }
                    }}
                    selected={range}
                    numberOfMonths={isSmallScreen ? 1 : 2}
                    defaultMonth={
                      new Date(
                        new Date().setMonth(
                          new Date().getMonth() - (isSmallScreen ? 0 : 1)
                        )
                      )
                    }
                  />
                </div>
              </div>
            </div>
            {!isSmallScreen && (
              <div className="flex flex-col items-end gap-1 pr-2 pl-6 pb-6">
                <div className="flex w-full flex-col items-end gap-1 pr-2 pl-6 pb-6">
                  {PRESETS?.map((preset) => (
                    <PresetButton
                      key={preset.name}
                      preset={preset.name}
                      label={preset.label}
                      isSelected={selectedPreset === preset.name}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="flex justify-end gap-2 py-2 pr-4 border-t-[1px] border-[#E1E1E30A]">
            <Button
              className="border-[1px] border-[#6C8CFF42] bg-[#3030301A] rounded-xl text-white"
              onClick={() => {
                setIsOpen(false);
                resetValues();
              }}
              variant="ghost"
            >
              Cancel
            </Button>
            <Button
              style={{ backgroundColor: "#6C8CFF" }}
              className="bg-[#6C8CFF] rounded-xl "
              onClick={() => {
                setIsOpen(false);
                if (
                  !areRangesEqual(range, openedRangeRef.current) ||
                  !areRangesEqual(rangeCompare, openedRangeCompareRef.current)
                ) {
                  onUpdate?.({ range });
                  // onUpdate?.{(range) => onChange(range)}
                }
              }}
            >
              Done
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    );
  };

DateRangePicker.displayName = "DateRangePicker";
DateRangePicker.filePath =
  "libs/shared/ui-kit/src/lib/date-range-picker/date-range-picker.tsx";
