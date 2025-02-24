// components/shared/search/SearchWrapper.tsx
"use client";

import { Suspense } from "react";
import LocalSearchbar from "./LocalSearchbar";

interface SearchWrapperProps {
  route: string;
  iconPosition: string;
  imgSrc: string;
  placeholder: string;
  otherClasses?: string;
}

const SearchWrapper = ({
  route,
  iconPosition,
  imgSrc,
  placeholder,
  otherClasses,
}: SearchWrapperProps) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LocalSearchbar
        route={route}
        iconPosition={iconPosition}
        imgSrc={imgSrc}
        placeholder={placeholder}
        otherClasses={otherClasses}
      />
    </Suspense>
  );
};

export default SearchWrapper;
