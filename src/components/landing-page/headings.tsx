import React from "react";

interface HeadingProps {
  title: string;
  pill: string;
  subheading?: string;
}

const Heading = ({ title, pill, subheading }: HeadingProps) => {
  return (
    <>
      <div className="flex flex-col gap-4 justify-center items-start md:items-center">
        <article className="p-[1px] rounded-full dark:bg-gradient-to-r dark:from-brand/brand-primary-blue dark:to-brand/brand-primary-purple">
          <div className="rounded-full px-4 py-1 text-center bg-brand/brand-neutral text-sm">
            {pill}
          </div>
        </article>
       

        <h2 className="text-left md:text-center sm:max-w-[850px] text-3xl md:text-5xl font-semibold">
          {title}
        </h2>
        {subheading && (
          <p className="text-sm text-left sm:text-center">
              {subheading}
          </p>
        )}
      </div>
    </>
  );
};

export default Heading;
