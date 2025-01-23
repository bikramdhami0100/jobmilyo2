"use client"

import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart, Sector } from "recharts"
import { PieSectorDataItem } from "recharts/types/polar/Pie"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { IconCube, IconSquare } from "@tabler/icons-react"
const chartData = [
  { browser: "Shortlisted", visitors: 275, fill: "blue" },
  { browser: "Hired", visitors: 200, fill: "green" },
  { browser: "Rejected", visitors: 187, fill: "red" },

]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  
  chrome: {
    label: "Rejected",
    color: "red",
  },
  safari: {
    label: "Hired",
    color: "green",
  },
  firefox: {
    label: "Short Listed",
    color: "blue",
  },

} satisfies ChartConfig


export function ResponChart() {
  const bottomResult=[
    {
      name:"Shortlisted",
      color:"blue",
      number:275,
      icon:IconSquare
    },
    {
      name:"Hired",
      color:"green",
      number:200,
      icon:IconSquare
    },
    {
      name:"Rejected",
      color:"red",
      number:187,
      icon:IconSquare
    }
  ]
  return (
    <Card className="flex flex-col w-full">
      <CardHeader className=" flex  ">
        {/* <CardTitle>Application Respone</CardTitle> */}
        <CardDescription className=" flex   justify-between">
         <div className=" text-xl font-bold">
           Application Respone
        </div>   
         <div>
         Download Report
         </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={60}
              strokeWidth={5}
              activeIndex={0}
              activeShape={({
                outerRadius = 0,
                ...props
              }: PieSectorDataItem) => (
                <Sector {...props} outerRadius={outerRadius + 10} />
              )}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="">
        {/* <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div> */}
        <div className=" flex  justify-around w-full ">
            {
               bottomResult.map((item,index)=>{
                return(
                  <div className=" flex flex-col gap-2">
                     <div className=" flex gap-1" ><item.icon fill={item?.color} />{item?.name}</div>
                     <div className=" text-2xl font-bold">{item?.number}</div>
                  </div>
                )
               })
            }
        </div>
      </CardFooter>
    </Card>
  )
}
