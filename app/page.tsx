"use client";

import Image from "next/image";
import { InputHTMLAttributes, useState } from "react";
import { useEffect } from "react";

export default function Home() {
  let date = new Date()

  function numberOfDaysInPreviousMonth(year: number, month: number) {
    // JavaScript months are 0-indexed (0 = January, 11 = December)
    // Create a date for the 0th day of the current month → gives last day of previous month
    const date = new Date(year, month - 1, 0);
    return date.getDate();
  }


  const [birthYear, setBirthYear] = useState<string>("");
  const [birthMonth, setBirthMonth] = useState<string>("");
  const [birthDay, setBirthDay] = useState<string>("");

  const [ageYears, setAgeYears] = useState<number>();
  const [ageMonths, setAgeMonths] = useState<number>();
  const [ageDays, setAgeDays] = useState<number>();

  const [ageYearsError, setAgeYearsError] = useState<string>("");
  const [ageMonthsError, setAgeMonthsError] = useState<string>("");
  const [ageDaysError, setAgeDaysError] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let daysErrored = false;
    let monthsErrored = false;
    let yearsErrored = false;

    if(isNaN(Number(birthYear))){
      setAgeYearsError("Year must be a number");
      yearsErrored = true;
    }

    else if(birthYear.length > 4){
      setAgeYearsError("Year is too big");
      yearsErrored = true;
    }

    else if(birthYear.length === 0){
      setAgeYearsError("This field can't be empty");
      yearsErrored = true;
    }

    if(isNaN(Number(birthMonth))){
      setAgeMonthsError("Month must be a number");
      monthsErrored = true;
    }

    else if(Number(birthMonth) > 12){
      setAgeMonthsError("Month is invalid");
      monthsErrored = true;
    }

    else if(birthMonth.length === 0){
      setAgeMonthsError("This field can't be empty");
      monthsErrored = true;
    }

    if(isNaN(Number(birthDay))){
      setAgeDaysError("Day must be a number");
      daysErrored = true;
    }

    else if(Number(birthDay) > new Date(Number(birthYear), Number(birthMonth), 0).getDate() || Number(birthDay) > 31){
      setAgeDaysError("Day is invalid");
      daysErrored = true;
    }

    else if(birthDay.length === 0){
      setAgeDaysError("This field can't be empty");
      daysErrored = true;
    }

    if(!daysErrored){
      setAgeDaysError("");
    }
    if(!monthsErrored){
      setAgeMonthsError("");
    }
    if(!yearsErrored){
      setAgeYearsError("");
    }

    if(daysErrored || monthsErrored || yearsErrored){
      return;
    }

    let years = date.getFullYear() - Number(birthYear);
    let months = date.getMonth() - (Number(birthMonth) - 1);
    let days = date.getDate() - Number(birthDay);

    if (days < 0) {
      months -= 1;
      days += numberOfDaysInPreviousMonth(date.getFullYear(), date.getMonth() + 1);
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    setAgeYears(years);
    setAgeMonths(months);
    setAgeDays(days);

  }

  return (
    <div className="flex h-screen items-center justify-center bg-slate-200">
      <div className="w-11/12 md:w-9/12 lg:w-7/12 xl:w-5/12 bg-white px-7 py-12 rounded-3xl rounded-br-[100px] relative">
        {/* Input group div */}
        <form action="/submit" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-15 mb-15">
            <div className="flex w-full lg:w-10/12 gap-4">
              <div className="flex flex-col">
                <label htmlFor="day" className="text-slate-400 font-normal ">DAY</label>
                <input type="text" id="day" className={`border ${ageDaysError.length === 0 ? "border-gray-300": "border-red-500"} focus:border-purple-500 focus:outline-none w-full p-4 rounded-md text-black font-bold text-2xl`} placeholder="DD" value={birthDay} onChange={(event) => {
                  setBirthDay(event.target.value);
                }}/>
                {ageDaysError.length > 0 && <p className="text-red-500 text-sm">{ageDaysError}</p>}
              </div>
              <div className="flex flex-col">
                <label htmlFor="month" className="text-slate-400 font-normal">MONTH</label>
                <input type="text" id="month" className={`border ${ageMonthsError.length === 0 ? "border-gray-300": "border-red-500"} focus:border-purple-500 focus:outline-none w-full p-4 rounded-md text-black font-bold text-2xl`} placeholder="MM" value={birthMonth} onChange={(event) => {
                  setBirthMonth(event.target.value);
                }}/>
                {ageMonthsError.length > 0 && <p className="text-red-500 text-sm">{ageMonthsError}</p>}
              </div>
              <div className="flex flex-col">
                <label htmlFor="year" className="text-slate-400 font-normal">YEAR</label>
                <input type="text" id="year" className={`border ${ageYearsError.length === 0 ? "border-gray-300": "border-red-500"} focus:border-purple-500 focus:outline-none w-full p-4 rounded-md text-black font-bold text-2xl`} placeholder="YYY" value={birthYear} onChange={(event) => {
                  setBirthYear(event.target.value);
                }}/>
                {ageYearsError.length > 0 && <p className="text-red-500 text-sm">{ageYearsError}</p>}
              </div>
            </div>
            <div>
              <div className="border-t border-gray-300 w-full lg:w-11/12"></div>
              
              <button className="w-20 aspect-square rounded-full bg-purple-600 absolute lg:right-0 lg:left-auto left-1/2 -translate-1/2 flex justify-center items-center hover:bg-zinc-900 hover:scale-105 transition" type="submit">
                <img src="/images/icon-arrow.svg" alt="" className="aspect-square w-9" />
              </button>
            </div>
          </div>
        </form>
        <div className="text-black font-extrabold italic text-5xl sm:text-6xl">
          <div className="flex gap-2">
            {ageDays === undefined ? <p className="text-purple-600">--</p> : <p className="text-purple-600">{ageDays}</p>}
            
            <h2>days</h2>
          </div>
          <div className="flex gap-2">

            {ageMonths === undefined ? <p className="text-purple-600">--</p> : <p className="text-purple-600">{ageMonths}</p>}
            <h2>months</h2>
          </div>
          <div className="flex gap-2">
            {ageYears === undefined ? <p className="text-purple-600">--</p> : <p className="text-purple-600">{ageYears}</p>}
            <h2>years</h2>
          </div>
        </div>

      </div>
    </div>
  );
}
