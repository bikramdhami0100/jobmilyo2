"use client"
import React, { useEffect, useState } from 'react';
import SearchFilters from '../../components/SearchFilters';
import SearchMainPart from '../../components/SearchMainPart';
import AnyThingSearch from '../../components/AnyThingSearch';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

function UserSearchContent({ params }: any) {
  const query:any=decodeURIComponent( params.search);
  console.log(query);
  const [anyThingSearch, setAnyThingSearch] = useState<string>("");
  const [selectField, setSelectField] = useState<any>(null);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const pageHandler = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setPage(page);
    }
  };
 
  return (
    <div>
      {/* filters */}
      <div className='flex flex-wrap'>
        <div className='w-[18%] border'>
          <div className='hidden w-full md:flex lg:flex items-center justify-center p-2'>
            <SearchFilters selectField={selectField} setSelectField={setSelectField} />
          </div>
        </div>
        <div className='relative md:w-[82%] lg:[82%]'>
          {/* anything search */}
          <div className='fixed top-[70px] z-20 bg-white w-full'>
            <AnyThingSearch anyThingSearch={anyThingSearch} setAnyThingSearch={setAnyThingSearch} />
          </div>
          {/* search data and profile */}
          <div className='w-full flex justify-center mt-[114px] flex-wrap'>
            <div className='w-full p-2'>
              <SearchMainPart page={page} setTotalPages={setTotalPages} selectField={selectField} anyThingSearch={anyThingSearch} />
              <Pagination>
                <PaginationContent>
                  <PaginationItem onClick={() => pageHandler(page - 1)}>
                    <PaginationPrevious isActive={page > 1} />
                  </PaginationItem>
                  {
                    Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
                      <PaginationItem key={pageNumber} className='cursor-pointer'>
                        <PaginationLink
                          isActive={page === pageNumber}
                          onClick={() => pageHandler(pageNumber)}
                        >
                          {pageNumber}
                        </PaginationLink>
                      </PaginationItem>
                    ))
                  }
                  <PaginationItem onClick={() => pageHandler(page + 1)}>
                    <PaginationNext isActive={page < totalPages} />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserSearchContent;
