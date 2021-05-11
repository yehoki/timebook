import React, { useEffect, useState } from "react";
import {
  IItemTableItem,
  ItemTable,
  SortDirection,
} from "../components/itemTable/itemTable";

interface IProject {
  name: string;
  startDate: Date;
  endDate: Date;
}

const Projects = () => {
  useState();
  useEffect(() => {});

  const tableColumns = [
    {
      title: "Name",
      value: (item: IProject) => item.name,
      onClick: () => {},
    },
    {
      title: "Duration",
      value: (item: IProject) =>
        `${item.startDate.toLocaleDateString()}-${item.endDate.toLocaleDateString()}`,
      onClick: () => {},
      orderedBy: SortDirection.DESC,
    },
  ];

  const projectList = [
    {
      name: "Testproject",
      startDate: new Date(2021, 1, 1),
      endDate: new Date(2021, 12, 31),
    },
    {
      name: "Testproject2",
      startDate: new Date(2020, 1, 1),
      endDate: new Date(2022, 12, 31),
    },
  ];

  return (
    <article>
      <h2>Your projects</h2>
      <ItemTable
        columns={tableColumns}
        items={projectList}
        page={{
          totalItemCount: 521,
          firstItemIndex: 11,
          itemsPerPage: 10,
          onPrevious: () => {},
          onFirst: () => {},
          onNext: () => {},
          onLast: () => {},
        }}
      ></ItemTable>
    </article>
  );
};

export default Projects;
