"use client";
import React from "react";
import TabButton from "./TabButton";
import { useState } from "react";
import Link from "next/link";

// Tab data structure with description and registration links
const tabData = {
  "Competitive Programming": {
    description:
      "Competitive programming is a contest that tests how well participants can solve problems using logic, algorithms, and coding skills. They are given a set of problems, from easy to difficult, that require clear thinking, analysis, and efficient coding.",
    registerLink: "/register/competitive-programming",
  },
  Typeracer: {
    description:
      "Compete individually in our live Typeracer Competition. You will race against other typists to be the first to finish a given text passage. Your typing speed (WPM) determines how fast it moves. The first to the finish line wins. All participants must bring their own laptops.",
    registerLink: "/register/type-racer",
  },
  "Business Plan": {
    description:
      "A competitive event that assesses participants' skills in creating a structured business proposal, covering market analysis, marketing strategy, financial planning, and sustainability. The goal is to evaluate the creativity, innovation, and feasibility of the proposed business idea.",
    registerLink: "/register/business-plan",
  },
  "Prompt GPT": {
    description:
      "Compete individually in the timed Prompt GPT Competition, where you'll use Gemini to solve creative and logical challenges and be judged on your prompt's creativity, logic, and impact. Just be sure to bring your own laptop.",
    registerLink: "/register/prompt-gpt",
  },
};

function TabButtonContainer() {
  const [activeTab, setActiveTab] = useState("Competitive Programming");

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  return (
    <div className="relative z-[20] tab-button-container w-full flex flex-col justify-center items-center">
      <div className="tab-button-grid w-[65%] grid grid-cols-2 sm:grid-cols-4 gap-12 justify-items-center place-items-center">
        <TabButton
          buttonName="Competitive Programming"
          isActive={activeTab === "Competitive Programming"}
          onClick={() => handleTabClick("Competitive Programming")}
        />
        <TabButton
          buttonName="Business Plan"
          isActive={activeTab === "Business Plan"}
          onClick={() => handleTabClick("Business Plan")}
        />
        <TabButton
          buttonName="Prompt GPT"
          isActive={activeTab === "Prompt GPT"}
          onClick={() => handleTabClick("Prompt GPT")}
        />
        <TabButton
          buttonName="Typeracer"
          isActive={activeTab === "Typeracer"}
          onClick={() => handleTabClick("Typeracer")}
        />
      </div>
      <div className="competition-tab-container relative flex flex-col items-center justify-between bg-[url('/home/MobileTabPanel.svg')] sm:bg-[url('/home/competition-tab.webp')] bg-contain bg-center bg-no-repeat">
        <div className="flex flex-col gap-4 p-4 w-full h-full justify-center items-center">
          <h1 className={"font-rubik-glitch relative text-[#FFFFFF] text-center competition-tab-title"}>
            {activeTab}
          </h1>
          <h1 className={`font-space-mono relative text-[#FFFFFF] text-center competition-tab-description`}>
            {tabData[activeTab as keyof typeof tabData].description}
          </h1>
        </div>
        <div className="flex w-full h-full justify-center items-center">
        <Link
          href={tabData[activeTab as keyof typeof tabData].registerLink}
          className={`flex items-center justify-center group register-button`}
        >
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 462 93"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.25"
              d="M111.442 0.983887L0 31.4417V68.122L72.7583 92.7208H350.558L462 62.263V0.983887H111.442Z"
              fill="black"
              className="group-hover:fill-[#FCF551] opacity-25 group-hover:opacity-100"
            />
            <path
              d="M111.442 0.983887L0 31.4417V68.122L72.7583 92.7208H350.558L462 62.263V0.983887H111.442ZM455.119 61.2734L346.998 89.7802H77.4667L6.88097 66.7579V32.4257L115.002 3.92457H455.127V61.2734H455.119Z"
              fill="#FCF551"
            />
            <text
              x="250"
              y="50"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="currentColor"
              fontSize="18"
              fontWeight="500"
              className="text-[#FCF551] text-4xl sm:text-2xl md:text-4xl lg:text-4xl font-rubik-glitch group-hover:text-[#661108]"
            >
              Register_
            </text>
          </svg>
        </Link>
        </div>
      </div>
    </div>
  );
}

export default TabButtonContainer;
