"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { formUrlQuery, removeKeysFromUrlQuery } from "@/lib/url";

import { Input } from "./input";

interface CustomeInputProps {
  route?: string;
  query?: string;
  placeholder: string;
}
const SearchInput = ({ route, placeholder = "Name or title...", query = "search" }: CustomeInputProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get(query) || "";
  const [searchQuery, setSearchQuery] = useState(search || "");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const params = searchParams.toString();

      if (searchQuery) {
        router.push(
          formUrlQuery({
            params,
            key: query,
            value: searchQuery,
          }),
          { scroll: false }
        );
      } else {
        if (pathname === route) {
          router.push(
            removeKeysFromUrlQuery({
              params,
              keysToRemove: [query],
            }),
            { scroll: false }
          );
        }
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]); // <— IMPORTANT

  return (
    <div>
      <Input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
};
export default SearchInput;
