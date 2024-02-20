import React from "react";

import { ActionType } from "@mrgnlabs/marginfi-v2-ui-state";
import { useForm } from "react-hook-form";

import { cn } from "~/utils";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { IconArrowLeft } from "~/components/ui/icons";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Label } from "~/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormMessage } from "~/components/ui/form";

type ActionBoxSlippageProps = {
  mode: ActionType;
  slippageBps: number;
  setSlippageBps: (value: number) => void;
};

const DEFAULT_SLIPPAGE_BPS = 100;

const slippageOptions = [
  {
    label: "Low",
    value: 0.5,
  },
  {
    label: "Normal",
    value: 1,
  },
  {
    label: "High",
    value: 5,
  },
];

interface SlippageForm {
  slippageBps: number;
}

export const ActionBoxSlippage = ({ mode, slippageBps, setSlippageBps }: ActionBoxSlippageProps) => {
  const form = useForm<SlippageForm>({
    defaultValues: {
      slippageBps: slippageBps,
    },
  });
  const formWatch = form.watch();

  const isCustomSlippage = React.useMemo(
    () => (slippageOptions.find((value) => value.value === formWatch.slippageBps) ? false : true),
    [formWatch.slippageBps]
  );

  const modeLabel = React.useMemo(() => {
    let label = "";

    if (mode === ActionType.Deposit) {
      label = "to lending";
    } else if (mode === ActionType.Borrow) {
      label = "to borrowing";
    }

    return label;
  }, [mode]);

  function onSubmit(data: SlippageForm) {
    setSlippageBps(data.slippageBps);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <button className="flex items-center gap-1.5 text-sm" onClick={() => setSlippageBps(slippageBps)}>
          <IconArrowLeft size={18} /> Back {modeLabel}
        </button>
        <h2 className="text-lg font-normal mb-2 flex items-center gap-2">Set transaction slippage </h2>
        <FormField
          control={form.control}
          name="slippageBps"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormControl>
                <RadioGroup
                  onValueChange={(value) => field.onChange(Number(value))}
                  defaultValue={field.value.toString()}
                  className="flex justify-between"
                >
                  {slippageOptions.map((option) => (
                    <div
                      key={option.label}
                      className={cn(
                        "w-full font-light border border-transparent rounded p-3 bg-background/50 transition-colors hover:bg-background-gray-hover",
                        field.value === option.value && "bg-background-gray-hover border-chartreuse"
                      )}
                    >
                      <RadioGroupItem value={option.value.toString()} id={option.value.toString()} className="hidden" />
                      <Label
                        className={"flex flex-col gap-2 h-auto w-full text-center"}
                        htmlFor={option.value.toString()}
                      >
                        {" "}
                        {option.label} <strong className="font-medium">{option.value} %</strong>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <h2 className="font-normal mb-2">or set manually</h2>

        <FormField
          control={form.control}
          name="slippageBps"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative mb-6">
                  <Input
                    type="number"
                    min={0}
                    value={isCustomSlippage ? field.value : undefined}
                    placeholder={isCustomSlippage ? field.value.toString() : "0"}
                    onChange={(e) => field.onChange(e)}
                    className={cn(
                      "h-auto bg-background/50 py-3 px-4 border border-transparent text-white transition-colors focus-visible:ring-0",
                      isCustomSlippage && "border-chartreuse"
                    )}
                  />
                  <span className="absolute inset-y-0 right-3 text-sm flex items-center">%</span>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full py-6">
          Save Settings
        </Button>
      </form>
    </Form>
  );
};
