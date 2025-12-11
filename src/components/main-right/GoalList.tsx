"use client"

import React from "react";
import ActionButton from "../ui/ActionButton";
import GoalHeader from "./GoalHeader";
import GoalItem from "./GoalItem";

export default function GoalList() {
  return (
    <div className="GoalList">
      <GoalHeader />
      <GoalItem />
      <ActionButton />
    </div>
  );
};
