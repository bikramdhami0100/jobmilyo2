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

interface ResponChartProps {
  numberOfHirings: number;
  numberOfRejected: number;
  totalApplication: number;
}

export function ResponChart({numberOfHirings,numberOfRejected,totalApplication}:ResponChartProps) {
  const chartData = [
    { browser: "Shortlisted", visitors: totalApplication-numberOfHirings-numberOfRejected, fill: "blue" },
    { browser: "Hired", visitors: numberOfHirings, fill: "green" },
    { browser: "Rejected", visitors: numberOfRejected, fill: "red" },
  
  ]
  
  const chartConfig = {
    visitors: {
      label: "Visitors",
      // color:"blue"
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
  const bottomResult=[
    {
      name:"Shortlisted",
      color:"blue",
      number:totalApplication-numberOfHirings-numberOfRejected,
      icon:IconSquare
    },
    {
      name:"Hired",
      color:"green",
      number:numberOfHirings,
      icon:IconSquare
    },
    {
      name:"Rejected",
      color:"red",
      number:numberOfRejected,
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
        
        <div className=" flex  justify-around w-full ">
            {
               bottomResult.map((item,index)=>{
                return(
                  <div key={index} className=" flex flex-col gap-2">
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
