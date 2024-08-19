import { Button } from "@camped-ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@camped-ui/form";
import { Input } from "@camped-ui/input";
import { cn } from "@camped-ui/lib";
import { Calendar } from "@camped-ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@camped-ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@camped-ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { Icon } from "../icons";

const DynamicFormComponents = ({
  handleOnBlur,
  schemaData,
  control,
  watch,
  disabledDate,
}: {
  schemaData: any;
  handleOnBlur: any;
  control: any;
  watch: any;
  disabledDate?: any;
}) => {
  if (schemaData?.inputType === "textInput") {
    return (
      <FormField
        control={control}
        name={schemaData?.fieldName}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{schemaData?.label}</FormLabel>
            <FormControl>
              <Input
                placeholder={schemaData?.placeholder}
                {...field}
                onChange={field.onChange}
                className='border-border'
                onBlur={(blurData) =>
                  handleOnBlur({
                    type: schemaData?.fieldName,
                    data: blurData.target.value,
                  })
                }
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
        rules={schemaData?.rules || {}}
      />
    );
  } else if (schemaData?.inputType == "password") {
    const [showPassword, setShowPassword] = useState(false);
    const disabled =
      watch(schemaData?.fieldName) === "" ||
      watch(schemaData?.fieldName) === undefined;

    return (
      <FormField
        control={control}
        name={schemaData?.fieldName}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{schemaData?.label}</FormLabel>
            <FormControl>
              <div className='relative'>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder={schemaData?.placeholder}
                  {...field}
                  onChange={field.onChange}
                  className='border-border'
                  onBlur={(blurData) =>
                    handleOnBlur({
                      type: schemaData?.fieldName,
                      data: blurData.target.value,
                    })
                  }
                />
                <Button
                  type='button'
                  variant='ghost'
                  size='sm'
                  className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent'
                  onClick={() => setShowPassword((prev) => !prev)}
                  disabled={disabled}
                >
                  {showPassword && !disabled ? (
                    <Icon.Eye className='h-4 w-4' aria-hidden='true' />
                  ) : (
                    <Icon.EyeOff className='h-4 w-4' aria-hidden='true' />
                  )}
                </Button>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
        rules={schemaData?.rules || {}}
      />
    );
  } else if (schemaData?.inputType == "dataPicker") {
    const [canShow, setCanShow] = useState(false);
    return (
      <FormField
        control={control}
        name={schemaData?.fieldName}
        render={({ field }) => (
          <FormItem className='flex flex-col mt-2'>
            <FormLabel>{schemaData?.label}</FormLabel>
            <Popover open={canShow}>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    onClick={() => setCanShow(true)}
                    variant={"outline"}
                    className={cn(
                      "w-[240px] pl-3 text-left font-normal border-border",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value ? (
                      format(field.value, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                    <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className='w-auto p-0' align='start'>
                <Calendar
                  mode='single'
                  selected={field.value}
                  onSelect={(value: any) => {
                    const formattedData = value
                      ? format(value, "dd MMM yyyy")
                      : "";
                    field.onChange(formattedData);
                    handleOnBlur({
                      type: schemaData?.fieldName,
                      data: formattedData,
                    });
                    setCanShow(false);
                  }}
                  disabled={disabledDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  } else if (schemaData?.inputType === "dropDown") {
    return (
      <FormField
        control={control}
        name={schemaData?.fieldName}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{schemaData?.label}</FormLabel>
            <Select
              onValueChange={(value) => {
                field.onChange(value);
                handleOnBlur({ type: schemaData?.fieldName, data: value });
              }}
              defaultValue={schemaData?.items?.[0]?.value}
            >
              <FormControl>
                <SelectTrigger className='border-border'>
                  <SelectValue placeholder={schemaData?.placeholder} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {schemaData?.items?.map((item: any) => (
                  <SelectItem value={item?.value}>{item?.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }
};

export default DynamicFormComponents;
