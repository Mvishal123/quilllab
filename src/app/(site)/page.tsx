import Heading from "@/components/landing-page/headings";
import Image from "next/image";
import React from "react";

import { CLIENTS, PRICING_CARDS, PRICING_PLANS, USERS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import CustomCard from "@/components/landing-page/custom-card";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Check, Gem, Heading1, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const HomePage = () => {
  return (
    <>
      <section className="overflow-hidden px-4 sm:px-6 sm:flex sm:flex-col gap-4 md:items-center md:justify-center mt-10">
        <Heading
          pill="✨ Your Workspace, Perfected"
          title="All-In-One Collaboration and Productivity platform"
        />
        <div className="rounded-lg dark:bg-gradient-to-r dark:from-brand/brand-primary-purple dark:to-brand/brand-primary-blue p-[2px] mt-10">
          <button className="rounded-lg bg-brand/brand-neutral px-3 py-1 text-2xl w-full">
            Get quilllab free
          </button>
        </div>
        <div className="relative flex justify-center items-center w-[750px] md:w-full mt-[-40px] md:mt-[-90px] ">
          <Image
            src="/appBanner.png"
            alt="application banner image"
            height={710}
            width={1359}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t dark:from-brand/brand-neutral top-[40%] z-10" />
        </div>
      </section>

      <section className="relative">
        <div
          className="
          overflow-hidden
          flex

          before:absolute
          before:top-0
          before:bottom-0
          before:left-0
          before:dark:bg-gradient-to-r
        before:from-brand/brand-neutral
          before:to-transparent
          before:w-20
          before:z-10

          after:absolute
          after:top-0
          after:bottom-0
          after:right-0
          after:dark:bg-gradient-to-l
        after:from-brand/brand-neutral
          after:to-transparent
          after:w-20
          after:z-10
        "
        >
          {Array(2)
            .fill(null)
            .map((_, i) => (
              <div className="flex flex-nowrap animate-slide" key={i}>
                {CLIENTS.map((client, i) => (
                  <div
                    key={i}
                    className="flex justify-center w-[150px] sm:w-[200px] m-20 items-center"
                  >
                    <Image
                      src={client.logo}
                      alt={client.alt}
                      width={200}
                      className="object-contain"
                    />
                  </div>
                ))}
              </div>
            ))}
        </div>
      </section>

      <section className="relative px-4 sm:px-6 flex flex-col items-center justify-center">
        <div className="absolute -z-10 dark:bg-brand/brand-primary-purple w-[30%] h-32 rounded-full blur-[120px]" />

        <Heading
          title="Keep track of your meetings all in one place"
          pill="Features"
          subheading="Capture your ideas, thoughts, and meeting notes in a structured and organized manner."
        />

        <div className="relative max-w-[450px] flex items-center justify-center mt-10 sm:ml-0 w-full rounded-2xl border-8 border-washed-purple/washed-purple-300 border-opacity-10">
          <Image
            src={"/Calendar.png"}
            alt="Calender banner"
            width={753}
            height={562}
            className="rounded-2xl"
          />
        </div>
      </section>

      <section className="relative ">
        <div className="absolute -z-10 top-56 dark:bg-brand/brand-primary-purple/50 w-full h-32 rounded-2xl blur-[120px]" />

        <div className="mt-20 px-4 sm:px-6 flex flex-col overflow-visible overflow-x-hidden">
          <Heading
            title="Trusted by all"
            subheading="Join thousands of satisfied users who rely on our platform for their 
            personal and professional productivity needs."
            pill="Testimonials"
          />

          {[...Array(2)].map((arr, index) => (
            <div
              key={index}
              className={twMerge(
                clsx("mt-10 flex flex-nowrap gap-6 self-start", {
                  "flex-row-reverse": index === 1,
                  "animate-[slide_250s_linear_infinite]": true,
                  "animate-[slide_250s_linear_infinite_reverse]": index === 1,
                  "ml-[100vw]": index === 1,
                }),
                "hover:paused"
              )}
            >
              {USERS.map((testimonial, index) => (
                <CustomCard
                  key={testimonial.name}
                  className="
                  w-[500px]
                  shrink-0s
                  rounded-xl
                  dark:bg-gradient-to-t
                  dark:from-border dark:to-background
                "
                  cardHeader={
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <AvatarImage src="" alt="avatar" />
                        <AvatarFallback>
                          <User />
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <h2 className="text-foreground">{testimonial.name}</h2>
                        <p className="dark:text-foreground/75 text-xs">
                          {testimonial.name.toLowerCase()}
                        </p>
                      </div>
                    </div>
                  }
                  cardContent={<div>{testimonial.message}</div>}
                ></CustomCard>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section className="relative mt-10 px-4 sm:px-6">
        <Heading pill="Pricing" title="The perfect plan for you" />
        <div className="mt-10 flex flex-col-reverse items-center md:flex-row md:items-stretch justify-center gap-4">
          {PRICING_CARDS.map((pricing, index) => (
            <CustomCard
              key={pricing.planType}
              className={cn("w-[350px]  bg-black/50 backdrop-blur-xl", {
                "border-brand/brand-primary-purple/30":
                  pricing.planType === PRICING_PLANS.proplan,
              })}
              cardHeader={
                <>
                  <h1 className="font-bold text-2xl">{pricing.planType}</h1>
                  {pricing.planType === PRICING_PLANS.proplan && (
                    <>
                      <div
                        className="dark:block w-full blur-[120px] rounded-full h-32
                    absolute
                    dark:bg-brand/brand-primary-purple/90
                    -z-10
                    top-0
                  "
                      />
                      <Gem className="absolute z-10 right-3 top-6" />
                    </>
                  )}
                </>
              }
              cardContent={
                <div>
                  <div className="flex items-center gap-1">
                    <h1 className="text-2xl">${pricing.price}</h1>
                    {pricing.planType === PRICING_PLANS.proplan && (
                      <span className="text-brand/brand-washed-purple">
                        /mo
                      </span>
                    )}
                  </div>
                  <p className="font-normal text-sm text-brand/brand-washed-purple">
                    {pricing.description}
                  </p>
                  <Button className="whitespace-nowrap w-full mt-4 " variant={"btn-primary"}>
                    {pricing.planType === PRICING_PLANS.proplan
                      ? "Go Pro"
                      : "Get Started"}
                  </Button>
                </div>
              }
              cardFooter={
                <div className="flex flex-col gap-3">
                  {pricing.planType === PRICING_PLANS.proplan && (
                    <p className="font-semibold"> {pricing.highlightFeature}</p>
                  )}
                  <ul className="flex flex-col gap-6 mb-4">
                    {pricing.features.map((feature, index) => (
                      <li key={feature} className="flex gap-1 items-center">
                        <Check className="text-brand/brand-washed-purple" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              }
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default HomePage;
