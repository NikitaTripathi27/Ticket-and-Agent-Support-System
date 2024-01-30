/* eslint-disable @typescript-eslint/no-explicit-any */
import { TOptions } from "../types";
import _ from "lodash";
export const severityOptions: TOptions[] = [
  { value: "Urgent", label: "Urgent" },
  { value: "High", label: "High" },
  { value: "Medium", label: "Medium" },
  { value: "Low", label: "Low" },
];

export const typeOptions: TOptions[] = [
  { value: "Technical Issues", label: "Technical Issues" },
  { value: "Product Inquiries", label: "Product Inquiries" },
  { value: "Complaints and Feedbackow", label: "Complaints and Feedback" },
  { value: "Account Management", label: "Account Management" },
  { value: "Policy Questions", label: "Policy Questions" },
];

export const statusOptions: TOptions[] = [
  { value: "New", label: "New" },
  { value: "Assigned", label: "Assigned" },
  { value: "Resolved", label: "Resolved" },
];

export const returnPagination = (totalPage:number, page:number, siblings:number) => {
  const totalPageNoInArray = 7 + siblings;
 
  if (totalPageNoInArray >= totalPage) return _.range(1, totalPage + 1);

  const leftSiblingIndex = Math.max(page - siblings, 1);
  const rightSiblingIndex = Math.min(page + siblings, totalPage);

  const showleftDots = leftSiblingIndex > 2;
  const showrightDots = rightSiblingIndex < totalPage - 2;

  if (!showleftDots && showrightDots) {
    const leftItemsCount = 3 + 2 * siblings;
    const leftRange = _.range(1, leftItemsCount + 1);
    return [...leftRange, "...", totalPage];
  } else if (!showrightDots && showleftDots) {
    const rightItemsCount = 3 + 2 * siblings;
    const rightRange = _.range(totalPage - rightItemsCount + 1, totalPage + 1);
    return [1, "...", ...rightRange];
  } else {
    const middleRange = _.range(leftSiblingIndex, rightSiblingIndex + 1);
    return [1, "...", ...middleRange, "...", totalPage];
  }
};
