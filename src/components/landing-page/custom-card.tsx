import React from "react";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface CustomCardProps {
  cardHeader?: React.ReactNode
  cardContent?: React.ReactNode
  cardFooter?: React.ReactNode
  className: string;
}

const CustomCard = ({cardHeader, cardFooter, cardContent, className, ...props}: CustomCardProps) => {
  return <Card className={cn("w-[380px]", className)}>
    <CardHeader>{cardHeader}</CardHeader>
    <CardContent>{cardContent}</CardContent>
    <CardFooter>{cardFooter}</CardFooter>
  </Card>;
};

export default CustomCard;
